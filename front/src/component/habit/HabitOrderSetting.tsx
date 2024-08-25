import { getHabits } from '@/app/(afterLogin)/_lib/habit';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';


import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';

interface Habit {
  name: string;
  id: number;
}

const HabitOrderSetting = () => {

  const { data } = useQuery({
    queryKey: ['habits', 'list', 'ASC'],
    queryFn: () => getHabits({ sort: 'ASC' }),
  });


  const [habits, setHabits] = useState<Habit[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [dragItemIdx, setDragItemIdx] = useState<number>();

  let dragItemEl: HTMLElement;
  let updatedIndex: number;

  let container: HTMLDivElement | null;
  let dragItem: ChildNode;
  let notDragItem: ChildNode[];

  let items: ChildNode[];
  let bottomItems: ChildNode[];
  let dragItemBounding: DOMRect;

  let originX: number;
  let originY: number;

  let height: number;

  useEffect(() => {
    const temp: Habit[] = data ? data.flat() : [];
    setHabits(temp);
  }, [data]);

  useEffect(() => {
    if (dragItemIdx !== null) {
      // dragItemIdx 상태가 업데이트된 이후에 동작 실행
      // 여기에 dragStart 이후에 처리할 추가 작업 넣기
      console.log("dragItemIdx updated:", dragItemIdx);
    }
  }, [dragItemIdx]);




  const dragStart = (e: React.PointerEvent<HTMLButtonElement>, index: number) => {
    const tempDragItemIdx = index;
    container = containerRef.current;
    console.log('drag start, dragItem index : ', tempDragItemIdx);


    if (container) {
      items = Array.from(container.childNodes);
      dragItem = items[tempDragItemIdx];
      dragItemEl = dragItem as HTMLElement;
      notDragItem = items.filter((_, i) => i !== tempDragItemIdx);
      bottomItems = items.slice(index + 1);

      dragItemBounding = dragItemEl.getBoundingClientRect();
      height = dragItemBounding.height;
      const distance = dragItemBounding.height;

      //drag item style update
      dragItemEl.style.position = 'fixed';
      dragItemEl.style.zIndex = '1000';
      dragItemEl.style.width = dragItemBounding.width + 'px';
      dragItemEl.style.height = dragItemBounding.height + 'px';
      dragItemEl.style.top = dragItemBounding.top + 'px';
      dragItemEl.style.left = dragItemBounding.left + 'px';
      dragItemEl.style.cursor = 'grabbing';

      //bottom item style update
      bottomItems.forEach(item => {
        if (item instanceof HTMLElement) {
          item.style.transform = `translateY(${distance}px)`;
        }
      })

      //drag start cursor point
      originX = e.clientX;
      originY = e.clientY;

      setDragItemIdx(tempDragItemIdx);
    }
    window.addEventListener('pointermove', dragMove);
    window.addEventListener('touchmove', dragMove);
    window.addEventListener('pointerup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    console.log('drag start event end')
  }

  const dragMove = (e: PointerEvent | TouchEvent) => {

    console.log('drag move event start, drag item Index : ', dragItemIdx);
    const dragX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const dragY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

    // const posX = dragX - originX;
    const posY = dragY - originY;

    if (dragItem instanceof HTMLElement) {
      // dragItem.style.transform = `translate(${posX}px, ${posY}px)`;
      dragItem.style.transform = `translateY(${posY}px)`;
    }

    notDragItem.forEach((item, i) => {
      const itemEl = (item as HTMLElement);
      const otherElTop = itemEl.getBoundingClientRect().y; //other item y
      const otherElBottom = otherElTop + height;
      const isOverlapping = dragY > otherElTop && dragY < otherElBottom;

      if (isOverlapping) {
        console.log('overlapp');
        const itemEl = item as HTMLElement;
        if (itemEl.getAttribute('style')) { //if drag move down
          itemEl.style.transform = '';
          updatedIndex = i + 1;
        }
        else { //if drag move down
          itemEl.style.transform = `translateY(${height}px)`;
          updatedIndex = i;
        }
      }
    })
  }

  const dragEnd = () => {
    console.log('drag end');
    console.log(updatedIndex);

    //items style initialize
    items.forEach(item => {
      const itemEl = item as HTMLElement;
      itemEl.style.cssText = '';
    })


    if (dragItemIdx) {
      const nonDragHabits = habits.filter((_, i) => i !== dragItemIdx);
      console.log('none', nonDragHabits)
      nonDragHabits.splice(updatedIndex, 0, habits[dragItemIdx!]);
      console.log('none after', nonDragHabits);
      setHabits(nonDragHabits);

      setDragItemIdx(99);
    }


    window.removeEventListener('pointermove', dragMove);
    window.removeEventListener('pointerup', dragEnd);
    window.removeEventListener('touchmove', dragMove);
    window.removeEventListener('touchend', dragEnd);
  }

  // console.log(dragItemIdx ? dragItemIdx : '');

  return (<Wrapper>
    <span>drag : {dragItemIdx}</span>

    <Container ref={containerRef}>
      {habits && habits?.map((habit: any, index: number) =>
        <Box
          key={habit.id}
          onContextMenu={(e) => e.preventDefault()}
        >
          <HabitList className={index == dragItemIdx ? 'dragItem' : ''}>
            <React.Fragment></React.Fragment>
            <span>{habit.id}-{habit.name}</span>
            <Button
              onPointerDown={e => dragStart(e, index)}>
              <DragIndicatorRoundedIcon className='icon' fontSize='inherit' />
            </Button>
          </HabitList>
        </Box>
      )}

    </Container>


  </Wrapper>);
}

export default HabitOrderSetting;

const HabitList = styled.div`
  &.dragItem{
    background-color: salmon;
  }
`
const Container = styled.div`
  width: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: start;
  align-items: center;
`
const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  padding: 32px 12px;

  overflow: scroll;

  position: fixed;
  top: 0;
  left:0;

 

  /* transform: translateX(-50%);
  transform: translateY(-50%); */

  z-index: 999;

  background-color: #bddae6;
`

const Box = styled.div`
  width: 100%;
  height: 36px;

  flex-shrink: 0;

  /* background-color: #fff;
  border : 2px solid grey; */
  /* margin: 8px; */

  display: flex;
  justify-content: center;
  align-items: center;

  transition: ease-in-out 200ms height;
`
const Button = styled.button`
  font-size: 24px;
  .icon{
    display: flex;
    align-items: center;
  }
`
