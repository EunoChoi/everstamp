import styled from "styled-components";


import { getYear } from "date-fns";
import { useState } from "react";
import EmotionSelector from "./EmotionSelector";
import MonthSelector from "./MonthSelector";


interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  isFilterOpen: boolean;
  setFilterOpen: (n: boolean) => void;

  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
  setEmotionToggle: (d: number) => void;
}

const ListFilter = ({
  contentRef,
  isFilterOpen,
  setFilterOpen,

  setSelectedYear,
  setSelectedMonth,
  setEmotionToggle
}: Props) => {

  const [tempEmotion, setTempEmotion] = useState<number>(5);
  const [tempYear, setTempYear] = useState<number>(getYear(new Date()));
  const [tempMonth, setTempMonth] = useState<number>(0);

  const onInitialize = () => {
    setTempEmotion(5);
    setTempYear(getYear(new Date()));
    setTempMonth(0);
  }
  const onSubmit = () => {
    setEmotionToggle(tempEmotion);
    setSelectedYear(tempYear);
    setSelectedMonth(tempMonth);

    setFilterOpen(false);
    setTimeout(() => {
      contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200);
  }

  return (
    <BG className={isFilterOpen ? 'open' : ''} onClick={() => setFilterOpen(false)} >
      <Wrapper
        onClick={(e) => e.stopPropagation()}
        className={isFilterOpen ? 'open' : ''}>
        <EmotionWrapper>
          <EmotionSelector setEmotionToggle={setTempEmotion} emotionToggle={tempEmotion} />
        </EmotionWrapper>
        <MonthWrapper>
          <MonthSelector selectedYear={tempYear} setSelectedYear={setTempYear} selectedMonth={tempMonth} setSelectedMonth={setTempMonth} />
        </MonthWrapper>
        <ButtonWrapper>
          <Button className="type1" onClick={onInitialize}>초기화</Button>
          <Button onClick={onSubmit}>확인</Button>
        </ButtonWrapper>
      </Wrapper>
    </BG>
  );
}

export default ListFilter;

const ButtonWrapper = styled.div`
  display : flex;
  align-items: center;
  gap: 12px;
`
const Button = styled.button`
  font-size: 14px;
  font-weight: 600;

  padding: 4px 20px;
  border-radius: 32px;
  border: 2px solid rgba(0,0,0,0.08);

  background-color: ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
  color: rgb(var(--greyTitle));

  &.type1{
    background-color: white;
    border : 2px solid  ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 12px;
    padding: 2px 16px;
  }
`
const EmotionWrapper = styled.div`
  width: 100%;
`
const MonthWrapper = styled.div`
  width: 100%;
`
const BG = styled.div`
  position: fixed; 
  left: 0px;
  

  width: 100dvw;
  height: 100dvh;
  backdrop-filter: blur(4px);

  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
  &.open{
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 479px) { //mobile port
    top: var(--mobileHeader);
    z-index: 98;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    top: 0px;
    z-index: 105;
  }
  @media (min-width:1024px) { //desktop
    top: 0px;
    z-index: 105;
  }
`

const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: var(--mobileHeader);
  top: -3px;

  flex-shrink: 0;
  
  

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 479px) { //mobile port
    box-shadow: 0px 12px 12px rgba(0,0,0,0.1);
    width: 100%;
    height: auto;
    padding: 48px 24px;
    gap: 32px;

    will-change: height;
    transform: scaleY(0);
    transform-origin: top;

    border-end-start-radius: 24px;
    border-end-end-radius: 24px;

    transition: transform 0.3s ease-in-out;

    background-color: white;
    
    &.open{
      transform: scaleY(1);
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    box-shadow: 0px 4px 24px rgba(0,0,0,0.15);
    z-index: 999;
    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    gap: 16px;
    padding: 16px 24px;
    width: 350px;
    border-radius: 24px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open{
      opacity: 1;
      visibility: visible;
    }
  }
  @media (min-width:1024px) { //desktop
    box-shadow: 0px 4px 24px rgba(0,0,0,0.15);

    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    width: 500px;
    gap: 56px;
    padding: 48px 36px;
    border-radius: 24px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open{
      opacity: 1;
      visibility: visible;
    }
  }
`
