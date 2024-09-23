"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import Axios from "@/Axios/axios";

import DiaryInputTextArea from "../../diaryInput/Input_TextArea";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import DiaryInputEmotion from "../../diaryInput/Input_Emotion";
import { useCustomRouter } from "@/function/customRouter";
import DiaryInputImages from "@/component/diaryInput/Input_Images";
import $Modal from "@/style/common_modal";
import DiaryInputDate from "@/component/diaryInput/Input_Date";
import $Common from "@/style/common";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


interface Err {
  response: {
    data: string;
  }
}

interface AddDiaryProps {
  date: Date;
  text: string;
  images: string[];
  emotion: number;
}

const AddDiaryModal = () => {
  const queryClient = useQueryClient();
  const router = useCustomRouter();
  const param = useSearchParams();
  const date = new Date(Number(param.get('date')));

  const imageUploadRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);
  const [emotion, setEmotion] = useState<number>(2);

  const [emotionOpen, setEmotionOpen] = useState(true);
  const [contentsOpen, setContentsOpen] = useState(true);
  const [imagesOpen, setImagesOpen] = useState(true);


  const addDiaryMutation = useMutation({
    mutationFn: ({ date, text, images, emotion }: AddDiaryProps) => Axios.post('/diary', { date, text, images, emotion }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      console.log('add diary success');
      router.back();
      setTimeout(() => {
        enqueueSnackbar('일기 작성 완료', { variant: 'success' });
      }, 300);
    },
    onError: (e: Err) => {
      //alert(e?.response?.data);
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('add diary error');
    }
  });

  const onAddDiary = () => {
    if (text.length !== 0) addDiaryMutation.mutate({ date, text, images, emotion });
    //else alert('내용을 입력해주세요');
    else enqueueSnackbar('내용을 입력해주세요', { variant: 'error' });
  };


  return (
    <$Modal.Background onClick={() => router.back()}>
      <$Modal.Wrapper onClick={(e) => e.stopPropagation()}>
        <$Modal.Top>
          <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
          <DiaryInputDate date={date} />
          <button onClick={onAddDiary} disabled={addDiaryMutation.isPending}>추가</button>
        </$Modal.Top>


        <$Common.Empty />
        <$Modal.DiaryInputSection>
          <$Modal.DiaryInputTitle>
            <span>emotion</span>
            <button onClick={() => { setEmotionOpen(c => !c) }}>
              {emotionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </$Modal.DiaryInputTitle>
          {emotionOpen && <DiaryInputEmotion emotion={emotion} setEmotion={setEmotion} />}
        </$Modal.DiaryInputSection>
        <$Modal.DiaryInputSection>
          <$Modal.DiaryInputTitle>
            <span>contents</span>
            <button onClick={() => { setContentsOpen(c => !c) }}>
              {contentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </$Modal.DiaryInputTitle>
          {contentsOpen &&
            <$Modal.DiaryInputTextarea>
              <DiaryInputTextArea text={text} setText={setText} />
            </$Modal.DiaryInputTextarea>
          }
        </$Modal.DiaryInputSection>
        <$Modal.DiaryInputSection>
          <$Modal.DiaryInputTitle>
            <span>images</span>
            <button onClick={() => { setImagesOpen(c => !c) }}>
              {imagesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </$Modal.DiaryInputTitle>
          {imagesOpen &&
            <$Modal.DiaryInputImages>
              <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={addDiaryMutation.isPending} />
            </$Modal.DiaryInputImages>
          }
        </$Modal.DiaryInputSection>
        <$Common.Empty />
      </$Modal.Wrapper>
    </$Modal.Background>
  );
}

export default AddDiaryModal;