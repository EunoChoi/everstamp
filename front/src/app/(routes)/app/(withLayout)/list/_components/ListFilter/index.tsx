import styled from "styled-components";


import RefreshIcon from '@mui/icons-material/Refresh';
import { getYear } from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFilter } from "../../_hooks/useFilter";
import EmotionSelector from "./EmotionSelector";
import MonthSelector from "./MonthSelector";

interface ListFilterProps {
  contentRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const ListFilter = () => {
  //real filter state
  const { selectedMonth, selectedYear, emotionToggle, isFilterOpen, setFilterState } = useFilter()

  //temp filter state
  const [tempEmotion, setTempEmotion] = useState<number>(5);
  const [tempYear, setTempYear] = useState<number>(getYear(new Date()));
  const [tempMonth, setTempMonth] = useState<number>(0);

  useEffect(() => {
    if (isFilterOpen) {
      if (selectedYear) setTempYear(Number(selectedYear));
      if (selectedMonth) setTempMonth(Number(selectedMonth));
      if (emotionToggle) setTempEmotion(Number(emotionToggle));
    }
  }, [isFilterOpen])

  const onInitialize = () => {
    setTempEmotion(5);
    setTempYear(getYear(new Date()));
    setTempMonth(0);
  }
  const onSubmit = () => {
    setFilterState({ emotion: tempEmotion, year: tempYear, month: tempMonth, isOpen: false })
  }

  return (
    <BG
      onClick={() => setFilterState({ isOpen: false })}
      key='list-filter-bg'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Wrapper
        onClick={(e) => e.stopPropagation()}
        key='list-filter'
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <EmotionSelector setEmotionToggle={setTempEmotion} emotionToggle={tempEmotion} />
        <MonthSelector selectedYear={tempYear} setSelectedYear={setTempYear} selectedMonth={tempMonth} setSelectedMonth={setTempMonth} />
        <InitButton onClick={onInitialize}><RefreshIcon fontSize="small" />선택 초기화</InitButton>
        <ButtonWrapper>
          <Button className="cancel" onClick={() => setFilterState({ isOpen: false })}>취소</Button>
          <Button onClick={onSubmit}>확인</Button>
        </ButtonWrapper>
      </Wrapper>
    </BG>
  );
}

export default ListFilter;

const BG = styled(motion.div)`
  z-index: 9999;
  position: fixed; 
  left: 0px;
   top: 0px;
  
  width: 100dvw;
  height: 100dvh;
  backdrop-filter: blur(4px);
`

const Wrapper = styled(motion.div)`
  transform-origin: top;

  overflow: hidden;
  position: fixed;
  top: -3px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: white;

  @media (max-width: 479px) { //mobile port
    box-shadow: 0px 12px 12px rgba(0,0,0,0.1);
    width: 100%;
    height: auto;
    padding: 56px 24px;
    gap: 24px;

    border-end-start-radius: 24px;
    border-end-end-radius: 24px;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    box-shadow: 0px 4px 24px rgba(0,0,0,0.15);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;

    gap: 16px;
    padding: 16px 24px;
    width: 350px;
    border-radius: 24px;
  }
  @media (min-width:1025px) { //desktop
    box-shadow: 0px 4px 24px rgba(0,0,0,0.15);

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;

    width: 500px;
    gap: 32px;
    padding: 48px 36px;
    border-radius: 24px;
  }
`

const ButtonWrapper = styled.div`
  display : flex;
  align-items: center;
  gap: 12px;
`
const Button = styled.button`
  font-size: 14px;

  padding: 4px 20px;
  border-radius: 32px;
  border: 2px solid rgba(0,0,0,0.08);

  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + '90' : '#979FC7'};
  color: rgb(var(--greyTitle));

  &.cancel{
    background-color: white;
    border : 2px solid  ${(props) => props.theme.themeColor ? props.theme.themeColor + '90' : '#979FC7'};
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    font-size: 12px;
    padding: 2px 16px;
  }
`

const InitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-size: 16px;
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
`
