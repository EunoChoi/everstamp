'use client'

import styled from "styled-components";
import Link from "next/link";
import { useSelectedLayoutSegments } from 'next/navigation'

//component
import CalendarSelector from "@/component/calendarSelector";
import Loading from "@/component/loading";

//hooks
import IsMobile from "@/hooks/IsMobile";

//icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import BookIcon from '@mui/icons-material/Book';



const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  let mobile = IsMobile();
  const current = useSelectedLayoutSegments().pop();

  if (mobile === null) return <Loading />; //loading page, to solve problem delay by useMediaQuery
  if (current === undefined) return <>{children}</> //not layout, page

  return (<>
    {mobile ?
      <Mobile_Layout>
        {children}
        <Mobile_Nav>
          <Link href={`/io/calendar`} className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon fontSize="small" /></Link>
          <Link href='/io/list' className={current === 'list' ? 'current' : ''} ><ViewListIcon fontSize="small" /></Link>
          <Link href='/io/habit' className={current === 'habit' ? 'current' : ''} ><CheckBoxIcon fontSize="small" /></Link>
          <Link href='/io/setting' className={current === 'setting' ? 'current' : ''}><SettingsIcon fontSize="small" /></Link>
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
            <Link href={`/io/calendar?date=${new Date().getTime()}`}><Menu className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon />calendar</Menu></Link>
            <MonthWrapper className={current === 'calendar' ? 'open' : ''}>
              <CalendarSelector />
            </MonthWrapper>
            <Link href='/io/list'><Menu className={current === 'list' ? 'current' : ''}><ViewListIcon />list</Menu></Link>
            <Link href='/io/habit'><Menu className={current === 'habit' ? 'current' : ''}><CheckBoxIcon />habit</Menu></Link>
            <Link href='/io/setting'><Menu className={current === 'setting' ? 'current' : ''}><SettingsIcon />setting</Menu></Link>
          </Menus>
          <Links>
            <span><GitHubIcon /></span>
            <span><BookIcon /></span>
          </Links>
        </Desktop_Sidebar>

        <Desktop_Content>
          {children}
        </Desktop_Content>
      </Desktop_Layout>
    }
  </>);
}

export default Layout;

const Links = styled.div`
  width: 300px;
  height: auto;

  position: fixed;
  left: 0;
  bottom : 0;

  display: flex;
  justify-content: center;
  align-items: center;

  span{
    cursor: pointer;
    color: rgb(var(--grey_Title));
    color: grey;
    padding: 8px 12px;
  }
`

const Mobile_Layout = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* height: 100vh; */
`;
const Mobile_Nav = styled.nav`
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100vw;
  height: var(--mobileNav);
  background-color: whitesmoke;
  color: rgba(0,0,0,0.2);
  border-top: 1px solid rgba(0,0,0,0.05); 
  > *{
    padding : 0 12px;
    padding-bottom: 2px;
    font-size: 22px;
    text-align: center;
    vertical-align: center;
  }
  .current{
    color: rgba(55, 55, 55, 0.75);
    color: rgb(var(--point));
  }
`


const Desktop_Layout = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
`;

const Desktop_Sidebar = styled.div`
  position: fixed;
  top: 0;
  width: 300px;
  height: 100dvh;
  padding: 24px;

  border-right : 1px solid rgba(0,0,0,0.03);
  background-color: rgb(var(--lightGrey_BG));

  display: flex;
  flex-direction: column;
  justify-content: center;
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

    color: rgb(var(--grey_Title));
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
  transition: all ease-in-out 0.2s;

  display: flex;
  align-items: center;

  cursor: pointer;
  font-size: 24px;
  font-weight: 500;

  text-transform: uppercase;
  text-transform: capitalize;

  margin: 8px 0%;
  color: grey;
  > *:first-child{
    margin-right: 8px;
  }
  &.current{
    color: rgb(var(--grey_Title));
    font-weight: 600;
  }
`

const Desktop_Content = styled.div`
  margin-left: 300px;
  width: calc(100vw - 300px);

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const MonthWrapper = styled.div`
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 0;
  &.open {
      height:240px;
      padding-bottom: 16px;
  }
`