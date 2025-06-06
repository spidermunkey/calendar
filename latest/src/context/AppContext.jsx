import { createContext, useContext } from "react";
import { createAppModel } from "../state";

const AppContext = createContext({});
export const useAppStore = () => useContext(AppContext);

export const AppProvider = ({children}) => {
  const model = createAppModel();
  return (
    <AppContext.Provider value={model}>
      {children}
    </AppContext.Provider>
  );
}
