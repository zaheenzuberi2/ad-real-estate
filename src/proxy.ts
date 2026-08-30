import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

/**
 * (Next 16 renamed `middleware` to `proxy`.) Two jobs:
 *  1. Stamp the request path onto a header so the root layout can drop the
 *     marketing chrome (header, footer, chat) on /admin and /studio.
 *  2. Gate everything under /admin behind the signed session cookie, sending
 *     unauthenticated visitors to /admin/login.
 *
 * Server Actions POST to the route that uses them, so this matcher does not
 * cover every action call — each admin action re-checks the session itself.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const forward = NextResponse.next({ request: { headers: requestHeaders } });

  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLogin = pathname === "/admin/login";

  if (isAdmin && !isLogin) {
    const ok = await verifySession(request.cookies.get(ADMIN_COOKIE)?.value);
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return forward;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|images/).*)",
  ],
};
