'use client';

import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import HabitInputButtons from "../HabitInput/Input_Buttons";
import HabitInputValues from "../HabitInput/Input_Values";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "@/Aixos/aixos";

import { getHabit } from "@/app/(afterLogin)/_lib/habit";

interface HabitProps {
  habitId: string | null;
  habitName?: string;
  themeColor?: string;
}
interface Err {
  response: {
    data: string;
  }
}

const EditHabitModal = () => {
  const queryClient = useQueryClient();

  const params = useSearchParams();
  const habitId = params.get('id');
  const [habitName, setHabitName] = useState<string>('');
  const [themeColor, setThemeColor] = useState<string>('default');



  const { data: habitData } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabit({ id: habitId }),
    enabled: habitId !== null
  });

  const editHabitMutation = useMutation({
    mutationFn: ({ habitId, habitName, themeColor }: HabitProps) => Axios.patch('/habit', { habitId, habitName, themeColor }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      console.log('edit habit success');
      historyBack();
    },
    onError: (e: Err) => {
      alert(e?.response?.data);
      console.log('edit habit error');
    },
  });
  const deleteHabitMutation = useMutation({
    mutationFn: async ({ habitId }: HabitProps) => await Axios.delete(`habit?habitId=${habitId}`),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      console.log('delete habit success');
      historyBack();
    },
    onError: (e: Err) => {
      alert(e?.response?.data);
      console.log('delete habit error');
    },
  });


  const onEditHabit = () => {
    if (habitName.length <= 10) editHabitMutation.mutate({ habitId, habitName, themeColor });
    else alert('최대 10글자까지만 가능합니다.')
  };
  const onDeleteHabit = () => {
    const res = confirm('일기를 지우시겠습니까?');
    if (res) deleteHabitMutation.mutate({ habitId });
  }
  const historyBack = useCallback(() => {
    history.back();
  }, []);


  useEffect(() => {
    setHabitName(habitData?.name);
    setThemeColor(habitData?.themeColor);
  }, [habitData]);


  return (
    <Wrapper onClick={() => historyBack()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Edit Habit</Title>
        <HabitInputValues habitName={habitName} setHabitName={setHabitName} />
        <Delete onClick={onDeleteHabit}><button>delete</button></Delete>
        <HabitInputButtons
          onSubmit={onEditHabit} type="edit" />
      </Modal>
    </Wrapper>);
}
export default EditHabitModal;

const Delete = styled.div`
  display: flex;
  justify-content: center;
  button{
    font-size: 18px;
    color: salmon;
  }
`

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
  justify-content: space-evenly;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  padding-top: 12px;
  padding-bottom: calc(var(--mobileNav) + 12px);

  @media (max-width: 479px) { //mobile port
    width: 90%;
    height: 40%;
    min-height: 400px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    min-width: 400px;
    width: 50%;
    height: 90%;
    max-height: 400px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    min-width: 500px;
    width: 40%;
    height: 50%;
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