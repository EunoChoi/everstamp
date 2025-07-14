'use server';

import { auth } from "@/common/auth/auth";
import { signOut } from "next-auth/react";
import prisma from "../prisma/prisma";

// 로그인/회원가입
export async function findOrCreateUser(
  email: string,
  provider: string
) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });

    if (foundUser) {
      if (foundUser.provider === provider) {
        // 기존 유저, 로그인 성공
        return { success: true, message: "로그인 성공" };
      } else {
        // 이메일은 있지만 프로바이더가 다름
        return { success: false, message: "이미 다른 SNS로 가입된 이메일입니다." };
      }
    } else {
      // 신규 유저, 회원가입
      await prisma.user.create({
        data: { email, provider },
      });
      return { success: true, message: "회원가입 및 로그인 성공" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "서버 오류가 발생했습니다." };
  }
}

//회원 탈퇴
export async function deleteUser() {
  try {
    const session = await auth(); //로그인 상태 확인
    if (!session?.user?.id) {
      return { success: false, message: '인증되지 않은 사용자입니다.' };
    }

    await prisma.user.delete({
      where: { id: session.user.id },
    });

    await signOut({ redirect: false }); //nextauth 로그아웃

    return { success: true, message: '회원 탈퇴가 완료되었습니다.' };

  } catch (error) {
    console.error("회원 탈퇴 오류:", error);
    return { success: false, message: '회원 탈퇴 중 오류가 발생했습니다.' };
  }
}