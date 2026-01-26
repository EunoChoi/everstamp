'use client';

import Image from "next/image";
import styled from "styled-components";

import { EMOTIONS } from "@/common/constants/emotions";

interface Props {
  emotion: number;
  setEmotion: (n: number) => void;
}

const EmotionRadioSelector = ({ emotion, setEmotion }: Props) => {
  return (<Wrapper>
    <RadioWrapper>
      {EMOTIONS.map((data) =>
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
            <Image priority src={data.src} alt={data.nameKr} width={36} height={36} />
          </div>
          <div className="checkmark">
            <span>{data.nameKr}</span>
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
      border-radius: 12px;
      padding: 2px 10px;
      color: rgb(var(--greyTitle));
    }
  }
  input:checked ~ .checkmark{
    span{
      background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
      color: white;
    }
  }
`;
