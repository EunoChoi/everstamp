'use client'

import styled from "styled-components";
import { usePathname } from 'next/navigation'
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

  let current = pathname.split('/io/')[1];
  const path = ['calendar', 'list', 'habit', 'setting'];
  const current_num = path.indexOf(current) + 1

  if (pathname === '/io') return <>{children}</>

  return (<>
    {mobile ?
      <Mobile_Layout>
        {children}
        <Mobile_Nav $current_num={current_num}>
          <span onClick={() => { router.push('/io/calendar', { scroll: false }) }}><CalendarMonthIcon /></span>
          <span onClick={() => { router.push('/io/list', { scroll: false }) }}><FormatListBulletedIcon /></span>
          <span onClick={() => { router.push('/io/habit', { scroll: false }) }}><CheckBoxIcon /></span>
          <span onClick={() => { router.push('/io/setting', { scroll: false }) }}><SettingsIcon /></span>
        </Mobile_Nav>
      </Mobile_Layout>
      :
      <Desktop_Layout>
        <Desktop_Sidebar>
          <SideBarLogo>
            <span>ever</span>
            <span>stamp</span>
          </SideBarLogo>
          <Menus $current_num={current_num}>
            <MonthWrapper $current_num={current_num}></MonthWrapper>
            <span onClick={() => { router.push(`/io/calendar`) }}>◼︎ calendar</span>
            <span onClick={() => { router.push(`/io/list`) }}>◼︎ list</span>
            <span onClick={() => { router.push(`/io/habit`) }}>◼︎ habit</span>
            <span onClick={() => { router.push(`/io/setting`) }}>◼︎ setting</span>
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
const Mobile_Nav = styled.div<{ $current_num?: number }>`
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
    span:nth-child(${props => props.$current_num}){
      color: rgba(0,0,0,0.65);
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
  height: 100vh;
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
const Menus = styled.div<{ $current_num?: number }>`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: start;

  height: auto;

  >span{
    font-size: 24px;
    font-weight: 500;

    text-transform: uppercase;

    margin: 8px 0%;
    color: grey;
    transition: all ease-in-out 0.1s;
  }
  >span:nth-child(${props => props.$current_num && props.$current_num + 1}){
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

const MonthWrapper = styled.div<{ $current_num: number }>`
  transition: all 0.2s ease-in-out;
  width: 200px;
  width: 100%;
  height: 0px;
  height: ${props => props.$current_num === 1 ? '200px' : '0px'};
  background-color: #fff;

  border-radius: 8px;
`