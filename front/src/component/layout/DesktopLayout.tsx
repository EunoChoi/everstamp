'use client';

import { useCustomRouter } from "@/function/customRouter";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { useSelectedLayoutSegment } from "next/navigation";
import styled from "styled-components";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import { ReactNode, useState } from "react";
import CalendarLayout from "../calendar/CalendarLayout";
import CalendarPageValue from "../../app/app/(afterLogin)/calendar/_component/CalendarPageValue";
// import Calendar from "../calendar/Calendar";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}


const DesktopLayout = ({ modal, children }: Props) => {
  const router = useCustomRouter();
  const current = useSelectedLayoutSegment();

  const [displayDate, setDisplayDate] = useState(new Date());

  function todayRouterPushAction(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Desktop_Layout>
      <Desktop_Sidebar>
        <SideBarLogo>
          <span>ever</span>
          <span>stamp</span>
        </SideBarLogo>
        <Menus>
          <Menu onClick={() => router.push(`/app/calendar?date=${getCleanTodayTime()}`, {})} className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon className="icon" /> <span>calendar</span></Menu>
          <MonthWrapper className={current === 'calendar' ? '' : 'inActive'}>
            <CalendarLayout
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              FormattedValue={CalendarPageValue}
              todayRouterPushAction={todayRouterPushAction}
              isTouchGestureEnabled={true}
              isDateSelectionEnabled={true}
            />
          </MonthWrapper>
          <Menu onClick={() => router.push('/app/list', {})} className={current === 'list' ? 'current' : ''} ><ViewListIcon className="icon" /> <span>list</span></Menu>
          <Menu onClick={() => router.push('/app/habit', {})} className={current === 'habit' ? 'current' : ''} ><CheckBoxIcon className="icon" /> <span>habit</span></Menu>
          <Menu onClick={() => router.push('/app/setting', {})} className={current === 'setting' ? 'current' : ''}><SettingsIcon className="icon" /> <span>setting</span></Menu>
        </Menus>
        <div></div>
      </Desktop_Sidebar>
      <Desktop_Content>
        {modal}
        {children}
      </Desktop_Content>
    </Desktop_Layout>
  );
}

export default DesktopLayout;


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
    font-size: 42px;
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
  font-size: 22px;
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
  height:380px;
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