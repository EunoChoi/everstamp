import styled from "styled-components";
import Image from "next/image";

//icon
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { RefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDiary } from "@/app/(afterLogin)/_lib/deleteDiary";

interface ImageProps {
  id: string;
  src: string;
}
interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  themeColor: string;
}
interface Props {
  position: 'calendar' | 'list';
  diaryData: {
    email: string;
    id: number;
    date: Date;
    text: string;
    Images: Array<ImageProps>;
    Habits: Array<Habit>;
  };
}

const DiarySlide = ({ diaryData, position }: Props) => {

  const router = useRouter();
  const images = diaryData?.Images;


  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const indicatorLength = images.length + 2;
  const indicatorArr = new Array(indicatorLength).fill(0);

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [diaryData])

  return (
    <>
      <SlideWrapper
        ref={slideWrapperRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}>
        <TextWrapper
          onClick={() => router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false })}
          className={`slideChild`}>
          <Test className={`${position}`}>{diaryData.text}</Test>
        </TextWrapper>

        {images.map(e =>
          <Img
            onClick={() => router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false })}
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
            onClick={() => router.push(`/app/inter/input/editDiary?id=${diaryData.id}`, { scroll: false })}
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
      <IndicatorWrapper>
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
      </IndicatorWrapper>
    </>
  );
}

export default DiarySlide;

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
const TextWrapper = styled.div`
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
`
const Test = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-height: 1.7;
  overflow: hidden;

  font-size: 16px;
  font-weight: 500;
  color: rgb(var(--greyTitle));



  @media (max-width: 479px) { //mobile port
    font-size: 16px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    &.calendar{
      font-size: 18px;
      line-height: 1.8;
      -webkit-line-clamp: 8;
    }
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
const IndicatorWrapper = styled.div`
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