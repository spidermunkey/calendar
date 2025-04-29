import { createContext,useContext } from "react"
const context = createContext({});
export const useTodoContext = () => useContext(context);
