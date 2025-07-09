import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import styled from "styled-components";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';

const SideBar = () => {
  const router = useRouter();
  const current = useSelectedLayoutSegment();

  return (<Wrapper>
    <SideBarLogo>
      <span>everstamp</span>
    </SideBarLogo>
    <Menus>
      <Menu
        onClick={() => router.push(`/app/home`, {})}
        className={current === 'home' ? 'home' : ''}>
        <HomeIcon className="icon" />
        <span>home</span>
      </Menu>
      <Menu onClick={() => router.push(`/app/calendar?date=${getCleanTodayTime()}`, {})} className={current === 'calendar' ? 'current' : ''}>
        <CalendarMonthIcon className="icon" />
        <span>calendar</span>
      </Menu>
      <Menu onClick={() => router.push('/app/list', {})} className={current === 'list' ? 'current' : ''} >
        <ViewListIcon className="icon" />
        <span>list</span>
      </Menu>
      <Menu onClick={() => router.push('/app/habit', {})} className={current === 'habit' ? 'current' : ''} >
        <CheckBoxIcon className="icon" />
        <span>habit</span>
      </Menu>
      <Menu onClick={() => router.push('/app/setting', {})} className={current === 'setting' ? 'current' : ''}>
        <SettingsIcon className="icon" />
        <span>setting</span>
      </Menu>
    </Menus>
    <BottomText>eooooo_studio@gmail.com</BottomText>
  </Wrapper>);
}

export default SideBar;

const Wrapper = styled.div`
  transition: all ease-in-out 0.3s;

  width: var(--sidebarWidth);
  height: 100dvh;
  padding: 0 16px;

  border-right: 2px solid rgb(var(--lightGrey2));
  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + '10' : '#979FC7'};;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  gap: 64px;
  overflow-y : scroll;
`
const SideBarLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  span{
    font-size: 36px;
    text-transform: uppercase;
    line-height: 100%;
    font-family: BMJUA;

    color: rgb(var(--greyTitle));
  }
  span::first-letter{
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
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
  font-size: 14px;
  color: grey;
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  text-align: center;
  width: 100%;


  @media (min-width:1025px) { //desktop
    font-size: 16px;
  }
`