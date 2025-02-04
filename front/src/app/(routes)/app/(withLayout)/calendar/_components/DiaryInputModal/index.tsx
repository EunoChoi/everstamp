"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import DiaryInputTextArea from "./TextArea";

import { enqueueSnackbar } from "notistack";
import DiaryInputEmotion from "./EmotionRadioSelector";

import $Common from "@/common/styles/common";
import $Modal from "@/common/styles/common_modal";


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DiaryDate from "@/common/components/ui/DiaryDate";
import { getDiaryById } from "@/common/fetchers/diary";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import DiaryInputImages from "./Images";
import useSubmitDiary from './utils/useSubmitDiary';

interface DiaryInputProps {
  isEdit: boolean;
  diaryId?: string | null;
  // diaryId?: any;
}
interface DiaryProps {
  id: string;
  date: Date;
  text: string;
  emotion: number;
  Images: Array<any>;
  diaryId: string | null;
  visible?: boolean;
}
interface ServerImageProps {
  id: string;
  src: string;
}

const DiaryInputModal = ({ isEdit, diaryId }: DiaryInputProps) => {

  const { addDiary, editDiary } = useSubmitDiary();
  const submitAction = isEdit ? editDiary : addDiary;
  const submitText = isEdit ? '수정' : '추가';

  const router = useCustomRouter();
  const param = useSearchParams();


  const contentsRef = useRef<HTMLElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const { data: diaryData, isError } = useQuery<DiaryProps>({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById({ id: diaryId }),
    enabled: diaryId !== null && isEdit === true
  });

  //add에선 url 쿼리 파라미터로 edit에선 불러온 diary 데이터로 date 값을 가져오다.
  const date = diaryData?.date ?? new Date(Number(param.get('date')));

  const [text, setText] = useState<string>(diaryData?.text ?? "");
  const [images, setImages] = useState<Array<string>>(diaryData?.Images?.map((e: ServerImageProps) => e.src) ?? []);
  const [emotion, setEmotion] = useState<number>(diaryData?.emotion ?? 2);

  const [emotionOpen, setEmotionOpen] = useState(true);
  const [contentsOpen, setContentsOpen] = useState(true);
  const [imagesOpen, setImagesOpen] = useState(true);


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
    <$Modal.Background onClick={() => router.back()}>
      <$Modal.Wrapper onClick={(e) => e.stopPropagation()}>
        <$Modal.Top>
          <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
          <DiaryDate date={date} />
          <button onClick={onSubmit} disabled={submitAction.isPending}>{submitText}</button>
        </$Modal.Top>
        <$Common.Empty />
        <DiaryInputSection>
          <DiaryInputTitle>
            <span>emotion</span>
            <button onClick={() => { setEmotionOpen(c => !c) }}>
              {emotionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </DiaryInputTitle>
          {emotionOpen &&
            <DiaryInputEmotions>
              <DiaryInputEmotion emotion={emotion} setEmotion={setEmotion} />
            </DiaryInputEmotions>
          }
        </DiaryInputSection>
        <DiaryInputSection ref={contentsRef}>
          <DiaryInputTitle>
            <span>contents</span>
            <button onClick={() => { setContentsOpen(c => !c) }}>
              {contentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </DiaryInputTitle>
          {contentsOpen &&
            <DiaryInputTextarea>
              <DiaryInputTextArea text={text} setText={setText} contentsRef={contentsRef} />
            </DiaryInputTextarea>
          }
        </DiaryInputSection>
        <DiaryInputSection>
          <DiaryInputTitle>
            <span>images</span>
            <button onClick={() => { setImagesOpen(c => !c) }}>
              {imagesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </DiaryInputTitle>
          {imagesOpen &&
            <DiaryInputImagesWrapper>
              <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={submitAction.isPending} />
            </DiaryInputImagesWrapper>
          }
        </DiaryInputSection>
        <$Common.Empty />
      </$Modal.Wrapper>
    </$Modal.Background>
  );
}

export default DiaryInputModal;

const DiaryInputSection = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 18px 5vw;
  flex-shrink: 0;
`;
const DiaryInputTitle = styled.section`
  text-transform: capitalize;
  font-size: 22px;
  /* font-weight: 500; */
  color: rgb(var(--greyTitle));
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DiaryInputEmotions = styled.div`
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

  overflow: hidden;
`;