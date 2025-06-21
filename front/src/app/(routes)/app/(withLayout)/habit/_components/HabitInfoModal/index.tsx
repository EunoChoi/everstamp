'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getHabitById } from "@/common/fetchers/habit";
import Indicator from "../../../../../../../common/components/ui/Indicator";
import YearHabitChart from "./YearHabitChart";

import $Modal from "@/common/styles/common_modal";

import HabitInfoPageValue from "@/app/(routes)/app/(withLayout)/habit/_components/HabitInfoModal/HabitInfoPageValue";
import Calendar from "@/common/components/ui/Calendar";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { notFound } from 'next/navigation';
import MonthHabitCount from "./MonthHabitCount";
import YearHabitCount from "./YearHabitCount";



interface Props {
  habitId: string;
}

const HabitInfoModal = ({ habitId }: Props) => {
  const router = useCustomRouter();

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [chartDate, setChartDate] = useState<Date>(new Date());


  //only get habit default infomation - name, priority
  const { data: habitDataById, isError } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabitById({ id: habitId }),
    enabled: habitId !== null
  });


  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [])

  return (<$Modal.Background onClick={() => router.back()}>
    <HabitInfoModalWrapper onClick={(e) => e.stopPropagation()}>
      <$Modal.Top>
        <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
        <span className="title">습관 정보</span>
        <button></button>
      </$Modal.Top>

      <MobilePortNameWrapper>
        <Name>{habitDataById?.name ?? '-'}</Name>
        <PriorityStar>
          {Array(habitDataById.priority + 1).fill(0).map((_, i) => (
            <StarPurple500OutlinedIcon key={'star' + i} fontSize="inherit" color="inherit" />
          ))}
        </PriorityStar>
      </MobilePortNameWrapper>


      <CarouselWrapper>
        <CarouselSlideWrapper
          ref={slideWrapperRef}
          onScroll={(e) => {
            setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
          }}
        >
          <CarouselPage className="slideChild">
            <MonthHabitCount
              displayDate={calendarDate}
              habitId={habitId}
              habitName={habitDataById?.name ?? '-'}
            />
            <CalendarWrapper>
              <Calendar
                displayDate={calendarDate}
                setDisplayDate={setCalendarDate}
                FormattedValue={HabitInfoPageValue}
                todayRouterPushAction={() => setCalendarDate(new Date())}
                isTouchGestureEnabled={false}
                isDateSelectionEnabled={false}
              />
            </CalendarWrapper>
          </CarouselPage>
          <CarouselPage className="slideChild">
            <YearHabitCount
              displayDate={chartDate}
              habitName={habitDataById?.name ?? '-'}
            />
            <YearHabitChart
              displayDate={chartDate}
              setDisplayDate={setChartDate} />
          </CarouselPage>
        </CarouselSlideWrapper>
        <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={2} />
      </CarouselWrapper>
    </HabitInfoModalWrapper>
  </$Modal.Background>);
}

export default HabitInfoModal;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;

  border : 2px rgb(var(--lightGrey2)) solid;
  border-radius: 16px;
  padding: 16px;
`
const MobilePortNameWrapper = styled.div`
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    display: none;
  }
`
const Name = styled.div`
  color: rgb(var(--greyTitle));
  /* font-weight: 600; */
  font-size: 28px;
  height: auto;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  padding-top: 16px;
  @media (min-width:1025px) { //desktop
    font-size: 28px;
  }
`
const PriorityStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
`
const HabitInfoModalWrapper = styled($Modal.Wrapper)`
  padding-bottom: 16px;
`

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const CarouselSlideWrapper = styled.div`
  scroll-snap-type: x mandatory;

  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  overflow-x: scroll;

  padding : 12px;

  .slideChild{
    scroll-snap-align: center;
    scroll-snap-stop: always !important;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`
const CarouselPage = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    flex-direction: row;
  }
`