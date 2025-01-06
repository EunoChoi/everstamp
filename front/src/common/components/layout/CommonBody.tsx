import { isIosPwa } from "@/common/functions/isIosPwa";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  className?: string;
  _ref?: React.RefObject<HTMLDivElement>;
}

//custom for ios pwa
const CommonBody = ({ children, className, _ref }: Props) => {

  const iosPwa = isIosPwa();

  return (<Wrapper ref={_ref} className={iosPwa ? `iosPwa ${className}` : `${className}`}>
    {children}
  </Wrapper>);
}

export default CommonBody;

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
  overflow-y: scroll;

  width: 100%;
  height: 100%;
  
  @media (max-width: 479px) { //mobile portrait
    height: 100dvh;
    /* padding-left : 4dvw;
    padding-right: 4dvw; */
    padding-bottom: var(--mobileNav);

    &.iosPwa{
      padding-bottom: calc(var(--mobileNav) + 20px);
    }
  }
`

