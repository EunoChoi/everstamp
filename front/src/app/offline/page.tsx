'use client'
import Image from "next/image";
import sad from '/public/img/emotion/emotion1.png'
import styled from "styled-components";

export default function OfflinePage() {
  return (
    <Wrapper>
      <header>Offline</header>
      <Image className="emotion" src={sad} alt='sad emotion' width={120} height={120} />
      <p>Please check internet connection.</p>
    </Wrapper>
  );
}


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
    margin: 24px 0;
  }
  p{
    width: 80%;
    font-size: 18px;
    color: #525252;
    text-align: center;
  }
`
