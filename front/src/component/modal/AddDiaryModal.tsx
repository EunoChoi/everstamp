"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { useRef } from "react";
import Axios from "@/Aixos/aixos";


//icon
import DiaryInputDate from "../diaryInput/Input_Date";
import DiaryInputTextArea from "../diaryInput/Input_TextArea";
import DiaryInputButtons from "../diaryInput/Input_Buttons";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import DiaryInputEmotion from "../diaryInput/Input_Emotion";


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
  const router = useRouter();
  const param = useSearchParams();
  const date = new Date(Number(param.get('date')));

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);
  const [emotion, setEmotion] = useState<number>(2);


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


  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <Wrapper onClick={() => { router.back(); }}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <DiaryInputDate date={date} />
        <DiaryInputEmotion emotion={emotion} setEmotion={setEmotion} />
        <DiaryInputTextArea text={text} setText={setText} inputRef={inputRef} />
        <DiaryInputButtons imageUploadRef={imageUploadRef} submitDiary={onAddDiary} images={images} setImages={setImages} />
      </Modal>
    </Wrapper>);
}

export default AddDiaryModal;

const Wrapper = styled.div`
  transition: all ease-in-out 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);

  text-transform: uppercase;
  color: rgb(var(--greyTitle));
`

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  @media (max-width: 479px) { //mobile port
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: 50%;
    height: 70%;
  }
`
