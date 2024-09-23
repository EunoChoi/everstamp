"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import Axios from "@/Axios/axios";

import InputDiaryLayout from "../../diaryInput/Input_Layout";
import DiaryInputTextArea from "../../diaryInput/Input_TextArea";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import DiaryInputEmotion from "../../diaryInput/Input_Emotion";
import { useCustomRouter } from "@/function/customRouter";
import DiaryInputImages from "@/component/diaryInput/Input_Images";



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


  const textarea = <DiaryInputTextArea text={text} setText={setText} inputRef={inputRef} />;
  const emotionSelector = <DiaryInputEmotion emotion={emotion} setEmotion={setEmotion} />
  const inputImages = <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={addDiaryMutation.isPending} />

  return (
    <InputDiaryLayout
      typeText='추가'
      isLoading={addDiaryMutation.isPending}
      date={date}
      textarea={textarea}
      emotionSelector={emotionSelector}
      inputImages={inputImages}
      onSubmit={onAddDiary} />);
}

export default AddDiaryModal;