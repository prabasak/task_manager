import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const EditForm = styled.form`
  padding: 1rem;
  overflow: hidden;

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

  & input[type="text"] {
    width: 100%;
    border: 0;
    border-bottom: 2px solid #999;
    outline: 0;
    font-size: 1.3rem;
    padding: 7px 0;
    background: transparent;

    &:focus {
      border-bottom-color: #444;
    }
  }

  & .update-btn {
    float: right;
    margin-top: 15px;
    font-size: 1rem;
    padding: 10px 15px;
    background-color: transparent;
    border: 2px solid #444;
  }
`;

export default function EditTask({ todo, onUpdateTodo }) {
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState(todo.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = { ...todo, data: updatedTodoTitle };
    onUpdateTodo(updatedTodo);
  };
  return (
    <EditForm onSubmit={handleSubmit}>
      <h2>Are you sure you want to edit this task?</h2>
      <p>
        "If you keep changing the plan, we might need a GPS to navigate through
        your ideas!"
      </p>
      <input
        type="text"
        value={updatedTodoTitle}
        onChange={(e) => setUpdatedTodoTitle(e.target.value)}
      />
      <Button className="update-btn" type="submit">Update</Button>
    </EditForm>
  );
}
