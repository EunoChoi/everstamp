import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useRouter } from 'next/navigation';
import styled from "styled-components";


interface Props {
  date: string; // 'yyyy-MM-dd'
  height: string;
}

const DiaryAddButton = ({ date, height }: Props) => {

  const router = useRouter();
  const onAddDiary = () => {
    router.push(`/app/inter/input/addDiary?date=${date}`, { scroll: false })
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
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
    @media (min-width:1025px) { //desktop
      font-size: 56px;
    }
  }
`