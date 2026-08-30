/**
 * Tiny self-contained session auth for the /admin panel. No third party: a
 * shared password (ADMIN_PASSWORD) is checked once, then the browser holds a
 * signed, expiring cookie. Signing uses Web Crypto so the same code verifies
 * in the proxy and in server actions.
 */

export const ADMIN_COOKIE = "ad_admin";
const TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();

function b64url(bytes: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function sign(payload: string): Promise<string> {
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(payload));
  return b64url(sig);
}

/** Build a fresh session cookie value. */
export async function createSession(): Promise<{ value: string; maxAge: number }> {
  const expiry = String(Date.now() + TTL_MS);
  return { value: `${expiry}.${await sign(expiry)}`, maxAge: Math.floor(TTL_MS / 1000) };
}

/** True when the cookie value is well-formed, unexpired and correctly signed. */
export async function verifySession(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const dot = value.indexOf(".");
  if (dot <= 0) return false;
  const expiry = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const ms = Number(expiry);
  if (!Number.isFinite(ms) || ms < Date.now()) return false;
  try {
    return (await sign(expiry)) === sig;
  } catch {
    return false;
  }
}

/** Constant-time-ish password check. */
export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
