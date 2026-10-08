import { NextResponse, type NextRequest } from "next/server";

/**
 * Hands the current path to the server layout.
 *
 * A layout cannot see the pathname on its own, and the bell needs it: the
 * notifications page marks everything read while that same layout is counting,
 * so without this the badge would linger for a beat on the very page that just
 * cleared it.
 */
export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|demo/|sw.js|icon-|badge-).*)"],
};
