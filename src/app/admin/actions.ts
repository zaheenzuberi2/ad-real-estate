"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  createSession,
  verifySession,
  passwordMatches,
} from "@/lib/admin-auth";
import { getWriteClient } from "@/sanity/client";
import { getAdminProperty } from "@/lib/admin-data";

/** Every mutating action re-checks the session — the proxy does not cover Server Actions. */
async function assertAdmin() {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifySession(value))) {
    throw new Error("Not authorised.");
  }
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

/** Sanity array `_key`s are our own slugs — reject anything that could alter a GROQ path. */
const isSafeKey = (value: string) => /^[A-Za-z0-9_-]{1,64}$/.test(value);
const lines = (fd: FormData, k: string) =>
  str(fd, k)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
const key = () => `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ── Auth ────────────────────────────────────────────────────────────────

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const next = str(formData, "next") || "/admin/leads";

  if (!passwordMatches(password)) {
    return { error: "That password is not right." };
  }

  const { value, maxAge } = await createSession();
  (await cookies()).set(ADMIN_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  redirect(next.startsWith("/admin") ? next : "/admin/leads");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

// ── Leads ───────────────────────────────────────────────────────────────

export async function updateLead(formData: FormData) {
  await assertAdmin();
  const id = str(formData, "id");
  if (!id) return;

  await getWriteClient()
    .patch(id)
    .set({
      status: str(formData, "status") || "new",
      assignedTo: str(formData, "assignedTo") || undefined,
      notes: str(formData, "notes") || undefined,
    })
    .commit();

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

// ── Listings ────────────────────────────────────────────────────────────

function listingFields(fd: FormData) {
  const priceRaw = str(fd, "priceFrom");
  const monthsRaw = str(fd, "installmentMonths");
  return {
    title: str(fd, "title"),
    eyebrow: str(fd, "eyebrow"),
    location: str(fd, "location"),
    phase: str(fd, "phase"),
    propertyType: str(fd, "propertyType"),
    status: str(fd, "status") || "Available",
    description: str(fd, "description"),
    overview: lines(fd, "overview"),
    priceFrom: priceRaw ? Number(priceRaw.replace(/[^\d]/g, "")) : null,
    priceNote: str(fd, "priceNote"),
    sizes: str(fd, "sizes")
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean),
    features: lines(fd, "features")
      .map((line) => {
        const [icon, ...rest] = line.split("|");
        return { _key: key(), icon: icon.trim(), label: rest.join("|").trim() };
      })
      .filter((f) => f.icon && f.label),
    highlights: lines(fd, "highlights"),
    installmentMonths: monthsRaw ? Number(monthsRaw) : null,
    featured: fd.get("featured") === "on",
    order: Number(str(fd, "order")) || 100,
  };
}

export async function saveListing(formData: FormData) {
  await assertAdmin();

  const existingId = str(formData, "id");
  const slug = str(formData, "slug")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!str(formData, "title") || !slug) {
    throw new Error("Title and slug are required.");
  }

  const fields = listingFields(formData);
  const client = getWriteClient();

  if (existingId) {
    await client.patch(existingId).set(fields).commit();
  } else {
    await client.create({
      _type: "property",
      _id: `property-${slug}`,
      slug: { _type: "slug", current: slug },
      images: [],
      ...fields,
    });
  }

  revalidatePath("/admin/listings");
  revalidatePath("/properties");
  revalidatePath(`/properties/${slug}`);
  revalidatePath("/");
  redirect("/admin/listings");
}

export async function deleteListing(formData: FormData) {
  await assertAdmin();
  const id = str(formData, "id");
  const slug = str(formData, "slug");
  if (!id) return;

  await getWriteClient().delete(id);

  revalidatePath("/admin/listings");
  revalidatePath("/properties");
  if (slug) revalidatePath(`/properties/${slug}`);
  revalidatePath("/");
  redirect("/admin/listings");
}

export async function uploadListingPhotos(formData: FormData) {
  await assertAdmin();
  const id = str(formData, "id");
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (!id || files.length === 0) return;

  const client = getWriteClient();
  const property = await getAdminProperty(id);
  const altBase = property?.title ? `${property.title}, ${property.location ?? "AD Real Estate"}` : "Property photo";

  const uploaded = [];
  for (const file of files) {
    const asset = await client.assets.upload(
      "image",
      Buffer.from(await file.arrayBuffer()),
      { filename: file.name || "photo.jpg" },
    );
    uploaded.push({
      _type: "image" as const,
      _key: key(),
      asset: { _type: "reference" as const, _ref: asset._id },
      alt: altBase,
    });
  }

  await client.patch(id).setIfMissing({ images: [] }).append("images", uploaded).commit();

  revalidatePath(`/admin/listings/${id}`);
  revalidatePath("/properties");
  revalidatePath("/");
}

export async function deleteListingPhoto(formData: FormData) {
  await assertAdmin();
  const id = str(formData, "id");
  const photoKey = str(formData, "key");
  if (!id || !isSafeKey(photoKey)) return;

  await getWriteClient()
    .patch(id)
    .unset([`images[_key=="${photoKey}"]`])
    .commit();

  revalidatePath(`/admin/listings/${id}`);
  revalidatePath("/properties");
  revalidatePath("/");
}

export async function updatePhotoAlt(formData: FormData) {
  await assertAdmin();
  const id = str(formData, "id");
  const photoKey = str(formData, "key");
  const alt = str(formData, "alt");
  if (!id || !isSafeKey(photoKey) || !alt) return;

  await getWriteClient()
    .patch(id)
    .set({ [`images[_key=="${photoKey}"].alt`]: alt })
    .commit();

  revalidatePath(`/admin/listings/${id}`);
  revalidatePath("/properties");
}
