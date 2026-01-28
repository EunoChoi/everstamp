import Image from "next/image";
import styled from "styled-components";

import { EMOTIONS } from "@/common/constants/emotions";

interface Props {
  setEmotionToggle: (n: number) => void;
  emotionToggle: number;
}

const EmotionSelector = ({ setEmotionToggle, emotionToggle }: Props) => {
  return (<EmotionWrapper>
    {EMOTIONS.map((e) =>
      <EmotionItem
        key={e.name}
        className={`${emotionToggle === e.id || emotionToggle === 5 ? 'selected' : ''}`}
        onClick={() => {
          if (emotionToggle === e.id) setEmotionToggle(5);
          else setEmotionToggle(e.id);
        }}
      >
        <EmotionImage
          className={`icon ${e.name}`}
          src={e.src} alt={e.name} width={128} height={128} />
        <EmotionName>{e.nameKr}</EmotionName>
      </EmotionItem>
    )}
  </EmotionWrapper>);
}

export default EmotionSelector;

const EmotionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: inherit;
`

const EmotionImage = styled(Image)`
  box-sizing: border-box;
  transition: opacity ease-in-out 200ms;

  width: 60px;
  height: 60px;
  flex-shrink: 0;
  object-fit: contain;
  filter: brightness(1.1);

  @media (max-width: 479px) {
    width: 50px;
    height: 50px;
  }

  @media (min-width: 1025px) {
    width: 70px;
    height: 70px;
  }
`

const EmotionName = styled.span`
  font-size: 14px;
  color: rgb(var(--greyTitle));
  text-align: center;
  opacity: 0.7;
  transition: opacity ease-in-out 200ms;

  @media (max-width: 479px) {
    font-size: 13px;
  }

  @media (min-width: 1025px) {
    font-size: 15px;
  }
`

const EmotionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;

  &.selected ${EmotionImage} {
    filter: brightness(1.1) saturate(115%);
    opacity: 1;
  }
  
  &:not(.selected) ${EmotionImage} {
    opacity: 0.5;
  }

  &.selected ${EmotionName} {
    opacity: 1;
    font-weight: 600;
  }

  &:not(.selected) ${EmotionName} {
    opacity: 0.5;
  }
`
