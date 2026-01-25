import styled from "styled-components";

import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";
import { MdAdd, MdRemove } from 'react-icons/md';


export const FontSizeSelector = () => {
  const { fontSize, fontSizeUp, fontSizeDown } = useSettingsContext();

  return (<FontSizeWrapper>
    <button onClick={fontSizeDown}>
      <MdRemove />
    </button>
    <span className="fontSize">{fontSize}</span>
    <button onClick={fontSizeUp}>
      <MdAdd />
    </button>
  </FontSizeWrapper>);
}

const FontSizeWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  span{
    &.fontSize {
      text-align: center;
      width: 60px;
      font-size: ${(props) => props.theme.fontSize ?? '15px'};
    }
  }
`