import Image from "next/image";
import styled from "styled-components";

//icon
import { DiaryWithRelations } from "@/server/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


import DiaryDateAndEmotion from "./DiaryDateAndEmotion";
import DiaryHabits from "./DiaryHabits";


import { SnackBarAction } from "@/common/utils/snackBar/SnackBarAction";
import { deleteDiaryByDate } from "@/server/actions/diary.actions";
import ImageIcon from '@mui/icons-material/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import DiaryMenu from "./DiaryMenu";

interface Props {
  selectedDate: string;
  diaryData: DiaryWithRelations;
}

const DiarySlide = ({ selectedDate, diaryData }: Props) => {
  const router = useRouter();
  const images = diaryData?.images;
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [diaryMenuOpen, setDiaryMenuOpen] = useState<boolean>(false);

  const habits = diaryData?.completedHabits?.map(e => e.name);

  const onToggleDiaryMenu = () => {
    setDiaryMenuOpen(c => !c)
  }
  const onZoomDiary = () => {

  }
  const onEditDiary = () => {
    setTimeout(() => {
      setDiaryMenuOpen(false);
    }, 300);
    router.push(`/app/inter/input/editDiary?date=${selectedDate}`, { scroll: false })
  }
  const onDeleteDiary = () => {
    setTimeout(() => {
      setDiaryMenuOpen(false);
    }, 300);

    const action = (snackbarId: SnackbarKey) => (
      <SnackBarAction
        yesAction={() => {
          deleteDiaryByDate({ date: selectedDate });
          closeSnackbar('diaryDelete');
        }}
        noAction={() => {
          closeSnackbar('diaryDelete');
        }} />
    );
    enqueueSnackbar(`${format(selectedDate, 'yy년 M월 d일')} 일기를 지우시겠습니까?`, { key: 'diaryDelete', persist: true, action, autoHideDuration: 6000 });
  }

  useEffect(() => {
    setDiaryMenuOpen(false);
  }, [diaryData.text])

  return (
    <Wrapper ref={slideWrapperRef} >
      <TextWrapper className='slideChild' >
        <AnimatePresence mode="wait">
          {diaryMenuOpen && <DiaryMenu
            onEditDiary={onEditDiary}
            onDeleteDiary={onDeleteDiary}
            onToggleDiaryMenu={onToggleDiaryMenu} />}
        </AnimatePresence>

        <DiaryTitle>
          <DiaryDateAndEmotion selectedDate={selectedDate} emotion={diaryData?.emotion} />
          <MoreButton onClick={onToggleDiaryMenu}>
            <MoreVertIcon fontSize="inherit" color='inherit' />
          </MoreButton>
        </DiaryTitle>

        <DiaryContent onClick={onZoomDiary}>
          <Text>{diaryData?.text}</Text>
        </DiaryContent>


        <DiaryInfo>
          {images?.length > 0 &&
            <ImageIndicator>
              <ImageIcon color="inherit" fontSize="inherit" />{`${images?.length}`}
            </ImageIndicator>}
          {/* <DiaryHabits habits={habits} /> */}
          <DiaryHabits habits={['운동', '공부', '잠자리 정리', '요가', '습관 1', '습관 1', '습관 1', '습관 1',]} />
        </DiaryInfo>

      </TextWrapper>

      {images.map(e =>
        <Img
          onClick={() => router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false })}
          key={e.id}
          className="slideChild"
          src={e.src}
          alt='image'
          width={300}
          height={300}
        />)}
    </Wrapper>
  );
}

export default DiarySlide;

const DiaryInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
`
const DiaryContent = styled.div`
  flex-grow: 1;

  display: flex;
  align-items: center;
`
const ImageIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: ${(props) => props.theme.fontSize ?? '15px'};
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
`
const DiaryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items : center;

  width: 100%;
  height: auto;
`
const MoreButton = styled.button`
  color: grey;
  font-size: 18px;
  padding-left: 8px;
`
const Wrapper = styled.div`   
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }

  position: relative;

  display: flex;
  justify-content: start;
  width: 100%;
  height: 100%;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  .slideChild{
    scroll-snap-align: center;
    scroll-snap-stop: always !important;
  }
`
const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 12px 16px;

  box-sizing: border-box;
  flex-shrink: 0;
`
const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;

  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  line-height: 1.6;
  font-size: ${(props) => props.theme.fontSize ?? '15px'};
  color: rgb(var(--greyTitle));
`
const Img = styled(Image)`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-fit: contain;
`