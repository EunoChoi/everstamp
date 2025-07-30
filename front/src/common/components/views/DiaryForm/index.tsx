"use client";

import { ExistingImage, ImageState } from "@/common/types/image";
import { DiaryWithRelations } from "@/server/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../ui/Modal";
import EmotionForm from "./EmotionForm";
import { useDiarySubmit } from "./hooks/useDiarySubmit";
import ImageForm from "./ImageForm";
import TextForm from "./TextForm";

interface DiaryFormProps {
  selectedDate: string;
  initialData?: DiaryWithRelations | null;
}

const DiaryForm = ({ selectedDate, initialData }: DiaryFormProps) => {
  const submitText = initialData ? '수정' : '추가';
  const headerTitle = format(new Date(selectedDate), 'yyyy.M.dd (eee)');


  //open toggles
  const [emotionSectionToggle, setEmotionSectionToggle] = useState(true);
  const [contentSectionToggle, setContentSectionToggle] = useState(true);
  const [imageSectionToggle, setImageSectionToggle] = useState(true);

  //temp input value state
  const [text, setText] = useState<string>('');
  const [emotion, setEmotion] = useState<number>(-1);
  const [images, setImages] = useState<ImageState[]>([]);
  const [initialImageUrls, setInitialImageUrls] = useState<string[]>([]);

  const { isLoading, onSubmit } = useDiarySubmit({
    initialImageUrls,
    images,
    emotion,
    text,
    selectedDate,
  });



  //초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setText(initialData.text);
      setEmotion(initialData.emotion);
      //서버에서 불러온 이미지 구분 위해 type 속성을 추가
      const initialImages: ExistingImage[] = initialData.images.map(img => ({
        type: 'existing', url: img.src, id: img.id,
      }));
      setImages(initialImages);
      setInitialImageUrls(initialData.images.map(img => img.src));
    }
  }, [initialData]);


  return (
    <Modal>
      <Modal.Header headerTitleText={headerTitle} headerConfirmText={submitText} onConfirm={onSubmit} />
      <DiaryFormContent>
        <EmotionForm emotion={emotion} setEmotion={setEmotion} />
        <TextForm text={text} setText={setText} />
        <ImageForm images={images} setImages={setImages} />
      </DiaryFormContent>
    </Modal>
  );
}

export default DiaryForm;

const DiaryFormContent = styled(Modal.Content)`
  gap: 42px;
`