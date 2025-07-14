'use client';

import { emotions } from "@/common/images/emotions";
import Image from "next/image";
import styled from "styled-components";

const LoadingView = () => {
  return (<Logo>
    <Image src={emotions[0].src} alt='loading' width={128} height={128} />
    <span>everstamp</span>
  </Logo>);
}

export default LoadingView;

const Logo = styled.div`
  width: 100dvw;
  height: 100dvh;

  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  gap: 24px;
  span{
    font-family : 'BMJUA';
    font-size: 24px;
    color: rgba(var(--greyTitle));
    text-transform: uppercase;
  }
  span::first-letter{
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  }
`