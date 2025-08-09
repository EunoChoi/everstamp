import { emotions } from "@/common/images/emotions";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";


const NoDiaries = () => {
  const router = useRouter();

  const onAddTodayDiary = () => {
    const todayString = format(new Date(), 'yyyy-MM-dd');
    router.push(`/app/calendar?date=${todayString}`, { scroll: false })
  }

  return (<Wrapper>
    <Image src={emotions[3].src} alt={emotions[3].alt} width={128} height={128} />
    <div>
      <span>작성된 일기가 존재하지 않습니다. :(</span>
      <button onClick={onAddTodayDiary}>캘린더 페이지로 이동</button>
    </div>
  </Wrapper>);
}

export default NoDiaries;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap : 48px;

  flex-shrink: 0;

  div{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    button{
      color: white;
      border: 2px solid rgba(0,0,0,0.07);
      background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#d7daeb'};
      border-radius: 999px;
      padding: 4px 20px;
    }
  }
`