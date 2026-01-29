import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import styled from "styled-components";
import loading from '/public/img/loading.gif';

import { RefObject } from "react";
import { MdOutlineImage, MdRemove } from 'react-icons/md';

import Api from "@/api/Api";
import { lightenColor } from "@/common/utils/lightenColor";



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
    mutationFn: (imageFormData: FormData) => Api.post('/image', imageFormData),
    onSuccess: (res) => {
      console.log(res);
      setImages([...images, ...res.data]);
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log(e);
      console.log('image upload error');
    },
  });

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const ArrayImages = Array.from(e.target.files);

      if (images.length + ArrayImages.length > 5) {
        enqueueSnackbar("이미지 파일은 최대 5개까지 삽입 가능합니다.", { variant: 'error' });
        return null;
      }

      const isOverSize = ArrayImages.find((file) => {
        if (file.size > 10 * 1024 * 1024) return true;
      });
      if (isOverSize) {
        enqueueSnackbar("선택된 이미지 중 10MB를 초과하는 이미지가 존재합니다.", { variant: 'error' });
        return null;
      }

      const imageFormData = new FormData();
      Array.from(e.target.files).forEach(file => {
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
          <MdOutlineImage className="icon" />
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
                <MdRemove />
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
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  flex-shrink: 0;

  display: flex;
  overflow-x: auto;
  gap: 16px;
  height: auto;
  align-items: stretch;

  padding: 16px 0;

  > *:first-child {
    margin-left: 16px;
  }

  > *:last-child {
    margin-right: 16px;
  }

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }
`
const SquareBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.02);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.loading {
    background-color: rgba(0, 0, 0, 0.05);
  }
`
const UploadedImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const ImageDeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  background-color: ${(props) => props.theme.themeColor ?? '#979FC7'};
  color: white;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
`

const UploadButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: ${(props) => props.theme.themeColor ? lightenColor(props.theme.themeColor, 35) : '#C4CBE0'};
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  &:disabled{
    opacity: 0.4;
    cursor: not-allowed;
  }

  span{
    font-size: 14px;
    font-weight: 500;
    color: rgb(var(--greyTitle));
  }

  .icon{
    font-size: 32px;
    color: rgb(var(--greyTitle));
  }
`