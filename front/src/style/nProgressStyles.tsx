import { createGlobalStyle } from 'styled-components';

const NProgressStyles = createGlobalStyle<{ barColor: string }>`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${props => props.barColor};
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100dvw;
   
    @media (max-width: 479px) { //mobile port
      top: auto;
      bottom: 0;
      height: 6px;
    }
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      height: 4px;
    }
    @media (min-width:1024px) { //desktop
      height: 8px;
    }
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 40%;
    right: 50%;
    transform: translate(50%, 0);
  }

  #nprogress .spinner-icon {
    width: 64px;
    height: 64px;
    box-sizing: border-box;
    border: solid 6px transparent;
    border-top-color: ${props => props.barColor};
    border-left-color: ${props => props.barColor};
    border-radius: 50%;
    animation: nprogress-spinner 350ms ease-in-out infinite;
  }

  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default NProgressStyles;