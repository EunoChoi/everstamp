'use client';

import Image from "next/image";
import styled from "styled-components";
import { useRouter } from 'next/navigation'

//hooks
import IsMobile from "@/hooks/IsMobile";

//image
import loginPageImg from '/public/img/loginPageImg.jpg';



const App = () => {
  const router = useRouter()
  const isMobile = IsMobile();

  return (
    <>
    </>
  );
}

export default App;
