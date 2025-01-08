import { RefObject } from "react";
import styled from "styled-components";

interface IndicatorProps {
  slideWrapperRef: RefObject<HTMLDivElement>;
  page: number;
  indicatorLength: number;
  type?: string;
}

const Indicator = ({ slideWrapperRef, page, indicatorLength, type }: IndicatorProps) => {
  return <IndicatorWrapper>
    {[...Array(indicatorLength)].map((_: any, i: number) =>
      <Dot
        key={`indicator${i}`}
        className={page === i ? `current ${type}` : `${type}`}
        onClick={() => {
          slideWrapperRef.current?.scrollTo({
            left: slideWrapperRef.current.clientWidth * i,
            behavior: "smooth"
          })
        }}
      />)}
  </IndicatorWrapper>;
}

export default Indicator;

const IndicatorWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin: 4px 0;
  height: auto;
  @media (max-width: 479px) { //mobile port
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
  }
`
const Dot = styled.div`
  background-color: white;
  border: 2px solid ${(props) => props.theme.point ? props.theme.point : '#979FC790'};

  margin: 2px;
  width: 10px;
  height: 10px;
  border-radius: 10px;

  &.diary{
   &:last-child{
    border-radius: 2px;
    border-width: 2px;
    border-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
   }
  }
  &.current {
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    border-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
  }
`