'use client'

import styled from "styled-components";
import Link from "next/link";
import { redirect, usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { SnackbarProvider, MaterialDesignContent } from 'notistack'

//component
import CalendarSelector from "@/component/calendar/CalendarSelector";

//function
import IsMobile from "@/function/IsMobile";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { getCurrentUser } from "../_lib/user";

//icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';


interface Props {
  children: ReactNode;
  isMobile: boolean;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {
  let isMobile = IsMobile();
  const current = useSelectedLayoutSegment();
  const path = usePathname();

  // Detects if device is on iOS 
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  const { data, refetch, failureCount } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: 3,
  })


  useEffect(() => {
    refetch();
  }, [path]);
  useEffect(() => {
    if (failureCount >= 3) {
      redirect('/app');
    }
  }, [failureCount]);

  const theme = {
    point: data?.themeColor
  }



  if (isMobile === null) return <></>;
  return (
    <SnackbarProvider
      Components={{
        default: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      anchorOrigin={{
        // vertical: `${isMobile ? 'bottom' : 'top'}`,
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={1}
      autoHideDuration={1300}
      preventDuplicate={true}
    >
      <ThemeProvider theme={theme}>
        {isMobile ?
          <Mobile_Layout>
            {modal}
            {children}
            <Mobile_Nav className={(isInStandaloneMode() && isIos()) ? 'iosPwa' : ''}>
              <Logo><span>ever</span><span>stamp</span></Logo>
              <NavMenu href={`/app/calendar?date=${getCleanTodayTime()}`} className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon className="icon" fontSize="small" /> <span>calendar</span></NavMenu>
              <NavMenu href='/app/list' className={current === 'list' ? 'current' : ''} ><ViewListIcon className="icon" fontSize="small" /> <span>list</span></NavMenu>
              <NavMenu href='/app/habit' className={current === 'habit' ? 'current' : ''} ><CheckBoxIcon className="icon" fontSize="small" /> <span>habit</span></NavMenu>
              <NavMenu href='/app/setting' className={current === 'setting' ? 'current' : ''}><SettingsIcon className="icon" fontSize="small" /> <span>setting</span></NavMenu>
            </Mobile_Nav >
          </Mobile_Layout >
          :
          <Desktop_Layout>
            <Desktop_Sidebar>
              <SideBarLogo>
                <span>ever</span>
                <span>stamp</span>
              </SideBarLogo>
              <Menus>
                <Link href={`/app/calendar?date=${getCleanTodayTime()}`}><Menu className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon />calendar</Menu></Link>
                <MonthWrapper className={current === 'calendar' ? '' : 'inActive'}>
                  <CalendarSelector />
                </MonthWrapper>
                <Link href='/app/list'><Menu className={current === 'list' ? 'current' : ''}><ViewListIcon />list</Menu></Link>
                <Link href='/app/habit'><Menu className={current === 'habit' ? 'current' : ''}><CheckBoxIcon />habit</Menu></Link>
                <Link href='/app/setting'><Menu className={current === 'setting' ? 'current' : ''}><SettingsIcon />setting</Menu></Link>
              </Menus>
              <div></div>
            </Desktop_Sidebar>

            <Desktop_Content>
              {modal}
              {children}
            </Desktop_Content>
          </Desktop_Layout>}
      </ThemeProvider >
    </SnackbarProvider>);

}

export default AppLayout;

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: 'whitesmoke',
    color: 'rgb(88, 88, 88)',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: '#8EBCDB',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: '#83c6b6',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#dc7889',
    fontWeight: '500'
  },
}));
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
        color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;  
      }
      padding: 0 3px;
    }
  }
`
const NavMenu = styled(Link)`
  padding: 0;

  .icon{
    line-height: 0%;
  }
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
  justify-content: space-around;
  align-items: center;

  width: 100vw;
  height: var(--mobileNav);

  background-color: rgba(var(--whitesmoke), 0.7);
  backdrop-filter: blur(12px);

  color: rgba(0,0,0,0.3);
  border-top: 2px solid rgba(0,0,0,0.05); 


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


const Desktop_Layout = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
`;

const Desktop_Sidebar = styled.div`
  width: var(--sidebarWidth);
  height: 100dvh;
  padding: 32px 24px;
  padding-bottom: 12px;

  border-right : 1px solid rgba(0,0,0,0.03);
  background-color: rgb(var(--lightGrey1));

  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-between;

  overflow-y : scroll;

  transition: all ease-in-out 0.3s;
`
const SideBarLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  /* margin-bottom: 48px; */

  span{
    font-size: 48px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 100%;

    color: rgb(var(--greyTitle));
  }
  span:last-child{
    border-bottom: 8px solid ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    line-height: 120%;
  }
  span::first-letter{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
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

  margin: 6px 0%;
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

  width: calc(100vw - var(--sidebarWidth));
`

const MonthWrapper = styled.div`
  transition: all 0.2s ease-in-out;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  height:360px;
  *{
    transition: color ease-in-out 0.3s !important;
  }
  &.inActive {
    opacity: 0.8;
    .selected, .today{
      border: none;
      background-color: rgba(0,0,0,0);
    }
  }
`