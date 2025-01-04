'use client';

import styled from "styled-components";

import { ReactNode } from "react";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}


const DesktopLayout = ({ modal, children }: Props) => {
  return (
    <Desktop_Layout>
      <SideBar />
      <Desktop_Content>
        {modal}
        {children}
      </Desktop_Content>
    </Desktop_Layout>
  );
}

export default DesktopLayout;


const Desktop_Layout = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
`;

const Desktop_Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: calc(100vw - var(--sidebarWidth));
`