'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import HabitInputButtons from "../../habit/Input_Buttons";
import HabitInputValues from "../../habit/Input_Values";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "@/Axios/axios";

import { enqueueSnackbar } from 'notistack';

import { getHabit } from "@/function/fetch/habit";
import React from "react";
import { useCustomRouter } from "@/function/customRouter";
import HabitInputLayout from "@/component/habit/Input_Layout";

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
  const router = useCustomRouter();

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

  const editHabit = () => {
    if (habitName.length > 0 && habitName.length <= 10) editHabitMutation.mutate({ habitId, habitName, priority });
    else enqueueSnackbar('1~10글자의 이름을 입력해주세요.', { variant: 'info' });
  };

  return (
    <HabitInputLayout
      habitName={habitName}
      setHabitName={setHabitName}
      priority={priority}
      setPriority={setPriority}
      typeText='수정'
      onSubmit={editHabit}
      isLoading={editHabitMutation.isPending}
    />);
}
export default EditHabitModal;