import { updateHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import type { HabitData } from '@/common/actions/habit';

type UpdateHabitRequestParams = {
  habitId: string;
  name: string;
  priority: number;
};

export const updateHabitRequest = async ({
  habitId,
  name,
  priority,
}: UpdateHabitRequestParams): Promise<HabitData> =>
  authAction(() =>
    updateHabit({
      habitId,
      habitName: name,
      priority,
    }),
  );
