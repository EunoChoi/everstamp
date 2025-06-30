import styled from "styled-components";

import Axios from "@/Axios/axios";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SnackBarAction } from "../../util/snackBar/SnackBarAction";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  position: number | undefined;
  diaryData: {
    date: Date;
    visible: boolean;
    emotion: number;
    text: string;
    id: number;
  }
}

interface Err {
  response: {
    data: string;
  }
}

const DiaryMenus = ({ isMenuOpen, setMenuOpen, position, diaryData }: Props) => {
  const queryClient = useQueryClient();
  const router = useCustomRouter();

  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (isMenuOpen) {
      timer.current = window.setTimeout(closeMenu, 5000);
    }
    return () => {
      if (timer.current !== null) {
        console.log('delete timer - ', timer.current);
        clearTimeout(timer.current);
        timer.current = null;
      }
    }
  }, [isMenuOpen])


  const deleteDiaryMutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      await Axios.delete(`diary?id=${id}`)
    },
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });
      console.log('success delete diary');
      closeSnackbar('diaryDelete');
      enqueueSnackbar('일기 삭제 완료', { variant: 'success' });
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('delete diary error');
    },
  });
  const closeMenu = () => {
    setMenuOpen(false);
  }
  const onClickDeleteButton = () => {
    const action = (snackbarId: SnackbarKey) => (
      <SnackBarAction
        yesAction={() => {
          deleteDiaryMutation.mutate({ id: diaryData.id });
          closeSnackbar('diaryDelete');
        }}
        noAction={() => {
          closeSnackbar('diaryDelete');
        }} />
    );
    enqueueSnackbar(`${format(diaryData.date, 'yy년 M월 d일')} 일기를 지우시겠습니까?`, { key: 'diaryDelete', persist: true, action, autoHideDuration: 6000 });
    closeMenu();
  };
  const onClickCopy = () => {
    navigator.clipboard.writeText(diaryData.text).then(() => {
      enqueueSnackbar('텍스트가 클립보드에 복사되었습니다.', { variant: 'success' });
    });
    closeMenu();
  }
  const onClickEdit = () => {
    router.push(`/app/inter/input/editDiary?id=${diaryData.id}`, { scroll: false })
    closeMenu();
  };


  return <Wrapper className={isMenuOpen ? '' : 'hidden'} $position={position}>
    <button onClick={onClickCopy}>
      <ContentCopyIcon className='icon' fontSize='inherit' color='inherit' />텍스트 복사
    </button>
    <button onClick={onClickEdit}>
      <EditOutlinedIcon className='icon' fontSize='inherit' color='inherit' />수정
    </button>
    <button onClick={onClickDeleteButton}>
      <DeleteForeverOutlinedIcon className='icon' fontSize='inherit' color='inherit' />삭제
    </button>
  </Wrapper>;
}

export default DiaryMenus;

const Wrapper = styled.div<{ $position: number | undefined }>`
  transition: 200ms ease-in-out opacity;
  opacity: 1;
  &.hidden{
    pointer-events: none;
    opacity: 0;
  }

  height: auto;
  width: auto;
  padding: 12px 24px;

  display: flex;
  align-items : center;
  position: absolute;
  top: ${props => props.$position ? `${props.$position}px` : '50px'};
  right: 12px;
  gap: 24px;

  background-color : white;
  border: 2px solid rgba(0,0,0,0.09);
  border-radius: 12px;

  button{
    .icon{
      font-size: 18px;
      margin-right: 4px;
      line-height: 0;
    }
    display:flex;
    align-items: center;
    font-size: 14px;
    /* font-weight: 600; */
    color: rgb(var(--greyTitle));

    &:last-child{
      color: #d24343;
    }
  }
`