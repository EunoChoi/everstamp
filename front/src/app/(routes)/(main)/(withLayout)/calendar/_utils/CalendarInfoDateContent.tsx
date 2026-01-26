import { format } from "date-fns";
import Image from "next/image";
import styled from "styled-components";

import { useCalendar } from "@/common/components/ui/Calendar/CalendarContext";
import { EMOTIONS } from "@/common/constants/emotions";
import emptyIcon from '/public/img/emotion/empty.png';

export const RenderDateContent = ({ cellDate }: { cellDate: Date }) => {
  const { monthlyData } = useCalendar<{ [key: string]: any }>();

  const key = format(cellDate, 'yyMMdd');
  const {
    habitsCount = 0,
    isVisible: hasDiary = false,
    emotionType = -1,
  } = monthlyData?.[key] || {};
  const hasHabit = habitsCount > 0;
  const date = format(cellDate, 'd');
  const emotion = EMOTIONS[emotionType];

  const renderContent = () => {
    if (hasDiary && emotion) {
      return (
        <Wrapper>
          <Image src={emotion.src} alt={emotion.nameKr} />
          {habitsCount > 0 && <div className="count">{habitsCount}</div>}
        </Wrapper>
      );
    }
    if (!hasDiary && hasHabit) {
      return (
        <Wrapper>
          <Image src={emptyIcon} alt="no emotion" />
          <div className="count">{habitsCount}</div>
        </Wrapper>
      );
    }
    return (<span className="date">{date}</span>);
  };

  return renderContent();
};


const Wrapper = styled.div`
  position: relative; 
  width: 80%;

  & > img {
    width: 100%; 
    height: auto;
  }

  .count {
    position: absolute;
    top: -10px; 
    right: -2px;

    width: 22px;
    height: 22px;
    border-radius: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => props.theme.themeColor || '#979FC7'};
    color: white;
  }
`;