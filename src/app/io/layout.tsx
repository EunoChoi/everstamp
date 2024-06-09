'use client'

import styled from "styled-components";
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

//hooks
import IsMobile from "@/hooks/IsMobile";

//icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';

import GitHubIcon from '@mui/icons-material/GitHub';
import BookIcon from '@mui/icons-material/Book';


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  let pathname = usePathname()
  let mobile = IsMobile();
  const router = useRouter()

  // let current = pathname.split('/io/')[1];
  const current = useSelectedLayoutSegments().pop();
  const menus = ['calendar', 'list', 'habit', 'setting'];

  if (current === undefined) return <>{children}</>

  return (<>
    {mobile ?
      <Mobile_Layout>
        {children}
        <Mobile_Nav>
          <span className={current === 'calendar' ? 'current' : ''} onClick={() => { router.push('/io/calendar', { scroll: false }) }}><CalendarMonthIcon /></span>
          <span className={current === 'list' ? 'current' : ''} onClick={() => { router.push('/io/list', { scroll: false }) }}><FormatListBulletedIcon /></span>
          <span className={current === 'habit' ? 'current' : ''} onClick={() => { router.push('/io/habit', { scroll: false }) }}><CheckBoxIcon /></span>
          <span className={current === 'setting' ? 'current' : ''} onClick={() => { router.push('/io/setting', { scroll: false }) }}><SettingsIcon /></span>
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
            <MonthWrapper
              className={current === 'calendar' ? 'open' : ''}
            ></MonthWrapper>
            {menus.map(e =>
              <span
                key={e}
                className={current === e ? "current" : ""}
                onClick={() => { router.push(`/io/${e}`) }}>
                ◼︎ {e}
              </span>)}
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

    width: 100vw;
    height: var(--mobileNav);
    background-color: rgb(var(--point));

    display: flex;
    justify-content: space-around;
    align-items: center;
    color: rgba(255,255,255,0.75);
    span{
      width: 20%;
      font-size: 20px;
      text-align: center;
    }
    .current{
      color: rgba(55, 55, 55, 0.75);
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

  >span{
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;

    text-transform: uppercase;
    text-transform: capitalize;

    margin: 8px 0%;
    color: grey;
    transition: all ease-in-out 0.1s;
  }
  .current{
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
  width: 200px;
  width: 100%;
  height: 0;
  background-color: #fff;

  border-radius: 8px;
  &.open {
      height:200px;
  }
`