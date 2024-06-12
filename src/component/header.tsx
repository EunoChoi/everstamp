'use client';

import styled from "styled-components";
import IsMobile from "@/hooks/IsMobile";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Props {
  subTitle: string;
}

const Header = () => {
  const mobile = IsMobile();
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Wrapper>
      <Title>{pathname.split('/io/')[1]}</Title>
    </Wrapper>
  );
}
//48+96 
export default Header;

const Wrapper = styled.div`
  position: sticky;
  top: 0;

  width: inherit;
  height: var(--desktopHeader);
  background-color: white;

  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: end;

  @media screen and (max-width: 720px) {
    height: var(--mobileHeader);
    align-items: center;
    padding : 0 5%;
  }
`
const Title = styled.span`
  color: rgb(var(--grey_Title));
  font-size: 42px;
  font-weight: 700;

  text-transform: uppercase;
  /* text-transform: capitalize; */

  &:first-letter{
    color: rgb(var(--point));
  }
  @media screen and (max-width: 720px) {
    line-height: 1.1;
    font-size: 36px;
    border-bottom: 4px rgb(var(--point)) solid;
  }
`