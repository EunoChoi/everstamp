import styled from "styled-components";
import Image from "next/image";

//img
import Test from '/public/img/loginPageImg.jpg';

//날짜만 프롭으로 받아오면 그걸로 검색해서 데이터 패칭
const MonthNote = () => {
  const habits = ['운동하기', '잠자리 정리', '방 청소', '운동하기', '잠자리 정리', '방 청소', '운동하기', '잠자리 정리', '방 청소'];
  return (
    <Wrapper>
      <Date>
        <span className="week">Wed</span>
        <div>
          <span className="date">April</span>
          <span className="date">29,</span>
          <span className="year">2024</span>
        </div>
      </Date>

      <Habits>
        <Habit>{habits.length} habits done</Habit>
        {habits.map((e, i) => <Habit key={e + i}>{e}</Habit>)}
      </Habits>

      <Note>
        <Text><span>일기 없는 경우에만 플러스모양으로 작성 가능하도록 처리일기 내용 들어가는 공간 ^^</span></Text>
        <ImgWrapper>
          <Img src={Test} alt='image'></Img>
        </ImgWrapper>
      </Note>
    </Wrapper >
  );
}

export default MonthNote;



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;

  /* padding-bottom: 12px; */

  width: 100%;
  height: calc((100dvh - var(--desktopHeader))/3*2);

  @media screen and (max-width: 720px) {
    height: calc((100dvh - var(--mobileHeader) - var(--mobileNav))/3*2);
  }
`
const Date = styled.div`
  .week{
    font-size: 44px;
    font-weight: 700;
    color: rgb(var(--grey_Title));
  }
  .date{
    text-transform: capitalize;
    font-size: 28px;
    font-weight: 600;
    color: grey;

    margin-right: 16px;
  }
  .year{
    font-size: 28px;
    font-weight: 600;
    color: grey;
  }
`
const Habits = styled.div`
  width: 100%;
  height: auto;
  
  margin : 12px 0;
  
  display: flex;
  flex-shrink: 0;
  scrollbar-width: none;

  justify-content: start;
  overflow-x : scroll;
`
const Habit = styled.span`
  flex-shrink: 0;
  
  padding : 0px 16px;
  background-color: rgb(var(--point2));
  border-radius: 24px;
  margin-right: 12px;

  white-space: nowrap;

  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
  color: rgb(var(--grey_Title_Darker));

  box-sizing: border-box;
  border : solid 4px rgb(var(--point2));

  &:first-child{
    background-color: rgba(0,0,0,0);
  }
  &:last-child{
    margin-right: 0px;
  }
  @media screen and (max-width: 720px) {
    &{
      padding : 0px 12px;
      font-size: 14px;
      margin-right: 8px;
    }
  }
`
const Note = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgb(var(--lightGrey_CP));
  border-radius: 8px;

  @media screen and (max-width: 720px) {
    height: 50%;
  }
`
const Text = styled.div`
  width: 70%;
  height: 100%;

  padding: 24px;
  overflow-y: scroll;

  span{
    font-size: 18px;
    font-weight: 500;
    color: rgb(var(--grey_Title));
  }
`
const ImgWrapper = styled.div`
  width: 40%;
  height: 100%;
`
const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`

