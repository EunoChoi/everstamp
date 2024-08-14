'use client'
import styled from "styled-components";

export default function OfflinePage() {
  return (
    <Wrapper>
      <header>Offline</header>
      <Img className="emotion" src="/img/emotion/emotion1.png" alt='sad emotion' />
      <p>Please check internet connection.</p>
    </Wrapper>
  );
}

const Img = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  *{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  header{
    font-size: 36px;
    font-weight: 500;
  }
  .emotion{
    margin: 36px 0;
  }
  p{
    width: 80%;
    font-size: 18px;
    color: #525252;
    text-align: center;
  }
`
