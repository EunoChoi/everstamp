'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import HabitInputButtons from "../HabitInput/Input_Buttons";
import HabitInputValues from "../HabitInput/Input_Values";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "@/Aixos/aixos";

import { SnackbarKey, closeSnackbar, enqueueSnackbar } from 'notistack';

import { getHabit } from "@/app/(afterLogin)/_lib/habit";
import SC_Common from "@/style/common";

interface Props {
  habitId: string;
}
interface HabitProps {
  habitId: string | null;
  habitName?: string;
  // themeColor?: string;
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
  const deleteHabitMutation = useMutation({
    mutationFn: async ({ habitId }: HabitProps) => await Axios.delete(`habit?habitId=${habitId}`),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });


      router.back();
      console.log('delete habit success');
      setTimeout(() => {
        closeSnackbar('deleteHabit');
        enqueueSnackbar('습관 항목 삭제 완료', { variant: 'success' });
      }, 300);
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('delete habit error');
    },
  });


  const onEditHabit = () => {
    if (habitName.length > 0 && habitName.length <= 10) editHabitMutation.mutate({ habitId, habitName, priority });
    else enqueueSnackbar('1~10글자의 이름을 입력해주세요.', { variant: 'info' });
  };
  const onDeleteHabit = () => {
    const action = (snackbarId: SnackbarKey) => (
      <>
        <SC_Common.YesOrNo className="no" onClick={() => { closeSnackbar('deleteHabit'); }}>
          No
        </SC_Common.YesOrNo>
        <SC_Common.YesOrNo className="yes" onClick={() => { deleteHabitMutation.mutate({ habitId, priority }); }}>
          Yes
        </SC_Common.YesOrNo>
      </>
    );
    enqueueSnackbar(`습관 항목(${habitData.name})을 지우시겠습니까?`, { key: 'deleteHabit', persist: true, action, autoHideDuration: 6000 });
  }

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, [])

  return (
    <Wrapper onClick={() => router.back()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Edit Habit</Title>
        <HabitInputValues habitName={habitName} setHabitName={setHabitName} priority={priority} setPriority={setPriority} inputRef={inputRef} />
        <Delete><button onClick={onDeleteHabit}>delete</button></Delete>
        <HabitInputButtons onSubmit={onEditHabit} type="edit" />
      </Modal>
    </Wrapper>);
}
export default EditHabitModal;

const Delete = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  button{
    font-size: 18px;
    /* color:  grey; */
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'} !important;
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
  justify-content: center;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  padding-top: 12px;
  padding-bottom: calc(var(--mobileNav) + 12px);

  width: 100dvw;
  height: 100dvh;

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
