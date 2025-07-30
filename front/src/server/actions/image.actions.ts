'use server';

import { put } from '@vercel/blob';
import crypto from 'crypto';
import { ActionResponse } from '../types';

const generateFileName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex');

export async function uploadImagesToVercel(formData: FormData): Promise<ActionResponse<string[]>> {
  try {
    const files = formData.getAll('image') as File[];

    if (files.length === 0) {
      return { success: false, message: '업로드할 이미지가 없습니다.' };
    }

    const uploadedBlobs = [];

    for (const file of files) {
      const fileName = generateFileName();
      const blob = await put(`diary-images/${fileName}`, file, {
        access: 'public',
      });
      uploadedBlobs.push(blob);
    }

    const urls = uploadedBlobs.map(blob => blob.url);
    return { success: true, data: urls, message: '이미지 업로드에 성공했습니다.' };
  } catch (error) {
    console.error("Vercel Blob 업로드 실패:", error);
    return { success: false, message: '서버 오류로 인해 이미지 업로드에 실패했습니다.' };
  }
}