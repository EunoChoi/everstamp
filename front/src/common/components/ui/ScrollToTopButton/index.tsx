import styled from "styled-components";

import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useEffect, useRef, useState } from "react";
import { isIosPwa } from "@/common/functions/isIosPwa";


interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ScrollToTopButton = ({ contentRef }: Props) => {

  const scrollTimeoutRef = useRef<number | null>(null);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const buttonVisibleHeight = 2000;
  const iosPwa = isIosPwa();


  const goToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current !== null) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = requestAnimationFrame(() => {
        if (!buttonVisible && contentRef.current && contentRef.current.scrollTop > buttonVisibleHeight) {
          setButtonVisible(true);
        }
        else if (buttonVisible && contentRef.current && contentRef.current.scrollTop <= buttonVisibleHeight) {
          setButtonVisible(false);
        }
      });
    };
    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current !== null) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [buttonVisible, buttonVisibleHeight]);

  return (
    <>
      {buttonVisible ?
        <Wrapper onClick={goToTop} className={iosPwa ? 'iosPwa' : ''}>
          <ArrowUpwardRoundedIcon fontSize="small" />
        </Wrapper> :
        <></>}
    </>
  );
}

export default ScrollToTopButton;

const Wrapper = styled.button`
  position: fixed;

  @media (max-width: 479px) { //mobile port
    bottom : calc(var(--mobileNav) + 24px);
    &.iosPwa{
      bottom : calc(var(--mobileNav) + 36px);
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    bottom : 32px;
  }
  @media (min-width:1024px) { //desktop
    bottom : 48px;
  }

  display: flex;
  justify-content : center;
  align-items : center;

  width: 36px;
  height: 36px;
  border-radius: 100px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);


  background-color: white;
  background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  background-color: whitesmoke;
  color: rgb(var(--greyTitle));
  border: 2px solid rgba(0,0,0,0.05);
`