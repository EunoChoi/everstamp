import NextAuth from "next-auth"
import axios from "axios"

import Kakao from "next-auth/providers/kakao"
import Google from "next-auth/providers/google"
import Naver from "next-auth/providers/naver"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Kakao, Google, Naver],
  session: {
    strategy: 'jwt',
    // maxAge: 60 * 60 
    //1 hours 
    // maxAge: 4 * 60 * 60 // 4 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const provider = account?.provider;
      const email = user.email
      const profilePic = user.image;

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_BACK_SERVER_PORT}/user/register`,
          {
            email, //primary key
            provider,
            profilePic
          }
        );
        if (res) {
          //result = 0, 로그인 성공
          //result = 1, 이미 같은 이메일로 가입
          //result = 2, 회원가입 도중 에러 발생
          const result = res.data.result;
          // console.log(result);

          if (result === 0) {
            return true;
          }
          else {
            return `/unauthorized?type=${result}`;
          }
        }
      } catch (e) {
        console.log(e);
      }
      return `/unauthorized`;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('token : ', token);
      // console.log('user.id : ', user?.id);
      if (user) {
        token.email = user.email;
      }
      console.log(token);
      return token;
    }
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