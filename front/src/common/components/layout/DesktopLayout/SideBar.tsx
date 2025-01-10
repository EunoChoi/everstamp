import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Calendar from "../../ui/Calendar";
import CalendarPageValue from "../../ui/Calendar/CalendarPageValue";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';

const SideBar = () => {
  const router = useCustomRouter();
  const current = useSelectedLayoutSegment();

  const [displayDate, setDisplayDate] = useState(new Date());
  const todayRouterPushAction = () => {
    router.push(`/app/calendar?date=${getCleanTodayTime()}`);
  }

  return (<Wrapper>
    <SideBarLogo>
      <span>ever</span>
      <span>stamp</span>
    </SideBarLogo>
    <Menus>
      <Menu
        onClick={() => router.push(`/app/calendar?date=${getCleanTodayTime()}`, {})}
        className={current === 'calendar' ? 'current' : ''}><CalendarMonthIcon className="icon" /> <span>calendar</span>
      </Menu>
      <MonthWrapper
        className={current === 'calendar' ? '' : 'inActive'}>
        <Calendar
          displayDate={displayDate}
          todayRouterPushAction={todayRouterPushAction}
          setDisplayDate={setDisplayDate}
          FormattedValue={CalendarPageValue}
          isTouchGestureEnabled={true}
          isDateSelectionEnabled={true}
        />
      </MonthWrapper>
      <Menu onClick={() => router.push('/app/list', {})} className={current === 'list' ? 'current' : ''} ><ViewListIcon className="icon" /> <span>list</span></Menu>
      <Menu onClick={() => router.push('/app/habit', {})} className={current === 'habit' ? 'current' : ''} ><CheckBoxIcon className="icon" /> <span>habit</span></Menu>
      <Menu onClick={() => router.push('/app/setting', {})} className={current === 'setting' ? 'current' : ''}><SettingsIcon className="icon" /> <span>setting</span></Menu>
    </Menus>
  </Wrapper>);
}

export default SideBar;

const Wrapper = styled.div`
  transition: all ease-in-out 0.3s;

  width: var(--sidebarWidth);
  height: 100dvh;
  padding: 32px 16px;
  padding-bottom: 12px;

  border-right: 2px solid rgb(var(--lightGrey2));
  background-color: ${(props) => props.theme.point ? props.theme.point + '30' : '#979FC7'};;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 64px;
  overflow-y : scroll;
`
const SideBarLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

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
  text-transform: capitalize;

  margin: 8px 0%;
  color: #696969;
  > *:first-child{
    margin-right: 8px;
  }
  &.current{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    /* filter: saturate(80%); */
  }
`

const MonthWrapper = styled.div`
  width: 100%;
  height:350px;
  overflow: hidden;
`