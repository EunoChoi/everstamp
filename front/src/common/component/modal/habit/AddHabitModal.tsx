'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import HabitInputButtons from "../../habit/Input_Buttons";
import HabitInputValues from "../../habit/Input_Values";
import Axios from "@/Axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useCustomRouter } from "@/common/function/customRouter";
import HabitInputLayout from "../../habit/Input_Layout";

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

  return (
    <HabitInputLayout
      habitName={habitName}
      setHabitName={setHabitName}
      priority={priority}
      setPriority={setPriority}
      typeText='추가'
      onSubmit={addHabit}
      isLoading={addHabitMutation.isPending}
    />);
}
export default AddHabitModal;