'use client';

import { format, lastDayOfMonth } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import HabitInfoCalendar from "../calendar/HabitInfoCalendar";
import { getHabit } from "@/function/fetch/habit";
import HabitInfoChart from "../habit/HabitInfoChart";
import Indicator from "../common/indicator";
import BottomButtonArea from "../common/BottomButtonArea";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useCustomRouter } from "@/function/customRouter";


interface Props {
  habitId: string;
}

const HabitInfoModal = ({ habitId }: Props) => {
  const router = useCustomRouter();

  const [habitCount, setHabitCount] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const { data: habitData } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabit({ id: habitId }),
    enabled: habitId !== null
  });



  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [])

  return (<Wrapper onClick={() => router.back()}>
    <Modal onClick={(e) => e.stopPropagation()}>
      <Name>
        {habitData?.name ? habitData?.name : '-'}
      </Name>
      <Content>

        <SlideWrapper>
          <Slide
            ref={slideWrapperRef}
            onScroll={(e) => {
              setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
            }}
          >
            <CalendarWrapper className="slideChild">
              <Info>
                <span className="name"> {habitData?.name ? habitData?.name : '-'}</span>
                <div className="infoText">
                  <span>{format(currentMonth, 'yyyy년 M월')}</span>
                  <span>실천 횟수</span>
                </div>
                <div className="infoCount">{habitCount} / {format(lastDayOfMonth(currentMonth), 'dd')}</div>
              </Info>
              <HabitInfoCalendar setHabitCount={setHabitCount} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
            </CalendarWrapper>

            <ChartWrapper className="slideChild">
              <HabitInfoChart />
            </ChartWrapper>
          </Slide>
          <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={2} />
        </SlideWrapper>
      </Content>


      <BottomButtonArea>
        <Button onClick={() => router.back()} >
          <CloseRoundedIcon className="icon" />
        </Button>
      </BottomButtonArea>
    </Modal>
  </Wrapper>);
}

export default HabitInfoModal;

const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const Content = styled.div`
  display : flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: 479px) { //mobile port
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    flex-direction: row;
  }
  @media (min-width:1024px) { //desktop
  }
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* text-transform:lowercase; */

  padding: 32px 8px; 

  width: 100%;
  text-align: start;
  
  color: rgb(var(--greyTitle));
  font-weight: 500;
  .name{
    display: none;
  }
  .infoText{
    display: flex;
    flex-direction: column;
    font-size: 18px;
    color: #5c5c5c;
    span{
      line-height: 150%;
    }
  }
  .infoCount{
    line-height: 100%;
    font-weight: 700;
    font-size: 32px;
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
  }
  
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 50%;
    height: 100%;
    border-right: 2px solid whitesmoke;
    margin-right: 12px;
    flex-direction: column;
    justify-content: space-evenly;

    .name{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 24px 0;
      width: 90%;
     
      font-weight: 600;
      font-size: 32px;
      word-break: keep-all;
    } 
    .infoText{
      text-align: center;
    }
    .infoCount{
      margin: 24px 0;
    }
  }
  @media (min-width:1024px) { //desktop
    .infoText{
      font-size: 20px;
    }
  }
`

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 12px;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    flex-direction: row;
  }
  @media (min-width:1024px) { //desktop
    padding: 0 24px;
  }
`
const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 12px;
  @media (min-width:1024px) { //desktop
    padding: 0 24px;
  }
`
const Name = styled.div`
  color: rgb(var(--greyTitle));
  font-weight: 600;
  font-size: 28px;
  height: auto;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  padding-top: 16px;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: none;
  }
  @media (min-width:1024px) { //desktop
    font-size: 28px;
  }
`

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
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  
  box-shadow: 0px 0px 64px rgba(0,0,0,0.25);

  width: 100%;
  height: 100%;

  @media (min-width:1024px) { //desktop
    width: 500px;
    height: 80%;

    border-radius: 24px;
  }
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.3) !important;
  }
  .icon:hover{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
  }
`
const Slide = styled.div`
  scroll-snap-type: x mandatory;

  display: flex;
  justify-content: start;
  width: 100%;
  height: 100px;
  flex-grow: 1;
  overflow-x: scroll;



  .slideChild{
    scroll-snap-align: start;
    scroll-snap-stop: always !important;
    margin-right: 16px;
    &:last-child{
      margin-right: 0;
    }
  }
`