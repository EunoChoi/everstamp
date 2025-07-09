'use client';

import { THEME_COLORS, THEME_COLORS_NAME } from "@/common/utils/settingsContext/SettingsContext";
import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";
import styled from "styled-components";

export const ThemeColorSelector = () => {
  const { setThemeColor } = useSettingsContext();

  return (<Wrapper>
    <Color className="selected" />
    <Colors className="end">
      {THEME_COLORS.map((e, i) =>
        <Color
          key={THEME_COLORS_NAME[i] + 'Color'}
          className={THEME_COLORS_NAME[i]}
          onClick={() => {
            setThemeColor(THEME_COLORS[i]);
          }}
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
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
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