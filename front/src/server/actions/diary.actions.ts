
'use server';

import { startOfDay } from 'date-fns';
import { revalidatePath } from 'next/cache';

import { auth } from '@/common/auth/auth';
import { decrypt, encrypt } from '@/common/functions/crypt';
import prisma from '@/server/prisma/prisma';
import { del } from '@vercel/blob';
import { ActionResponse, DiaryWithRelations } from '../types';

// --- 에러 처리 헬퍼 ---
const handleError = (error: unknown, defaultMessage: string) => {
  console.error(error);
  if (error instanceof Error) {
    return { success: false, message: error.message };
  }
  return { success: false, message: defaultMessage };
};
export async function getDiaryByDate(
  date: string
): Promise<ActionResponse<DiaryWithRelations>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: '인증되지 않은 사용자입니다.' };
  }

  //strig type 의 yyyy-MM-dd => utc midnight dateObject
  const targetDate = startOfDay(new Date(date));

  try {
    const diary = await prisma.diary.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: targetDate,
        },
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        completedHabits: { orderBy: { priority: 'desc' } },
      },
    });

    if (!diary) {
      return { success: true, data: null, message: '일기 + 습관 모두 작성되지 않았습니다.' };
    }
    else if (diary.visible === false) {
      return { success: true, data: null, message: '삭제된 일기를 불러왔습니다.' };
    }
    const decryptedDiary = {
      ...diary,
      text: decrypt(diary.text, process.env.DATA_SECRET_KEY!),
    };
    return { success: true, data: decryptedDiary };
  } catch (error) {
    return handleError(error, '일기 조회 중 오류가 발생했습니다.');
  }
}
export async function createOrUpdateDiaryByDate(data: {
  date: string; // toISOString() 
  text: string;
  emotion: number;
  images: string[];
  deletedImageUrls: string[];
}): Promise<ActionResponse<DiaryWithRelations>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: '인증되지 않은 사용자입니다.' };
  }
  const userId = session.user.id;
  //strig type 의 yyyy-MM-dd => utc midnight dateObject
  const targetDate = startOfDay(new Date(data.date));

  try {
    if (data.deletedImageUrls && data.deletedImageUrls.length > 0) {
      await del(data.deletedImageUrls);
    }

    const encryptedText = encrypt(data.text, process.env.DATA_SECRET_KEY!);

    const diary = await prisma.diary.upsert({
      where: {
        userId_date: { // 이전 다이어리 검색 후 존재 여부 파악 후 처리하던 방식에서 userId_date 고유키로 간단하게 처리하도록 변경
          userId,
          date: targetDate,
        },
      },
      update: {  // 데이터가 있을 경우 (소프트 삭제된 다이어리 복구 등)
        visible: true,
        text: encryptedText,
        emotion: data.emotion,
        images: {
          deleteMany: {}, // 기존 이미지 모두 삭제
          create: data.images.map((src, idx) => ({ src, order: idx })),
        },
      },
      create: { // 데이터가 없을 경우 (새 다이어리 생성)
        visible: true,
        user: { connect: { id: userId } },
        email: session.user.email!,
        date: targetDate,
        text: encryptedText,
        emotion: data.emotion,
        images: {
          create: data.images.map((src, idx) => ({ src, order: idx })),
        },
      },
      include: {
        images: true,
        completedHabits: true,
      },
    });

    revalidatePath('/app/calendar');
    revalidatePath('/app/list');
    return { success: true, data: diary, message: '일기 정보가 업데이트 되었습니다.' };
  } catch (error) {
    return handleError(error, '일기 저장 중 오류가 발생했습니다.');
  }
}
export async function deleteDiaryByDate(data: { date: string }): Promise<ActionResponse<null>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: '인증되지 않은 사용자입니다.' };
  }
  const userId = session.user.id;
  //strig type 의 yyyy-MM-dd => utc midnight dateObject
  const targetDate = startOfDay(new Date(data.date));

  try {
    // 1. 먼저 삭제할 다이어리를 찾아서 연결된 이미지 URL들을 확보합니다.
    const diaryToDelete = await prisma.diary.findUnique({
      where: {
        userId_date: {
          userId,
          date: targetDate, // YYYY-MM-DD 문자열로 바로 조회
        },
      },
      include: {
        images: {
          select: {
            src: true, // 이미지 URL만 필요
          },
        },
      },
    });

    // 삭제할 다이어리가 없으면 성공 처리하고 종료
    if (!diaryToDelete) {
      return { success: true, message: '삭제할 일기가 없습니다.' };
    }

    // 2. Vercel Blob에서 실제 이미지 파일들을 삭제합니다.
    const imageUrls = diaryToDelete.images.map(image => image.src);
    if (imageUrls.length > 0) {
      await del(imageUrls);
    }

    // 3. 데이터베이스에서 다이어리 레코드를 삭제합니다.
    //    Prisma 스키마의 onDelete: Cascade 설정에 따라, 연결된 Image 레코드들도 자동으로 삭제됩니다.
    await prisma.diary.delete({
      where: {
        id: diaryToDelete.id,
      },
    });

    revalidatePath('/app/calendar');
    revalidatePath('/app/list');

    return { success: true, message: '일기가 삭제되었습니다.' };

  } catch (error) {
    return handleError(error, '일기 삭제 중 오류가 발생했습니다.');
  }
}