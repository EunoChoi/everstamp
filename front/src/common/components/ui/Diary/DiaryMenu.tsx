'use client';

import { motion } from "framer-motion";
import styled from "styled-components";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

interface DiaryMenuProps {
  onEditDiary: () => void;
  onDeleteDiary: () => void;
  onToggleDiaryMenu: () => void;
}


//다이어리 수정, 삭제 모두 date이요하니까 date랑 toggle setter만 전달, 굳이 diaryDate 통으로 전달할 필요 X
const DiaryMenu = ({ onEditDiary, onDeleteDiary, onToggleDiaryMenu }: DiaryMenuProps) => {
  return (<Wrapper
    key='diary-menu'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Button onClick={onToggleDiaryMenu}>
      <ArrowBackIcon fontSize="medium" color="inherit" />
      <span>돌아가기</span>
    </Button>
    <Button onClick={onEditDiary}>
      <EditIcon fontSize="medium" color="inherit" />
      <span>일기 수정</span>
    </Button>
    <Button onClick={onDeleteDiary}>
      <DeleteForeverIcon fontSize="medium" color="inherit" />
      <span>일기 삭제</span>
    </Button>
  </Wrapper>);
}

export default DiaryMenu;


const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
`
const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  span{
    font-size: 14px;
  }
`