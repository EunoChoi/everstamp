import { emotions } from "@/common/images/emotions";
import Image from "next/image";
import styled from "styled-components";

interface EmotionSelectorProps {
  setEmotion: (n: number | undefined) => void;
  emotion: number | undefined;
}

const EmotionSelector = ({ emotion, setEmotion }: EmotionSelectorProps) => {
  return (<EmotionlWrapper>
    {emotions.map((e, i) =>
      <EmotionImage
        key={e.alt}
        className={`${i === emotion ? 'selected' : ''}`}
        onClick={() => {
          if (emotion === i) {
            setEmotion(undefined);
          } else {
            setEmotion(i);
          }
        }}
        src={e.src}
        alt={e.alt}
        width={128}
        height={128} />
    )}
  </EmotionlWrapper>);
}

export default EmotionSelector;

const EmotionlWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: inherit;
  width: 100%;
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

