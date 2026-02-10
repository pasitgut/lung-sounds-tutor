import { NextResponse, NextRequest } from "next/server";
import {
  CERTIFICATE_ROUTE,
  HOME_ROUTE,
  LEARNING_ROUTE,
  LOGIN_ROUTE,
  POSTTEST_ROUTE,
  PRETEST_ROUTE,
  SESSION_NAME,
  SIMULATION_ROUTE,
} from "./constants";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "th"],
  defaultLocale: "th",
});
const protectedRoutes = [
  HOME_ROUTE,
  POSTTEST_ROUTE,
  PRETEST_ROUTE,
  LEARNING_ROUTE,
  SIMULATION_ROUTE,
  CERTIFICATE_ROUTE,
];

export default function proxy(request: NextRequest) {
  // const session = request.cookies.get(SESSION_NAME)?.value;
  // const { pathname } = request.nextUrl;

  // const locale =
  //   ["th", "en"].find(
  //     (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  //   ) ?? "th";

  // const pathnameWithoutLocale = pathname.replace(
  //   new RegExp(`^/(${["th", "en"].join("|")})`),
  //   "",
  // );

  // if (!session && protectedRoutes.includes(pathnameWithoutLocale)) {
  //   return NextResponse.redirect(
  //     new URL(`/${locale}/${LOGIN_ROUTE}`, request.nextUrl),
  //   );
  // }

  // if (session && pathnameWithoutLocale === LOGIN_ROUTE) {
  //   return NextResponse.redirect(
  //     new URL(`/${locale}/${HOME_ROUTE}`, request.nextUrl),
  //   );
  // }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
