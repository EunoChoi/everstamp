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
      <EmotionWrapper
        className={`all ${emotionToggle == 5 ? 'selected' : ''}`}
        onClick={() => {
          setEmotionToggle(5);
          contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
        All
      </EmotionWrapper>
      {emotions.map((e, i) =>
        <EmotionWrapper
          key={emotionName[i]}
          className={`${emotionName[i]} ${emotionToggle === (4 - i) ? 'selected' : ''}`}
          onClick={() => {
            setEmotionToggle(4 - i);
            contentRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
          <Img className="icon" src={e} alt={emotionName[i]} width={140} height={140} />
        </EmotionWrapper>)
      }
    </ScrollWrapper>
  </Wrapper>);
}

export default EmotionSelection;

const EmotionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  box-sizing: border-box;

  transition: opacity ease-in-out 200ms;

  width: 81px;
  width: 21%;
  height: auto;
  margin-right: 8px;

  &:last-child{
    margin-right: 0;
  }
  &.all{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    border-radius: 72px;

    text-transform: capitalize;
    font-size: 24px;
    color : rgb(var(--greyTitle));

    border: 2px solid rgba(0,0,0,0.05);
    background-color: ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};

    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      font-size: 26px;
    }
    @media (min-width:1024px) { //desktop
      font-size: 32px;
    }
  }
  &:not(.selected){
    opacity: 0.75;
  }

`

const Img = styled(Image)`
  /* flex-shrink: 0;
  clip-path: inset(12px 12px 12px 12px); */
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

  width: inherit;

  padding : 20px 0;
  background-color: white;

  max-width: 600px;
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
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
  }
  @media (min-width:1024px) { //desktop
  }
`
const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: scroll;

  width: 100dvw;
  width: inherit;

  
  @media (max-width: 479px) { //mobile port
    padding: 8px 5vw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 8px 0;
  }
  @media (min-width:1024px) { //desktop
    padding: 8px 0;
  }
`

