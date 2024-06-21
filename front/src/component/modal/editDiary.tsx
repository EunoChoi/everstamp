'use client';

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import { useRef } from "react";
import { ChangeEvent } from "react";
import Axios from "@/Aixos/aixos";
import { format } from 'date-fns';
import { useQuery } from "@tanstack/react-query";


//function
import { getDiaryById } from "@/app/(afterLogin)/_lib/getDiaryById";


//icon
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import DiaryInputDate from "./diary/DiaryInput_Date";
import DiaryInputTextArea from "./diary/DiaryInput_TextArea";
import DiaryInputUploadedImage from "./diary/\bDiaryInput_UploadedImage";
import DiaryInputButtons from "./diary/DiaryInput_Buttons";



interface ServerImageProps {
  id: string;
  src: string;
}


const EditDiary = () => {

  const params = useSearchParams();
  const diaryId = params.get('id');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);


  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById(diaryId),
    enabled: diaryId !== null
  });


  const [text, setText] = useState<string>(diaryData?.text);
  const [images, setImages] = useState<Array<string>>([]);


  const editDiary = () => {
    //이미지 포함해서 수정 요청
    Axios.patch(`/diary?userEmail=${diaryData?.email}&diaryId=${diaryId}`, { text, images })
  };
  const historyBack = useCallback(() => {
    history.back();
  }, []);



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
        <DiaryInputUploadedImage images={images} />
        <DiaryInputButtons imageUploadRef={imageUploadRef} submitDiary={editDiary} images={images} setImages={setImages} />
      </Modal>
    </Wrapper>);
}

export default EditDiary;

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
  @media (min-width:480px) and (min-width:1024px) { //desktop
    width: 50%;
    height: 70%;
  }
`

const DiaryDate = styled.div`
  color: rgb(var(--greyTitle));
  font-weight: 600;
  font-size: 20px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: end;
  span{
    padding: 4px;
  }
  .week{
    color: rgb(var(--point));
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    /* display: none; */
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    font-size: 26px;
  }
`
const InputWrapper = styled.div`
  /* height: 100%; */
  flex-grow: 1;
  textarea{
    font-size: 1.1em;
    font-weight: 500;
    width: 100%;
    height: 100%;
    resize: none;
    &::placeholder{
      color: rgba(0,0,0,0.25);
      padding-top: 100px;
      text-align: center;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 1.2em;
    }
  }
  @media (max-width: 479px) { //mobile port
    padding: 16px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 12px;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    padding: 20px;
  }
`
const UploadedImages = styled.div`
  display: flex;
  overflow-x: scroll;
  background-color: rgba(var(--whitesmoke), 0.3);
  border-top: solid 1px rgba(0,0,0,0.05);

  /* flex-shrink: 0; */
  min-height: 56px;


  @media (max-width: 479px) { //mobile port
    height: 112px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    height: 96px;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    height: 172px;
  }
`
const ImageBox = styled.div`
  height: 100%;
  width: auto;
  aspect-ratio: 1.3;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 479px) { //mobile port
    aspect-ratio: 1.2;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    aspect-ratio: 1.8;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    aspect-ratio: 1.3;
  }
`
const UploadedImage = styled(Image)`
  width: 90%;
  height: 70%;

  border-radius: 8px;
  object-fit: cover;
`
const ImageDeleteButton = styled.button`
  transition: color ease-in-out 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 20%;

  color: rgb(var(--greyTitle));
  &:hover{
    color: #d84141;
  }
  
  @media (max-width: 479px) { //mobile port
    font-size: 20px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 12px;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    font-size: 22px;
  }
`
const Buttons = styled.div`
  height: var(--mobileNav);
  /* flex-shrink: 0; */
  background-color: whitesmoke;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  @media (max-width: 479px) { //mobile port
    border-radius: 0px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    border-radius: 0px;
  }
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.3) !important;
  }
  .icon:hover{
    color: rgb(var(--point)) !important;
  }
`