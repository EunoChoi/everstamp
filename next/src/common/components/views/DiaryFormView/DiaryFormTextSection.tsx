import { MdOutlineEditNote } from 'react-icons/md';
import { SectionTitle, SectionTitleIcon } from '../../ui/SectionTitle';
import { DiaryFormCard } from './DiaryFormCard';
import DiaryFormTextarea from './DiaryFormTextarea';

interface DiaryFormTextSectionProps {
  text: string;
  setText: (value: string) => void;
}

const DiaryFormTextSection = ({ text, setText }: DiaryFormTextSectionProps) => (
  <section className="flex w-full flex-col gap-3">
    <SectionTitle>
      <SectionTitleIcon><MdOutlineEditNote /></SectionTitleIcon>
      하루의 기록
    </SectionTitle>
    <DiaryFormCard>
      <div className="h-[220px] w-full">
        <DiaryFormTextarea text={text} setText={setText} />
      </div>
    </DiaryFormCard>
  </section>
);

export default DiaryFormTextSection;
