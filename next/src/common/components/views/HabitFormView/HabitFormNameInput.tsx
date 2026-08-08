import { HABIT_NAME_MAX_LENGTH } from '@/common/constants/habit';

interface HabitFormNameInputProps {
  name: string;
  setName: (value: string) => void;
}

const HabitFormNameInput = ({
  name,
  setName,
}: HabitFormNameInputProps) => (
  <div className="w-full">
    <input
      className="w-full text-base"
      maxLength={HABIT_NAME_MAX_LENGTH}
      onChange={(event) => setName(event.currentTarget.value)}
      placeholder="습관 이름을 입력하세요"
      value={name}
    />
  </div>
);

export default HabitFormNameInput;
