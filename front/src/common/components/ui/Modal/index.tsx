import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import styled from "styled-components";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";


interface ModalProps {
  className?: string;
  children: ReactNode;
}

export const Modal = ({ className, children }: ModalProps) => {
  const router = useRouter();
  const closeModal = useCallback(() => {
    router.back();
  }, [])

  return (<Background onClick={closeModal}>
    <ModalWrapper
      className={className}
      onClick={(e) => { e.stopPropagation(); }} >
      {children}
    </ModalWrapper>
  </Background>);
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

const Background = styled.div`
  @keyframes fadeIn {
    0% { opacity:0; }
    100% { opacity:1; }
  }
  animation: fadeIn 300ms ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 99999;
  width: 100dvw;
  height: 100dvh;

  backdrop-filter: blur(4px);
`
const ModalWrapper = styled.div`
  transition : all 300ms ease-in-out;

  width: 100%;
  height: 100%;
  border-radius: 0px;
  background-color: white;

  display: flex;
  flex-direction: column;
  @media (min-width:1025px) { //desktop
    width: 600px;
    height: 90%;
    border-radius: 24px;
    box-shadow: 0px 0px 64px rgba(0,0,0,0.25);
  }
`