'use client';

import styled from "styled-components";

interface PriorityStarProps {
  priority: number;
}

export const PriorityStar = ({ priority }: PriorityStarProps) => {
  return <Wrapper>
    {Array.from({ length: priority }, (_, index) => (
      <span key={index}>★</span>
    ))}
  </Wrapper>
}

const Wrapper = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
`