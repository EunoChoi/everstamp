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
    <HeaderArea>
      <Title>{pathname.split('/io/')[1]}</Title>
      {subTitle.length > 0 && <SubTitle>{subTitle}</SubTitle>}
    </HeaderArea>
  );
}
//48+96 
export default Header;

const HeaderArea = styled.div`
  position: sticky;
  top: 0;

  width: inherit;
  height: var(--mobileHeader);
  background-color: white;

  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: end;

  @media screen and (max-width: 720px) {
    align-items: center;
    padding : 0 5vw;
  }
`
const Title = styled.span`
  color: rgb(var(--grey_Title));
  font-size: 42px;
  font-weight: 700;

  text-transform: uppercase;
  line-height: 110%;

  &:first-letter{
    color: rgb(var(--point));
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
`