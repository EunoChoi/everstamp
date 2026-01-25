import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import styled from "styled-components";

interface Props {
  date: string; // 'yyyy-MM-dd'
}

const DiaryAddButton = ({ date }: Props) => {
  const router = useRouter();

  const onAddDiary = () => {
    router.push(`/app/inter/input/addDiary?date=${date}`, { scroll: false });
  };

  return (
    <Wrapper>
      <AddButton onClick={onAddDiary}>
        <span>새 일기 작성</span>
        <AddIcon fontSize="inherit" />
      </AddButton>
    </Wrapper>
  );
};

export default DiaryAddButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  
  font-size: ${(props) => props.theme.fontSize ?? '15px'};
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
`
