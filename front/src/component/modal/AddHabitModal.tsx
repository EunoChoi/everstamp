'use client';

import styled from "styled-components";
import { useRef, useState } from "react";
import HabitInputButtons from "../HabitInput/Input_Buttons";
import HabitInputValues from "../HabitInput/Input_Values";
import Axios from "@/Aixos/aixos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

interface EditHabitProps {
  habitName: string;
  // themeColor?: string;
  priority: number;
}
interface Err {
  response: {
    data: string;
  }
}

const AddHabitModal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [habitName, setHabitName] = useState<string>('');
  const [priority, setPriority] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);


  const addHabitMutation = useMutation({
    mutationFn: ({ habitName, priority }: EditHabitProps) => Axios.post('/habit', { habitName, priority }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      console.log('add habit success');
      router.back();
      setTimeout(() => {
        enqueueSnackbar('습관 항목 생성 완료', { variant: 'success' });
      }, 300);
    },
    onError: (e: Err) => {
      // alert(e?.response?.data);
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('add habit error');
    },
  });


  const addHabit = () => {
    if (habitName.length > 0 && habitName.length <= 10) addHabitMutation.mutate({ habitName, priority });
    // else alert('최대 10글자까지만 가능합니다.')
    else enqueueSnackbar('1~10 글자의 이름을 입력해주세요.', { variant: 'info' });

  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <Wrapper onClick={() => router.back()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Add Habit</Title>
        <HabitInputValues habitName={habitName} setHabitName={setHabitName} priority={priority} setPriority={setPriority} inputRef={inputRef} />
        <HabitInputButtons onSubmit={addHabit} />
      </Modal>
    </Wrapper>);
}
export default AddHabitModal;

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
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  padding-top: 12px;
  padding-bottom: calc(var(--mobileNav) + 12px);

  width: 100dvw;
  height: 100dvh;


  @media (min-height:480px) and (min-width:1024px) { //desktop
    height: 300px;
    width: 450px;
  }
`
const Title = styled.span`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
`