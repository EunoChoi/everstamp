import styled from "styled-components";
import Image from "next/image";
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

interface Props {
  images: Array<string>;
  setImages: (images: string[]) => void;
}

const DiaryInputUploadedImage = ({ images, setImages }: Props) => {
  return (<>
    {images?.length > 0 &&
      <UploadedImages>
        {images.map((e, i: number) => <ImageBox key={`image-${e}`}>
          <UploadedImage src={e} alt='diary image' width={200} height={200} />
          <ImageDeleteButton onClick={() => {
            const deletedImageArray = [...images];
            deletedImageArray.splice(i, 1);
            setImages(deletedImageArray);
          }}>
            <RemoveCircleOutlinedIcon fontSize="inherit" />
          </ImageDeleteButton>
        </ImageBox>)}
      </UploadedImages>
    }
  </>);
}

export default DiaryInputUploadedImage;

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