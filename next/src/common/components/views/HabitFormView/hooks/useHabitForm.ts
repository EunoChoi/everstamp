import { HABIT_PRIORITY_MIN } from '@/common/constants/habit';
import { useState } from 'react';

export const useHabitForm = () => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(HABIT_PRIORITY_MIN);

  return {
    name,
    setName,
    priority,
    setPriority,
  };
};
