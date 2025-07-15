'use client';

import { emotions } from '@/common/images/emotions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

export default function LoginErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');


  return (
    <Wrapper>
      <Image src={emotions[3].src} alt='error emotion' width={128} height={128} />
      <Text>
        <span className='title'>로그인 실패</span>
        <span className='message'>{message}</span>
      </Text>
      <BackButton onClick={() => router.push('/app')}>
        <ExitToAppIcon fontSize='inherit' color='inherit' />
        로그인 페이지로 이동
      </BackButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  gap: 48px;

  @media (max-height: 479px) { //mobile port
    justify-content: space-evenly;
    gap: 0;
  }
`
const Text = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

  .title{
    font-size: 32px;
    font-weight: 600;
  }
  .message{
    font-size: 20px;
  }
`
const BackButton = styled.button`
  text-decoration: underline;
  color: #83afdf;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`