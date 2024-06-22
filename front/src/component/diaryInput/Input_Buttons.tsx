import styled from "styled-components";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { RefObject } from "react";
import Axios from "@/Aixos/aixos";

interface Props {
  type?: string;
  imageUploadRef: RefObject<HTMLInputElement>;
  submitDiary: () => void;
  images: Array<string>;
  setImages: (images: string[]) => void;
}

const DiaryInputButtons = ({ imageUploadRef, submitDiary, images, setImages, type }: Props) => {

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const ArrayImages = Array.from(e.target.files);

      //게시글 최대 이미지 개수 제한
      if (images.length + ArrayImages.length > 6) {
        console.log('이미지 파일은 최대 5개까지 삽입 가능합니다.')
        // toast.error("이미지 파일은 최대 10개까지 삽입 가능합니다.");
        return null;
      }

      //용량 초과 이미지 체크
      const isOverSize = ArrayImages.find((file) => {
        if (file.size > 8 * 1024 * 1024) return true;
      });
      if (isOverSize) {
        console.log("선택된 이미지 중 5MB를 초과하는 이미지가 존재합니다.");
        // toast.error("선택된 이미지 중 5MB를 초과하는 이미지가 존재합니다.");
        return null;
      }


      //용량 초과 이미지가 없는 경우 imageFormData에 이미지들 추가
      //e.target.files => formData 변환 과정 필요
      const imageFormData = new FormData();
      Array.from(e.target.files).forEach(file => {
        console.log(file);
        imageFormData.append("image", file);
      });


      //이미지 업로드 요청
      //method : post, url : /image/
      Axios.post('/image', imageFormData).then((res) => { setImages([...images, ...res.data]); });
      // uploadImages.mutate(imageFormData, {
      //   onSuccess: (res) => {
      //     setImages([...images, ...res.data]);
      //   }
      // });
    }
  };

  return (
    <Buttons>
      <Button onClick={() => imageUploadRef.current?.click()}>
        <input ref={imageUploadRef} type="file" accept="image/*" name="image" multiple hidden onChange={onChangeImages} />
        <ImageOutlinedIcon className="icon" />
      </Button>
      <Button onClick={submitDiary}>
        {type === 'edit' ? <ModeEditOutlineOutlinedIcon className="icon" /> : <PostAddOutlinedIcon className="icon" />}
      </Button>
    </Buttons>
  );
}

export default DiaryInputButtons;


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
    color: rgb(var(--point)) !important;
  }
`