import { format } from "date-fns";
import Image from "next/image";

//images
import emotion0 from '/public/img/emotion/emotion0.png'
import emotion1 from '/public/img/emotion/emotion1.png'
import emotion2 from '/public/img/emotion/emotion2.png'
import emotion3 from '/public/img/emotion/emotion3.png'
import emotion4 from '/public/img/emotion/emotion4.png'
import empty from '/public/img/emotion/empty.png'
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getHabit_status_month } from "@/common/function/fetch/habit";

interface monthHabitsType {
  [key: string]: { habitsCount: number, isVisible: boolean, emotionType: number };
}

const CalendarPageValue = ({ displayDate, dateData }: { displayDate: Date, dateData: Date }) => {
  const emotions = [emotion0, emotion1, emotion2, emotion3, emotion4];
  const EMOTION_NAME_ENG = ['upset', 'sad', 'common', 'happy', 'joyful'];

  const { data } = useQuery({
    queryKey: ['habit', 'month', format(displayDate, 'MM')],
    queryFn: () => getHabit_status_month({ date: displayDate }),
    //select 옵션 덕분에 가공한 데이터도 캐시에 저장된다., 데이터를 가져올때마다 매번 가공 x
    select: (data) => {
      const monthHabitResult: monthHabitsType = {};
      data.forEach((e: any) => {
        monthHabitResult[format(e.date, 'yyMMdd')] = { habitsCount: e?.Habits?.length, isVisible: e?.visible, emotionType: e?.emotion };
      });
      return { ...data, monthHabitResult };
    }
  });

  const key = format(dateData, 'yyMMdd');
  const result = data?.monthHabitResult[key];
  const habitsCount = result && result.habitsCount;
  const isVisible = result && result.isVisible;
  const emotionType = result && result.emotionType;
  const formattedDate = format(dateData, 'd');

  return <DateValue>
    {/* only emotion */}
    {isVisible && habitsCount === 0 && <DateValue_Diary>
      <Image priority src={emotions[emotionType]} alt={EMOTION_NAME_ENG[emotionType]} width={56} height={56} />
    </DateValue_Diary>}
    {/* emotion + habit count */}
    {isVisible && habitsCount > 0 && <DateValue_Diary>
      <Image priority src={emotions[emotionType]} alt={EMOTION_NAME_ENG[emotionType]} width={56} height={56} />
      <div className="count" > {habitsCount} </div>
    </DateValue_Diary>}
    {/* only habit count */}
    {!isVisible && habitsCount > 0 && <DateValue_Diary>
      <Image className="empty" priority src={empty} alt={EMOTION_NAME_ENG[emotionType]} width={56} height={56} />
      <div className="count" > {habitsCount} </div>
    </DateValue_Diary>}
    {/* none */}
    {!isVisible && !habitsCount && <DateValue_Date>{formattedDate} </DateValue_Date>}
  </DateValue>;
};

export default CalendarPageValue;

const DateValue_Date = styled.div`
  font-size: 14px;
  font-weight: 500;

  margin: 6px 0px;
`
const DateValue_Diary = styled.div`
  position: relative;
  width: 75%;
  height: auto;
  display: flex;
  justify-content: center;


  @media (min-width:1024px) { //desktop
    width: 30px;
  }
  .empty{
    @media (max-width: 479px) { //mobile port
      opacity: 0.55;
    }
  }
  .count{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border : 2px solid white;
    
    font-size: 12px;
    font-weight: 500;
    color: white;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    filter: brightness(110%) saturate(50%);
    @media (min-width:1024px) { //desktop
      top: -8px;
      right: -8px;
      font-size: 12px;
      width: 20px;
      height: 20px;
      border : none;
    }
  }
`
const DateValue = styled.button`
  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
  animation: fadeIn 300ms ease-in-out;
  transition: border 400ms ease-in-out;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  color: #525252;
`