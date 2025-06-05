import { createContext, useContext } from "react";
import { useAppState } from "./AppContext";

export const TodoContext = createContext({});

export const useTodoStore = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const { todos } = useAppState();
  console.log(todos)
  return <TodoContext.Provider value={ todos }>{children}</TodoContext.Provider>
}
