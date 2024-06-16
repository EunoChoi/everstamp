import { useCallback, useEffect } from "react";

import styled from "styled-components";
import Image from "next/image";
import { useRef } from "react";

//icon
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

//test image
import testImg from "../../../public/img/everStamp_logo_blue.png";

const AddDiary = () => {
  //to writh need info
  //user id,  by query string
  //date info,  by query string
  //text info,  by form
  //image info,  by form

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const historyBack = useCallback(() => {
    history.back();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])


  return (
    <Wrapper onClick={historyBack}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Logo>
          <span>ever</span>
          <span>stamp</span>
        </Logo>
        <InputWrapper>
          <textarea
            ref={inputRef}
            placeholder="we can do better"
          />
        </InputWrapper>
        <UploadedImages>
          <ImageBox>
            <UploadedImage src={testImg} alt='test' />
            <ImageDeleteButton></ImageDeleteButton>
          </ImageBox>
          <ImageBox>
            <UploadedImage src={testImg} alt='test' />
            <ImageDeleteButton></ImageDeleteButton>
          </ImageBox>
          <ImageBox>
            <UploadedImage src={testImg} alt='test' />
            <ImageDeleteButton></ImageDeleteButton>
          </ImageBox>
          <ImageBox>
            <UploadedImage src={testImg} alt='test' />
            <ImageDeleteButton></ImageDeleteButton>
          </ImageBox>
          <ImageBox>
            <UploadedImage src={testImg} alt='test' />
            <ImageDeleteButton></ImageDeleteButton>
          </ImageBox>
        </UploadedImages>
        <Buttons>
          <Button onClick={historyBack}>
            <HighlightOffOutlinedIcon className="icon" />
          </Button>
          <Button>
            <ImageOutlinedIcon className="icon" />
          </Button>
          <Button>
            <PostAddOutlinedIcon className="icon" />
          </Button>
        </Buttons>
      </Modal>
    </Wrapper>);
}

export default AddDiary;

const Wrapper = styled.div`
  transition: all ease-in-out 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);

  text-transform: uppercase;
  color: rgb(var(--greyTitle));
`

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  @media (max-width: 479px) { //mobile port
    width: 100%;
    height: 100%;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 100%;
    height: 100%;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    width: 50%;
    height: 60%;
  }
`

const Logo = styled.div`
  color: rgb(var(--greyTitle));
  font-weight: 700;
  font-size: 24px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: end;
  span{
    display: inline-block;
    padding: 4px;
    &::first-letter{
        color: rgb(var(--point));
    }
  }

  @media (max-width: 479px) { //mobile port
    span{
      font-size: 24px;
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    span{
      font-size: 20px;
    }
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    span{
      font-size: 38px;
    }
  }
`
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
      color: darkgrey;
      padding-top: 10dvh;
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
  @media (min-width:480px) and (min-width:1024px) { //desktop
    padding: 20px;
  }
`
const UploadedImages = styled.div`
  display: flex;
  overflow-x: scroll;
  background-color: rgba(var(--whitesmoke), 0.3);
  border-top: solid 1px rgba(0,0,0,0.05);


  @media (max-width: 479px) { //mobile port
    height: 96px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    height: 72px;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    height: 132px;
  }
`
const ImageBox = styled.div`
  height: 100%;
  width: auto;
  aspect-ratio: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`
const UploadedImage = styled(Image)`
  width: 80%;
  height: 80%;
  border-radius: 8px;
  object-fit: cover;
`
const ImageDeleteButton = styled.button`
  
`
const Buttons = styled.div`
  height: var(--mobileNav);
  background-color: whitesmoke;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.3) !important;
  }
  .icon:hover{
    color: rgb(var(--point)) !important;
  }
`