import { HABIT_PRIORITY_VALUES } from '@/common/constants/habit';
import { cn } from '@/common/utils/cn';
import { StarRating } from '../../ui/StarRating';

const PRIORITY_LABELS = ['낮음', '보통', '높음'] as const;

interface HabitFormPrioritySelectorProps {
  priority: number;
  setPriority: (value: number) => void;
}

const HabitFormPrioritySelector = ({
  priority,
  setPriority,
}: HabitFormPrioritySelectorProps) => (
  <div className="flex w-full gap-3">
    {HABIT_PRIORITY_VALUES.map((value) => {
      const isSelected = value === priority;

      return (
        <label
          key={value}
          className={cn(
            'flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-theme px-2 py-3 transition-colors duration-200',
            isSelected ? 'bg-theme-accent' : 'bg-theme-bg',
          )}
        >
          <input
            checked={isSelected}
            className="pointer-events-none absolute opacity-0"
            name="priority"
            onChange={() => setPriority(value)}
            type="radio"
            value={value}
          />
          <div className="flex items-center justify-center text-base">
            <StarRating
              rating={value + 1}
              className={isSelected ? 'text-theme-text-on-accent' : undefined}
            />
          </div>
          <span className={cn(
            'text-base font-medium',
            isSelected ? 'text-theme-text-on-accent' : 'text-theme-text-primary',
          )}>
            {PRIORITY_LABELS[value]}
          </span>
        </label>
      );
    })}
  </div>
);

export default HabitFormPrioritySelector;
