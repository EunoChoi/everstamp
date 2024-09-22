'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import HabitInputButtons from "../../habit/Input_Buttons";
import HabitInputValues from "../../habit/Input_Values";
import Axios from "@/Axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useCustomRouter } from "@/function/customRouter";

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
  const router = useCustomRouter();
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
        <Content>
          <Title>목표 습관 추가</Title>
          <HabitInputValues habitName={habitName} setHabitName={setHabitName} priority={priority} setPriority={setPriority} inputRef={inputRef} />
          <SubText>*최대 생성 가능 개수 : 18개, 이름 길이 제한 : 1~10</SubText>
        </Content>
        <HabitInputButtons onSubmit={addHabit} isLoading={addHabitMutation.isPending} />
      </Modal>
    </Wrapper>);
}
export default AddHabitModal;
const SubText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: salmon;

  font-size: 14px;
`
const Content = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 479px) { //mobile port
    justify-content: start;
    padding-top: 50%;
  }
`
const Wrapper = styled.div`
  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  animation: fadeIn 300ms ease-in-out;
  
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  /* background-color: rgba(0,0,0,0.2); */
  backdrop-filter: blur(4px);

  text-transform: uppercase;
  color: rgb(var(--greyTitle));
`

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);
  box-shadow: 0px 3px 48px rgba(0,0,0,0.25);

  @media (max-width: 479px) { //mobile port
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  @media (min-width:1024px) { //desktop
    min-width: 500px;
    width: 40%;
    height: 50%;
    border-radius: 24px;
  }
`

const Title = styled.span`
  width: 100%;
  height: 40px;

  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
`