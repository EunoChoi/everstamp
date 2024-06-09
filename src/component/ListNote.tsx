import styled from "styled-components";
import Image from "next/image";

//img
import Test from '/public/img/loginPageImg.jpg';

//날짜만 프롭으로 받아오면 그걸로 검색해서 데이터 패칭
const ListNote = () => {
  const habits = ['운동하기', '잠자리 정리', '방 청소', '운동하기', '잠자리 정리', '방 청소', '운동하기', '잠자리 정리', '방 청소'];
  return (<Wrapper>
    <Date>
      <span className="week">Wed</span>
      <span className="date">29</span>
      <span className="date">April,</span>
      <span className="year">2024</span>
    </Date>

    <Habits>
      <Habit>{habits.length}개 완료</Habit>
      {habits.map((e, i) => <Habit key={e + i}>{e}</Habit>)}
    </Habits>

    <Note>
      <Text>일기 내용 들어가는 공간 ^^</Text>
      <Img src={Test} alt='ddd'></Img>
    </Note>
  </Wrapper >);
}

export default ListNote;



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  width: 100%;
  margin: 16px 0;
  &:first-child{
    margin-top: 64px;
  }
  &:last-child{
    margin-bottom: 128px;
  }
`
const Date = styled.div`
  .week, .date, .year{
    text-transform: capitalize;
    margin-right: 8px;
    color: grey;
    font-weight: 600;
  }
  .week{
    font-size: 32px;
    font-weight: 700;
    color: rgb(var(--grey_Title));
  }
  .date{
    font-size: 24px;
  }
  .year{
    font-size: 24px;
  }
`
const Habits = styled.div`
  width: 100%;
  height: auto;
  margin : 8px 0;
  
  display: flex;
  flex-shrink: 0;
  scrollbar-width: none;
  justify-content: start;
  overflow-x : scroll;
`
const Habit = styled.span`
  flex-shrink: 0;
  
  padding : 2px 8px;
  background-color: rgb(var(--point2));
  border-radius: 24px;
  margin-right: 12px;

  white-space: nowrap;

  font-size: 14px;
  font-weight: 600;
  color: rgb(var(--grey_Title_Darker));

  box-sizing: border-box;
  border : solid 4px rgb(var(--point2));

  &:first-child{
    background-color: rgba(0,0,0,0);
  }
  @media screen and (max-width: 720px) {
    padding : 2px 6px;
    font-size: 12px;
    margin-right: 8px;
  }
`
const Note = styled.div`
  display: flex;
  width: 100%;
  height: 150px;

  background-color: rgb(var(--lightGrey_CP));
  border-radius: 8px;
`
const Text = styled.span`
  width: 70%;
  height: 100%;

  padding: 24px;
  overflow-y: scroll;
  
  font-size: 18px;
    font-weight: 500;
    color: rgb(var(--grey_Title));
`
const Img = styled(Image)`
  width: 40%;
  height: 100%;

  object-fit: cover;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`

