import styled from "styled-components";
import { RefObject, useCallback } from "react";
import { ChangeEvent } from "react";


interface Props {
  text: string;
  setText: (v: string) => void;
  inputRef: RefObject<HTMLTextAreaElement>;
}

const DiaryInputTextArea = ({ text, setText, inputRef }: Props) => {

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, [])

  return (<InputWrapper>
    <textarea
      onChange={onChangeText}
      ref={inputRef}
      value={text}
      placeholder="we can do better" />
  </InputWrapper>
  );
}

export default DiaryInputTextArea;

const InputWrapper = styled.div`
  /* height: 100%; */
  flex-grow: 1;
  textarea{
    font-size: 1.1em;
    font-weight: 500;
    width: 100%;
    height: 100%;
    resize: none;
    &::placeholder{
      color: rgba(0,0,0,0.25);
      padding-top: 100px;
      text-align: center;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 1.2em;
    }
  }
  @media (max-width: 479px) { //mobile port
    padding: 16px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 12px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    padding: 20px;
  }
`