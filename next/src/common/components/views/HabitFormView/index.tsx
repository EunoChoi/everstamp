'use client';

import { getHabitById } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import {
  HABIT_NAME_MAX_LENGTH,
  HABIT_NAME_MIN_LENGTH,
  MAX_HABIT_COUNT,
} from '@/common/constants/habit';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { ModalBody } from '../../ui/Modal/ModalBody';
import { ModalHeader } from '../../ui/Modal/ModalHeader';
import { RouteModal } from '../../ui/Modal/RouteModal';
import { inputViewContentClass } from '../constants';
import { createHabitRequest } from './functions/createHabitRequest';
import { updateHabitRequest } from './functions/updateHabitRequest';
import HabitFormNameSection from './HabitFormNameSection';
import HabitFormPrioritySection from './HabitFormPrioritySection';
import { useHabitForm } from './hooks/useHabitForm';
import { useHabitSubmission } from './hooks/useHabitSubmission';
import { useHandleHabitFormLoadFailure } from './hooks/useHandleHabitFormLoadFailure';
import { useSyncHabitDataToForm } from './hooks/useSyncHabitDataToForm';

interface HabitFormViewProps {
  isEdit: boolean;
  habitId?: string | null;
}

const HabitFormView = ({ isEdit, habitId }: HabitFormViewProps) => {
  const router = useRouter();
  const {
    data: habitData,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['habit', 'id', habitId],
    queryFn: () => authAction(() => getHabitById({ id: habitId })),
    enabled: isEdit && Boolean(habitId),
  });
  const {
    name,
    setName,
    priority,
    setPriority,
  } = useHabitForm();
  const isFormInitialized = useSyncHabitDataToForm({
    enabled: isEdit,
    habitData,
    setName,
    setPriority,
  });
  const isHabitLoadFailure = useHandleHabitFormLoadFailure({
    isEdit,
    habitId,
    habitData,
    isError,
    isPending,
  });
  const saveHabit = isEdit
    ? (habitName: string) => {
      if (!habitId) {
        throw new Error('HABIT_ID_REQUIRED');
      }

      return updateHabitRequest({
        habitId,
        name: habitName,
        priority,
      });
    }
    : (habitName: string) =>
      createHabitRequest({
        name: habitName,
        priority,
      });
  const confirmText = isEdit ? '수정' : '추가';
  const { isSubmitting, handleSubmit } = useHabitSubmission({
    name,
    priority,
    saveHabit,
    successMessage: isEdit ? '습관 항목 수정 완료' : '습관 항목 생성 완료',
    failureMessage: isEdit ? '습관 항목 수정 실패' : '습관 항목 생성 실패',
  });

  const handleBack = () => {
    if (isSubmitting) {
      enqueueSnackbar('저장이 진행 중입니다. 완료될 때까지 기다려주세요.');
      return;
    }

    router.back();
  };

  const shouldHideEditForm = isEdit && (
    isHabitLoadFailure || isPending || !isFormInitialized
  );

  if (shouldHideEditForm) {
    return null;
  }

  return (
    <RouteModal ariaLabel={`목표 습관 ${confirmText}`}>
      <ModalHeader
        title={`목표 습관 ${confirmText}`}
        confirmText={confirmText}
        onBack={handleBack}
        onConfirm={handleSubmit}
        isDisabled={isSubmitting}
      />
      <ModalBody withScrollFade className="flex w-full flex-col items-stretch">
        <div className={inputViewContentClass}>
          <HabitFormNameSection name={name} setName={setName} />
          <HabitFormPrioritySection
            priority={priority}
            setPriority={setPriority}
          />
          <span className="flex items-center justify-center text-sm text-theme-text-secondary">
            *최대 생성 가능 개수 : {MAX_HABIT_COUNT}개, 이름 길이 제한 : {HABIT_NAME_MIN_LENGTH}~{HABIT_NAME_MAX_LENGTH}
          </span>
        </div>
      </ModalBody>
    </RouteModal>
  );
};

export default HabitFormView;
