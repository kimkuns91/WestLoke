import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/mypage", "/dashboard", "/inquiry"];
const authRoutes = ["/signin", "/signup"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/signin", req.url));
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/", req.url));
  }
});

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
