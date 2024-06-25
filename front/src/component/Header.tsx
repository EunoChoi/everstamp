'use client';

import styled from "styled-components";

interface Props {
  title: string
}

const Header = ({ title }: Props) => {

  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 99;

  display: flex;
  flex-shrink: 0;
  align-items: end;


  @media (max-width: 479px) { //mobile port
    justify-content: start;
    align-items: center;
    width: 100%;
    height: var(--mobileHeader);

    padding : 0 5%;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: none;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: calc(100dvw - 350px);
    height: var(--desktopHeader);

    padding: 0 20px;
    max-width: 800px;
  }
`
const Title = styled.span`
  color: rgb(var(--greyTitle));
  font-size: 42px;
  font-weight: 700;

  text-transform: uppercase;
  text-transform: capitalize;

  &:first-letter{
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
  }
  @media (max-width: 479px) { //mobile port
    line-height: 0.9;
    font-size: 24px;
    border-bottom: 4px ${(props) => props.theme.point ? props.theme.point : '#9797CB'} solid;
    &:first-letter{
      font-size: 28px;
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 5vh;
  }
`