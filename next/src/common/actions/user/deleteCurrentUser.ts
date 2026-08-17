'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '../../../../lib/prisma';
import { getAuth } from '../../auth/getAuth';
import { clearAccessRefreshToken } from '../../auth/token';
import type { ActionResult } from '../types';
import { createAuthErrorResult, createServerErrorResult } from './utils';

export const deleteCurrentUser = async (): Promise<ActionResult<string>> => {
  try {
    const auth = await getAuth();
    if (!auth.ok) return createAuthErrorResult(auth);

    await prisma.user.delete({
      where: { id: auth.userId },
    });

    await clearAccessRefreshToken();
    return { ok: true, data: '탈퇴가 완료되었습니다.' };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return {
        ok: false,
        code: 'USER_NOT_FOUND',
        message: '존재하지 않는 유저입니다.',
      };
    }
    console.error(error);
    return createServerErrorResult();
  }
};
