'use client';

import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";

//styledComponent
import SC_Common from "@/style/common";
import { enqueueSnackbar } from 'notistack'

//component
import HabitBox from "@/component/habit/HabitBox";
import Header from "@/component/common/Header";

//icon
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/app/(afterLogin)/_lib/habit";

import SortIcon from '@mui/icons-material/Sort';

import Indicator from "@/component/common/indicator";
import ContentArea from "@/component/common/ContentArea";

interface Props {
  email: string;
}


const HabitPageClient = ({ email }: Props) => {

  const router = useRouter();

  const gridListWrapperRef = useRef<HTMLDivElement>(null);
  const gridListScrollRef = useRef<HTMLDivElement>(null);

  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('DESC');
  const [page, setPage] = useState<number>(0);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortToggle],
    queryFn: () => getHabits({ sort: sortToggle }),
  });


  const onAddHabit = () => {
    if (habits.length < 18) router.push('/app/inter/input/addHabit', { scroll: false })
    else enqueueSnackbar('습관은 최대 18개 생성 가능합니다.', { variant: 'info' })
  }
  // 기능 추가 예정
  // const [typeToggle, setTypeToggle] = useState<'GRID' | 'LIST'>('GRID');
  // const typeChage = useCallback(() => {
  //   if (typeToggle === 'GRID') setTypeToggle('LIST');
  //   else setTypeToggle('GRID');
  // }, [typeToggle])

  const sortChage = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else setSortToggle('DESC');
  }, [sortToggle])
  const [type, setType] = useState<string | null>(null);
  const [hide, setHide] = useState<boolean>(false);



  useEffect(() => {
    const hideModeUpdate = () => {
      setHide(true);
      setTimeout(() => {
        setHide(false);
      }, 300);
    }
    const typeUpdate = () => {
      const gridWrapperWidth = gridListWrapperRef.current?.offsetWidth!;
      const gridWrapperHeight = gridListWrapperRef.current?.offsetHeight! - 28;
      if (gridWrapperWidth > gridWrapperHeight * (3 / 2)) setType('land');
      else if (gridWrapperHeight > gridWrapperWidth * (3 / 2)) setType('port');
      else if (gridWrapperHeight > gridWrapperWidth) setType('height') //height 100%, ratio 2/3
      else setType('width') //width 100%, ratio 3/2
    }

    typeUpdate();

    // window.addEventListener('resize', hideModeUpdate);
    window.addEventListener('orientationchange', hideModeUpdate); //rotate

    window.addEventListener('orientationchange', typeUpdate); //rotate
    window.addEventListener('resize', typeUpdate);
    return () => {
      // window.removeEventListener('resize', hideModeUpdate);
      window.removeEventListener('orientationchange', hideModeUpdate); //rotate

      window.removeEventListener('orientationchange', typeUpdate); //rotate
      window.removeEventListener('resize', typeUpdate);

    }
  }, []);


  return (
    <SC_Common.Wrapper className="habit">
      <Header title='habit' classname="habit" >
        <SC_Common.Options>
          <button onClick={onAddHabit}>
            <AddIcon fontSize="small" />
          </button>
          {/* <button onClick={typeChage}>
          {typeToggle === 'GRID' ? <WindowOutlinedIcon fontSize="small" /> : <SplitscreenOutlinedIcon fontSize="small" />}
        </button> */}
          <button onClick={sortChage}>
            <span><SortIcon fontSize="small" /></span>
            <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
          </button>
        </SC_Common.Options>
      </Header>
      <ContentArea className="habit">
        {(habits === undefined || habits?.length === 0) && <NoHabit>습관 목록 작성을 시작해볼까요? 😀</NoHabit>}

        <HabitGridWrapper ref={gridListWrapperRef} className={hide ? 'hide' : ''}>
          <HabitGridScroll
            className={type ? type : ''}
            ref={gridListScrollRef}
            onScroll={(e) => {
              setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
            }}
          >
            {habits?.map((grid: any[], i: number) =>
              <HabitGridContainer key={'set' + i} className={type ? type : ''}>
                {grid.map(e =>
                  <HabitBox key={e.email + e.name} name={e.name} id={e.id} priority={e.priority} />
                )}
              </HabitGridContainer>)}
          </HabitGridScroll>
          {habits.length > 1 && <Indicator slideWrapperRef={gridListScrollRef} page={page} indicatorLength={habits?.length} />}
        </HabitGridWrapper>

      </ContentArea>
    </SC_Common.Wrapper>
  );
}

export default HabitPageClient;

const HabitGridWrapper = styled.div`
  &.hide{
    opacity: 0;
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`

const HabitGridScroll = styled.div`
  position: relative;
  
  display:  flex;
  overflow-y: hidden;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }

  max-height: calc(100% - 28px); //indicator height 28px

  &.port{
    width: 100%;
    aspect-ratio: 2/3;
  }
  &.land{
    height: 95%;
    aspect-ratio: 3/2;
  }
  &.height{
    height: 90%;
    aspect-ratio: 2/3;
  }
  &.width{
    width: 90%;
    aspect-ratio: 3/2;
  }
`
const HabitGridContainer = styled.div`
  flex-shrink: 0;

  display: grid;
  width: 100%;
  height: 100%;
    
  scroll-snap-align: center;
  scroll-snap-stop: always !important;

  &.port, &.height{
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  &.land, &.width{
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  @media (max-width: 479px) { //mobile port
    padding: 5vw;
    grid-gap: 8px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 8px;
    grid-gap: 8px;
  }
  @media (min-width:1024px) { //desktop
    padding: 16px;
    grid-gap: 16px;
  }
`

const NoHabit = styled.span`
  width: 100%;
  height: 100%;

  padding-top: 30dvh;

  font-size: 18px;  
  font-weight: 500;
  text-align: center;
  color: rgb(var(--greyTitle));

  @media (min-width:1024px) { //desktop
    font-size: 22px;
  }
`
