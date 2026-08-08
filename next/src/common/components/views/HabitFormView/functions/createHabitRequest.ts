import { createHabit } from '@/common/actions/habit';
import { authAction } from '@/common/auth/authAction';
import type { HabitData } from '@/common/actions/habit';

type CreateHabitRequestParams = {
  name: string;
  priority: number;
};

export const createHabitRequest = async ({
  name,
  priority,
}: CreateHabitRequestParams): Promise<HabitData> =>
  authAction(() =>
    createHabit({
      habitName: name,
      priority,
    }),
  );
