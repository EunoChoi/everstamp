import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import styled from "styled-components";

import { RefObject, useEffect, useRef } from "react";
import { MdOutlineImage, MdRemove } from 'react-icons/md';

import { lightenColor } from "@/common/utils/lightenColor";



interface Props {
  imageUploadRef: RefObject<HTMLInputElement>;
  images: Array<string | File>;
  setImages: (images: Array<string | File>) => void;
  isLoading: boolean;
}

const DiaryInputImages = ({ imageUploadRef, images, setImages, isLoading }: Props) => {
  const blobUrlCacheRef = useRef<Map<string, string>>(new Map());

  // File 객체를 위한 고유 키 생성
  const getFileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

  // 컴포넌트 언마운트 시 모든 Blob URL 해제
  useEffect(() => {
    const cache = blobUrlCacheRef.current;
    return () => {
      cache.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      cache.clear();
    };
  }, []);

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const ArrayImages = Array.from(e.target.files);

      // 개수 체크
      if (images.length + ArrayImages.length > 5) {
        enqueueSnackbar("이미지 파일은 최대 5개까지 삽입 가능합니다.", { variant: 'error' });
        e.target.value = '';
        return;
      }

      // 용량 체크 (10MB)
      const isOverSize = ArrayImages.find((file) => file.size > 10 * 1024 * 1024);
      if (isOverSize) {
        enqueueSnackbar("선택된 이미지 중 10MB를 초과하는 이미지가 존재합니다.", { variant: 'error' });
        e.target.value = '';
        return;
      }

      // File 객체를 상태에 추가 (서버 업로드 안 함)
      setImages([...images, ...ArrayImages]);

      // input value 초기화 - 같은 파일 재선택 가능하게
      e.target.value = '';
    }
  };

  // 이미지 URL 가져오기 (string이면 그대로, File이면 Blob URL)
  const getImageUrl = (img: string | File): string => {
    if (typeof img === 'string') {
      return img;
    }
    // File 객체인 경우 캐시된 Blob URL 반환 (없으면 새로 생성)
    if (img instanceof File) {
      const key = getFileKey(img);
      let blobUrl = blobUrlCacheRef.current.get(key);

      if (!blobUrl) {
        blobUrl = URL.createObjectURL(img);
        blobUrlCacheRef.current.set(key, blobUrl);
      }

      return blobUrl;
    }

    return '';
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = (index: number) => {
    const img = images[index];

    // File 객체인 경우 Blob URL 해제
    if (img instanceof File) {
      const key = getFileKey(img);
      const blobUrl = blobUrlCacheRef.current.get(key);
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        blobUrlCacheRef.current.delete(key);
      }
    }

    const deletedImageArray = [...images];
    deletedImageArray.splice(index, 1);
    setImages(deletedImageArray);
  };

  return (
    <Wrapper>
      <SquareBox>
        <UploadButton disabled={isLoading} onClick={() => imageUploadRef.current?.click()}>
          <input ref={imageUploadRef} type="file" accept="image/*" name="image" multiple hidden onChange={onChangeImages} />
          <MdOutlineImage className="icon" />
          <span>이미지</span>
        </UploadButton>
      </SquareBox>
      {images?.length > 0 &&
        <>
          {images.map((img, i: number) => {
            const imageUrl = getImageUrl(img);
            const key = typeof img === 'string' ? `image-${img}` : `image-${img.name}-${i}`;

            // imageUrl이 없으면 렌더링하지 않음
            if (!imageUrl) return null;

            return (
              <SquareBox key={key}>
                <UploadedImage
                  src={imageUrl}
                  alt='diary image'
                  width={100}
                  height={100}
                  unoptimized
                />
                <ImageDeleteButton onClick={() => handleRemoveImage(i)}>
                  <MdRemove />
                </ImageDeleteButton>
              </SquareBox>
            );
          })}
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
