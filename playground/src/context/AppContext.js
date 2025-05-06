import { createContext, useContext } from "react"

const AppContext = createContext({});
export const AppState = AppContext;
export const useAppState = () => useContext(AppState);
