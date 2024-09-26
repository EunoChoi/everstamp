'use client';

import { format, lastDayOfMonth } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import HabitInfoCalendar from "../../calendar/HabitInfoCalendar";
import { getHabit } from "@/function/fetch/habit";
import HabitInfoChart from "../../habit/HabitInfoChart";
import Indicator from "../../common/indicator";
import BottomButtonArea from "../../common/BottomButtonArea";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useCustomRouter } from "@/function/customRouter";
import $Modal from "@/style/common_modal";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { notFound } from 'next/navigation';



interface Props {
  habitId: string;
}

const HabitInfoModal = ({ habitId }: Props) => {
  const router = useCustomRouter();

  const [habitCount, setHabitCount] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const { data: habitData, isError } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabit({ id: habitId }),
    enabled: habitId !== null
  });


  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [])

  return (<$Modal.Background onClick={() => router.back()}>
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      <$Modal.Top>
        <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
        <span className="title">습관 정보</span>
        <button></button>
      </$Modal.Top>
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
    </ModalWrapper>
  </$Modal.Background>);
}

export default HabitInfoModal;

const ModalWrapper = styled($Modal.Wrapper)`
  padding-bottom: 16px;
`

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