import NextAuth from "next-auth"
import Kakao from "next-auth/providers/kakao"
import Google from "next-auth/providers/google"
import Naver from "next-auth/providers/naver"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    // signIn: '/inter/login',
  },
  providers: [Kakao, Google, Naver],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user);




      const result = true;
      if (result) return true;
      else return false;

    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async session({ session, user, token }) {
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
})