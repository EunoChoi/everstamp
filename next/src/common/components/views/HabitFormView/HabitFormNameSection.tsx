import { MdCheckBox } from 'react-icons/md';
import { SectionTitle, SectionTitleIcon } from '../../ui/SectionTitle';
import { HabitFormCard } from './HabitFormCard';
import HabitFormNameInput from './HabitFormNameInput';

interface HabitFormNameSectionProps {
  name: string;
  setName: (value: string) => void;
}

const HabitFormNameSection = ({
  name,
  setName,
}: HabitFormNameSectionProps) => (
  <section className="flex w-full flex-col gap-3">
    <SectionTitle>
      <SectionTitleIcon><MdCheckBox /></SectionTitleIcon>
      습관 이름
    </SectionTitle>
    <HabitFormCard>
      <HabitFormNameInput name={name} setName={setName} />
    </HabitFormCard>
  </section>
);

export default HabitFormNameSection;
