import styled from "styled-components";
import { useContext } from "react";
import { TaskContext } from "./store/list-context";
import Button from "./Button";

const Card = styled.li`
  -ms-flex-preferred-size: calc(20% - 65px);
  flex-basis: calc(20% - 65px);
  margin: 0 0 20px;
  overflow: hidden;
  border-radius: 20px;
  padding: 15px 25px;
  border: 1px solid #888;

  & p {
    min-height: 90px;
    margin: 0 0 25px;
    font-size: 16px;
    color: #121212;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function List() {
  const { items, modalOpen, statusChange } = useContext(TaskContext);
  return (
    <>
      {items.length ? (
        items.map((todo, index) => (
          <Card key={todo.id}>
            <p
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </p>
            <BtnGroup>
              <Button
                type="button"
                disabled={todo.completed}
                onClick={() => modalOpen(todo, index, "edit")}
              >
                Edit
              </Button>
              <Button type="button" onClick={() => statusChange(todo.id)}>
                {todo.completed ? "Undo" : "Done"}
              </Button>
              <Button
                type="button"
                disabled={todo.completed}
                onClick={() => modalOpen(todo, index, "delete")}
              >
                Delete
              </Button>
            </BtnGroup>
          </Card>
        ))
      ) : (
        <p>List is empty</p>
      )}
    </>
  );
}
