import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware working");
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/pages/login" || path === "/pages/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/pages/products",
};
