import { format } from "date-fns";
import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import { useCalendar } from "../../../../../../common/components/ui/Calendar/CalendarContext";

// 1. 감정 관련 데이터를 하나의 배열로 묶어서 관리 (더 안전하고 명확함)
import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';
import emptyIcon from '/public/img/emotion/empty.png';

interface EmotionData {
  name: string;
  src: StaticImageData;
}

const EMOTION_DATA: EmotionData[] = [
  { name: 'angry', src: emotion0 },
  { name: 'sad', src: emotion1 },
  { name: 'common', src: emotion2 },
  { name: 'happy', src: emotion3 },
  { name: 'joyful', src: emotion4 },
];

export const renderDateContent = ({ cellDate }: { cellDate: Date }) => {
  const { monthlyData } = useCalendar<{ [key: string]: any }>();

  const key = format(cellDate, 'yyMMdd');
  const {
    habitsCount = 0,
    isVisible: hasDiary = false,
    emotionType = -1,
  } = monthlyData?.[key] || {};
  const hasHabit = habitsCount > 0;
  const date = format(cellDate, 'd');
  const emotion = (emotionType >= 0 && emotionType < EMOTION_DATA.length) ? EMOTION_DATA[emotionType] : undefined;

  const renderContent = () => {
    if (hasDiary && emotion) {
      return (
        <Wrapper>
          <Image src={emotion.src} alt={emotion.name} />
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

    background-color: ${(props) => props.theme.point || '#979FC7'};
    color: white;
  }
`;