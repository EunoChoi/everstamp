'use client';

import styled from "styled-components";

const COLOR_HEX_VALUE = ['#979FC7', '#8CADE2', '#83c6b6', '#eda5b1', '#8f8f8f'];
const COLOR_NAME_ENG = ['purple', 'blue', 'green', 'pink', 'grey'];

interface ThemeColorSelectorProps {
  themeColorUpdate: (themeColor: string) => void;
}

export const ThemeColorSelector = ({ themeColorUpdate }: ThemeColorSelectorProps) => {
  return (<Wrapper>
    <Color className="selected" />
    <Colors className="end">
      {COLOR_HEX_VALUE.map((e, i) =>
        <Color
          key={COLOR_NAME_ENG[i] + 'Color'}
          className={COLOR_NAME_ENG[i]}
          onClick={() => themeColorUpdate(e)}
        />)}
    </Colors>
  </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 0;
`
const Colors = styled.div`
  display: flex;
  gap: 8px;
`
const Color = styled.div`
  transition: all ease-in-out 0.3s;

  flex-shrink: 0;
  width: 36px;
  height: 36px;

  border: solid 2px rgba(0,0,0,0.2);
  border-radius: 8px;

  &.selected{
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  &.purple{
    background-color: #979FC7;
  }
  &.blue{
    background-color: #8CADE2;
  }
  &.pink{
    background-color: #eda5b1;
  }
  &.green{
    background-color: #83c6b6;
  }
  &.grey{
    background-color: #8f8f8f;
  }
`