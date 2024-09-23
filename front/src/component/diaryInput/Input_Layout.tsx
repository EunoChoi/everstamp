'use client';

import styled from "styled-components";


import DiaryInputDate from "./Input_Date";
import { useCustomRouter } from "@/function/customRouter";
import { useState } from "react";

//icon
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import $Modal from "@/style/common_modal";
import $Common from "@/style/common";


interface Props {
  textarea: JSX.Element;
  emotionSelector: JSX.Element;
  inputImages: JSX.Element;
  onSubmit: () => void;
  date: Date | undefined;
  isLoading: boolean;
  typeText: string;
}


const InputDiaryLayout = (
  { typeText, date, textarea, emotionSelector, inputImages, onSubmit, isLoading }: Props
) => {

  const router = useCustomRouter();
  const [emotionOpen, setEmotionOpen] = useState(true);
  const [contentsOpen, setContentsOpen] = useState(true);
  const [imagesOpen, setImagesOpen] = useState(true);

  return (
    <$Modal.Background onClick={() => router.back()}>
      <$Modal.Wrapper onClick={(e) => e.stopPropagation()}>
        <$Modal.Top>
          <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
          <DiaryInputDate date={date} />
          <button onClick={onSubmit} disabled={isLoading}>{typeText}</button>
        </$Modal.Top>


        <$Common.Empty />
        <Mobile_Section>
          <Mobile_Section_Title>
            <span>emotion</span>
            <button onClick={() => { setEmotionOpen(c => !c) }}>
              {emotionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </Mobile_Section_Title>
          {emotionOpen && <>{emotionSelector}</>}
        </Mobile_Section>

        <Mobile_Section>
          <Mobile_Section_Title>
            <span>contents</span>
            <button onClick={() => { setContentsOpen(c => !c) }}>
              {contentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </Mobile_Section_Title>
          {contentsOpen && <Mobile_Textarea>{textarea}</Mobile_Textarea>}
        </Mobile_Section>

        <Mobile_Section>
          <Mobile_Section_Title>
            <span>images</span>
            <button onClick={() => { setImagesOpen(c => !c) }}>
              {imagesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </Mobile_Section_Title>
          {imagesOpen && <Mobile_Images>{inputImages}</Mobile_Images>}
        </Mobile_Section>
        <$Common.Empty />
      </$Modal.Wrapper>
    </$Modal.Background>);
}

export default InputDiaryLayout;

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
const Mobile_Section = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 18px 5vw;
  flex-shrink: 0;
`
const Mobile_Section_Title = styled.section`
  text-transform: capitalize;
  font-size: 22px;
  font-weight: 500;
  color: rgb(var(--greyTitle));
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Mobile_Textarea = styled.div`
  width: 100%;
  height: 220px;
  border : 2px solid whitesmoke;
`
const Mobile_Images = styled.div`
  width: 100%;
  height: 120px;
  border : 2px solid whitesmoke;
  border-radius: 8px;
  overflow: hidden;
`