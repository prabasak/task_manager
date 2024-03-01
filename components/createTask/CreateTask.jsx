import { useContext, useState } from "react";
import styled from "styled-components";
import { TaskContext } from "../store/list-context";
import Button from "../Button";

const AddContainer = styled.div`
  margin-bottom: 30px;
`;

const InputForm = styled.form`
  width: 50%;
  display: -webkit-box;
  display: flex;
  z-index: 10;
  position: relative;
  justify-content: space-between;
  border-radius: 10px;
  border: 2px solid #444;

  & * {
    border: 0;
    background: #fff;
    font-size: 1rem;
    border-radius: 0;
    outline: 0;
    -webkit-appearance: none;
  }

  & button {
    background: #fff;
    border-left: 2px solid #444;
    color: #444;
    padding: 15px;
    cursor: pointer;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    transition: all 0.2s;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
      color: #888;
    }
  }

  & input[type="text"] {
    flex-basis: 80%;
    padding: 15px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;

export default function CreateTask() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const { handleAddTodo } = useContext(TaskContext);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      title: newTodoTitle,
      completed: false,
    };
    handleAddTodo(newTodo);
    setNewTodoTitle("");
  }

  return (
    <AddContainer className="create">
      <h2>ADD</h2>
      <InputForm onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </InputForm>
    </AddContainer>
  );
}
