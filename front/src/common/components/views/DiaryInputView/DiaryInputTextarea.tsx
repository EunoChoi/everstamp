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

  background-color: rgba(255,255,255,0.6);
  border-radius: 16px;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.04);

  textarea{
    background-color: transparent;
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
  @media (max-width: 479px) {
    padding: 14px;
  }
  @media (min-width:480px) and (max-width:1024px) {
    padding: 14px;
  }
  @media (min-width:1025px) {
    padding: 20px;
  }
`