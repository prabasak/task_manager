import { createContext } from "react";

export const TaskContext = createContext({
  items: [],
  modalOpen: () => {},
  statusChange: () => {},
  modalIsOpen: false,
  handleModalClose: () => {},
  handleAddTodo: () => {},
  handleConfirmDelete: () => {},
});

export default function TaskContextProvider() {}
