//서버에서 실행

import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

import { findOrCreateUser } from "@/server/actions/user.actions";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [Kakao, Google, Naver],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    //간편 로그인 성공시 signIn 진행
    async signIn({ user, account }) {
      if (!user.email || !account?.provider) {
        return false;
      }

      const result = await findOrCreateUser(user.email, account.provider);

      if (result.success) {
        return true;
      } else {
        return `/login-error?message=${encodeURIComponent(result.message)}`;
      }
    },
    async jwt({ user, token, account }) {
      if (user && user.email && account?.provider) {
        const result = await findOrCreateUser(user.email, account.provider);

        token.provider = result.user?.provider;
        token.id = result.user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).provider = token.provider;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/app',
    error: '/app',
  }
})