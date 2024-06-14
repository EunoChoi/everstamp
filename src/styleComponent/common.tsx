import styled from "styled-components";

const SC_Common = {
  Wrapper: styled.div`
    padding: 0 20px;  

    width: 100%;
    max-width: 800px;
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
    }
  `,
  Options: styled.div`
    button{
      transition: all ease-in-out 200ms;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      border-radius : 48px;
      color: rgb(var(--greyTitle));
      background-color: whitesmoke;
      background-color: rgba(var(--point2), 0.35);
      border: 1px solid rgba(0,0,0,0.05);

      padding: 4px 12px;
      font-size: 14px;
      margin-left: 6px;
      font-weight: 500;
      *:nth-child(2){
        margin-left: 6px;
      }
    }
    display: flex;
    align-items: end;
    justify-content: end;

    position: fixed;
    top: 0;

    background-color: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);    
    @media (max-width: 479px) { //mobile port
      width: 100%;
      height: calc(var(--mobileHeader) + var(--optionHeight));
      padding : 8px 5%;
      
      &.setting{
        height: var(--mobileHeader);
      }
    }
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      width: 100%;
      max-width: 75dvw;
      height: calc(var(--optionHeight));
      padding: 8px 20px;
      &.setting{
        display: none;
      }
    }
    @media (min-width:480px) and (min-width:1024px) { //desktop
      width: calc(100dvw - 350px);
      max-width: 800px;
      height: calc(var(--desktopHeader) + var(--optionHeight));

      padding: 8px 20px;
      &.setting{
        height: var(--desktopHeader);
      }
    }
  `,
  Content: styled.div`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar{
      display: none;
    }
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    
    &.scroll{
      justify-content: start;
      overflow-y: scroll;
      height: 100dvh;
    }
    

    //mobile portrait
    @media (max-width: 479px) { //mobile port
      //common 
      height: 100dvh;
      padding: 0 5vw;
      
      //none scroll
      padding-top : calc(var(--mobileHeader) + var(--optionHeight));
      padding-bottom: var(--mobileNav);
      &.noOption{
        padding-top : var(--mobileHeader);
        padding-bottom: var(--mobileNav);
      }

      //scroll
      &.scroll{
        height: 100dvh;
        padding-top : calc(var(--mobileHeader) + var(--optionHeight));
        padding-bottom: var(--mobileNav);
        &.noOption{
          padding-top : var(--mobileHeader);
        }
      }
    }
    //mobile landscape
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      //mobild land + tablet have to scroll
      height: 100dvh;
      justify-content: center;
      overflow-y: scroll;

      padding-top : var(--optionHeight);
      &.noOption{
        padding-top : 0;
      }
      
      &.scroll{
        padding-top : var(--optionHeight);
        &.noOption{
          padding-top :0;
        }
      }
    }
    @media (min-width:480px) and (min-width:1024px) { //desktop
      height: 100dvh;
      padding-top : calc(var(--desktopHeader) + var(--optionHeight));
      &.noOption{
        padding-top : var(--desktopHeader);
      }
    }
  `,
}

export default SC_Common;