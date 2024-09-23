'use client';

import { useState, useRef, useEffect } from "react";
import Axios from "@/Axios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import InputDiaryLayout from "../../diaryInput/Input_Layout";

//function
import { getDiary } from "@/function/fetch/diary";
import IsMobile from "@/function/IsMobile";

//icon
import DiaryInputTextArea from "../../diaryInput/Input_TextArea";
import { enqueueSnackbar } from "notistack";
import DiaryInputEmotion from "../../diaryInput/Input_Emotion";
import { useCustomRouter } from "@/function/customRouter";
import DiaryInputImages from "@/component/diaryInput/Input_Images";


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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

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

  const textarea = <DiaryInputTextArea text={text} setText={setText} inputRef={inputRef} />;
  const emotionSelector = <DiaryInputEmotion emotion={emotion} setEmotion={setEmotion} />
  const inputImages = <DiaryInputImages imageUploadRef={imageUploadRef} images={images} setImages={setImages} isLoading={editDiaryMutation.isPending} />

  return (
    <InputDiaryLayout
      date={diaryData?.date}
      textarea={textarea}
      emotionSelector={emotionSelector}
      inputImages={inputImages}
      onSubmit={onEditDiary} />);
}

export default EditDiaryModal;