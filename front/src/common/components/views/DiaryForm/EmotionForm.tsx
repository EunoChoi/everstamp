import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { emotions } from "@/common/images/emotions";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AnimatePresence, motion } from "framer-motion";

interface EmotionFormProps {
  emotion: number;
  setEmotion: Dispatch<SetStateAction<number>>;
}

const EmotionForm = ({ emotion, setEmotion }: EmotionFormProps) => {
  const [toggle, setToggle] = useState(true);
  return (<>
    <Wrapper>
      <Title>
        <span>emotion</span>
        <button onClick={() => { setToggle(c => !c) }}>
          {toggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
      </Title>
      <AnimatePresence>
        {toggle &&
          <RadioWrapper
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {emotions.map((data) =>
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
          </RadioWrapper>}
      </AnimatePresence>
    </Wrapper>
  </>);
}


export default EmotionForm;


const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  flex-shrink: 0;
`;
const Title = styled.section`
  text-transform: capitalize;
  font-size: 22px;

  color: rgb(var(--greyTitle));
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RadioWrapper = styled(motion.div)`
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
