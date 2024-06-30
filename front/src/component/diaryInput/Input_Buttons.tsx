import styled from "styled-components";
import Image from "next/image";


import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { RefObject, useCallback } from "react";
import Axios from "@/Aixos/aixos";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';


interface Props {
  type?: string;
  imageUploadRef: RefObject<HTMLInputElement>;
  submitDiary: () => void;
  images: Array<string>;
  setImages: (images: string[]) => void;
}

interface Err {
  response: {
    data?: string;
    statusText?: string;
  }
}

const DiaryInputButtons = ({ imageUploadRef, submitDiary, images, setImages, type }: Props) => {
  const router = useRouter();

  const ImageUploadMutation = useMutation({
    // mutationFn: (imageFormData: FoamData) => Axios.post('/image', imageFormData).then((res) => { setImages([...images, ...res.data]); });,
    mutationFn: (imageFormData: FormData) => Axios.post('/image', imageFormData),
    onSuccess: (res) => {
      console.log(res);
      setImages([...images, ...res.data]);
    },
    onError: (e: Err) => {
      // alert(e?.response?.statusText);
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log(e);
      console.log('image upload error');
    },
  });

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const ArrayImages = Array.from(e.target.files);

      //게시글 최대 이미지 개수 제한
      if (images.length + ArrayImages.length > 5) {
        // alert('이미지 파일은 최대 5개까지 삽입 가능합니다.')
        enqueueSnackbar("이미지 파일은 최대 5개까지 삽입 가능합니다.", { variant: 'info' });
        return null;
      }

      //용량 초과 이미지 체크
      const isOverSize = ArrayImages.find((file) => {
        if (file.size > 5 * 1024 * 1024) return true;
      });
      if (isOverSize) {
        // alert("선택된 이미지 중 5MB를 초과하는 이미지가 존재합니다.");
        enqueueSnackbar("선택된 이미지 중 5MB를 초과하는 이미지가 존재합니다.", { variant: 'info' });
        return null;
      }


      //용량 초과 이미지가 없는 경우 imageFormData에 이미지들 추가
      //e.target.files => formData 변환 과정 필요
      const imageFormData = new FormData();
      Array.from(e.target.files).forEach(file => {
        // console.log(file);
        imageFormData.append("image", file);
      });

      ImageUploadMutation.mutate(imageFormData);
    }
  };

  return (
    <> {(images?.length > 0 || ImageUploadMutation?.isPending) &&
      <UploadedImages>
        {images.map((e, i: number) => <ImageBox key={`image-${e}`}>
          <UploadedImage src={e} alt='diary image' width={100} height={100} />
          <ImageDeleteButton onClick={() => {
            const deletedImageArray = [...images];
            deletedImageArray.splice(i, 1);
            setImages(deletedImageArray);
          }}>
            <RemoveCircleOutlinedIcon fontSize="inherit" />
          </ImageDeleteButton>
        </ImageBox>)}
        {ImageUploadMutation?.isPending ? <ImageBox className="loading"><PendingOutlinedIcon fontSize="large" /></ImageBox> : <></>}
      </UploadedImages>
    }
      <Buttons>
        <Button onClick={() => router.back()}>
          <CancelOutlinedIcon className="icon"></CancelOutlinedIcon>
        </Button>
        <Button onClick={() => imageUploadRef.current?.click()}>
          <input ref={imageUploadRef} type="file" accept="image/*" name="image" multiple hidden onChange={onChangeImages} />
          <ImageOutlinedIcon className="icon" />
        </Button>
        <Button onClick={submitDiary}>
          {type === 'edit' ? <ModeEditOutlineOutlinedIcon className="icon" /> : <PostAddOutlinedIcon className="icon" />}
        </Button>
      </Buttons>
    </>

  );
}

export default DiaryInputButtons;


const UploadedImages = styled.div`
  display: flex;
  overflow-x: scroll;
  background-color: rgba(var(--whitesmoke), 0.3);
  border-top: solid 1px rgba(0,0,0,0.05);
  /* flex-shrink: 0; */
  min-height: 56px;

  @media (max-width: 479px) { //mobile port
    height: 112px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    height: 96px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    height: 172px;
  }
`
const ImageBox = styled.div`
  height: 100%;
  width: auto;
  aspect-ratio: 1.3;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.loading{
    aspect-ratio: 1;
    color: rgb(var(--greyTitle));
  }

  @media (max-width: 479px) { //mobile port
    aspect-ratio: 1.2;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    aspect-ratio: 1.8;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    aspect-ratio: 1.3;
  }
`
const UploadedImage = styled(Image)`
  width: 90%;
  height: 70%;

  border-radius: 8px;
  object-fit: cover;
`
const ImageDeleteButton = styled.button`
  transition: color ease-in-out 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 20%;

  color: rgb(var(--greyTitle));
  &:hover{
    color: #d84141;
  }
  
  @media (max-width: 479px) { //mobile port
    font-size: 20px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 12px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 22px;
  }
`

const Buttons = styled.div`
  height: var(--mobileNav);
  /* flex-shrink: 0; */
  background-color: whitesmoke;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  @media (max-width: 479px) { //mobile port
    border-radius: 0px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    border-radius: 0px;
  }
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.3) !important;
  }
  .icon:hover{
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'} !important;
  }
`