import { useState } from "react";
import styled from "styled-components";

import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import SentimentNeutralTwoToneIcon from '@mui/icons-material/SentimentNeutralTwoTone';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';

interface Props {
  emotion: number;
  setEmotion: (n: number) => void;
}

const DiaryInputEmotion = ({ emotion, setEmotion }: Props) => {

  const emotions =
    [<SentimentVeryDissatisfiedTwoToneIcon />,
    <SentimentDissatisfiedTwoToneIcon />,
    <SentimentNeutralTwoToneIcon />,
    <SentimentSatisfiedTwoToneIcon />,
    <SentimentVerySatisfiedTwoToneIcon />];


  return (<Wrapper>
    {/* <Title>emotion check</Title> */}
    <RadioWrapper>
      {emotions.map((e: JSX.Element, i: number) =>
        <RadioButton key={'radio' + i}>
          <input type="radio" checked={i === emotion} name="priority" value={i} onChange={(e) => {
            if (e.currentTarget.checked) setEmotion(Number(e.currentTarget.value));
          }} />
          <div className="checkmark">{e}</div>
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
  @media (min-height:480px) and (min-width:1024px) { //desktop
    padding: 20px;
    padding-bottom: 0;
  }
`

const Title = styled.span`
  font-weight: 500;
  font-size: 18px;
  margin-left: 2px;
  text-transform: capitalize;
  color: rgb(var(--greyTitle));
`
const RadioWrapper = styled.div`
  width: 100%;
  margin : 0;
  height: 42px;
  border : 2px solid  ${(props) => props.theme.point ? props.theme.point + '70' : '#9797CB'};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
`
const RadioButton = styled.label`
  position: relative;
  width: 100%;
  height: 100%;
  border-right : 2px solid  ${(props) => props.theme.point ? props.theme.point + '70' : '#9797CB'};
  &:last-child{
    border: none;
  }
  input{
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
  .checkmark{
    box-sizing: border-box;
    cursor: pointer;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    color: rgb(var(--greyTitle));
    color:  ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
    font-size: 14px;
  }
  input:checked ~ .checkmark{
    background-color: ${(props) => props.theme.point ? props.theme.point + '40' : '#9797CB'};
    /* color: rgb(var(--greyTitle)); */
    /* color: white; */
  }
`;
