import { motion } from "framer-motion";
import styled from "styled-components";

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useRouter } from "next/navigation";

interface EmptyDiaryProps {
  selectedDate: string;
}

const EmptyDiary = ({ selectedDate }: EmptyDiaryProps) => {
  const router = useRouter();
  const onAddDiary = () => {
    router.push(`/app/inter/input/addDiary?date=${selectedDate}`, { scroll: false })
  }

  return (<Wrapper>
    <AddButton onClick={onAddDiary}>
      <AddCircleOutlinedIcon fontSize="inherit" />
    </AddButton>
  </Wrapper>);
}

export default EmptyDiary;

const AddButton = styled.button`
  line-height: 0;
  font-size: 56px;
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
`

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 220px;
  overflow: hidden;

  border: 2px solid rgba(0,0,0,0.07);
  border-radius: 16px;
  background-color: white;
`
const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
`