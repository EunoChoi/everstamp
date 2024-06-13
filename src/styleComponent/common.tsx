import styled from "styled-components";

const SC_Common = {
  Wrapper: styled.div`
    padding: 0 20px;  

    width: 100%;
    max-width: 600px;
    max-width: 800px;
    &.habit{
      max-width: 800px;
    }
    min-width: 400px;
    height: 100dvh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    @media screen and (max-width: 720px) {
      min-width: 90%;
      padding: 0;
    }
  `,
  Options: styled.div`
    position: sticky;
    top: 0;
    display: flex;
    width: 100%;
    justify-content: end;
    padding-top: 16px;
    padding-bottom: 8px;
  
    @media screen and (max-width: 720px) {
      width: 90%;
    }
    button{
      transition: all ease-in-out 200ms;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      border-radius : 48px;
      color: rgb(var(--greyTitle));
      background-color: whitesmoke;
      border: 1px solid rgba(0,0,0,0.05);

      padding: 4px 12px;
      font-size: 14px;
      margin-left: 6px;
      font-weight: 500;
      *:nth-child(2){
        margin-left: 6px;
      }
      &:hover{
        /* background-color:rgb(var(--point)); */
      }
    }
  `,
  Content: styled.div`
    padding: 0 20px;  
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    height: calc(100dvh - var(--desktopHeader));
    justify-content: center;
    
    
    &.scroll{
      height: auto;
      justify-content: start;
      overflow-y: scroll;
      scrollbar-width: none;
      padding-top: 24px;
      padding-bottom: 48px;
    }

    @media screen and (max-width: 720px) {
      height: calc(100dvh - var(--mobileHeader) - var(--optionHeight) - var(--mobileNav));
      padding: 0 5vw;
      &.scroll{
        height: auto;
      }
      &.noOption{
        height: calc(100dvh - var(--mobileHeader) - var(--mobileNav));
      }
    }
  `,
}

export default SC_Common;