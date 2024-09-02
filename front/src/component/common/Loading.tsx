import styled from "styled-components";

const LoadingComponent = () => {
  return (<Wrapper>
    <div className="loadingio-spinner-ellipsis-nq4q5u6dq7r"><div className="ldio-x2uulkbinbj">
      <div></div><div></div><div></div><div></div><div></div>
    </div></div>
  </Wrapper>);
}

export default LoadingComponent;

const Wrapper = styled.div`
 @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  animation: fadeIn 200ms ease-in-out;


  width: 100%;
  height: 100dvh;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @keyframes ldio-x2uulkbinbj {
   0% { transform: translate(7.199999999999999px,48px) scale(0); }
  25% { transform: translate(7.199999999999999px,48px) scale(0); }
  50% { transform: translate(7.199999999999999px,48px) scale(1); }
  75% { transform: translate(48px,48px) scale(1); }
 100% { transform: translate(88.8px,48px) scale(1); }
  }
  @keyframes ldio-x2uulkbinbj-r {
    0% { transform: translate(88.8px,48px) scale(1); }
  100% { transform: translate(88.8px,48px) scale(0); }
  }
  @keyframes ldio-x2uulkbinbj-c {
    0% { background: #fae278 }
    25% { background: #a5e5b1 }
    50% { background: #f5ccd3 }
    75% { background: #bac1e3 }
  100% { background: #fae278 }
  }
  .ldio-x2uulkbinbj div {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transform: translate(48px,48px) scale(1);
    background: #fae278;
    animation: ldio-x2uulkbinbj 1.4285714285714284s infinite cubic-bezier(0,0.5,0.5,1);
  }
  .ldio-x2uulkbinbj div:nth-child(1) {
    background: #bac1e3;
    transform: translate(88.8px,48px) scale(1);
    animation: ldio-x2uulkbinbj-r 0.3571428571428571s infinite cubic-bezier(0,0.5,0.5,1), ldio-x2uulkbinbj-c 1.4285714285714284s infinite step-start;
  }.ldio-x2uulkbinbj div:nth-child(2) {
    animation-delay: -0.3571428571428571s;
    background: #fae278;
  }.ldio-x2uulkbinbj div:nth-child(3) {
    animation-delay: -0.7142857142857142s;
    background: #bac1e3;
  }.ldio-x2uulkbinbj div:nth-child(4) {
    animation-delay: -1.0714285714285714s;
    background: #f5ccd3;
  }.ldio-x2uulkbinbj div:nth-child(5) {
    animation-delay: -1.4285714285714284s;
    background: #a5e5b1;
  }
  .loadingio-spinner-ellipsis-nq4q5u6dq7r {
    width: 120px;
    height: 120px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
  .ldio-x2uulkbinbj {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-x2uulkbinbj div { box-sizing: content-box; }
`