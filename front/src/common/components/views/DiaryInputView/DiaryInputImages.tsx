import Axios from "@/Axios/axios";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import styled from "styled-components";
import loading from '/public/img/loading.gif';

import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { RefObject } from "react";


import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';



interface Props {
  imageUploadRef: RefObject<HTMLInputElement>;
  images: Array<string>;
  setImages: (images: string[]) => void;
  isLoading: boolean;
}

interface Err {
  response: {
    data?: string;
    statusText?: string;
  }
}

const DiaryInputImages = ({ imageUploadRef, images, setImages, isLoading }: Props) => {

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
        enqueueSnackbar("이미지 파일은 최대 5개까지 삽입 가능합니다.", { variant: 'error' });
        return null;
      }

      //용량 초과 이미지 체크
      const isOverSize = ArrayImages.find((file) => {
        if (file.size > 5 * 1024 * 1024) return true;
      });
      if (isOverSize) {
        // alert("선택된 이미지 중 5MB를 초과하는 이미지가 존재합니다.");
        enqueueSnackbar("선택된 이미지 중 5MB를 초과하는 이미지가 존재합니다.", { variant: 'error' });
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
    <Wrapper>
      <SquareBox>
        <UploadButton disabled={isLoading} onClick={() => imageUploadRef.current?.click()}>
          <input ref={imageUploadRef} type="file" accept="image/*" name="image" multiple hidden onChange={onChangeImages} />
          <ImageOutlinedIcon className="icon" />
          <span>Upload</span>
        </UploadButton>
      </SquareBox>
      {(images?.length > 0 || ImageUploadMutation?.isPending) &&
        <>
          {images.map((e, i: number) =>
            <SquareBox key={`image-${e}`}>
              <UploadedImage src={e} alt='diary image' width={100} height={100} />
              <ImageDeleteButton onClick={() => {
                const deletedImageArray = [...images];
                deletedImageArray.splice(i, 1);
                setImages(deletedImageArray);
              }}>
                <RemoveCircleOutlinedIcon fontSize="inherit" />
              </ImageDeleteButton>
            </SquareBox>)}
          {ImageUploadMutation?.isPending ? <SquareBox className="loading"><Image src={loading} alt="loading" width={70} height={70} /></SquareBox> : <></>}
        </>
      }
    </Wrapper>
  );
}

export default DiaryInputImages;


const Wrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  height: 100%;

  background-color: #f9f9f9;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`
const SquareBox = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  aspect-ratio: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const UploadedImage = styled(Image)`
  width: 85%;
  height: 85%;
  border-radius: 8px;
  object-fit: cover;
`
const ImageDeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 18px;
  height: 18px;
  border-radius: 18px;
  font-size: 26px;
  background-color: rgb(var(--greyTitle));
  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + '90' : '#979FC7'};
`

const UploadButton = styled.button`
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;

  height: 85%;
  width: 85%;
  border-radius: 8px;
  border: 2px solid rgba(0,0,0,0.2);
  background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + '90' : '#979FC7'};
  span{
    margin-top: 4px;
    font-size: 14px;
    /* font-weight: 600; */
    color: rgb(var(--greyTitle));
  }
  &:disabled{
    opacity: 0.4;
  }
  .icon{
    font-size: 32px;
    color: rgb(var(--greyTitle));
  }
`