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

const GridCarousel = ({ habits, onAddHabit }: Props) => {

  const INDICATOR_HEIGHT = 30;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [boxWidth, setBoxWidth] = useState(() => {
    if (windowWidth < 480) return windowWidth * 0.45;
    else if (windowHeight < 480) return 145;
    else return 210;
  });


  const wrapper = useRef<HTMLDivElement>(null);
  const slideWrapperRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState<number>(1);
  const [row, setRow] = useState<number>(1);
  const [col, setCol] = useState<number>(1);
  const pageArray = habits && new Array(Math.ceil(habits.length / (col * row))).fill(0);
  const emptyBoxArray = pageArray && new Array(pageArray?.length * row * col - habits.length).fill(0);

  useEffect(() => {
    const resize = () => {
      setBoxWidth(
        () => {
          if (window.innerWidth < 480) return window.innerWidth * 0.45;
          else if (window.innerHeight < 480) return 145;
          else return 210;
        }
      );

      if (wrapper.current?.offsetWidth) {
        const rowNumber = Math.floor((wrapper.current?.offsetHeight - INDICATOR_HEIGHT) / boxWidth);
        const colNumber = Math.floor(wrapper.current?.offsetWidth / boxWidth);

        setRow(Math.max(1, Math.min(3, rowNumber)));
        setCol(Math.max(1, Math.min(3, colNumber)));
      }
    }
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [boxWidth])


  return <Wrapper ref={wrapper}>
    {(row && col) ? <>
      <CarouselWrapper
        ref={slideWrapperRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}>
        {pageArray && pageArray.map((_, pageIndex) =>
          <CarouselPage key={'page' + pageIndex}>
            <HabitsWrapper $row={row} $col={col} >
              {habits
                .slice(pageIndex * (col * row), (pageIndex + 1) * (col * row))
                .map((e: Habit) =>
                  <HabitWrapper key={'box' + e.id} $boxWidth={boxWidth ?? 0}>
                    <HabitBox id={e.id} name={e.name} priority={e.priority} />
                  </HabitWrapper>
                )}
              {pageArray.length - 1 === pageIndex &&
                emptyBoxArray.map((_, i) =>
                  <HabitWrapper key={'empty' + i} $boxWidth={boxWidth ?? 0}>
                    <EmptyBox onClick={onAddHabit}>
                      <AddIcon fontSize='inherit' color='inherit' />
                    </EmptyBox>
                  </HabitWrapper>)}
            </HabitsWrapper>
          </CarouselPage>
        )}
      </CarouselWrapper>
      {pageArray && pageArray?.length > 1 && <IndicatorWrapper $height={INDICATOR_HEIGHT}><Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={pageArray.length} /></IndicatorWrapper>}
    </> : <></>
    }
  </Wrapper >;
}

export default GridCarousel;


const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items : center;
  
  border-radius: 20px;
  background-color: white;
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
  justify-content: center;

  width: 100%;
  height: 100%;
`
const CarouselWrapper = styled.div`
  scroll-snap-type: x mandatory;

  width: 100%;
  height: auto;

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