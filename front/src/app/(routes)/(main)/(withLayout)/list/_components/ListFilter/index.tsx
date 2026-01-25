import styled from "styled-components";


import { getYear } from "date-fns";
import { MdRefresh } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname = usePathname();

  const [tempEmotion, setTempEmotion] = useState<number>(5);
  const [tempYear, setTempYear] = useState<number>(getYear(new Date()));
  const [tempMonth, setTempMonth] = useState<number>(0);

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const emotion = searchParams.get('emotion');
  useEffect(() => {
    if (isFilterOpen) {
      console.log(year, month, emotion);
      if (year) setTempYear(Number(year));
      if (month) setTempMonth(Number(month));
      if (emotion) setTempEmotion(Number(emotion));
    }
  }, [isFilterOpen])

  const onInitialize = () => {
    setTempEmotion(5);
    setTempYear(getYear(new Date()));
    setTempMonth(0);
  }
  const onSubmit = () => {
    router.push(`${pathname}?emotion=${tempEmotion}&year=${tempYear}&month=${tempMonth}`);

    setEmotionToggle(tempEmotion);
    setSelectedYear(tempYear);
    setSelectedMonth(tempMonth);

    setFilterOpen(false);
    setTimeout(() => {
      contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200);
  }

  return (
    <Overlay className={isFilterOpen ? 'open' : ''} onClick={() => setFilterOpen(false)} >
      <Wrapper
        onClick={(e) => e.stopPropagation()}
        className={isFilterOpen ? 'open' : ''}>
        <EmotionWrapper>
          <EmotionSelector setEmotionToggle={setTempEmotion} emotionToggle={tempEmotion} />
        </EmotionWrapper>
        <MonthWrapper>
          <MonthSelector selectedYear={tempYear} setSelectedYear={setTempYear} selectedMonth={tempMonth} setSelectedMonth={setTempMonth} />
        </MonthWrapper>
        <InitButton onClick={onInitialize}><MdRefresh />선택 초기화</InitButton>
        <ButtonWrapper>
          <Button className="cancel" onClick={() => setFilterOpen(false)}>취소</Button>
          <Button onClick={onSubmit}>확인</Button>
        </ButtonWrapper>
      </Wrapper>
    </Overlay>
  );
}

export default ListFilter;

const Overlay = styled.div`
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
    top: 0px;
    z-index: 98;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    top: 0px;
    z-index: 105;
  }
  @media (min-width:1025px) { //desktop
    top: 0px;
    z-index: 105;
  }
`

const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: var(--mobileHeader);
  top: -3px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: color-mix(in srgb, var(--theme-bg, #f5f5fa) 95%, transparent);
  backdrop-filter: blur(24px);

  @media (max-width: 479px) {
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    width: 100%;
    height: auto;
    padding: 36px 24px;
    padding-top: calc((var(--mobileHeader) + 36px));
    gap: 24px;

    will-change: height;
    transform: scaleY(0);
    transform-origin: top;

    border-end-start-radius: 28px;
    border-end-end-radius: 28px;

    transition: transform 0.3s ease-in-out;    
    &.open{
      transform: scaleY(1);
    }
  }
  @media (min-width:480px) and (max-width:1024px) {
    box-shadow: 0 4px 24px rgba(0,0,0,0.1);
    z-index: 999;
    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    gap: 16px;
    padding: 20px 28px;
    width: 350px;
    border-radius: 28px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open{
      opacity: 1;
      visibility: visible;
    }
  }
  @media (min-width:1025px) {
    box-shadow: 0 4px 24px rgba(0,0,0,0.1);

    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    width: 500px;
    gap: 32px;
    padding: 48px 40px;
    border-radius: 28px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open{
      opacity: 1;
      visibility: visible;
    }
  }
`
const EmotionWrapper = styled.div`
  width: 100%;
`
const MonthWrapper = styled.div`
  width: 100%;
`
const ButtonWrapper = styled.div`
  display : flex;
  align-items: center;
  gap: 12px;
`
const Button = styled.button`
  font-size: 14px;

  padding: 6px 20px;
  border-radius: 14px;

  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);

  &.cancel{
    background-color: rgba(255,255,255,0.9);
    color: rgb(var(--greyTitle));
  }
  @media (min-width:480px) and (max-width:1024px) {
    font-size: 12px;
    padding: 4px 16px;
  }
`

const InitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-size: 16px;
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
`
