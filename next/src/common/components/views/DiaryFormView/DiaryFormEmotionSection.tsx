import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { EmotionSelector } from '../../ui/EmotionSelector';
import { SectionTitle, SectionTitleIcon } from '../../ui/SectionTitle';
import { DiaryFormCard } from './DiaryFormCard';

interface DiaryFormEmotionSectionProps {
  emotion: number;
  setEmotion: (value: number) => void;
}

const DiaryFormEmotionSection = ({
  emotion,
  setEmotion,
}: DiaryFormEmotionSectionProps) => (
  <section className="flex w-full flex-col gap-3">
    <SectionTitle>
      <SectionTitleIcon><MdOutlineEmojiEmotions /></SectionTitleIcon>
      하루의 감정
    </SectionTitle>
    <DiaryFormCard>
      <div className="h-full w-full">
        <EmotionSelector value={emotion} onChange={setEmotion} />
      </div>
    </DiaryFormCard>
  </section>
);

export default DiaryFormEmotionSection;
