import { RefObject } from "react";
import styled from "styled-components";

interface IndicatorProps {
  slideWrapperRef: RefObject<HTMLDivElement>;
  page: number;
  indicatorLength: number;
}

const Indicator = ({ slideWrapperRef, page, indicatorLength }: IndicatorProps) => {
  return (
    <IndicatorWrapper>
      {[...Array(indicatorLength)].map((_: any, i: number) =>
        <div
          key={`indicator${i}`}
          className={page === i ? 'dot current' : 'dot'}
          onClick={() => {
            slideWrapperRef.current?.scrollTo({
              left: slideWrapperRef.current.clientWidth * i,
              behavior: "smooth"
            })
          }}
        />)}
    </IndicatorWrapper>);
}

export default Indicator;

const IndicatorWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin: 8px 0;
  height: auto;
  div {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: rgb(var(--lightGrey2));
    border: 1px solid rgba(0,0,0,0.05);

    margin: 4px;
    @media (max-width: 479px) { //mobile port
      width: 8px;
      height: 8px;
      margin: 2px;
    }
  }
  .current {
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
`

