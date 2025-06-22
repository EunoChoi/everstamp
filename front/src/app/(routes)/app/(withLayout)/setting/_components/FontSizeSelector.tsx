import styled from "styled-components";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface FontSizeSelectorProps {
  fontSizeUpdate: (type: "Up" | "Down") => void;
}

export const FontSizeSelector = ({ fontSizeUpdate }: FontSizeSelectorProps) => {
  return (<FontSizeWrapper>
    <button onClick={() => fontSizeUpdate('Down')}>
      <RemoveIcon fontSize="small" />
    </button>
    <span className="fontSize">가나다</span>
    <button onClick={() => fontSizeUpdate('Up')}>
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
      font-size: var(--font-size-base);
    }
  }
`