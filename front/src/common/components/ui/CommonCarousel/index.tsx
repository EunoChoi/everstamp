'use client';

import { ReactNode, useRef, useState } from "react";
import styled from "styled-components";

import React from "react";
import Indicator from "../Indicator";

interface Props {
  children: ReactNode;
  height: string;
}

const CommonCarousel = ({ children, height }: Props) => {

  const childrenArray = React.Children.toArray(children);

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  return (
    <Wrapper $height={height}>
      <CarouselWrapper
        ref={slideWrapperRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}
      >
        {childrenArray.map((v, i) => <PageWrapper key={'slide' + i}>{v}</PageWrapper>)}
      </CarouselWrapper>
      {childrenArray.length > 1 && <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={childrenArray.length} />}
    </Wrapper>
  );
}

export default CommonCarousel;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  flex-shrink: 0;

  scroll-snap-align: center;
  scroll-snap-stop: always !important;
`
const Wrapper = styled.div<{ $height: string }>`
  width: 100%;
  height: 100%;
  height : ${props => props.$height};

  padding: -14px;

  display: flex;
  flex-direction: column;
`
const CarouselWrapper = styled.div`
  scroll-snap-type: x mandatory;

  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;

  gap: 16px;
  overflow-x: scroll;
`
