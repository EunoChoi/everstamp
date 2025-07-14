import { NextRequest, NextResponse } from "next/server";
import { auth } from "./common/auth/auth";

export async function middleware(request: NextRequest) {
  console.log('middleware', request.nextUrl.pathname);
  const session = await auth();

  if (!session) {
    console.log('need login, redirect to login page');
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}/app`);
  }
}

export const config = {
  matcher: ['/app/:path+'],
}