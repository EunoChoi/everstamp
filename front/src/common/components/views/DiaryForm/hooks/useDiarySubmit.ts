import { ExistingImage, ImageState, NewImage } from "@/common/types/image";
import { createOrUpdateDiaryByDate } from "@/server/actions/diary.actions";
import { uploadImagesToVercel } from "@/server/actions/image.actions";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useTransition } from "react";

interface UseDiarySubmitProps {
  initialImageUrls: string[];
  images: ImageState[];
  emotion: number;
  text: string;
  selectedDate: string;
}

export const useDiarySubmit = ({
  initialImageUrls,
  images,
  emotion,
  text,
  selectedDate,
}: UseDiarySubmitProps) => {

  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const onSubmit = () => {
    //validation
    if (emotion < 0 || emotion > 4) {
      enqueueSnackbar("감정을 선택해주세요.", { variant: 'error' });
      return;
    }
    if (text.trim().length < 1) {
      enqueueSnackbar("내용을 1글자 이상 입력해주세요.", { variant: 'error' });
      return;
    }
    if (text.length >= 1000) {
      enqueueSnackbar("내용은 1000자 미만으로 입력해주세요.", { variant: 'error' });
      return;
    }

    startTransition(async () => {
      //최초 서버 이미지와 최종 이미지를 비교해서 서버에서 삭제되어야할 이미지 파악
      const newImageFiles = images.filter(img => img.type === 'new').map(img => (img as NewImage).file);
      const serverImageUrls = images.filter(img => img.type === 'existing').map(img => (img as ExistingImage).url);
      const deletedImageUrls = initialImageUrls.filter(url => !serverImageUrls.includes(url));

      let uploadedUrls: string[] = [];

      //이미지 업로드 서버 액션
      if (newImageFiles.length > 0) {
        const formData = new FormData();
        newImageFiles.forEach(file => formData.append('image', file));
        const uploadResult = await uploadImagesToVercel(formData);
        if (uploadResult.success && uploadResult.data) {
          uploadedUrls = uploadResult.data;
        } else {
          enqueueSnackbar("이미지 업로드 실패!", { variant: 'error' });
          return;
        }
      }

      // 다이어리 추가 및 수정 서버 액션 (이미지 포함)
      const finalImageUrls = [...serverImageUrls, ...uploadedUrls];
      const result = await createOrUpdateDiaryByDate({
        date: selectedDate,
        text,
        images: finalImageUrls,
        emotion,
        deletedImageUrls, //서버에 이미지가 더미로 남지 않도록 처리
      });

      if (result.success) {
        router.back();
      } else {
        alert(result.message);
      }
    });
  }

  return {
    isLoading,
    onSubmit
  }
};
