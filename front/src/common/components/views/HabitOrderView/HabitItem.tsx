'use client'

import { StarRating } from "@/common/components/ui/StarRating";
import styled from "styled-components";



import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
//for dnd
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HabitItemProps } from "./_types";


export const HabitItem = ({ habit }: HabitItemProps) => {

  const {
    setNodeRef, //이동 대상 ref
    attributes, //드래그 유발 대상 속성 
    listeners, //드래그 유발 대상 이벤트 리스너
    transform, //CSS 위한 계산값
    transition, //CSS 위한 계산값
    isDragging, //드래그 여부
  } = useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Wrapper
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
    >
      <span className='star'><StarRating rating={habit?.priority + 1}></StarRating></span>
      <span className='name'>{habit?.name}</span>
      <button
        {...attributes}
        {...listeners}
      >
        <DragIndicatorRoundedIcon className='icon' fontSize='inherit' />
      </button>
    </Wrapper>);
}

const Wrapper = styled.div<{ $isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  max-width: 420px;
  height: 48px;

  padding: 4px 18px;
  margin: 4px 0;
  font-size: 16px;

  color: rgb(var(--greyTitle));
  background-color: #f9f9f9;
  border: solid 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  background-color: ${(props) => (props.$isDragging ? '#fff' : '#f9f9f9')};
  color: rgb(var(--greyTitle));
  border: solid 2px ${(props) => (props.$isDragging && props.theme.point ? props.theme.point : 'rgba(0, 0, 0, 0.1)')};
  box-shadow: ${(props) => (props.$isDragging ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none')};

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
    touch-action: none;
    width: 20%;
    color: darkgrey;
  }
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`