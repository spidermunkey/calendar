import { createContext, useContext } from "react";
import { useAppStore } from "./AppContext";

export const TodoContext = createContext({});

export const useTodoStore = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const { todos } = useAppStore();
  return <TodoContext.Provider value={ todos }>{children}</TodoContext.Provider>
}
