import { NextResponse, NextRequest } from "next/server";
import { HOME_ROUTE, LOGIN_ROUTE, SESSION_NAME } from "./constants";

const protectedRoutes = [HOME_ROUTE];

export default function proxy(request: NextRequest) {
  const session = request.cookies.get(SESSION_NAME)?.value || "";
  const path = request.nextUrl.pathname;

  if (!session && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.nextUrl.origin));
  }

  if (session && path === LOGIN_ROUTE) {
    return NextResponse.redirect(new URL(HOME_ROUTE, request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
