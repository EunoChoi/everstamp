'use client';

import Image from "next/image";
import styled from "styled-components";

import { EMOTIONS } from "@/common/constants/emotions";

interface Props {
  emotion: number;
  setEmotion: (n: number) => void;
}

const EmotionRadioSelector = ({ emotion, setEmotion }: Props) => {
  const firstRow = EMOTIONS.slice(0, 5);
  const secondRow = EMOTIONS.slice(5, 10);

  return (
    <Wrapper>
      <RadioWrapper>
        {firstRow.map((data) =>
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
          </RadioButton>
        )}
      </RadioWrapper>
      <RadioWrapper>
        {secondRow.map((data) =>
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
          </RadioButton>
        )}
      </RadioWrapper>
    </Wrapper>
  );
}

export default EmotionRadioSelector;


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioWrapper = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  min-height: 70px;
  flex-shrink: 0;
  gap: 4px;
`;
const RadioButton = styled.label`
  cursor: pointer;
  position: relative;
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 4px;
  box-sizing: border-box;
  
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
    flex-shrink: 0;
    margin-bottom: 4px;
    
    img {
      filter: brightness(1.1);
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  }
  .checkmark{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    font-size: 13px;
    text-transform: capitalize;
    white-space: nowrap;

    span{
      transition: all 200ms ease-in-out;
      border-radius: 12px;
      padding: 4px 8px;
      color: rgb(var(--greyTitle));
      text-align: center;
      line-height: 1.2;
    }
  }
  input:checked ~ .checkmark{
    span{
      background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
      color: white;
    }
  }
`;
