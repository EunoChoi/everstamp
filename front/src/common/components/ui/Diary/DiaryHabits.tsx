import styled from "styled-components";

interface DiaryHabitsProps {
  habits: string[];
}

/** @params habits : string[] (단순 습관 이름을 담은 배열) */
const DiaryHabits = ({ habits }: DiaryHabitsProps) => {
  const hashHabits = habits.map(e => (`#${e} `))
  return (
    <Wrapper>{hashHabits}</Wrapper>
  );
}

export default DiaryHabits;


const Wrapper = styled.span`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${(props) => props.theme.fontSize ?? '15px'};
  font-weight: 500;
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  text-transform: capitalize;
`