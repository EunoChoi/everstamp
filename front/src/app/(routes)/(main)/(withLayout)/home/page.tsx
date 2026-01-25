'use client';

import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import styled from "styled-components";

const HomePage = () => {
  return (
    <PageWrapper>
      <HomeContentWrapper>
        <Title>Home</Title>
      </HomeContentWrapper>
    </PageWrapper>
  );
};

export default HomePage;

const HomeContentWrapper = styled(ContentWrapper)`
  max-width: 600px;
  height: 100%;
  justify-content: center;
  align-items: center;
`
const Title = styled.h1`
  font-size: 32px;
  font-family: BMJUA;
  color: rgb(var(--greyTitle));
  text-transform: uppercase;
`
