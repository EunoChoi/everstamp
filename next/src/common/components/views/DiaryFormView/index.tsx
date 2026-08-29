"use client";

import { getDiaryById } from '@/common/actions/diary';
import { authAction } from '@/common/auth/authAction';
import type { DiaryData } from '@/common/types/diary';
import { isValidLocalDateString } from '@/common/utils/date/isValidLocalDateString';
import { parseLocalDate } from '@/common/utils/date/parseLocalDate';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Modal } from '../../ui/Modal';
import { ModalBody } from '../../ui/Modal/ModalBody';
import { ModalHeader } from '../../ui/Modal/ModalHeader';
import { inputViewContentClass } from '../constants';
import DiaryFormEmotionSection from './DiaryFormEmotionSection';
import DiaryFormImagesSection from './DiaryFormImagesSection';
import DiaryFormTextSection from './DiaryFormTextSection';
import { createDiaryRequest } from './functions/createDiaryRequest';
import { updateDiaryRequest } from './functions/updateDiaryRequest';
import { useDiaryForm } from './hooks/useDiaryForm';
import { useDiaryImages } from './hooks/useDiaryImages';
import { useDiarySubmission } from './hooks/useDiarySubmission';
import { useHandleDiaryFormLoadFailure } from './hooks/useHandleDiaryFormLoadFailure';
import { useSyncDiaryDataToForm } from './hooks/useSyncDiaryDataToForm';

interface DiaryFormViewProps {
  isEdit: boolean;
  diaryId?: string | null;
}

const DiaryFormView = ({ isEdit, diaryId }: DiaryFormViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    data: diaryData,
    isError,
    isPending,
  } = useQuery<DiaryData | null>({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => authAction(() => getDiaryById({ id: diaryId })),
    enabled: isEdit && Boolean(diaryId),
  });
  const {
    text,
    setText,
    emotion,
    setEmotion,
    diaryImages,
    setDiaryImages,
  } = useDiaryForm();
  const isFormInitialized = useSyncDiaryDataToForm({
    enabled: isEdit,
    diaryData,
    setText,
    setEmotion,
    setDiaryImages,
  });
  const isDiaryLoadFailure = useHandleDiaryFormLoadFailure({
    isEdit,
    diaryId,
    diaryData,
    isError,
    isPending,
  });
  const imageHandlers = useDiaryImages({ diaryImages, setDiaryImages });
  const dateParam = searchParams.get('date');
  const date = diaryData?.date
    ?? (isValidLocalDateString(dateParam)
      ? dateParam
      : format(new Date(), 'yyyy-MM-dd'));
  const headerTitle = format(parseLocalDate(date), 'yyyy.M.dd (eee)');
  const saveDiary = isEdit
    ? (imageContentIds: string[]) => {
      if (!diaryId) {
        throw new Error('DIARY_ID_REQUIRED');
      }

      return updateDiaryRequest({
        diaryId,
        text,
        emotion,
        imageContentIds,
      });
    }
    : (imageContentIds: string[]) =>
      createDiaryRequest({
        date,
        text,
        emotion,
        imageContentIds,
      });
  const { isSubmitting, handleSubmit } = useDiarySubmission({
    text,
    emotion,
    diaryImages,
    saveDiary,
    successMessage: isEdit ? '일기 수정 완료' : '일기 작성 완료',
    failureMessage: isEdit ? '일기 수정 실패' : '일기 작성 실패',
  });

  const handleBack = () => {
    if (isSubmitting) {
      enqueueSnackbar('저장이 진행 중입니다. 완료될 때까지 기다려주세요.');
      return;
    }

    router.back();
  };

  const shouldHideEditForm = isEdit && (
    isDiaryLoadFailure || isPending || !isFormInitialized
  );

  if (shouldHideEditForm) {
    return null;
  }

  return (
    <Modal
      ariaLabel={headerTitle}
      contentClassName="flex min-h-0 flex-col desktop:h-[85dvh] desktop:max-h-[85%] desktop:w-[500px]"
      dismissible={!isSubmitting}
      isOpen
      onClose={handleBack}
      overlayClassName="z-[99999]"
      variant={{ base: 'full', tablet: 'full', desktop: 'center' }}
    >
      <ModalHeader
        title={headerTitle}
        confirmText={isEdit ? '수정' : '추가'}
        onBack={handleBack}
        onConfirm={handleSubmit}
        isDisabled={isSubmitting}
      />
      <ModalBody withScrollFade className="flex w-full flex-col items-stretch">
        <div className={inputViewContentClass}>
          <DiaryFormEmotionSection
            emotion={emotion}
            setEmotion={setEmotion}
          />
          <DiaryFormTextSection
            text={text}
            setText={setText}
          />
          <DiaryFormImagesSection
            diaryImages={diaryImages}
            handleImageChange={imageHandlers.handleImageChange}
            getImageUrl={imageHandlers.getImageUrl}
            handleRemoveImage={imageHandlers.handleRemoveImage}
            isLoading={isSubmitting}
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DiaryFormView;
