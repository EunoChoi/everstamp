"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import { useRef } from "react";
import Axios from "@/Aixos/aixos";
//function
import { getCurrentUserEmail } from "@/function/getCurrentUserEmail";


//icon
import DiaryInputDate from "../diaryInput/Input_Date";
import DiaryInputTextArea from "../diaryInput/Input_TextArea";
import DiaryInputUploadedImage from "../diaryInput/Input_UploadedImage";
import DiaryInputButtons from "../diaryInput/Input_Buttons";

// import { addDiary } from "@/app/(afterLogin)/_lib/diary";



const AddDiaryModal = () => {

  const param = useSearchParams();
  const date = new Date(Number(param.get('date')));

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const email = getCurrentUserEmail();
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);


  const onAddDiary = () => {
    if (text.length !== 0) {
      // addDiary({ date, text, images });
    }
    else alert('일기 내용을 입력해주세요');
  };
  const historyBack = useCallback(() => {
    history.back();
  }, []);


  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <Wrapper onClick={historyBack}>
      <Modal onClick={(e) => e.stopPropagation()}>
        ㆀㆀㆀㅇ
        <DiaryInputDate date={date} />
        <DiaryInputTextArea text={text} setText={setText} inputRef={inputRef} />
        <DiaryInputUploadedImage images={images} setImages={setImages} />
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
