import { RefObject } from "react";
import styled from "styled-components";

interface IndicatorProps {
  slideWrapperRef: RefObject<HTMLDivElement>;
  page: number;
  indicatorLength: number;
  diary?: boolean;
}

const Indicator = ({ slideWrapperRef, page, indicatorLength, diary }: IndicatorProps) => {
  const type = diary ? 'diary' : '';
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
  
`
const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: white;
  border: 2px solid ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC790'};

  margin: 4px;
 
  &.diary{
   &:last-child{
    border-radius: 4px;
    border-width: 3.5px;
    border-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
   }
  }
  &.current {
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    border-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
  }
`
