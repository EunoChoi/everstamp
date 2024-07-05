import styled from "styled-components";

import emotion0 from '../../public/img/emotion/emotion0.png'
import emotion1 from '../../public/img/emotion/emotion1.png'
import emotion2 from '../../public/img/emotion/emotion2.png'
import emotion3 from '../../public/img/emotion/emotion3.png'
import emotion4 from '../../public/img/emotion/emotion4.png'
import Image from "next/image";

interface Props {
  emotion: number;
  setEmotion: (n: number) => void;
}

const EmotionSelector = ({ emotion, setEmotion }: Props) => {

  const emotions =
    [<Image src={emotion0} alt="angry" width={24} height={24} />,
    <Image src={emotion1} alt="sad" width={24} height={24} />,
    <Image src={emotion2} alt="common" width={24} height={24} />,
    <Image src={emotion3} alt="happy" width={24} height={24} />,
    <Image src={emotion4} alt="excited" width={24} height={24} />];


  return (<Wrapper>
    {/* <Title>emotion check</Title> */}
    <RadioWrapper>
      <RadioButton key={'radio-1'}>
        <input type="radio" checked={-1 === emotion} name="listViewEmotion" value={-1} onChange={(e) => {
          if (e.currentTarget.checked) setEmotion(Number(e.currentTarget.value));
        }} />
        <div className="checkmark all">all</div>
      </RadioButton>
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

export default EmotionSelector;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 12px;
  max-width: 600px;
`

const RadioWrapper = styled.div`
  width: 100%;
  margin : 0;
  height: 42px;
  border : 2px solid  ${(props) => props.theme.point ? props.theme.point + '70' : '#979FC7'};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
`
const RadioButton = styled.label`
  position: relative;
  width: 100%;
  height: 100%;
  border-right : 2px solid  ${(props) => props.theme.point ? props.theme.point + '70' : '#979FC7'};
  &:last-child{
    border: none;
  }
  .all{
    text-transform: uppercase;
    font-weight: 600;
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
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
    color:  ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    font-size: 14px;
  }
  input:checked ~ .checkmark{
    background-color: ${(props) => props.theme.point ? props.theme.point + '25' : '#979FC7'};
    /* color: rgb(var(--greyTitle)); */
    /* color: white; */
  }
`;
