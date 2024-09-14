import Indicator from "./indicator";

import { useRef, useState } from "react";
import styled from "styled-components";


import Image, { StaticImageData } from "next/image";

interface Props {
  images: StaticImageData[];
  keyValue: string;
  type: 'fullWidth' | 'none';

  height: string;
  width: string;
  borderRadius?: string;
  className?: string;
}

const ImageCarousel = ({ images, keyValue, type, height, width, borderRadius, className }: Props) => {


  const slideRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  return (
    <Wrapper $height={height} $width={width}>
      <SlideWrapper
        className={type}
        ref={slideRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}>
        {images.map((e, i) =>
          <ImgBox className={type} key={`${keyValue}-${i}`}>
            <Img className={className} $borderRadius={borderRadius} src={e} alt={keyValue} width={600} height={600} priority />
          </ImgBox>)}
      </SlideWrapper>
      {type === 'fullWidth' && <Indicator slideWrapperRef={slideRef} page={page} indicatorLength={images.length} />}
    </Wrapper>
  );
}

export default ImageCarousel;

const Wrapper = styled.div <{ $height: string, $width: string }> `
  height: ${props => props.$height};
  width: ${props => props.$width};

  min-height: 350px;

  display: flex;
  flex-direction: column;
`
const SlideWrapper = styled.div`
  width : 100%;
  height: 100%;

  overflow-x: scroll;
  display : flex;
  flex-direction: row;

  scroll-snap-type: x mandatory;
`
const ImgBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  padding: 20px;

  scroll-snap-align: center;
  scroll-snap-stop: always !important;

  &.none{
    height: 100%;
    width: auto;
    max-width: 100%;
    /* border : 2px black solid; */
    &:first-child{
      margin-left: 40%;
    }
    &:last-child{
      margin-right: 40%;
    }
  }

  &.fullWidth{
    width: 100%;
    height: 100%;
  }
`

const Img = styled(Image) <{ $borderRadius?: string }>`  
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;

  box-sizing: border-box;

  &.otherinfo{
    box-shadow: 0px 0px 12px rgba(0,0,0,0.2);
    border-radius: 16px;
  }
`