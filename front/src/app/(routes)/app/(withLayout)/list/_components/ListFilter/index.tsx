import styled from "styled-components";


import RefreshIcon from '@mui/icons-material/Refresh';
import { getYear } from "date-fns";
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
        <InitButton onClick={onInitialize}><RefreshIcon fontSize="small" />선택 초기화</InitButton>
        <ButtonWrapper>
          <Button className="cancel" onClick={() => setFilterOpen(false)}>취소</Button>
          <Button onClick={onSubmit}>확인</Button>
        </ButtonWrapper>
      </Wrapper>
    </BG>
  );
}

export default ListFilter;

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
  background-color: white;

  @media (max-width: 479px) { //mobile port
    box-shadow: 0px 12px 12px rgba(0,0,0,0.1);
    width: 100%;
    height: auto;
    padding: 36px 24px;
    padding-top: calc((var(--mobileHeader) + 36px));
    gap: 24px;

    will-change: height;
    transform: scaleY(0);
    transform-origin: top;

    border-end-start-radius: 24px;
    border-end-end-radius: 24px;

    transition: transform 0.3s ease-in-out;    
    &.open{
      transform: scaleY(1);
    }
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
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
  @media (min-width:1025px) { //desktop
    box-shadow: 0px 4px 24px rgba(0,0,0,0.15);

    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    width: 500px;
    gap: 32px;
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
  /* font-weight: 600; */

  padding: 4px 20px;
  border-radius: 32px;
  border: 2px solid rgba(0,0,0,0.08);

  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + '90' : '#979FC7'};
  color: rgb(var(--greyTitle));

  &.cancel{
    background-color: white;
    border : 2px solid  ${(props) => props.theme.themeColor ? props.theme.themeColor + '90' : '#979FC7'};
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    font-size: 12px;
    padding: 2px 16px;
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
