'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getHabitById, getHabitMonthlyStatus } from "@/common/fetchers/habit";

import { format } from 'date-fns';
import { notFound, useRouter } from "next/navigation";
import Calendar from "../../ui/Calendar";
import Indicator from "../../ui/Indicator";
import { Modal } from "../../ui/Modal";
import { StarRating } from "../../ui/StarRating";
import MonthHabitCount from "./MonthHabitCount";
import YearHabitChart from "./YearHabitChart";
import YearHabitCount from "./YearHabitCount";
import { RenderDateContent } from "./_utils/HabitInfoDateContent";



interface Props {
  habitId: string;
}

const HabitInfoView = ({ habitId }: Props) => {
  const router = useRouter();

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
  const { data: singleHabitMonthlyData } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(calendarDate, 'yyyy-MM')],
    queryFn: () => getHabitMonthlyStatus({ id: habitId, month: format(calendarDate, 'yyyy-MM') }),
    select: (data) => {
      const singleHabitMonthlyData: { [key: string]: boolean } = {};
      data?.forEach((e: any) => {
        singleHabitMonthlyData[format(e.date, 'yyMMdd')] = e?.Habits && true;
      });
      return singleHabitMonthlyData;
    }
  });


  const onClickMonthTitle = () => {
    setCalendarDate(new Date);
  }

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [])

  return (
    <Modal>
      <Modal.Header headerTitleText='습관 정보' />
      <HabitInfoContent>
        <MobilePortNameWrapper>
          <Name>{habitDataById?.name ?? '-'}</Name>
          <PriorityStar rating={habitDataById?.priority + 1} />
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
                  isTouchGestureEnabled={false}
                  isDateSelectionEnabled={false}
                  headerTitlePosition="center"
                  headerSize="small"

                  displayDate={calendarDate}
                  setDisplayDate={setCalendarDate}
                  monthlyData={singleHabitMonthlyData}
                  RenderDateContent={RenderDateContent}

                  onClickMonthTitle={onClickMonthTitle}
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
      </HabitInfoContent>
    </Modal>
  );
}

export default HabitInfoView;

const HabitInfoContent = styled(Modal.Content)`
  padding: 0;
`
const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;

  border : 2px rgb(var(--lightGrey2)) solid;
  border-radius: 16px;
  padding: 12px;
`
const MobilePortNameWrapper = styled.div`
  width: 100%;
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
const PriorityStar = styled(StarRating)`
  display: flex;
  justify-content: center;
  align-items: center;

  .star{
    font-size: 18px;
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  }
`

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: 479px) { //mobile port
    padding: 16px 0;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
  }
  @media (min-width:1024px) { //desktop
  }
`
const CarouselSlideWrapper = styled.div`
  scroll-snap-type: x mandatory;

  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  overflow-x: scroll;

  padding : 0 12px;

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