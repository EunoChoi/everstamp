'use client';

import Image from "next/image";
import styled from "styled-components";

import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';

interface Props {
  emotion: number;
  setEmotion: (n: number) => void;
}

const emotionData = [
  { id: 4, src: emotion4, alt: 'Joyful' },
  { id: 3, src: emotion3, alt: 'happy' },
  { id: 2, src: emotion2, alt: 'common' },
  { id: 1, src: emotion1, alt: 'sad' },
  { id: 0, src: emotion0, alt: 'angry' },
];

const EmotionRadioSelector = ({ emotion, setEmotion }: Props) => {
  return (<Wrapper>
    <RadioWrapper>
      {emotionData.map((data) =>
        <RadioButton key={`emotion-radio-${data.id}`}>

          <input
            type="radio"
            checked={data.id === emotion}
            name="diaryEmotion"
            value={data.id}
            onChange={(e) => {
              if (e.currentTarget.checked) setEmotion(Number(e.currentTarget.value));
            }}
          />
          <div className="emotion">
            <Image priority src={data.src} alt={data.alt} width={36} height={36} />
          </div>
          <div className="checkmark">
            <span>{data.alt}</span>
          </div>
        </RadioButton>)}
    </RadioWrapper>
  </Wrapper>);
}

export default EmotionRadioSelector;


const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
`
const RadioWrapper = styled.div`
  width: 100%;
  margin : 0;
  overflow: hidden;
  display: flex;
`
const RadioButton = styled.label`
  cursor: pointer;
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
    margin-top: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    /* font-weight: 600; */
    text-transform: capitalize;

    span{
      transition: all 200ms ease-in-out;
      border-radius: 56px;
      padding: 0 8px;
      border : 2px solid rgba(0,0,0,0);
    }
  }
  input:checked ~ .checkmark{
    span{
      border-color: rgba(0,0,0,0.1);
      background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + '90' : '#979FC7'};
    }
  }
`;
