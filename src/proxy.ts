import { NextRequest, NextResponse } from "next/server";
// import { getAccessToken } from "./services/authServices";

export async function proxy(request: NextRequest) {
  //   const token = await getAccessToken() ;
  const token = null;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/cart",
  ],
};
