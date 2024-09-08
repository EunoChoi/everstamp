'use client';

import { getHabits } from '@/function/fetch/habit';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';


import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import BottomButtonArea from '../common/BottomButtonArea';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { getCurrentUser } from '@/function/fetch/user';
import { enqueueSnackbar } from 'notistack';

import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { useCustomRouter } from '@/function/customRouter';


interface Habit {
  name: string;
  id: number;
}

const NStart = (n: number) => {
  return (
    <>
      {Array(n).fill(0).map((_, i) => (
        <StarPurple500OutlinedIcon key={'star' + i} fontSize="inherit" />
      ))}
    </>
  );
}

const HabitOrderModal = () => {

  const router = useCustomRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [dragItemIndex, setDragItemIndex] = useState<number>();

  const { data: user = { email: '' } } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
  const userEmail: string = user.email ? user.email : '';

  const [customOrder, setCustomOrder] = useState<number[]>(() => {
    const localData = localStorage.getItem(userEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['habitCustomOrder'] ? jsonLocalData['habitCustomOrder'] : [];
    }
    else return [];
  });


  const { data: RQ_custom_habits } = useQuery({
    queryKey: ['habits', 'list', 'CUSTOM'],
    queryFn: () => getHabits({ sort: 'CUSTOM', customOrder }),
  });
  const { data: RQ_asc_habits } = useQuery({
    queryKey: ['habits', 'list', 'ASC'],
    queryFn: () => getHabits({ sort: 'ASC' }),
  });


  useEffect(() => {
    setHabits(RQ_custom_habits ? RQ_custom_habits.flat() : []);
  }, [RQ_custom_habits]);

  const onInitialize = () => {
    setHabits(RQ_asc_habits ? RQ_asc_habits.flat() : []);
  }
  const onSubmit = () => {
    let localData = localStorage.getItem(userEmail)
    let jsonLocalData;
    if (localData) {
      jsonLocalData = JSON.parse(localData);
    }
    try {
      localStorage.setItem(userEmail, JSON.stringify({
        ...jsonLocalData,
        habitCustomOrder: habits.map(e => e.id)
      }));
      router.back();
      setTimeout(() => {
        enqueueSnackbar('변경 완료', { variant: 'success' });
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };

  const dragStart = (e: React.PointerEvent<HTMLButtonElement>, index: number) => {

    setDragItemIndex(index);

    const fromIndex: number = index;
    let toIndex: number = fromIndex;

    const container: HTMLDivElement | null = containerRef.current; if (!container) return;

    const allitems: ChildNode[] = Array.from(container.childNodes);
    const otherItems: ChildNode[] = allitems.filter((_, i) => i !== fromIndex);
    const bottomItems: ChildNode[] = allitems.slice(fromIndex + 1);

    const dragItem: ChildNode = allitems[fromIndex];
    const dragItemEl: HTMLElement = dragItem as HTMLElement;

    const containterInfo: DOMRect = container.getBoundingClientRect();
    const dragItemInfo: DOMRect = dragItemEl.getBoundingClientRect();

    //drag item style update
    dragItemEl.style.position = 'fixed';
    dragItemEl.style.zIndex = '1000';
    dragItemEl.style.width = dragItemInfo.width + 'px';
    dragItemEl.style.height = dragItemInfo.height + 'px';
    dragItemEl.style.top = dragItemInfo.top + 'px';
    dragItemEl.style.left = dragItemInfo.left + 'px';
    dragItemEl.style.cursor = 'grabbing';

    //bottom items position update
    bottomItems.forEach(item => {
      if (item instanceof HTMLElement) {
        item.style.transform = `translateY(${dragItemInfo.height}px)`;
      }
    })


    //for align center
    const emptyDiv: HTMLDivElement = document.createElement('div');
    emptyDiv.className = 'empty';
    container.appendChild(emptyDiv);

    //drag start cursor point
    const originY = e.clientY;



    const handleDragMove = (e: PointerEvent | TouchEvent) => dragMove(e, fromIndex);
    const dragMove = (e: PointerEvent | TouchEvent, fromIndex: number) => {
      const dragY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      const posY = dragY - originY;
      if (containterInfo.top < dragY && dragY < containterInfo.bottom) {
        dragItemEl.style.transform = `translateY(${posY}px)`;
      }


      // otherItem postion update
      otherItems.forEach((item, i) => {
        const itemEl = (item as HTMLElement);
        const otherElTop = itemEl.getBoundingClientRect().y; //other item y
        const otherElBottom = otherElTop + dragItemInfo.height;
        const isOverlapping = dragY > otherElTop && dragY < otherElBottom;

        if (isOverlapping) {
          const itemEl = item as HTMLElement;
          if (itemEl.getAttribute('style')) { //if drag move down
            itemEl.style.transform = '';
            toIndex = i + 1;
          }
          else { //if drag move down
            itemEl.style.transform = `translateY(${dragItemInfo.height}px)`;
            toIndex = i;
          }
        }
      })
    }

    const dragEnd = () => {
      allitems.forEach(item => {
        const itemEl = item as HTMLElement;
        itemEl.style.cssText = '';
      })

      setDragItemIndex(-1);
      container.removeChild(emptyDiv);

      const otherHabitsData = habits.filter((_, i) => i !== fromIndex)
      otherHabitsData.splice(toIndex, 0, habits[fromIndex]);
      setHabits(otherHabitsData);

      window.removeEventListener('pointermove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('pointerup', dragEnd);
      window.removeEventListener('touchend', dragEnd);
    }


    window.addEventListener('pointermove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('pointerup', dragEnd);
    window.addEventListener('touchend', dragEnd);
  }

  return (<Wrapper onClick={() => router.back()}>
    <Modal onClick={(e) => {
      e.stopPropagation();
    }}>
      <Title>
        <span>Habit List Order</span>
      </Title>
      <Container >
        <EmptyBox />
        <Lists ref={containerRef}>
          {habits && habits?.map((habit: any, i: number) =>
            <ListWrapper key={habit.id}>
              <List className={i == dragItemIndex ? 'dragItem' : ''}>
                <span className='star'>{NStart(habit?.priority + 1)}</span>
                <span className='name'>{habit?.name}</span>
                <Button
                  onContextMenu={(e) => e.preventDefault()}
                  onPointerDown={e => dragStart(e, i)}>
                  <DragIndicatorRoundedIcon className='icon' fontSize='inherit' />
                </Button>
              </List>
            </ListWrapper>
          )}
        </Lists>
        <Button className='initialize' onClick={onInitialize}>초기화</Button>
        <EmptyBox />
      </Container>


      <BottomButtonArea>
        <Button onClick={() => router.back()} >
          <CloseRoundedIcon className="icon" />
        </Button>
        <Button onClick={onSubmit} >
          <CheckRoundedIcon className="icon" />
        </Button>
      </BottomButtonArea>
    </Modal>
  </Wrapper>);
}

export default HabitOrderModal;

const Wrapper = styled.div`
  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  animation: fadeIn 300ms ease-in-out;
  
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  /* background-color: rgba(0,0,0,0.2); */
  backdrop-filter: blur(4px);
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  
  box-shadow: 0px 0px 64px rgba(0,0,0,0.25);

  width: 100%;
  height: 100%;

  @media (min-width:1024px) { //desktop
    width: 550px;
    height: 85%;
    border-radius: 24px;
  }
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: start;
  align-items: center;

  padding: 18px 0;
  overflow-y: scroll;

  .empty{
    width: 100%;
    height: 48px;
    pointer-events: none;
  }
`
const Lists = styled.div`
  width: 100%;
  height: auto;
`
const ListWrapper = styled.div`
  width: 100%;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`
const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 4px 18px;
  font-weight: 500;
  font-size: 16px;

  background-color: #f9f9f9;
  color: rgb(var(--greyTitle));
  border: solid 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 90%;
  max-width: 420px;
  height: 85%;

  &.dragItem{
   border-color:  ${(props) => props.theme.point ? props.theme.point + '80' : '#979FC7'};
   background-color: #fff;
  }

  .star, .name, button{
    display: flex;
    justify-content: center;
  }
  .star{
    width: 20%;
    font-size: 16px;
    color:  ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  .name{
    width: 60%;
    overflow-x: scroll;
  }
  button{
    width: 20%;
  }
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const EmptyBox = styled.div`
  flex-grow: 1;
`
const Title = styled.div`
  color: rgb(var(--greyTitle));
  /* color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'}; */
  font-weight: 600;
  font-size: 20px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: end;
  span{
    padding: 4px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 26px;
  }
`
const Button = styled.button`
  color: rgba(0,0,0,0.3) !important;
  font-weight: 500;
  &.initialize{
    text-transform: capitalize;
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
    font-size: 16px;
    padding-top: 8px;
  }
`