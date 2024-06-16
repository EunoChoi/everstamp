import styled from "styled-components";
import Image from "next/image";

//img
import logo from '/public/img/everStamp_logo_blue.png';

const Loading = () => {
  return (
    <Wrapper>
      <Img src={logo} alt="logo" priority width={200} height={200}></Img>
      <Text>we can do better</Text>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Img = styled(Image)`
  max-width: 15dvw;
  height: auto;

  @media (max-width: 479px) { //mobile port
    max-width: 30dvw;
  }
`
const Text = styled.span`
  margin-top: 24px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
  font-size: 28px;
  /* text-transform: capitalize; */
  text-transform: uppercase;


  @media (max-width: 479px) { //mobile port
    font-size: 18px;
  }
`
