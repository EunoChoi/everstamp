import styled from "styled-components";
import Image from "next/image";
import loading from '../../public/img/loading.gif';

const Loading = () => {
  return (
    <Wrapper>
      <Logo>
        <div>
          <span>ever</span>
          <span>stamp</span>
        </div>
        <div></div>
      </Logo>
      <Image src={loading} alt='loading' width={100} height={100} />
      {/* <Text>we can do better</Text> */}
    </Wrapper>
  );
}

export default Loading;

const Logo = styled.div`
  width: 140px;
  height: 140px;
  background-color: whitesmoke;
  border : 2px solid rgba(0,0,0,0.1);
  border-radius: 16px;

  div:first-child{
    width: 100%;
    height: 77%;

    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: start;

    padding-left: 12px;
    padding-bottom: 8px;

    span{
      text-transform: uppercase;
      line-height: 1.05;
      font-size: 28px;
      font-weight: 700;
      color: rgb(var(--greyTitle));
    }
    span::first-letter{
      color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
    }
  }
  div:last-child{
    width: 100%;
    height: 23%;
    border-top: solid 1px rgba(0,0,0,0.05);
    background-color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
}
`
const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Text = styled.span`
  margin-top: 24px;
  font-weight: 600;
  color: rgba(var(--greyTitle),0.8);
  font-size: 28px;
  text-transform: uppercase;


  @media (max-width: 479px) { //mobile port
    font-size: 18px;
  }
`
