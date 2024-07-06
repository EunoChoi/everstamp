'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import HabitInputButtons from "../HabitInput/Input_Buttons";
import HabitInputValues from "../HabitInput/Input_Values";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "@/Aixos/aixos";

import { enqueueSnackbar } from 'notistack';

import { getHabit } from "@/app/(afterLogin)/_lib/habit";

interface Props {
  habitId: string;
}
interface HabitProps {
  habitId: string | null;
  habitName?: string;
  priority: number;
}
interface Err {
  response: {
    data: string;
  }
}

const EditHabitModal = ({ habitId }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);



  const { data: habitData } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabit({ id: habitId }),
    enabled: habitId !== null
  });

  const [habitName, setHabitName] = useState<string>(habitData?.name);
  const [priority, setPriority] = useState<number>(habitData?.priority);

  const editHabitMutation = useMutation({
    mutationFn: ({ habitId, habitName, priority }: HabitProps) => Axios.patch('/habit', { habitId, habitName, priority }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      router.back();
      console.log('edit habit success');
      setTimeout(() => {
        enqueueSnackbar('습관 항목 수정 완료', { variant: 'success' });
      }, 300);
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('edit habit error');
    },
  });

  const onEditHabit = () => {
    if (habitName.length > 0 && habitName.length <= 10) editHabitMutation.mutate({ habitId, habitName, priority });
    else enqueueSnackbar('1~10글자의 이름을 입력해주세요.', { variant: 'info' });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <Wrapper onClick={() => router.back()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Edit Habit</Title>
        <HabitInputValues habitName={habitName} setHabitName={setHabitName} priority={priority} setPriority={setPriority} inputRef={inputRef} />
        <HabitInputButtons onSubmit={onEditHabit} type="edit" />
      </Modal>
    </Wrapper>);
}
export default EditHabitModal;

const Wrapper = styled.div`
  transition: all ease-in-out 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);

  text-transform: uppercase;
  color: rgb(var(--greyTitle));
`

const Modal = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
  
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  padding-top: 12px;
  padding-bottom: calc(var(--mobileNav) + 12px);

  width: 100dvw;
  height: 100dvh;

  @media (min-width:1024px) { //desktop
    min-width: 500px;
    width: 40%;
    height: 50%;
    border-radius: 8px;
  }
`
const Title = styled.span`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 28px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
`
