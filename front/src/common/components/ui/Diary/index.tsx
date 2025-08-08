import { AnimatePresence, motion } from 'framer-motion';
import styled from "styled-components";

import { DiaryWithRelations } from '@/server/types';
import DiarySlide from './DiarySlide';



interface DiaryProps {
  diaryData: DiaryWithRelations;
}

const Diary = ({ diaryData }: DiaryProps) => {

  return (
    <Wrapper>
      <AnimatePresence mode="wait">
        <Content
          key={diaryData?.id ?? ''}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <DiarySlide diaryData={diaryData} />
        </Content>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Diary;

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