import { format, isSameDay, isSameMonth } from "date-fns";
import Image from "next/image";

//images
import emotion0 from '/public/img/emotion/emotion0.png'
import emotion1 from '/public/img/emotion/emotion1.png'
import emotion2 from '/public/img/emotion/emotion2.png'
import emotion3 from '/public/img/emotion/emotion3.png'
import emotion4 from '/public/img/emotion/emotion4.png'
import empty from '/public/img/emotion/empty.png'
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";

interface monthHabitsType {
  [key: string]: { habitsCount: number, isVisible: boolean, emotionType: number };
}
interface Props {
  dateData: Date;
  monthHabitResult: monthHabitsType;
}

const ValueAtCalendarPage = ({ dateData, monthHabitResult }: Props) => {

  //emotions
  const emotions = [emotion0, emotion1, emotion2, emotion3, emotion4];
  const emotionNames = ['upset', 'sad', 'common', 'happy', 'joyful'];

  const key = format(dateData, 'yyMMdd');
  const result = monthHabitResult[key];
  const habitsCount = result && result.habitsCount;
  const isVisible = result && result.isVisible;
  const emotionType = result && result.emotionType;
  const formattedDate = format(dateData, 'd');

  return <DateCell>
    {/* only emotion */}
    {isVisible && habitsCount === 0 && <DateValue_Diary>
      <Image priority src={emotions[emotionType]} alt={emotionNames[emotionType]} width={56} height={56} />
    </DateValue_Diary>}

    {/* emotion + habit count */}
    {isVisible && habitsCount > 0 && <DateValue_Diary>
      <Image priority src={emotions[emotionType]} alt={emotionNames[emotionType]} width={56} height={56} />
      <div className="count" > {habitsCount} </div>
    </DateValue_Diary>}

    {/* only habit count */}
    {!isVisible && habitsCount > 0 && <DateValue_Diary>
      <Image className="empty" priority src={empty} alt={emotionNames[emotionType]} width={56} height={56} />
      <div className="count" > {habitsCount} </div>
    </DateValue_Diary>}

    {/* none */}
    {!isVisible && !habitsCount && <DateValue_Date>{formattedDate} </DateValue_Date>}
  </DateCell>;
};

export default ValueAtCalendarPage;

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
      /* border-color: #f6f6f6; */
    }
  }
`
const DateCell = styled.button`
  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  animation: fadeIn 300ms ease-in-out;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;


  color: #666565;

  transition: border 400ms ease-in-out;

  border-top: 4px solid rgba(0,0,0,0);
  border-bottom: 4px solid rgba(0,0,0,0);

  &.today{
    border-bottom-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  &.selected{     
    border-bottom-color: ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
  }
  &.notCurrentMonth{
    color: #c8c8c8;
  }
`