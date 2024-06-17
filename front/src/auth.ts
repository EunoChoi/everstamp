import NextAuth from "next-auth"
import Kakao from "next-auth/providers/kakao"
import Google from "next-auth/providers/google"
import Naver from "next-auth/providers/naver"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao({
    authorization: {
      params: {
        prompt: "consent"
      },
    },
  }), Google({
    authorization: {
      params: {
        prompt: "consent"
      },
    },
  }), Naver(
    {
      authorization: {
        params: {
          prompt: "consent"
        },
      },
    }
  )],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('user :', user);
      console.log('account :', account);
      console.log('profile :', profile)
      console.log('credentials :', credentials);



      const result = true;
      // if (result) return `${process.env.NEXT_PUBLIC_BASE_URL}/io/calendar`;
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