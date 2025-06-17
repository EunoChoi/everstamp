import styled from "styled-components";

const $Common = {
  Input: styled.input`
    text-align: center;
    width: 100%;
    height: 28px;
    border-radius: 8px;
    border : solid rgba(0,0,0,0.15) 1px;
  `,
  YesOrNo: styled.button`
    padding: 4px 12px;
    margin-left: 8px;
    border-radius: 8px;
    border : 2px solid rgba(0,0,0,0.1);
    &.yes{
      background-color: #83c6b6;
      color: white;
    }
    &.no{
      background-color: #dc7889;
      color: white;
    }
  `,
  Wrapper: styled.div`
    width: 100%;
    
    min-width: 400px;
    height: 100dvh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    @media (max-width: 479px) { //mobile port
      min-width: 90%;
      padding: 0;
    }
    @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
      max-width: 75dvw;
      padding: 0 20px;  
    }
    @media (min-width:1025px) { //desktop
      max-width: 600px;
      padding: 0 20px;  
      &.habit{
        max-width: 100dvw;
      }
    }
  `,
  Options: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 8px 0;
    gap: 6px;
    .icon{
      font-size: 19px;
    }

    button{
      display: flex;
      justify-content: center;
      align-items: center;

      height: 28px;

      transition: all ease-in-out 200ms;
      text-transform: capitalize;
      
      font-size: 14px;
      font-weight: 500;
      color: rgb(var(--greyTitle));
      font-weight: 500;
      color: white;
      background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
      /* filter: brightness(130%) saturate(100%) contrast(80%); */
      /* backdrop-filter: blur(4px); */
      border: 2px solid rgba(0,0,0,0.07);
      border-radius : 48px;

      &.small{
        width: 47px;
      }
      &.normal{
        width: 60px;
      }
      &.large{
        width: 80px;
      }
      &.auto{
        width: auto;
        padding: 0 12px;
        gap: 12px;
      }
      
      @media (min-width:1025px) { //desktop
        padding: 4px 12px;
        height: 32px;
      }
    }
  `,
  Empty: styled.div`
    flex-grow: 1;
  `
}

export default $Common;