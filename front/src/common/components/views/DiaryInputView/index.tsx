"use client";

import { getDiaryById } from "@/common/fetchers/diary";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { notFound, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../ui/Modal";
import DiaryInputImages from "./DiaryInputImages";
import { DiaryInputSection } from "./DiaryInputSection";
import DiaryInputTextArea from "./DiaryInputTextarea";
import EmotionRadioSelector from "./EmotionRadioSelector";
import useSubmitDiary from './hooks/useSubmitDiary';

interface DiaryInputProps {
  isEdit: boolean;
  diaryId?: string | null;
  // diaryId?: any;
}
interface DiaryProps {
  id: string;
  date: Date; // 서버에서 오는 데이터는 Date 타입
  text: string;
  emotion: number;
  Images: Array<any>;
  diaryId: string | null;
  visible?: boolean;
}

// 'yyyy-MM-dd' string을 Date로 변환
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}
interface ServerImageProps {
  id: string;
  src: string;
}

const DiaryInputView = ({ isEdit, diaryId }: DiaryInputProps) => {

  const { addDiary, editDiary } = useSubmitDiary();
  const submitAction = isEdit ? editDiary : addDiary;
  const submitText = isEdit ? '수정' : '추가';

  const param = useSearchParams();


  const contentsRef = useRef<HTMLElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const { data: diaryData, isError } = useQuery<DiaryProps>({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById({ id: diaryId }),
    enabled: diaryId !== null && isEdit === true
  });

  //add에선 url 쿼리 파라미터로 edit에선 불러온 diary 데이터로 date 값을 가져온다.
  // 새 일기: URL에서 'yyyy-MM-dd' string 가져옴
  // 수정: diaryData.date (서버 Date) → string 변환
  const dateFromParam = param.get('date'); // 'yyyy-MM-dd' string
  const date: string = diaryData?.date 
    ? format(diaryData.date, 'yyyy-MM-dd') 
    : (dateFromParam || format(new Date(), 'yyyy-MM-dd'));
  
  // 헤더 타이틀용 Date (표시 목적)
  const dateForDisplay = diaryData?.date ?? parseLocalDate(date);
  const headerTitle = format(dateForDisplay, 'yyyy.M.dd (eee)');

  const [text, setText] = useState<string>(diaryData?.text ?? "");
  const [images, setImages] = useState<Array<string>>(diaryData?.Images?.map((e: ServerImageProps) => e.src) ?? []);
  const [emotion, setEmotion] = useState<number>(diaryData?.emotion ?? 2);

  const [emotionSectionToggle, setEmotionSectionToggle] = useState(true);
  const [contentSectionToggle, setContentSectionToggle] = useState(true);
  const [imageSectionToggle, setImageSectionToggle] = useState(true);


  //submit
  const onSubmit = () => {
    if (text.length !== 0) {
      if (isEdit && diaryId) submitAction.mutate({ text, images, diaryId, emotion })
      else submitAction.mutate({ date, text, images, emotion });
    }
    else enqueueSnackbar('내용을 입력해주세요', { variant: 'error' });
  };

  useEffect(() => {
    if (isError) notFound();
  }, [isError])


  return (
    <Modal>
      <Modal.Header headerTitleText={headerTitle} headerConfirmText={submitText} onConfirm={onSubmit} />
      <DiaryInputContent>
        <DiaryInputSection sectorTitle="emotion" visibleToggle={emotionSectionToggle} setVisibleToggle={setEmotionSectionToggle}>
          <EmotionRadioSelectors>
            <EmotionRadioSelector emotion={emotion} setEmotion={setEmotion} />
          </EmotionRadioSelectors>
        </DiaryInputSection>
        <DiaryInputSection sectorTitle="contents" visibleToggle={contentSectionToggle} setVisibleToggle={setContentSectionToggle}>
          <DiaryInputTextarea>
            <DiaryInputTextArea text={text} setText={setText} contentsRef={contentsRef} />
          </DiaryInputTextarea>
        </DiaryInputSection>
        <DiaryInputSection sectorTitle="images" visibleToggle={imageSectionToggle} setVisibleToggle={setImageSectionToggle}>
          <DiaryInputImagesWrapper>
            <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={submitAction.isPending} />
          </DiaryInputImagesWrapper>
        </DiaryInputSection>
      </DiaryInputContent>
    </Modal>
  );
}

export default DiaryInputView;

const DiaryInputContent = styled(Modal.Content)`
  gap: 42px;
`
const EmotionRadioSelectors = styled.div`
  width: 100%;
  height: 100%;
`;
const DiaryInputTextarea = styled.div`
  width: 100%;
  height: 220px;
`;
const DiaryInputImagesWrapper = styled.div`
  width: 100%;
  height: 120px;
`;