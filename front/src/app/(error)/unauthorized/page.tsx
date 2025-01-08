'use client';

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styled from "styled-components";

//icon
import useCustomRouter from "@/common/hooks/useCustomRouter";
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';


const Page = () => {
  const router = useCustomRouter();
  const params = useSearchParams();
  const message = params.get('message');
  return (
    <Suspense>
      <Wrapper>
        <Icon>
          <SentimentDissatisfiedOutlinedIcon fontSize="inherit" />
        </Icon>
        <Text>
          {message}
        </Text>
        <Button onClick={() => router.push(`/app`)}>돌아가기</Button>
      </Wrapper>
    </Suspense>
  );
}
export default Page;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: rgb(var(--greyTitle));
`
const Icon = styled.div`
  line-height: 70%;
  @media (max-width: 479px) { //mobile port
    font-size: 84px;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    font-size: 84px;
  }
  @media (min-width:1025px) { //desktop
    font-size: 124px;
  }
`
const Text = styled.span`
  text-align: center;
  font-weight: 500;
  
  @media (max-width: 479px) { //mobile port
    font-size: 18px;
    margin: 24px 0;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    font-size: 18px;
    margin: 32px 0;
  }
  @media (min-width:1025px) { //desktop
    font-size: 22px;
    margin: 48px 0;
  }
`
const Button = styled.button`
  color: white;
  background-color: rgb(var(--greyTitle));
  padding: 4px 24px;
  border-radius: 32px;

  @media (max-width: 479px) { //mobile port
    font-size: 18px;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
  }
  @media (min-width:1025px) { //desktop
    font-size: 22px;
  }
`