'use client'
import Image from "next/image";
import styled from "styled-components";
import emotion1 from '/public/img/emotion/emotion1.png';

export default function NotFound() {
  return (
    <Wrapper>
      <Image priority src={emotion1} alt="sad" width={128} height={128} />
      <span className="title">404 Error</span>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  color: #3f3f3f;
  width: 100%;
  height: 95dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  *{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  
  .icon{
    font-size: 96px;
  }
  .title{
    font-size: 36px;
    /* font-weight: 500; */
    margin: 32px 0;
  }
  p{
    width: 80%;
    font-size: 18px;
    color: #525252;
    text-align: center;
  }
`
