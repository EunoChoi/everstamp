import useCustomRouter from "@/common/hooks/useCustomRouter";
import styled from "styled-components";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


interface Props {
  date: number;
  height: string;
}

const DiaryAddButton = ({ date, height }: Props) => {

  const router = useCustomRouter();
  const onAddDiary = () => {
    router.push(`/main/inter/input/addDiary?date=${date}`, { scroll: false })
  }

  return (<Wrapper $height={height}>
    <button onClick={onAddDiary}><AddCircleOutlinedIcon fontSize="inherit" /></button>
  </Wrapper>);
}

export default DiaryAddButton;

const Wrapper = styled.div<{ $height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: ${props => props.$height};
  border-radius: 8px;

  button{
    line-height: 0;
    font-size: 40px;
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    filter: brightness(115%) saturate(50%);
    @media (min-width:1024px) { //desktop
      font-size: 56px;
    }
  }
`