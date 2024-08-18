import { isIosPwa } from "@/function/isIosPwa";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

//custom for ios pwa
const BottomButtonArea = ({ children }: Props) => {


  const iosPwa = isIosPwa();

  return (<Wrapper className={iosPwa ? 'iosPwa' : ''}>
    {children}
  </Wrapper>);
}

export default BottomButtonArea;

const Wrapper = styled.div`
  height: var(--mobileNav);
  width: 100%;
  flex-shrink: 0;
  background-color: #f9f9f9;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  &.iosPwa{
    height: calc(var(--mobileNav) + 20px);
    padding-bottom: 20px;
  }

  @media (max-width: 479px) { //mobile port
    border-radius: 0px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    border-radius: 0px;
  }
`

