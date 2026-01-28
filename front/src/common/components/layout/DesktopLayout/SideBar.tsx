import { getTodayString } from "@/common/functions/getTodayString";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import styled from "styled-components";

import { MdCalendarMonth, MdCheckBox, MdHome, MdSettings, MdViewList } from 'react-icons/md';

const SideBar = () => {
  const router = useRouter();
  const current = useSelectedLayoutSegment();

  return (<Wrapper>
    <SideBarLogo>
      <span>TO:OK</span>
    </SideBarLogo>
    <Menus>
      <Menu
        onClick={() => router.push(`/home`, {})}
        className={current === 'home' ? 'current' : ''}>
        <MdHome className="icon" />
        <span>home</span>
      </Menu>
      <Menu onClick={() => router.push(`/calendar?date=${getTodayString()}`, {})} className={current === 'calendar' ? 'current' : ''}>
        <MdCalendarMonth className="icon" />
        <span>calendar</span>
      </Menu>
      <Menu onClick={() => router.push('/list', {})} className={current === 'list' ? 'current' : ''} >
        <MdViewList className="icon" />
        <span>list</span>
      </Menu>
      <Menu onClick={() => router.push('/habit', {})} className={current === 'habit' ? 'current' : ''} >
        <MdCheckBox className="icon" />
        <span>habit</span>
      </Menu>
      <Menu onClick={() => router.push('/setting', {})} className={current === 'setting' ? 'current' : ''}>
        <MdSettings className="icon" />
        <span>setting</span>
      </Menu>
    </Menus>
    <BottomText>eooooostudio@gmail.com</BottomText>
  </Wrapper>);
}

export default SideBar;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  width: var(--sidebarWidth);
  height: 100dvh;
  padding: 0 16px;

  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  box-shadow: 2px 0 20px rgba(0,0,0,0.04);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  gap: 64px;
  overflow-y: scroll;
`
const SideBarLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  span {
    font-size: 36px;
    line-height: 100%;
    font-family: 'BMJUA';
    color: rgb(var(--greyTitle));
  }
  span::first-letter {
    color: ${(props) => props.theme.themeColor ?? '#979FC7'};
  }
`
const Menus = styled.div`
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 24px;
  width: 70%;
`
const Menu = styled.span`
  transition: all ease-in-out 0.3s;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;

  color: grey;

  &.current{
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  }
`
const BottomText = styled.span`
  font-size: 16px;
  color: grey;
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  text-align: center;
  width: 100%;


  @media (min-width:1025px) { //desktop
    font-size: 16px;
  }
`