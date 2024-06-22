'use client';

import styled from "styled-components";
import { useCallback, useState } from "react";
import HabitInputButtons from "../HabitInput/Input_Buttons";
import HabitInputValues from "../HabitInput/Input_Values";
import { getCurrentUserEmail } from "@/function/getCurrentUserEmail";

const EditHabit = () => {

  const email = getCurrentUserEmail();
  const [habitName, setHabitName] = useState<string>('');
  const [themeColor, setThemeColor] = useState<string>('default');

  //habitId로 불러와서 값 넣기



  const historyBack = useCallback(() => {
    history.back();
  }, []);
  const editHabit = () => {

  };

  return (
    <Wrapper onClick={() => historyBack()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>Edit Habit</Title>
        <HabitInputValues habitName={habitName} setHabitName={setHabitName} />
        <Delete><button>delete</button></Delete>
        <HabitInputButtons onSubmit={editHabit} />
      </Modal>
    </Wrapper>);
}
export default EditHabit;

const Delete = styled.div`
  display: flex;
  justify-content: center;
  button{
    font-size: 18px;
    color: salmon;
  }
`

const Wrapper = styled.div`
  transition: all ease-in-out 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);

  text-transform: uppercase;
  color: rgb(var(--greyTitle));
`

const Modal = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  padding-top: 12px;
  padding-bottom: calc(var(--mobileNav) + 12px);

  @media (max-width: 479px) { //mobile port
    width: 90%;
    height: 40%;
    min-height: 400px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    min-width: 400px;
    width: 50%;
    height: 90%;
    max-height: 400px;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    min-width: 500px;
    width: 40%;
    height: 50%;
  }
`
const Title = styled.span`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 28px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
`