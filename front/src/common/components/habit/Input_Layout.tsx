'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import HabitInputButtons from "./Input_Buttons";
import HabitInputValues from "./Input_Values";
import Axios from "@/Axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useCustomRouter } from "@/common/function/customRouter";
import $Modal from "@/common/style/common_modal";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import $Common from "@/common/style/common";


interface EditHabitProps {
  habitName: string;
  // themeColor?: string;
  priority: number;
}
interface Err {
  response: {
    data: string;
  }
}

interface Props {
  habitName: string;
  setHabitName: (name: string) => void;
  priority: number;
  setPriority: (priority: number) => void;
  typeText: string;
  onSubmit: () => void;
  isLoading: boolean;
}

const HabitInputLayout = ({ typeText, onSubmit, isLoading, habitName, setHabitName, priority, setPriority }: Props) => {

  const router = useCustomRouter();

  return (
    <$Modal.Background onClick={() => router.back()}>
      <HabitModalWrapper onClick={(e) => e.stopPropagation()}>
        <$Modal.Top>
          <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
          <span className="title">목표 습관</span>
          <button onClick={onSubmit} disabled={isLoading}>{typeText}</button>
        </$Modal.Top>
        <$Common.Empty />
        <HabitInputValues habitName={habitName} setHabitName={setHabitName} priority={priority} setPriority={setPriority} />
        <SubText>*최대 생성 가능 개수 : 18개, 이름 길이 제한 : 1~10</SubText>
        <$Common.Empty />
      </HabitModalWrapper>
    </$Modal.Background>);
}
export default HabitInputLayout;

const HabitModalWrapper = styled($Modal.Wrapper)`
  @media (min-width:1024px) { //desktop
    height: 600px;
  }
`
const SubText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: salmon;

  font-size: 14px;
  margin-bottom: 32px;
`