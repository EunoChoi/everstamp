'use client'

import styled from "styled-components";
import Link from "next/link";
import { useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode } from "react";

//component
import CalendarSelector from "@/component/CalendarSelector";
import Loading from "@/component/Loading";

//hooks
import IsMobile from "@/hooks/IsMobile";

//icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import BookIcon from '@mui/icons-material/Book';

interface Props {
  children: ReactNode;
}

const IoLayout = ({ children }: Props) => {
  const getCleanTodayTime = () => {
    const tempDate = new Date();
    return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime();
  }

  let isMobile = IsMobile();
  const current = useSelectedLayoutSegment();

  if (isMobile === null) return <Loading />; //loading page, to solve problem delay by useMediaQuery

  return (<>
    {isMobile ?
      <Mobile_Layout>
        {children}
        <Mobile_Nav>
          <Logo><span>ever</span><span>stamp</span></Logo>
          <NavMenu href={`/io/calendar?date=${getCleanTodayTime()}`} className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon fontSize="small" /> <span>calendar</span></NavMenu>
          <NavMenu href='/io/list' className={current === 'list' ? 'current' : ''} ><ViewListIcon fontSize="small" /> <span>list</span></NavMenu>
          <NavMenu href='/io/habit' className={current === 'habit' ? 'current' : ''} ><CheckBoxIcon fontSize="small" /> <span>habit</span></NavMenu>
          <NavMenu href='/io/setting' className={current === 'setting' ? 'current' : ''}><SettingsIcon fontSize="small" /> <span>setting</span></NavMenu>
        </Mobile_Nav>
      </Mobile_Layout>
      :
      <Desktop_Layout>
        <Desktop_Sidebar>
          <SideBarLogo>
            <span>ever</span>
            <span>stamp</span>
          </SideBarLogo>
          <Menus>
            <Link href={`/io/calendar?date=${getCleanTodayTime()}`}><Menu className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon />calendar</Menu></Link>
            <MonthWrapper
              className={current === 'calendar' ? '' : 'inActive'}
            >
              <CalendarSelector />
            </MonthWrapper>
            <Link href='/io/list'><Menu className={current === 'list' ? 'current' : ''}><ViewListIcon />list</Menu></Link>
            <Link href='/io/habit'><Menu className={current === 'habit' ? 'current' : ''}><CheckBoxIcon />habit</Menu></Link>
            <Link href='/io/setting'><Menu className={current === 'setting' ? 'current' : ''}><SettingsIcon />setting</Menu></Link>
          </Menus>
          <Links>
            <span><GitHubIcon fontSize="inherit" /></span>
            <span><BookIcon fontSize="inherit" /></span>
          </Links>
        </Desktop_Sidebar>

        <Desktop_Content>
          {children}
        </Desktop_Content>
      </Desktop_Layout>
    }
  </>);
}

export default IoLayout;


const Logo = styled.span`
  display: none;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: inline-block;
    margin-bottom: 32px;
    color: rgb(var(--greyTitle));
    font-size: 32px;
    font-weight: 700;
    text-transform: uppercase;
    span {
      display: inline-block;
      &::first-letter{
        color: rgb(var(--point)) !important;  
      }
      padding: 0 3px;
    }
  }
`
const NavMenu = styled(Link)`
  padding: 0;
  span{
      display: none;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;

    span{
      font-weight: 500;
      font-size: 20px;
      text-transform: capitalize;
      display: flex;
      margin: 8px 0;
    }
  }
`
const Links = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  span{
    font-size: 20px;
    cursor: pointer;
    color: darkgray;
    padding: 0 12px;
  }
`

const Mobile_Layout = styled.div`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* height: 100vh; */

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 75dvw;
    margin-left: 25dvw;
  }
`;
const Mobile_Nav = styled.nav`
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100vw;
  height: var(--mobileNav);

  background-color: rgba(var(--whitesmoke), 0.7);
  backdrop-filter: blur(12px);

  color: rgba(0,0,0,0.3);
  border-top: 1px solid rgba(0,0,0,0.05); 
  > *{
    padding : 0 12px;
    padding-bottom: 2px;
    font-size: 22px;
    text-align: center;
    vertical-align: center;
  }
  .current{
    color: rgb(var(--point));
  }

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    left: 0;
    width: 25dvw;
    min-width: 150px;
    height: 100dvh;

    flex-direction: column;
    justify-content: space-evenly;
    justify-content: center;
  }
`


const Desktop_Layout = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
`;

const Desktop_Sidebar = styled.div`
  width: 350px;
  height: 100dvh;
  padding: 32px 24px;
  padding-bottom: 12px;

  border-right : 1px solid rgba(0,0,0,0.03);
  background-color: rgb(var(--lightGrey1));

  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-between;
`
const SideBarLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 48px;

  span{
    font-size: 56px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 100%;

    color: rgb(var(--greyTitle));
  }
  span:last-child{
    border-bottom: 8px solid rgb(var(--point));
    line-height: 120%;
  }
  span::first-letter{
    color: rgb(var(--point));
  }
`
const Menus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: auto;
`
const Menu = styled.span`
  transition: all ease-in-out 0.3s;

  display: flex;
  align-items: center;

  cursor: pointer;
  font-size: 24px;
  font-weight: 500;

  text-transform: uppercase;
  text-transform: capitalize;

  margin: 8px 0%;
  color: #939393;
  > *:first-child{
    margin-right: 8px;
  }
  &.current{
    color: rgb(var(--greyTitle));
  }
`

const Desktop_Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: calc(100vw - 350px);
`

const MonthWrapper = styled.div`
  transition: all 0.2s ease-in-out;
  width: 100%;
  margin-bottom: 24px;
  height:280px;
  *{
    transition: color ease-in-out 0.3s !important;
  }
  &.inActive {
    opacity: 0.7;
    .selected, .today{
      border: none;
      background-color: rgba(0,0,0,0);
    }
  }
`