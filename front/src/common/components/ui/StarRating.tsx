'use client';

import styled from "styled-components";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export const StarRating = ({ rating, className }: StarRatingProps) => {
  return <Wrapper className="className">
    {Array.from({ length: rating }, (_, index) => (
      <span key={index}>★</span>
    ))}
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  font-size: 12px;
  gap: 4px;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
`