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
  const emotionName = ['upset', 'sad', 'common', 'happy', 'joyful'].reverse();

  return (<Wrapper>
    <Title>
      <span>Emotion</span>
      <span className="type">#{emotionToggle === 5 ? 'all' : emotionName[4 - emotionToggle]}</span>
    </Title>
    <ScrollWrapper>
      {emotions.map((e, i) =>
        <EmotionWrapper
          key={emotionName[i]}
          className={`${emotionName[i]} ${emotionToggle === (4 - i) || emotionToggle === 5 ? 'selected' : ''}`}
          onClick={() => {
            if (emotionToggle === 4 - i) setEmotionToggle(5);
            else setEmotionToggle(4 - i);
            contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
          <Image className="icon" src={e} alt={emotionName[i]} width={128} height={128} />
        </EmotionWrapper>)
      }
    </ScrollWrapper>
  </Wrapper>);
}

export default EmotionSelection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

  width: inherit;

  padding : 20px 0;
  background-color: white;

  max-width: 600px;
`
const EmotionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  box-sizing: border-box;
  transition: opacity ease-in-out 200ms;

  width: 81px;
  width: 19%;
  height: auto;

  &:not(.selected){
    opacity: 0.67;
  }
  &.selected{
    filter: saturate(115%);
  }

`
const Title = styled.h1`
  span{
    font-size: 22px;
    font-weight: 700;
    text-transform: capitalize;
    margin-right: 8px;
    color : rgb(var(--greyTitle));
    
    &.type{
      font-weight: 500;
      color : ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    }
  }
  @media (max-width: 479px) { //mobile port
    padding: 0 5vw;
  }
`
const ScrollWrapper = styled.div`
  display: flex;
  width: 100dvw;
  width: inherit;
  justify-content: space-between;

  padding: 8px 0;
  @media (max-width: 479px) { //mobile port
    padding: 8px 5vw;
  }
`

