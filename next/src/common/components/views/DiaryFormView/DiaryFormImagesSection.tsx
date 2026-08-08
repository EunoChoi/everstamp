import type { ChangeEvent } from 'react';
import { MdOutlineImage } from 'react-icons/md';
import { SectionTitle, SectionTitleIcon } from '../../ui/SectionTitle';
import DiaryFormImages from './DiaryFormImages';
import type { DiaryImageDraft } from './types';

interface DiaryFormImagesSectionProps {
  diaryImages: DiaryImageDraft[];
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getImageUrl: (image: DiaryImageDraft) => string;
  handleRemoveImage: (index: number) => void;
  isLoading: boolean;
}

const DiaryFormImagesSection = ({
  diaryImages,
  handleImageChange,
  getImageUrl,
  handleRemoveImage,
  isLoading,
}: DiaryFormImagesSectionProps) => (
  <section className="flex w-full flex-col gap-3">
    <SectionTitle>
      <SectionTitleIcon><MdOutlineImage /></SectionTitleIcon>
      사진
    </SectionTitle>
    <DiaryFormImages
      diaryImages={diaryImages}
      handleImageChange={handleImageChange}
      getImageUrl={getImageUrl}
      handleRemoveImage={handleRemoveImage}
      isLoading={isLoading}
    />
  </section>
);

export default DiaryFormImagesSection;
