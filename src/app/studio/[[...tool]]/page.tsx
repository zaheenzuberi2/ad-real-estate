import { isSanityConfigured } from "@/sanity/env";
import { StudioClient } from "./StudioClient";

export const dynamic = "force-static";

export const metadata = {
  title: "AD Real Estate Admin",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="shell py-24">
        <h1 className="font-display text-2xl font-semibold text-navy-deep">
          Studio not configured
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
          Set <code className="rounded bg-sand px-1.5 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
          and{" "}
          <code className="rounded bg-sand px-1.5 py-0.5">SANITY_API_WRITE_TOKEN</code>{" "}
          in your environment, then redeploy. See{" "}
          <code className="rounded bg-sand px-1.5 py-0.5">.env.example</code>.
        </p>
      </div>
    );
  }

  return <StudioClient />;
}
