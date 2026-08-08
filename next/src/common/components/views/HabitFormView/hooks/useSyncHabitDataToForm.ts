import { HABIT_PRIORITY_MIN } from '@/common/constants/habit';
import type { HabitData } from '@/common/actions/habit';
import { useEffect, useRef, useState } from 'react';

type UseSyncHabitDataToFormParams = {
  enabled: boolean;
  habitData: HabitData | undefined;
  setName: (value: string) => void;
  setPriority: (value: number) => void;
};

export const useSyncHabitDataToForm = ({
  enabled,
  habitData,
  setName,
  setPriority,
}: UseSyncHabitDataToFormParams) => {
  const initializedHabitIdRef = useRef<number | null>(null);
  const [initializedHabitId, setInitializedHabitId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!enabled || !habitData) return;
    if (initializedHabitIdRef.current === habitData.id) return;

    setName(habitData.name ?? '');
    setPriority(habitData.priority ?? HABIT_PRIORITY_MIN);
    initializedHabitIdRef.current = habitData.id;
    setInitializedHabitId(habitData.id);
  }, [enabled, habitData, setName, setPriority]);

  return !enabled || initializedHabitId === habitData?.id;
};
