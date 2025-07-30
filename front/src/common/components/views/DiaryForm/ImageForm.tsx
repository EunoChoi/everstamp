import { useRef, useState } from "react";
import styled from "styled-components";

import { ImageState, NewImage } from "@/common/types/image";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { enqueueSnackbar } from "notistack";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface ImageFormProps {
  images: ImageState[];
  setImages: (images: ImageState[] | ((prev: ImageState[]) => ImageState[])) => void;
}

const ImageForm = ({
  images,
  setImages }: ImageFormProps) => {

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState(true);

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    //이미지 개수 체크
    if (images.length + files.length > 5) {
      enqueueSnackbar("이미지 파일은 최대 5개까지 삽입 가능합니다.", { variant: 'error' });
      return;
    }
    //용량 초과 이미지 체크
    const isOverSize = files.find((file) => {
      if (file.size > 5 * 1024 * 1024) return true;
    });
    if (isOverSize) {
      enqueueSnackbar("선택된 이미지 중 5MB를 초과하는 이미지가 존재합니다.", { variant: 'error' });
      return;
    }

    const newImageFiles: NewImage[] = Array.from(e.target.files).map(file => ({
      type: 'new',
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...newImageFiles]);
  };

  return (<>
    <Wrapper>
      <Title>
        <span>emotion</span>
        <button onClick={() => { setToggle(c => !c) }}>
          {toggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
      </Title>
      <AnimatePresence>
        {toggle && <Images
          key="images"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '120px', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SquareBox>
            <UploadButton onClick={() => imageUploadRef.current?.click()}>
              <input ref={imageUploadRef} type="file" accept="image/*" name="image" multiple hidden onChange={onChangeImages} />
              <ImageOutlinedIcon className="icon" />
              <span>Upload</span>
            </UploadButton>
          </SquareBox>
          {images.map((image, i) => (
            <SquareBox key={image.type === 'new' ? image.preview : image.url}>
              <UploadedImage
                src={image.type === 'new' ? image.preview : image.url}
                alt='diary image'
                width={100}
                height={100}
              />
              <ImageDeleteButton onClick={() => {
                setImages(prev => prev.filter((_, index) => index !== i));
                if (image.type === 'new') {
                  URL.revokeObjectURL(image.preview);
                }
              }}>
                <RemoveCircleOutlinedIcon fontSize="inherit" />
              </ImageDeleteButton>
            </SquareBox>
          ))}
        </Images>}
      </AnimatePresence>
    </Wrapper>
  </>);
}


export default ImageForm;


const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  flex-shrink: 0;
`;
const Title = styled.section`
  text-transform: capitalize;
  font-size: 22px;

  color: rgb(var(--greyTitle));
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Images = styled(motion.div)`
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

  width: 16px;
  height: 16px;
  border-radius: 16px;
  font-size: 22px;
  background-color: white;
  color: black;
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