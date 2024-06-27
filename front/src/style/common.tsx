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
    &.yes{
      background-color: #83c6b6;
      color: #83c6b6;
      color: white;
    }
    &.no{
      background-color: #dc7889;
      color: #dc7889;
      color: white;
    }
  `,
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
    display: flex;
    align-items: end;
    justify-content: end;

    position: fixed;
    top: 0;

    background-color: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);    
    

    button{
      transition: all ease-in-out 200ms;
      text-transform: capitalize;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius : 48px;
      color: rgb(var(--greyTitle));
      background-color: whitesmoke;
      background-color: ${(props) => props.theme.point ? props.theme.point + '30' : '#9797CB'};
      border: 1px solid rgba(0,0,0,0.05);

      padding: 4px 12px;
      height: 32px;
      font-size: 14px;
      margin-left: 6px;
      font-weight: 500;

      *:nth-child(2){
        margin-left: 3px;
      }
    }


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
      z-index: 99;
      &.setting{
        display: none;
      }
    }
    @media (min-height:480px) and (min-width:1024px) { //desktop
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
    
    &.setting{
      @media (min-height: 479px) { //tablet land no scroll
        justify-content: center;
      }
    }

    //mobile portrait
    @media (max-width: 479px) { //mobile port
      height: 100dvh;
      padding: 0 5vw;
      
      padding-top : calc(var(--mobileHeader) + var(--optionHeight));
      padding-bottom: var(--mobileNav);
      &.noOption{
        padding-top : var(--mobileHeader);
        padding-bottom: var(--mobileNav);
      }

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
      justify-content: start;
      overflow-y: scroll;

      &.habit{
        justify-content: start;
        overflow-y: scroll;
        @media (min-height:480px){
          justify-content: center;
        }
      }

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
    
    @media (min-height:480px) and (min-width:1024px) { //desktop
      height: 100dvh;
      padding-top : calc(var(--desktopHeader) + var(--optionHeight));
      &.noOption{
        padding-top : var(--desktopHeader);
      }
    }
  `,
}

export default SC_Common;