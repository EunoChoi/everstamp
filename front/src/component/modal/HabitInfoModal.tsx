'use client';

import { format, lastDayOfMonth } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HabitInfoCalendar from "../habitInfo/HabitInfoCalendar";
import { getHabit } from "@/app/(afterLogin)/_lib/habit";
import HabitInfoChart from "../habitInfo/HabitInfoChart";
import Indicator from "../indicator";



const HabitInfoModal = () => {
  const params = useSearchParams();
  const habitId = params.get('id');
  const [habitCount, setHabitCount] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);


  //year data query key ['habit', 'count', 'year', '2024']

  const { data: habitData } = useQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabit({ id: habitId }),
    enabled: habitId !== null
  });

  const historyBack = useCallback(() => {
    history.back();
  }, []);


  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [])

  return (<Wrapper onClick={historyBack}>
    <Modal onClick={(e) => e.stopPropagation()}>
      <Name>
        {habitData?.name ? habitData?.name : '-'}
      </Name>
      <Content>
        <Info>
          <span className="name"> {habitData?.name ? habitData?.name : '-'}</span>
          <div className="infoText">
            <span>Number of habits</span>
            <span>achieved of {format(currentMonth, 'MMMM')}</span>
          </div>
          <div className="infoCount">{habitCount} / {format(lastDayOfMonth(currentMonth), 'dd')}</div>
        </Info>
        <SlideWrapper>
          <Slide
            ref={slideWrapperRef}
            onScroll={(e) => {
              setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
            }}
          >
            <CalendarWrapper className="slideChild">
              <HabitInfoCalendar setHabitCount={setHabitCount} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
            </CalendarWrapper>

            <ChartWrapper className="slideChild">
              <HabitInfoChart />
            </ChartWrapper>
          </Slide>
          <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={2} />
        </SlideWrapper>
      </Content>


      <Buttons>
        <Button onClick={historyBack} >
          <CancelOutlinedIcon className="icon" />
        </Button>
      </Buttons>
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
  @media (min-height:480px) and (min-width:1024px) { //desktop
  }
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* text-transform:lowercase; */

  padding: 24px 12px; 

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
  }
  .infoCount{
    line-height: 100%;
    font-weight: 700;
    font-size: 52px;
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'} !important;
  }
  
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 50%;
    flex-direction: column;
    justify-content: space-evenly;
    .name{
      display: flex;
      margin: 24px 0;
      font-weight: 600;
      font-size: 42px;
    } 
    .infoText{
      text-align: center;
    }
    .infoCount{
      margin: 24px 0;
    }
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    padding: 24px;
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
  @media (min-height:480px) and (min-width:1024px) { //desktop
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
  @media (min-height:480px) and (min-width:1024px) { //desktop
    padding: 0 24px;
  }
`
const Name = styled.div`
  color: rgb(var(--greyTitle));
  font-weight: 600;
  font-size: 24px;
  height: auto;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  padding: 4px 0;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: none;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 28px;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  width: 100%;
  height: 100%;

  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: 500px;
    height: 80%;
  }
`


const Buttons = styled.div`
  width: 100%;
  height: var(--mobileNav);
  /* flex-shrink: 0; */
  background-color: whitesmoke;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  @media (max-width: 479px) { //mobile port
    border-radius: 0px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    border-radius: 0px;
  }
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.3) !important;
  }
  .icon:hover{
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'} !important;
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
const IndicatorWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin: 8px 0;
  height: auto;
  div {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: rgb(var(--lightGrey2));
    border: 1px solid rgba(0,0,0,0.05);

    margin: 4px;
    @media (max-width: 479px) { //mobile port
      width: 8px;
      height: 8px;
      margin: 2px;
    }
  }
  .current {
    background-color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
  }
`