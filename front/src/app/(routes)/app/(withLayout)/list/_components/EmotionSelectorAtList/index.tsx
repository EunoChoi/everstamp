import styled from "styled-components";
import Image from "next/image";

import emotion0 from '/public/img/emotion/emotion0.png'
import emotion1 from '/public/img/emotion/emotion1.png'
import emotion2 from '/public/img/emotion/emotion2.png'
import emotion3 from '/public/img/emotion/emotion3.png'
import emotion4 from '/public/img/emotion/emotion4.png'

interface Props {
  contentRef: React.RefObject<HTMLDivElement>
  setEmotionToggle: (n: number) => void;
  emotionToggle: number;
}

const EmotionSelection = ({ contentRef, setEmotionToggle, emotionToggle }: Props) => {
  const emotions = [emotion0, emotion1, emotion2, emotion3, emotion4].reverse();
  const EMOTION_NAME_ENG = ['upset', 'sad', 'common', 'happy', 'joyful'].reverse();

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Emotion</Title>
        <Title className="emotionType">#{emotionToggle === 5 ? 'all' : EMOTION_NAME_ENG[4 - emotionToggle]}</Title>
      </TitleWrapper>
      <EmotionlWrapper>
        {emotions.map((e, i) =>
          <EmotionImage
            key={EMOTION_NAME_ENG[i]}
            className={`icon ${EMOTION_NAME_ENG[i]} ${emotionToggle === (4 - i) || emotionToggle === 5 ? 'selected' : ''}`}
            onClick={() => {
              if (emotionToggle === 4 - i) setEmotionToggle(5);
              else setEmotionToggle(4 - i);
              contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            src={e} alt={EMOTION_NAME_ENG[i]} width={128} height={128} />
        )}
      </EmotionlWrapper>
    </Wrapper>);
}

export default EmotionSelection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex-shrink: 0;

  box-sizing: border-box;
  padding : 4px 0;
  height: auto;
  width: inherit;
  max-width: 600px;
  overflow: hidden;
  margin: 12px 0;
`
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.div`
  margin-right: 8px;
  
  font-size: 22px;
  font-weight: 700;
  text-transform: capitalize;
  color : rgb(var(--greyTitle));

  &.emotionType{
    font-weight: 500;
    color : ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
`
const EmotionlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: inherit;
  padding: 4px 0;
`
const EmotionImage = styled(Image)`
   box-sizing: border-box;
   transition: opacity ease-in-out 200ms;

   width: 17%;
   max-width: 100px;
   flex-shrink: 0;

   &:not(.selected){ opacity: 0.65;}
   &.selected{filter: saturate(115%);}
`

