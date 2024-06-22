'use client';

import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

//icon
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = Number(params.get('type'));
  return (
    <Wrapper>
      <Icon>
        <SentimentDissatisfiedOutlinedIcon fontSize="inherit" />
      </Icon>
      <Text>
        {type === 1 ? '이미 등록된 이메일입니다. 가입된 SNS 계정으로 로그인해 주세요.”' : '회원가입 중 오류가 발생하였습니다.'}
      </Text>
      <Button onClick={() => router.push(`/app`)}>돌아가기</Button>
    </Wrapper>
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
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 84px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 124px;
  }
`
const Text = styled.span`
  text-align: center;
  text-wrap: balance;
  font-weight: 500;
  

  @media (max-width: 479px) { //mobile port
    font-size: 18px;
    margin: 24px 0;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 18px;
    margin: 32px 0;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
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
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 22px;
  }
`