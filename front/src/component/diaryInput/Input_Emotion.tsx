import styled from "styled-components";

// import emotion0 from '/public/img/emotion/circle_emotion0.png'
// import emotion1 from '/public/img/emotion/circle_emotion1.png'
// import emotion2 from '/public/img/emotion/circle_emotion2.png'
// import emotion3 from '/public/img/emotion/circle_emotion3.png'
// import emotion4 from '/public/img/emotion/circle_emotion4.png'

import emotion0 from '/public/img/emotion/emotion0.png'
import emotion1 from '/public/img/emotion/emotion1.png'
import emotion2 from '/public/img/emotion/emotion2.png'
import emotion3 from '/public/img/emotion/emotion3.png'
import emotion4 from '/public/img/emotion/emotion4.png'
import Image from "next/image";

interface Props {
  emotion: number;
  setEmotion: (n: number) => void;
}

const DiaryInputEmotion = ({ emotion, setEmotion }: Props) => {

  const emotions =
    [<Image priority src={emotion0} alt="angry" width={28} height={28} />,
    <Image priority src={emotion1} alt="sad" width={28} height={28} />,
    <Image priority src={emotion2} alt="common" width={28} height={28} />,
    <Image priority src={emotion3} alt="happy" width={28} height={28} />,
    <Image priority src={emotion4} alt="Joyful" width={28} height={28} />];


  return (<Wrapper>
    <RadioWrapper>
      {emotions.map((e: JSX.Element, i: number) =>
        <RadioButton key={'radio' + i}>
          <input
            type="radio"
            checked={i === emotion}
            name="diaryEmotion"
            value={i}
            onChange={(e) => {
              if (e.currentTarget.checked) setEmotion(Number(e.currentTarget.value));
            }}
          />
          <div className="emotion">{e}</div>
          <div className="checkmark">
            <span>{e.props.alt}</span>
          </div>
        </RadioButton>)}
    </RadioWrapper>
  </Wrapper>);
}

export default DiaryInputEmotion;

const Wrapper = styled.div`
  width: 100%;
  height: auto;

  @media (max-width: 479px) { //mobile port
    padding: 16px;
    padding-bottom: 0;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 12px;
    padding-bottom: 0;
  }
  @media (min-width:1024px) { //desktop
    padding: 20px;
    padding-bottom: 0;
  }
`
const RadioWrapper = styled.div`
  width: 100%;
  margin : 0;
  overflow: hidden;
  display: flex;
`
const RadioButton = styled.label`
  position: relative;
  width: 100%;
  height: 100%;
  &:last-child{
    border: none;
  }
  input{
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
  .emotion{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .checkmark{
    width: 100%;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    font-weight: 600;
    text-transform: capitalize;

    span{
      transition: all 200ms ease-in-out;
      border-radius: 56px;
      padding: 2px 8px;
      border : 2px solid rgba(0,0,0,0);
    }
  }
  input:checked ~ .checkmark{
    span{
      border : 2px solid rgba(0,0,0,0.1);
      background-color: ${(props) => props.theme.point ? props.theme.point + '60' : '#979FC7'};
    }
  }
`;
