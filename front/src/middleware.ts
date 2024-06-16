//src/auth.ts 불러와서 미들웨어로 사용
import { auth } from "./auth"
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log('middleware', request.nextUrl.pathname);
  // const session = await auth(); //로그인 되어있다면 세션에 정보가 담김, 로그인 안된 경우 로그인 페이지로 리다이렉트
  // if (!session) {
  //   return NextResponse.redirect(`http://${process.env.NEXT_PUBLIC_BASE_URL}/io/inter/login`);
  // }
}

//미들웨어가 동작할 페이지들
export const config = {
  matcher: ['/io/calendar', '/io/list', '/io/habit', '/io/setting'],
}