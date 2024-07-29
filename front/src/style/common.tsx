import styled from "styled-components";

const SC_Common = {
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
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      max-width: 75dvw;
      padding: 0 20px;  
    }
    @media (min-width:1024px) { //desktop
      max-width: 700px;
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

    button{
      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: 6px;
      padding: 2px 12px;
      height: 28px;

      font-size: 14px;
      font-weight: 500;
      transition: all ease-in-out 200ms;
      text-transform: capitalize;
      
      color: rgb(var(--greyTitle));
      background-color: ${(props) => props.theme.point ? props.theme.point + '30' : '#979FC7'};
      border: 2px solid rgba(0,0,0,0.05);
      border-radius : 48px;

      @media (min-width:1024px) { //desktop
        padding: 4px 12px;
        height: 32px;
      }
      *:nth-child(2){
        margin-left: 3px;
      }
    }
  `
}

export default SC_Common;