'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useRef } from "react";
import Axios from "@/Axios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


//function
import { getDiary } from "@/app/(afterLogin)/_lib/diary";


//icon
import DiaryInputDate from "../diaryInput/Input_Date";
import DiaryInputTextArea from "../diaryInput/Input_TextArea";
import DiaryInputButtons from "../diaryInput/Input_Buttons";
import { enqueueSnackbar } from "notistack";
import DiaryInputEmotion from "../diaryInput/Input_Emotion";

interface Err {
  response: {
    data: string;
  }
}

interface ServerImageProps {
  id: string;
  src: string;
}
interface EditDiaryProps {
  diaryId: string | null;
  text: string;
  images: string[];
  emotion: number;
}

interface DiaryProps {
  id: string;
  date: Date;
  text: string;
  emotion: number;
  Images: Array<any>;
  diaryId: string | null;
}


const EditDiaryModal = ({ diaryId }: { diaryId: string | null }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: diaryData } = useQuery<DiaryProps>({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiary({ id: diaryId }),
    enabled: diaryId !== null
  });

  const [text, setText] = useState<string>(diaryData?.text ? diaryData?.text : "");
  const [images, setImages] = useState<Array<string>>(diaryData?.Images ? diaryData.Images?.map((e: ServerImageProps) => e.src) : []);
  const [emotion, setEmotion] = useState<number>(diaryData?.emotion ? diaryData.emotion : 0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const onEditDiary = () => {
    editDiaryMutation.mutate({ text, images, diaryId, emotion })
  };


  const editDiaryMutation = useMutation({
    mutationFn: ({ text, images, diaryId, emotion }: EditDiaryProps) => Axios.patch(`/diary?diaryId=${diaryId}`, { text, images, emotion }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      console.log('success edit diary');
      router.back();
      setTimeout(() => {
        enqueueSnackbar('일기 수정 완료', { variant: 'success' });
      }, 300);
    },
    onError: (e: Err) => {
      // alert(e?.response?.data);
      enqueueSnackbar(e?.response?.data, { variant: 'error' });

      console.log('edit diary error');
    },
  });


  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <Wrapper onClick={() => router.back()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <DiaryInputDate date={diaryData?.date} />
        <DiaryInputEmotion emotion={emotion} setEmotion={setEmotion} />
        <DiaryInputTextArea text={text} setText={setText} inputRef={inputRef}></DiaryInputTextArea>

        <DiaryInputButtons imageUploadRef={imageUploadRef} submitDiary={onEditDiary} images={images} setImages={setImages} type={'edit'} />
      </Modal>
    </Wrapper>);
}

export default EditDiaryModal;

const Wrapper = styled.div`
  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  animation: fadeIn 300ms ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  /* background-color: rgba(0,0,0,0.2); */
  backdrop-filter: blur(4px);

  text-transform: uppercase;
  color: rgb(var(--greyTitle));
`

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.25);

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
  @media (min-width:1024px) { //desktop
    width: 50%;
    height: 70%;
    border-radius: 24px;
  }
`