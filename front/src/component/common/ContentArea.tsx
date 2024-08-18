import { isIosPwa } from "@/function/isIosPwa";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  className?: string;
  _ref?: React.RefObject<HTMLDivElement>;
}

//custom for ios pwa
const ContentArea = ({ children, className, _ref }: Props) => {

  const iosPwa = isIosPwa();

  return (<Wrapper ref={_ref} className={iosPwa ? `iosPwa ${className}` : `${className}`}>
    {children}
  </Wrapper>);
}

export default ContentArea;

const Wrapper = styled.div`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }
  
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  height: 100dvh;
  
  &.scroll{
    overflow-y: scroll;
  }
  
  @media (max-width: 479px) { //mobile portrait
    height: 100dvh;
    padding-left : 0;
    padding-right: 0;
    padding-bottom: var(--mobileNav);

    &.iosPwa{
      padding-bottom: calc(var(--mobileNav) + 20px);
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    overflow-y: scroll;
    height: 100dvh;
    padding-top: var(--mobileHeader);
    @media (min-height:480px) {
      &.habit, &.setting{
        justify-content: center;
      }
    }
  }
  @media (min-width:1024px) { //desktop
    height: 100dvh;
  }
`

