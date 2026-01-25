'use client'

import { Dispatch, ReactNode, SetStateAction } from "react";
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import styled from "styled-components";

interface DiaryInputSectorProps {
  children: ReactNode;
  sectorTitle: string;
  visibleToggle: boolean;
  setVisibleToggle: Dispatch<SetStateAction<boolean>>;
}

export const DiaryInputSection = ({ children, sectorTitle, visibleToggle, setVisibleToggle }: DiaryInputSectorProps) => {
  return (<Wrapper>
    <DiaryInputTitle>
      <span>{sectorTitle}</span>
      <button onClick={() => { setVisibleToggle(c => !c) }}>
        {visibleToggle ? <MdExpandLess /> : <MdExpandMore />}
      </button>
    </DiaryInputTitle>
    {visibleToggle ? children : <></>}
  </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  flex-shrink: 0;
`;
const DiaryInputTitle = styled.section`
  text-transform: capitalize;
  font-size: 22px;

  color: rgb(var(--greyTitle));
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;