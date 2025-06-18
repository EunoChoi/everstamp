import Indicator from '@/common/components/ui/Indicator';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HabitBox from "./HabitBox";

interface Habit {
  id: number;
  name: string;
  priority: number;
}
interface Props {
  habits: Habit[];
  onAddHabit: () => void;
}

//custom order의 경우 data prefetch 안하기 때문에 기본값 []로 설정해야 에러 방지 가능
const GridCarousel = ({ habits = [], onAddHabit }: Props) => {
  const INDICATOR_HEIGHT = 30;

  const wrapper = useRef<HTMLDivElement>(null);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const [boxWidth, setBoxWidth] = useState<number>();
  const [row, setRow] = useState<number>();
  const [col, setCol] = useState<number>();

  const pageArray = (row !== undefined && col !== undefined && habits.length > 0) ?
    Array.from({ length: Math.ceil(habits.length / (col * row)) })
    : [1];
  const emptyBoxArray = (row !== undefined && col !== undefined) ?
    Array.from({ length: pageArray.length * row * col - habits.length })
    : [];

  useEffect(() => {
    const updateLengthState = () => {
      let tempBoxWidth;
      if (window.innerWidth < 480) tempBoxWidth = window.innerWidth * 0.45;
      else if (window.innerHeight < 480) tempBoxWidth = 145;
      else tempBoxWidth = 210;
      setBoxWidth(tempBoxWidth);

      if (wrapper.current?.offsetWidth) {
        const rowNumber = Math.floor((wrapper.current.offsetHeight - INDICATOR_HEIGHT) / tempBoxWidth);
        const colNumber = Math.floor(wrapper.current.offsetWidth / tempBoxWidth);
        setRow(Math.max(1, Math.min(3, rowNumber)));
        setCol(Math.max(1, Math.min(3, colNumber)));
      }
    }
    updateLengthState();
    window.addEventListener('resize', updateLengthState);
    return () => {
      window.removeEventListener('resize', updateLengthState);
    };
  }, [])

  return <Wrapper ref={wrapper}>
    <HabitPageText className='title'>80% 실천 달성</HabitPageText>
    <HabitPageText className='sub'>오늘의 목표 습관 12개중 5개를 실천하셨습니다!</HabitPageText>
    {(row && col) &&
      <CarouselWrapper
        ref={slideWrapperRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}>

        {pageArray && pageArray.map((_, pageIndex: number) =>
          <CarouselPage key={'page' + pageIndex}>
            <HabitsWrapper $row={row} $col={col} >
              {habits.slice(pageIndex * (col * row), (pageIndex + 1) * (col * row))
                .map((e: Habit) =>
                  <HabitWrapper key={'box' + e.id} $boxWidth={boxWidth ?? 0}>
                    <HabitBox id={e.id} name={e.name} priority={e.priority} />
                  </HabitWrapper>
                )}
              {(pageArray.length - 1 === pageIndex && emptyBoxArray) &&
                emptyBoxArray.map((_, i) =>
                  <HabitWrapper key={'empty' + i} $boxWidth={boxWidth ?? 0}>
                    <EmptyBox onClick={onAddHabit}>
                      <AddIcon fontSize='inherit' color='inherit' />
                    </EmptyBox>
                  </HabitWrapper>)}
            </HabitsWrapper>
          </CarouselPage>)}
      </CarouselWrapper>}
    {pageArray && pageArray.length > 1 && <IndicatorWrapper $height={INDICATOR_HEIGHT}><Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={pageArray.length} /></IndicatorWrapper>}
  </Wrapper >;
}

export default GridCarousel;

const HabitPageText = styled.span`
  padding: 0 5dvw;
  
  display: flex;
  justify-content: start;
  align-items: center;

  text-transform: capitalize;


  &.title{
    margin-top: 16px;
    margin-bottom: 4px;
    color: rgb(var(--greyTitle));
    width: 100%;
    

    font-size: 32px;
    font-family: 'BMJUA';
    @media (min-width:1025px) { //desktop
      font-size: 36px;
    }
  }
  &.sub{
    margin-bottom: 32px;
    font-size: 18px;
    color: grey;
  }

`

const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items : center;
  
  border-radius: 20px;
  border: 2px solid rgba(0,0,0,0.075);

  width: 100%;
  aspect-ratio: 1;
  margin: 4px;

  font-size: 56px;
  color: rgba(0,0,0,0.1);
`
const IndicatorWrapper = styled.div<{ $height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.$height}+'px' !important;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

  width: 100%;
  height: 100%;
`
const CarouselWrapper = styled.div`
  scroll-snap-type: x mandatory;

  width: 100%;
  height: auto;
  padding-bottom: 12px;

  display: flex;
  overflow-x: scroll;
  flex-shrink: 0;

`
const CarouselPage = styled.div`
  scroll-snap-align: center;
  scroll-snap-stop: always !important;

  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`
const HabitsWrapper = styled.div<{ $row: number, $col: number }>`
  flex-shrink: 0;
  display : grid;
  grid-template-columns: repeat(${props => props.$col}, 1fr);
  grid-template-rows: repeat(${props => props.$row}, 1fr);

  width: auto;
  height: auto;
`
const HabitWrapper = styled.div<{ $boxWidth: number }>`
  width: ${props => props.$boxWidth + 'px'};
  aspect-ratio: 1 !important;

  display: flex;
  justify-content: center;
  align-items: center;
`