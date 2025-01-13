import Image from "next/image";
import styled from "styled-components";

import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';

interface Props {
  setEmotionToggle: (n: number) => void;
  emotionToggle: number;
}

const EmotionSelector = ({ setEmotionToggle, emotionToggle }: Props) => {
  const emotions = [emotion0, emotion1, emotion2, emotion3, emotion4].reverse();
  const EMOTION_NAME_ENG = ['angry', 'sad', 'common', 'happy', 'joyful'].reverse();

  return (<EmotionlWrapper>
    {emotions.map((e, i) =>
      <EmotionImage
        key={EMOTION_NAME_ENG[i]}
        className={`icon ${EMOTION_NAME_ENG[i]} ${emotionToggle === (4 - i) || emotionToggle === 5 ? 'selected' : ''}`}
        onClick={() => {
          if (emotionToggle === 4 - i) setEmotionToggle(5);
          else setEmotionToggle(4 - i);
        }}
        src={e} alt={EMOTION_NAME_ENG[i]} width={128} height={128} />
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

