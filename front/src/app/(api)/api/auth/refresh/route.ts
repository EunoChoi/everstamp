import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY!
    ) as { email: string; provider: string };

    const { email, provider } = decoded;

    if (!email || !provider) {
      return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 401 });
    }

    const accessToken = jwt.sign(
      { email, provider },
      process.env.ACCESS_SECRET_KEY!,
      { expiresIn: '5m', issuer: 'everstamp' }
    );
    const isProduction = process.env.NODE_ENV === "production";
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const maxAge = 7 * 24 * 60 * 60;

    const response = NextResponse.json({ accessToken });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge,
      path: "/",
      ...(domain ? { domain: `.${domain}` } : {}),
    });

    return response;

  } catch (e: any) {
    console.error("refresh error:", e);

    if (e.name === 'TokenExpiredError') {
      return NextResponse.json({ error: "리프레시 토큰이 만료되었습니다." }, { status: 401 });
    } else if (e.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 401 });
    }

    return NextResponse.json({ error: "서버 에러가 발생했습니다." }, { status: 500 });
  }
}
