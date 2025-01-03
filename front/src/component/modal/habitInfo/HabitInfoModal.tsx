'use client';

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { getHabit, getHabit_single_status_month } from "@/function/fetch/habit";
import HabitInfoChart from "../../habit/HabitInfoChart";
import Indicator from "../../common/indicator";

import { useCustomRouter } from "@/function/customRouter";
import $Modal from "@/style/common_modal";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { notFound } from 'next/navigation';
import CalendarLayout from "@/component/calendar/CalendarLayout";
import HabitInfoPageValue from "@/app/app/(afterLogin)/habit/_component/HabitInfoPageValue";
import HabitInfoCount from "@/component/habit/HabitInfoCount";



interface Props {
  habitId: string;
}

const HabitInfoModal = ({ habitId }: Props) => {
  const router = useCustomRouter();

  const [displayDate, setDisplayDate] = useState<Date>(new Date());

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const { data: habitDataById, isError } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabit({ id: habitId }),
    enabled: habitId !== null
  });
  const { data: habitDataByMonth } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(displayDate, 'MM')],
    queryFn: () => getHabit_single_status_month({ id: habitId, date: displayDate })
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
        {habitDataById?.name ?? '-'}
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
              <HabitInfoCount
                displayDate={displayDate}
                habitName={habitDataById?.name ?? '-'}
                habitCount={habitDataByMonth?.length ?? 0}
              />
              <CalendarLayout
                displayDate={displayDate}
                setDisplayDate={setDisplayDate}
                FormattedValue={HabitInfoPageValue}
                isTouchGestureEnabled={false}
                isDateSelectionEnabled={false}
              />
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