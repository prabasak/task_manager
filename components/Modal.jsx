import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Button from "./Button";
import { TaskContext } from "./store/list-context";

const Dialog = styled.dialog`
  min-width: 30rem;
  max-width: 45rem;
  padding: 0;
  z-index: 2;
  border: 2px solid #444;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  animation: slide-down-fade-in 0.3s ease-out forwards;
  position: relatvie;

  &::backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
  }

  & .closeModal {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    border: 2px solid #444;
  }
`;

export default function Modal({ children }) {
  const {modalIsOpen, handleModalClose} = useContext(TaskContext)
  const dialog = useRef();
  useEffect(() => {
    if (modalIsOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [modalIsOpen]);

  return createPortal(
    <Dialog ref={dialog}>
      {children}
      <Button className="closeModal" onClick={handleModalClose}>
        close
      </Button>
    </Dialog>,
    document.getElementById("modal")
  );
}
