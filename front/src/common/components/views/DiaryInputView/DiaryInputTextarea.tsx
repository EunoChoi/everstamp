import { ChangeEvent, RefObject, useCallback, useRef } from "react";
import styled from "styled-components";


interface Props {
  text: string;
  setText: (v: string) => void;
  contentsRef: RefObject<HTMLElement>;
}

const DiaryInputTextArea = ({ text, setText, contentsRef }: Props) => {

  const inputRef = useRef<HTMLDivElement>(null);

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);
  const scroll = () => {
    setTimeout(() => {
      contentsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  }

  return (<InputWrapper ref={inputRef} >
    <textarea
      onFocus={scroll}
      onClick={scroll}
      onChange={onChangeText}

      value={text}
      placeholder="일상의 작은 감정들을 기록하세요." />
  </InputWrapper>
  );
}

export default DiaryInputTextArea;

const InputWrapper = styled.div`
  width : 100%;
  height: 100%;

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
      padding-top: 70px;
      text-align: center;
      color: grey;
      font-size: 1.0em;
    }
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
`