import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { TaskContext } from "./store/list-context";

const ConfirmationSection = styled.div`
  padding: 1rem;

  & h2 {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    color: #444;
  }

  & p {
    font-size: 1.15rem;
    color: #888;
  }

  & #confirmation-actions {
    margin-top: 1rem;

    & button {
      font-size: 1rem;
      padding: 10px 15px;
      background-color: transparent;
      border: 2px solid #444;
    }
  }
`;

function DeleteConfirmation() {
  const { handleModalClose, handleConfirmDelete } = useContext(TaskContext);
  return (
    <ConfirmationSection>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this task?</p>
      <div id="confirmation-actions">
        <Button onClick={handleModalClose} className="button-text">
          No
        </Button>
        <Button onClick={handleConfirmDelete} className="button">
          Yes
        </Button>
      </div>
    </ConfirmationSection>
  );
}

export default DeleteConfirmation;
