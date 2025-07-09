import styled from "styled-components";

import { useSettingsContext } from "@/common/utils/settingsContext/useSettingsContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export const FontSizeSelector = () => {
  const { fontSize, fontSizeUp, fontSizeDown } = useSettingsContext();

  return (<FontSizeWrapper>
    <button onClick={fontSizeDown}>
      <RemoveIcon fontSize="small" />
    </button>
    <span className="fontSize">{fontSize}</span>
    <button onClick={fontSizeUp}>
      <AddIcon fontSize="small" />
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