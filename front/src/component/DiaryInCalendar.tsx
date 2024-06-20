'use client';

import styled from "styled-components";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';




//icon
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//img
import IsMobile from "@/funcstion/IsMobile";
import { deleteDiary } from "@/app/(afterLogin)/_lib/deleteDiary";

interface ImageProps {
  id: string;
  src: string;
}

interface Props {
  isCalendar?: boolean;
  diaryData: {
    email: string;
    id: number;
    date: Date;
    text: string;
    Images: Array<ImageProps>;
    habits: Array<any>;
  };
}

//날짜만 프롭으로 받아오면 그걸로 검색해서 데이터 패칭
const DiaryInCalendar = ({ isCalendar, diaryData }: Props) => {

  const router = useRouter();
  const isMobile = IsMobile();
  const dateInfo = diaryData?.date;

  const month = format(dateInfo, 'MMM');
  const date = format(dateInfo, 'dd');
  const day = format(dateInfo, `${isMobile ? 'eee' : 'eeee'}`);
  const year = format(dateInfo, 'yyyy');

  const habits = diaryData?.habits;

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const images = diaryData?.Images;

  const indicatorLength = images.length + 2;
  const indicatorArr = new Array(indicatorLength).fill(0);

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [date])

  return (
    <Wrapper>
      <DateWrapper className="dateinfo">
        <span className="week">{day}</span>
        <div>
          <span className="date">{month}</span>
          <span className="date">{date},</span>
          <span className="year">{year}</span>
        </div>
      </DateWrapper>

      <Habits className="habits">
        <Habit>{habits?.length ? habits?.length : 0} habits</Habit>
        {habits?.map((e: any, i: number) => <Habit key={e + i}>{e}</Habit>)}
      </Habits>

      <SlideWrapper
        ref={slideWrapperRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}>
        <Text className="slideChild">
          <div className="text">{diaryData.text}</div>
        </Text>

        {images.map(e =>
          <Img
            key={e.id}
            className="slideChild"
            src={e.src}
            alt='image'
            width={300}
            height={300}
            blurDataURL={e.src}
          // placeholder="blur"
          ></Img>)}

        <EditBox className="slideChild">
          <button><ContentCopyIcon />copy text</button>
          <button
            onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/app/inter/input/editDiary?id=${diaryData.id}`, { scroll: false })}
          >
            <EditIcon />edit diary
          </button>
          <button
            onClick={() => deleteDiary({ email: diaryData.email, diaryId: diaryData.id })}
          >
            <DeleteIcon />delete Diary
          </button>
        </EditBox>
      </SlideWrapper>
      <IndicatoWrapper>
        {indicatorArr.map((_, i: number) =>
          <div
            key={'indicator' + i}
            className={page === i ? 'current' : ''}
            onClick={() => {
              slideWrapperRef.current?.scrollTo({
                left: slideWrapperRef.current.clientWidth * i,
                behavior: "smooth"
              })
            }}
          />)}
      </IndicatoWrapper>
    </Wrapper >);
}

export default DiaryInCalendar;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  width: 100%;
  max-width: 600px;
  height: 300px;
  margin: 20px 0;

  @media (min-width: 1024px) {//desktop
      height: 550px;
      .dateinfo{
        flex-direction: column;
        align-items: start;
        .week{
          font-size: 56px;
          margin-bottom: 12px;
        }
        span{
          font-size: 36px;
        }
      }
      .text{
        -webkit-line-clamp: 9;
        line-height: 1.9 !important;
      }
      .habits{
        padding : 12px 0;
        margin: 12px 0;
      }
    }
`
const EditBox = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  background-color: whitesmoke;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >button{
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: rgb(var(--greyTitle));

    margin: 8px 0;
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
  }
`
const IndicatoWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 8px;
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
  div:last-child{
    border-radius: 2px;
    background-color: rgba(var(--point2), 0.5);
  }
  .current {
    background-color: rgb(var(--point)) !important;
  }
`
const DateWrapper = styled.div`
  display: flex;
  align-items: end;
  height: auto;
  span{
    text-transform: capitalize;
    margin-right: 8px;
    color: grey;
    font-weight: 600;
    font-size: 24px;
    line-height: 1;
  }
  .week{
    font-size: 48px;
    font-weight: 700;
    color: rgb(var(--greyTitle));
  }
`
const Habits = styled.div`
  width: 100%;
  height: auto;
  padding : 8px 0;
  margin: 8px 0;
  
  display: flex;
  justify-content: start;
  overflow-x : scroll;
  flex-shrink: 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }
`
const Habit = styled.span`
  cursor: pointer;
  flex-shrink: 0;
  
  padding : 0px 16px;
  color: rgb(var(--greyTitle));
  background-color: rgb(var(--point2));
  border-radius: 24px;
  margin-right: 12px;

  white-space: nowrap;
  text-transform: capitalize;

  font-size: 16px;
  font-weight: 500;

  box-sizing: border-box;
  border : solid 4px rgb(var(--point2));

  &:first-child{
    background-color: rgba(0,0,0,0);
  }
  &:last-child{
    margin-right: 0px;
  }
  @media (max-width: 479px) { //mobile port
    padding : 0px 12px;
    font-size: 13px;
    margin-right: 8px;
  }
`
const SlideWrapper = styled.div`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }

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
const EmptyDiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  flex-grow: 1;

  background-color: whitesmoke;
  color: rgb(var(--greyTitle));
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;

  font-weight:500;
  span{
    line-height: 120%;
    @media (min-width:480px) and (min-width:1024px) { //desktop
      font-size: 20px;
    }
  }

  button{
    transition: color ease-in-out 0.2s;
    line-height: 50%;
    font-size: 48px;
    color: rgb(var(--greyTitle));
    padding: 8px;
    padding-top: 16px;

    @media (min-width:480px) and (min-width:1024px) { //desktop
      font-size: 56px;
    }
    &:hover{
      color: rgb(var(--point));
    }
  }
`
const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  background-color: whitesmoke;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;

  flex-shrink: 0;
  padding: 24px;

  font-size: 16px;
  font-weight: 500;
  color: rgb(var(--greyTitle));

  .text{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    line-height: 1.6 !important;
    overflow: hidden;
  }

  @media (max-width: 479px) { //mobile port
      font-size: 16px;
  }
`
const Img = styled(Image)`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 100%;


  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.05);
`

