'use client'

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dispatch, ReactNode, SetStateAction } from "react";
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
        {visibleToggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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