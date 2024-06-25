'use client';

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import { useRef } from "react";
import Axios from "@/Aixos/aixos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


//function
import { getDiary } from "@/app/(afterLogin)/_lib/diary";


//icon
import DiaryInputDate from "../diaryInput/Input_Date";
import DiaryInputTextArea from "../diaryInput/Input_TextArea";
import DiaryInputUploadedImage from "../diaryInput/Input_UploadedImage";
import DiaryInputButtons from "../diaryInput/Input_Buttons";

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
}


const EditDiaryModal = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const diaryId = params.get('id');

  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);



  const onEditDiary = () => {
    editDiaryMutation.mutate({ text, images, diaryId })
  };
  const historyBack = useCallback(() => {
    history.back();
  }, []);




  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiary({ id: diaryId }),
    enabled: diaryId !== null
  });

  const editDiaryMutation = useMutation({
    mutationFn: ({ text, images, diaryId }: EditDiaryProps) => Axios.patch(`/diary?diaryId=${diaryId}`, { text, images }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      console.log('success edit diary');
      historyBack();
    },
    onError: (e: Err) => {
      alert(e?.response?.data);
      console.log('edit diary error');
    },
  });


  useEffect(() => {
    if (diaryData) {
      const tempImages = diaryData.Images?.map((e: ServerImageProps) => e.src);
      setImages(tempImages);
      setText(diaryData.text);
    }
  }, [diaryData])
  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <Wrapper onClick={historyBack}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <DiaryInputDate date={diaryData?.date} />
        <DiaryInputTextArea text={text} setText={setText} inputRef={inputRef}></DiaryInputTextArea>
        <DiaryInputUploadedImage images={images} setImages={setImages} />
        <DiaryInputButtons imageUploadRef={imageUploadRef} submitDiary={onEditDiary} images={images} setImages={setImages} type={'edit'} />
      </Modal>
    </Wrapper>);
}

export default EditDiaryModal;

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