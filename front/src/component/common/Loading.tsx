import styled from "styled-components";
import Image from "next/image";

import loadingGif from '/public/img/loading.gif';
import icon from '/public/icon/icon-512x512.png';

const Loading = () => {
  return (<Wrapper>
    <Image className="icon" src={icon} alt='icon' width={200} height={200} />
  </Wrapper>);
}

export default Loading;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`