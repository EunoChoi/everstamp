
'use client';

import styled from "styled-components";

import $Common from "@/common/styles/common";
import $Modal from "@/common/styles/common_modal";
import HabitValues from "./HabitValues";

import { getHabitById } from "@/common/fetchers/habit";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useSubmitHabit from "./utils/useSubmitHabit";

interface habitInputProps {
  isEdit: boolean;
  habitId?: string;
}

const HabitInputView = ({ isEdit, habitId }: habitInputProps) => {

  const router = useCustomRouter();

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
    <$Modal.Background onClick={() => router.back()}>
      <HabitModalWrapper onClick={(e) => e.stopPropagation()}>
        <$Modal.Top>
          <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
          <span className="title">목표 습관</span>
          <button onClick={onSubmit} disabled={onMutation.isPending}>{submitText}</button>
        </$Modal.Top>
        <$Common.Empty />
        <HabitValues habitName={habitName} setHabitName={setHabitName} priority={priority} setPriority={setPriority} />
        <SubText>*최대 생성 가능 개수 : 18개, 이름 길이 제한 : 1~10</SubText>
        <$Common.Empty />
      </HabitModalWrapper>
    </$Modal.Background>);
}
export default HabitInputView;

const HabitModalWrapper = styled($Modal.Wrapper)`
  @media (min-width:1025px) { //desktop
    height: 600px;
  }
`
const SubText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: salmon;

  font-size: 14px;
  margin-bottom: 32px;
`