import { useState, useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import CreateTask from "../createTask/CreateTask";
import List from "../List";
import EditTask from "../EditTask";

import styled from "styled-components";
import Modal from "../Modal";
import DeleteConfirmation from "../DeleteConfirmation";
import { TaskContext } from "../store/list-context";
import Header from "../Header";
import Search from "../Search";
import Sort from "../Sort";

const CardBox = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`;

const ContentBody = styled.section`
  margin: 2rem;
  padding: 0;
`;

const initialState = {
  items: [],
};

// const taskReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TODO":
//       return { items: [action.payload, ...state.items] };

//     case "STATUS_TODO":
//       const updatedTodos = state.items.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//       return { items: updatedTodos };

//     default:
//       return state;
//   }
// };

export default function TaskList() {
  const [todos, setTodos] = useState(initialState);
  const [selectForEdit, setSelectForEdit] = useState(null);
  const [selectForDelete, setSelectForDelete] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTodos = useCallback(async () => {
    // .. add loader
    setIsFetching(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos({ items: response.data });
    } catch (err) {
      console.log(`Error fetching data -> ${err}`);
    }
    // .. remove loader
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    // console.log(state, newTodo);
    // dispatch({ type: "ADD_TODO", payload: newTodo });
    setTodos({ items: [newTodo, ...todos.items] });
  };

  const handleStatus = (id) => {
    console.log(id);
    // dispatch({ type: "STATUS_TODO", payload: id });
    const updatedTodos = todos.items.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos({ items: updatedTodos });
  };

  const handleUpdateTodo = (updatedTodo) => {
    todos.items[updatedTodo.key].title = updatedTodo.data;
    setSelectForEdit(null);
    setModalIsOpen(false);
  };

  function handleConfirmDelete() {
    // console.log(selectForDelete);
    // .. add loader
    axios
      .delete(
        `https://jsonplaceholder.typicode.com/todos/${selectForDelete.id}`
      )
      .then(() => {
        const updatedTodos = todos.items.filter(
          (todo) => todo.id !== selectForDelete.id
        );
        setTodos({ items: updatedTodos });
        setModalIsOpen(false);
        setSelectForDelete(null);
      })
      .catch((err) => console.log(`Error deleting item -> ${err}`));
    // .. remove loader
  }

  function handleModalOpen(task, idx, action) {
    setModalIsOpen(true);
    if (action === "edit") {
      setSelectForEdit({ data: task.title, key: idx });
    } else if (action === "delete") {
      setSelectForDelete(task);
    }
  }

  function handleModalClose() {
    setModalIsOpen(false);
    setSelectForEdit(null);
    setSelectForDelete(null);
  }

  const handleResetList = () => {
    const sortById = todos.items.sort((i, j) => {
      if (i.id < j.id) {
        return -1;
      } else if (i.id > j.id) {
        return 1;
      }
      return 0;
    });
    setTodos({ items: sortById });
  }

  const todoCtx = {
    items: todos.items,
    modalOpen: handleModalOpen,
    statusChange: handleStatus,
    modalIsOpen,
    handleModalClose,
    handleAddTodo,
    handleConfirmDelete,
  };

  return (
    <>
      <TaskContext.Provider value={todoCtx}>
        <Header></Header>
        <Modal>
          {selectForEdit && (
            <EditTask todo={selectForEdit} onUpdateTodo={handleUpdateTodo} />
          )}
          {selectForDelete && <DeleteConfirmation />}
        </Modal>
        <ContentBody className="content-body">
          <CreateTask />
          <Search itemlist={todos.items} setItemlist={setTodos} resetFilter={fetchTodos} />
          <Sort itemlist={todos.items} setItemlist={setTodos} resetSort={handleResetList} />
          <div className="list" style={{ clear: "both" }}>
            <h2>LIST</h2>
            {!isFetching ? (
              <CardBox>
                <List />
              </CardBox>
            ) : (
              <p>Please wait, data is being fetched</p>
            )}
          </div>
        </ContentBody>
      </TaskContext.Provider>
    </>
  );
}
