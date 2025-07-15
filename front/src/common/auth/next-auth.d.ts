// types/next-auth.d.ts

import { DefaultSession } from "next-auth";

// Session 객체의 user 타입 확장
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession["user"]
  }
}

// JWT 토큰 타입 확장
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: string;
  }
}