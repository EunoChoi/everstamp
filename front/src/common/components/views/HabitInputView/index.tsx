
'use client';

import styled from "styled-components";


import { getHabitById } from "@/common/fetchers/habit";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Modal } from "../../ui/Modal";
import { HabitName } from "./HabitName";
import { HabitRating } from "./HabitRating";
import useSubmitHabit from "./utils/useSubmitHabit";

interface habitInputProps {
  isEdit: boolean;
  habitId?: string;
}

const HabitInputView = ({ isEdit, habitId }: habitInputProps) => {
  const { data: habitData, isError } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabitById({ id: habitId }),
    enabled: isEdit === true && habitId !== null
  });

  const [habitName, setHabitName] = useState<string>(habitData?.name ?? '');
  const [priority, setPriority] = useState<number>(habitData?.priority ?? 0);

  const { addHabit, editHabit } = useSubmitHabit();
  const onMutation = isEdit ? editHabit : addHabit;
  const submitText = isEdit ? '수정' : '추가';


  const onSubmit = () => {
    if (habitName.length > 0 && habitName.length <= 10) {
      if (isEdit && habitId) onMutation.mutate({ habitId, habitName, priority });
      else onMutation.mutate({ habitName, priority });
    }
    else enqueueSnackbar('1~10 글자의 이름을 입력해주세요.', { variant: 'info' });
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  return (
    <Modal>
      <Modal.Header headerTitleText={`목표 습관 ${submitText}`} headerConfirmText='확인' onConfirm={onSubmit} />
      <HabitInputViewContent>
        <HabitName habitName={habitName} setHabitName={setHabitName} />
        <HabitRating priority={priority} setPriority={setPriority} />
        <SubText>*최대 생성 가능 개수 : 18개, 이름 길이 제한 : 1~10</SubText>
      </HabitInputViewContent>
    </Modal>
  );
}
export default HabitInputView;

const HabitInputViewContent = styled(Modal.Content)`
  gap: 36px;
`
const SubText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: salmon;

  font-size: 16px;
  margin-bottom: 32px;
`