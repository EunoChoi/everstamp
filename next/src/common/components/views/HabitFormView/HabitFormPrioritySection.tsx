import { MdOutlineStar } from 'react-icons/md';
import { SectionTitle, SectionTitleIcon } from '../../ui/SectionTitle';
import { HabitFormCard } from './HabitFormCard';
import HabitFormPrioritySelector from './HabitFormPrioritySelector';

interface HabitFormPrioritySectionProps {
  priority: number;
  setPriority: (value: number) => void;
}

const HabitFormPrioritySection = ({
  priority,
  setPriority,
}: HabitFormPrioritySectionProps) => (
  <section className="flex w-full flex-col gap-3">
    <SectionTitle>
      <SectionTitleIcon><MdOutlineStar /></SectionTitleIcon>
      우선순위
    </SectionTitle>
    <HabitFormCard>
      <HabitFormPrioritySelector
        priority={priority}
        setPriority={setPriority}
      />
    </HabitFormCard>
  </section>
);

export default HabitFormPrioritySection;
