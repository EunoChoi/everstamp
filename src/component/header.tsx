'use client';

import styled from "styled-components";
import IsMobile from "@/hooks/IsMobile";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Props {
  subTitle: string;
}

const Header = ({ subTitle }: Props) => {
  const mobile = IsMobile();
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Wrapper>
      <Title>{pathname.split('/io/')[1]}</Title>
      {subTitle.length > 0 && <SubTitle>{subTitle}</SubTitle>}
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
    /* align-items: center; */
    padding : 0 4vw;
    span{line-height: 1.2;}
  }
`
const Title = styled.span`
  color: rgb(var(--grey_Title));
  font-size: 42px;
  font-weight: 700;

  text-transform: uppercase;
  text-transform: capitalize;
  line-height: 110%;

  &:first-letter{
    color: rgb(var(--point));
    /* font-size: 48px; */
  }
  @media screen and (max-width: 720px) {
    border-bottom: 6px rgb(var(--point)) solid;
  }
`
const SubTitle = styled.span`
  color: rgb(var(--grey_Sub_Title));
  font-size: 24px;
  font-weight: 500;
  white-space: nowrap;

  overflow-x: scroll;
  padding-left: 12px;
  scrollbar-width: none;
  text-transform: capitalize;
  text-transform: lowercase;
`