'use client'

import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import { useSelectedLayoutSegment } from "next/navigation";
import styled from "styled-components";


import useCustomRouter from "@/common/hooks/useCustomRouter";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}


const MobileLayout = ({ modal, children }: Props) => {
  const router = useCustomRouter();
  const current = useSelectedLayoutSegment();

  // Detects if device is on iOS 
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  return (
    <Mobile_Layout>
      {modal}
      {children}
      <Mobile_Nav className={(isInStandaloneMode() && isIos()) ? 'iosPwa' : ''}>
        <Logo><span>everstamp</span></Logo>
        <NavMenu onClick={() => router.push(`/app/calendar?date=${getCleanTodayTime()}`, {})} className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon className="icon" fontSize="small" /> <span>calendar</span></NavMenu>
        <NavMenu onClick={() => router.push('/app/list', {})} className={current === 'list' ? 'current' : ''} ><ViewListIcon className="icon" fontSize="small" /> <span>list</span></NavMenu>
        <NavMenu onClick={() => router.push('/app/habit', {})} className={current === 'habit' ? 'current' : ''} ><CheckBoxIcon className="icon" fontSize="small" /> <span>habit</span></NavMenu>
        <NavMenu onClick={() => router.push('/app/setting', {})} className={current === 'setting' ? 'current' : ''}><SettingsIcon className="icon" fontSize="small" /> <span>setting</span></NavMenu>
      </Mobile_Nav>
    </Mobile_Layout>
  );
}

export default MobileLayout;

const Logo = styled.span`
  display: none;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: inline-block;
    margin-bottom: 32px;
    color: rgb(var(--greyTitle));
    font-size: 32px;
    font-weight: 700;
    text-transform: uppercase;
    text-transform: capitalize;
    span {
      display: inline-block;
      &::first-letter{
        color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;  
      }
      padding: 0 3px;
    }
  }
`
const NavMenu = styled.button`
  padding: 0;

  .icon{
    line-height: 0%;
  }
  @media (max-width: 479px) { //mobile port
    width: 23%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span{
      margin-top: 4px;
      line-height: 1;
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;

    span{
      font-weight: 500;
      font-size: 18px;
      text-transform: capitalize;
      display: flex;
      margin: 8px 0;
    }
  }
`
const Mobile_Layout = styled.div`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 75dvw;
    margin-left: 25dvw;
  }
`;
const Mobile_Nav = styled.nav`
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100vw;
  height: var(--mobileNav);





  border-top: 2px solid rgb(var(--lightGrey2));
  background-color: rgba(255,255,255,0.7);
  backdrop-filter: blur(16px);
  color: rgba(0,0,0,0.3);

  > *{
    padding : 0 12px;
    padding-bottom: 2px;
    font-size: 22px;
    text-align: center;
    vertical-align: center;
  }
  .current{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};;
  }
  
 
  @media (max-width: 479px) { //mobile port
    &.iosPwa{
      height: calc(var(--mobileNav) + 20px);
      padding-bottom: 20px;
    }
  }


  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    left: 0;
    width: 25dvw;
    /* min-width: 130px; */
    height: 100dvh;

    border: none;
    border-right: 2px solid rgba(0,0,0,0.05); 

    flex-direction: column;
    justify-content: space-evenly;
    justify-content: center;
  }
`