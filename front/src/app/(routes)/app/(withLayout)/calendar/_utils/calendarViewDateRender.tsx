import { format } from "date-fns";
import styled from "styled-components";

import { useCalendar } from "@/common/components/ui/Calendar/CalendarContext";
import { CellDateValue } from "@/common/components/ui/Calendar/utils/makeCalendarDates";
import { emotions } from "@/common/images/emotions";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import emptyIcon from '/public/img/emotion/empty.png';



export const calendarViewDateRender = ({ cellDate }: { cellDate: CellDateValue }) => {
  const { monthlyData } = useCalendar<{
    [key: string]: {
      habitsCount: number;
      visible: boolean;
      emotion: number;
    }
  }>();

  const cellDateObject = cellDate.dateObject;
  const cellDateString = cellDate.dateString;

  const {
    habitsCount,
    visible,
    emotion,
  } = monthlyData?.[cellDateString] || {};

  const hasHabit = habitsCount > 0;
  const date = format(cellDateObject, 'd');

  return <AnimatePresence mode="wait">
    {visible && <Wrapper
      key={cellDateString}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Image src={emotions[emotion].src} alt={emotions[emotion].alt} />
      {hasHabit && <div className="count">{habitsCount}</div>}
    </Wrapper>}
    {!visible && hasHabit && <Wrapper
      key={cellDateString}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Image src={emptyIcon} alt="no emotion" />
      {hasHabit && <Wrapper
        key={cellDateString}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}><div className="count">{habitsCount}</div>
      </Wrapper>}
    </Wrapper>}
    {!visible && !hasHabit && <span className="date">{date}</span>}
  </AnimatePresence>
};


const Wrapper = styled(motion.div)`
  position: relative; 
  width: 80%;

  display : flex;
  justify-content: center;
  align-items: center;

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