'use client';

import { getHabits } from '@/common/fetchers/habit';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';




import { Modal } from '@/common/components/ui/Modal';
import { useCurrentUserEmail } from '@/common/hooks/useCurrentUserEmail';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { Habit } from './_types';
import { HabitList } from './HabitList';



export const HabitOrderView = () => {
  const router = useRouter();
  const { currentUserEmail } = useCurrentUserEmail();

  //get custom habits order by localstorage
  const [customOrder] = useState<number[]>(() => {
    const localData = localStorage.getItem(currentUserEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['habitCustomOrder'] ? jsonLocalData['habitCustomOrder'] : [];
    }
    else return [];
  });
  //custom habits data load
  const { data: customHabits } = useQuery({
    queryKey: ['habits', 'list', 'CUSTOM'],
    queryFn: () => getHabits({ sort: 'CUSTOM', customOrder }),
  });
  const [tempHabits, setTempHabits] = useState<Habit[]>([]);


  useEffect(() => {
    if (customHabits) {
      setTempHabits(customHabits);
    }
  }, [customHabits]);

  const onInitialize = () => {
    if (customHabits) {
      setTempHabits(customHabits);
    }
  };
  const onSubmit = () => {
    let localData = localStorage.getItem(currentUserEmail)
    let jsonLocalData;
    if (localData) {
      jsonLocalData = JSON.parse(localData);
    }
    try {
      localStorage.setItem(currentUserEmail, JSON.stringify({
        ...jsonLocalData,
        habitCustomOrder: tempHabits.map(e => e.id)
      }));
      router.back();
      setTimeout(() => {
        enqueueSnackbar('변경 완료', { variant: 'success' });
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal>
      <Modal.Header headerTitleText='습관 순서 설정' onConfirm={onSubmit} />
      <Modal.Content>
        <HabitList tempHabits={tempHabits} setTempHabits={setTempHabits} />
      </Modal.Content>
      <Modal.Footer>
        <InitButton onClick={onInitialize}>변경사항 취소</InitButton>
      </Modal.Footer>
    </Modal>);
}

const InitButton = styled.button`
  text-transform: capitalize;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  font-size: 16px;
`