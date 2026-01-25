import Image from "next/image";
import styled from "styled-components";

import { EMOTIONS } from "@/common/constants/emotions";

interface Props {
  setEmotionToggle: (n: number) => void;
  emotionToggle: number;
}

const EmotionSelector = ({ setEmotionToggle, emotionToggle }: Props) => {
  return (<EmotionlWrapper>
    {EMOTIONS.map((e) =>
      <EmotionImage
        key={e.name}
        className={`icon ${e.name} ${emotionToggle === e.id || emotionToggle === 5 ? 'selected' : ''}`}
        onClick={() => {
          if (emotionToggle === e.id) setEmotionToggle(5);
          else setEmotionToggle(e.id);
        }}
        src={e.src} alt={e.name} width={128} height={128} />
    )}
  </EmotionlWrapper>);
}

export default EmotionSelector;

const EmotionlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: inherit;
`
const EmotionImage = styled(Image)`
  cursor: pointer;

  box-sizing: border-box;
  transition: opacity ease-in-out 200ms;

  width: 17%;
  max-width: 100px;
  flex-shrink: 0;

  &:not(.selected){ opacity: 0.5;}
  &.selected{filter: saturate(115%);}
`

