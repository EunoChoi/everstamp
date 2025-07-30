import { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import styled from "styled-components";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AnimatePresence, motion } from "framer-motion";

interface TextFormProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

const TextForm = ({ text, setText }: TextFormProps) => {
  const [toggle, setToggle] = useState(true);
  const inputRef = useRef<HTMLDivElement>(null);

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);
  // const scroll = () => {
  //   setTimeout(() => {
  //     contentsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }, 200);
  // }

  return (<>
    <Wrapper>
      <Title>
        <span>contents</span>
        <button onClick={() => { setToggle(c => !c) }}>
          {toggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
      </Title>
      <AnimatePresence>
        {toggle &&
          <InputWrapper
            ref={inputRef}
            key="text"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '220px', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <textarea
              // onFocus={scroll}
              // onClick={scroll}
              onChange={onChangeText}
              value={text}
              placeholder="일상의 작은 감정들을 기록하세요." />
          </InputWrapper>}
      </AnimatePresence>
    </Wrapper>
  </>);
}


export default TextForm;


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

const InputWrapper = styled(motion.div)`
  width : 100%;

  background-color: #f9f9f9;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  textarea{
    background-color: #f9f9f9;
    font-size: ${(props) => props.theme.fontSize ?? '15px'};
    width: 100%;
    height: 100%;
    resize: none;

    &::placeholder{
      padding: 64px;
      text-align: center;
      color: grey;
      font-size: 1.0em;
    }
    @media (max-width: 479px) { //mobile port
      padding: 12px;
    }
    @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
      padding: 12px;
    }
    @media (min-width:1025px) { //desktop
      padding: 20px;
    }
  }
`