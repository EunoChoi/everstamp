'use client';

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getHabitById, getSingleHabitMonthInfo } from "@/common/fetchers/habit";
import Indicator from "../../../../../../../common/components/ui/Indicator";
import HabitInfoChart from "./HabitInfoChart";

import $Modal from "@/common/styles/common_modal";

import HabitInfoPageValue from "@/common/components/ui/Calendar/HabitInfoPageValue";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { notFound } from 'next/navigation';
import Calendar from "../../../../../../../common/components/ui/Calendar";
import HabitInfoCount from "./HabitInfoCount";



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
    queryFn: () => getHabitById({ id: habitId }),
    enabled: habitId !== null
  });
  const { data: habitDataByMonth } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(displayDate, 'MM')],
    queryFn: () => getSingleHabitMonthInfo({ id: habitId, date: displayDate })
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
      <PriorityStar>
        {Array(habitDataById.priority + 1).fill(0).map((_, i) => (
          <StarPurple500OutlinedIcon key={'star' + i} fontSize="inherit" color="inherit" />
        ))}
      </PriorityStar>
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
              <Calendar
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

const PriorityStar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
`
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
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    flex-direction: row;
  }
  @media (min-width:1025px) { //desktop
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

  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    flex-direction: row;
  }
  @media (min-width:1025px) { //desktop
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
  @media (min-width:1025px) { //desktop
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

  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    display: none;
  }
  @media (min-width:1025px) { //desktop
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