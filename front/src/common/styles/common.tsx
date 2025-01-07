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
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      max-width: 75dvw;
      padding: 0 20px;  
    }
    @media (min-width:1024px) { //desktop
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
    border-radius : 48px;
    background-color: white;
    gap: 6px;

    .icon{
      font-size: 19px;
    }

    button{
      display: flex;
      justify-content: center;
      align-items: center;

      
      padding: 2px 12px;
      height: 28px;

      font-size: 14px;
      font-weight: 500;
      
     
      &.type1{
        width: 47px;
      }
      &.type2{
        width: 60px;
      }
      &.type3{
        width: 80px;
      }
      
      transition: all ease-in-out 200ms;
      text-transform: capitalize;
      
      color: rgba(0,0,0,0.6);
      background-color: ${(props) => props.theme.point ? props.theme.point + '70' : '#979FC7'};
      border: 2px solid rgba(0,0,0,0.07);
      border-radius : 48px;



      @media (min-width:1024px) { //desktop
        padding: 4px 12px;
        height: 32px;
      }
      *:nth-child(2){
        margin-left: 3px;
      }
    }
  `,
  Empty: styled.div`
    flex-grow: 1;
  `
}

export default $Common;