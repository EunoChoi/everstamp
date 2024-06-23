import NextAuth from "next-auth"
import axios from "axios"

import Kakao from "next-auth/providers/kakao"
import Google from "next-auth/providers/google"
import Naver from "next-auth/providers/naver"
import Axios from "./Aixos/aixos"
import { cookies } from "next/headers"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao, Google, Naver],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    //1 hours 
    // maxAge: 4 * 60 * 60 // 4 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const provider = account?.provider;
      const email = user.email
      const profilePic = user.image;

      try {
        // const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_BACK_SERVER_PORT}/user/register`,
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
            cookies().set('accessToken', accessToken);
            cookies().set('refreshToken', refreshToken);
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
})