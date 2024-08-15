import NextAuth from "next-auth"
import axios from "axios"

import Kakao from "next-auth/providers/kakao"
import Google from "next-auth/providers/google"
import Naver from "next-auth/providers/naver"
import Axios from "./Axios/axios"
import { cookies } from "next/headers"


export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [Kakao, Google, Naver],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60, //s not ms
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const provider = account?.provider;
      const email = user.email
      const profilePic = user.image;

      try {
        const res = await Axios.post(`/user/register`,
          {
            email, //primary key
            provider,
            profilePic
          }
        );
        if (res) {
          const result = res.data.result;
          const message = res.data.message;
          if (result === true) {
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            cookies().set('accessToken', accessToken, { sameSite: 'lax', domain: `${process.env.NEXT_PUBLIC_DOMAIN}`, maxAge: 7 * 24 * 60 * 60 });
            cookies().set('refreshToken', refreshToken, { sameSite: 'lax', domain: `${process.env.NEXT_PUBLIC_DOMAIN}`, maxAge: 7 * 24 * 60 * 60 });
            return true;
          }
          else return `/unauthorized?message=${encodeURI(message)}`;
        }
      } catch (e) {
        console.log(e);
      }
      return `/unauthorized`;
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // }
    // async redirect({ url, baseUrl }) {
    //   console.log(url)
    //   console.log(baseUrl)
    //   return baseUrl
    // },
    // async session({ session, user, token }) {
    //   return session
    // },
  },
  pages: {
    error: '/app',
  }
})