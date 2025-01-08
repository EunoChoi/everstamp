import Image from "next/image";
import styled from "styled-components";

//icon
import useCustomRouter from "@/common/hooks/useCustomRouter";


interface ImageProps {
  id: string;
  src: string;
}
interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  // themeColor: string;
}

interface Props {
  height: string;
  diaryData: {
    email: string;
    id: number;
    date: Date;
    text: string;
    Images: Array<ImageProps>;
    Habits: Array<Habit>;
  };
}

const DiarySlide = ({ diaryData, height }: Props) => {
  const router = useCustomRouter();
  const images = diaryData?.Images;


  return (
    <Wrapper $height={height}>
      <SlideWrapper>
        <TextWrapper
          onClick={() => router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false })}
          className='slideChild' >
          <Text>
            {diaryData.text}
          </Text>
          {images.length > 0 && <MoreImagesText>{images.length} images ➝</MoreImagesText>}
        </TextWrapper>

        {images.map(e =>
          <Img
            onClick={() => router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false })}
            key={e.id}
            className="slideChild"
            src={e.src}
            alt='image'
            width={300}
            height={300}
            blurDataURL={e.src}
            placeholder="blur"
          />)}
      </SlideWrapper>
    </Wrapper>
  );
}

export default DiarySlide;

const MoreImagesText = styled.button`
  text-align: right;
  font-size: 14px;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
`
const Wrapper = styled.div<{ $height: string }>`
   height: ${props => props.$height};
   width: 100%;

   display: flex;
   flex-direction: column;
   justify-content: center;
`
const SlideWrapper = styled.div`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }

  display: flex;
  justify-content: start;
  width: 100%;
  height: 100%;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  .slideChild{
    scroll-snap-align: center;
    scroll-snap-stop: always !important;
    /* &:not(:last-child){ margin-right: 12px;} */
  }
`
const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 16px;

  box-sizing: border-box;
  flex-shrink: 0;
`
const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  @media (min-width:1024px) { //desktop
    -webkit-line-clamp: 5;
    line-height: 1.8;
  }

  overflow: hidden;

  white-space: pre-wrap;
  overflow-wrap: break-word;

  font-size: 16px;
  font-weight: 500;
  color: rgb(var(--greyTitle));
`
const Img = styled(Image)`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
`