'use client';

import { useState, useRef, useEffect } from "react";
import Axios from "@/Axios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//function
import { getDiary } from "@/function/fetch/diary";

//icon
import DiaryInputTextArea from "../../diaryInput/Input_TextArea";
import { enqueueSnackbar } from "notistack";
import DiaryInputEmotion from "../../diaryInput/Input_Emotion";
import { useCustomRouter } from "@/function/customRouter";
import DiaryInputImages from "@/component/diaryInput/Input_Images";
import $Modal from "@/style/common_modal";
import DiaryInputDate from "@/component/diaryInput/Input_Date";
import $Common from "@/style/common";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


interface Err {
  response: {
    data: string;
  }
}

interface ServerImageProps {
  id: string;
  src: string;
}
interface EditDiaryProps {
  diaryId: string | null;
  text: string;
  images: string[];
  emotion: number;
}

interface DiaryProps {
  id: string;
  date: Date;
  text: string;
  emotion: number;
  Images: Array<any>;
  diaryId: string | null;
}




const EditDiaryModal = ({ diaryId }: { diaryId: string | null }) => {
  const queryClient = useQueryClient();
  const router = useCustomRouter();


  const { data: diaryData, isError } = useQuery<DiaryProps>({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiary({ id: diaryId }),
    enabled: diaryId !== null
  });

  const [text, setText] = useState<string>(diaryData?.text ? diaryData?.text : "");
  const [images, setImages] = useState<Array<string>>(diaryData?.Images ? diaryData.Images?.map((e: ServerImageProps) => e.src) : []);
  const [emotion, setEmotion] = useState<number>(diaryData?.emotion ? diaryData.emotion : 0);

  const emotionsRef = useRef<HTMLDivElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const [emotionOpen, setEmotionOpen] = useState(true);
  const [contentsOpen, setContentsOpen] = useState(true);
  const [imagesOpen, setImagesOpen] = useState(true);

  const onEditDiary = () => {
    editDiaryMutation.mutate({ text, images, diaryId, emotion })
  };


  const editDiaryMutation = useMutation({
    mutationFn: ({ text, images, diaryId, emotion }: EditDiaryProps) => Axios.patch(`/diary?diaryId=${diaryId}`, { text, images, emotion }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });

      console.log('success edit diary');
      router.back();
      setTimeout(() => {
        enqueueSnackbar('일기 수정 완료', { variant: 'success' });
      }, 300);
    },
    onError: (e: Err) => {
      // alert(e?.response?.data);
      enqueueSnackbar(e?.response?.data, { variant: 'error' });

      console.log('edit diary error');
    },
  });

  useEffect(() => {
    if (isError) router.push('/404');
  }, [isError])

  return (
    <$Modal.Background onClick={() => router.back()}>
      <$Modal.Wrapper onClick={(e) => e.stopPropagation()}>
        <$Modal.Top>
          <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
          <DiaryInputDate date={diaryData?.date} />
          <button onClick={onEditDiary} disabled={editDiaryMutation.isPending}>수정</button>
        </$Modal.Top>


        <$Common.Empty />
        <$Modal.DiaryInputSection>
          <$Modal.DiaryInputTitle>
            <span>emotion</span>
            <button onClick={() => { setEmotionOpen(c => !c) }}>
              {emotionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </$Modal.DiaryInputTitle>
          {emotionOpen &&
            <$Modal.DiaryInputEmotions ref={emotionsRef}>
              <DiaryInputEmotion emotion={emotion} setEmotion={setEmotion} />
            </$Modal.DiaryInputEmotions>
          }
        </$Modal.DiaryInputSection>
        <$Modal.DiaryInputSection>
          <$Modal.DiaryInputTitle>
            <span>contents</span>
            <button onClick={() => { setContentsOpen(c => !c) }}>
              {contentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </$Modal.DiaryInputTitle>
          {contentsOpen &&
            <$Modal.DiaryInputTextarea>
              <DiaryInputTextArea text={text} setText={setText} emotionsRef={emotionsRef} />
            </$Modal.DiaryInputTextarea>
          }
        </$Modal.DiaryInputSection>
        <$Modal.DiaryInputSection>
          <$Modal.DiaryInputTitle>
            <span>images</span>
            <button onClick={() => { setImagesOpen(c => !c) }}>
              {imagesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </$Modal.DiaryInputTitle>
          {imagesOpen &&
            <$Modal.DiaryInputImages>
              <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={editDiaryMutation.isPending} />
            </$Modal.DiaryInputImages>
          }
        </$Modal.DiaryInputSection>
        <$Common.Empty />
      </$Modal.Wrapper>
    </$Modal.Background>
  );
}

export default EditDiaryModal;