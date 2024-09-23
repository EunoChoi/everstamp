import styled from "styled-components";

const $Modal = {
  Background: styled.div`
    @keyframes fadeIn {
      0% {
        opacity:0;
      }
      100% {
        opacity:1;
      }
    }
    animation: fadeIn 300ms ease-in-out;
    
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 999;
    width: 100dvw;
    height: 100dvh;

    backdrop-filter: blur(4px);
  `,
  Wrapper: styled.div`
    position: relative;
    transition : all 300ms ease-in-out;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;

    width: 100%;
    height: 100%;
    border-radius: 0px;
    background-color: white;

    padding-top: var(--mobileHeader);

    @media (min-width:1024px) { //desktop
      width: 600px;
      height: 90%;
      border-radius: 24px;
      box-shadow: 0px 0px 64px rgba(0,0,0,0.25);

      padding-top: var(--desktopHeader);
    }
  `,
  Top: styled.div`
    position: absolute;
    top: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: var(--mobileHeader);
    padding: 0 5vw;
    background-color: white;

    @media (min-width:1024px) { //desktop
      height: var(--desktopHeader);
      padding: 0 28px;
    }
    .title{
      color: rgb(var(--greyTitle));
      font-weight: 600;
      font-size: 20px;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: end;

      span{
        padding: 4px;
      }
      @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
        /* display: none; */
      }
      @media (min-width:1024px) { //desktop
        font-size: 24px;
      }
    }

    button{
      width: 15%;
      color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
      font-weight: 600;
      &:disabled{
        opacity: 0.4;
      }
      &:first-child{
        display: flex;
        justify-content: start;
        align-items: center;
      }
      &:last-child{
        display: flex;
        justify-content: end;
        align-items: center;
      }
    }
  `,
}

export default $Modal;