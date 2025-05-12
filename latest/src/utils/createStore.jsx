import { createObservable } from "./createObservable";
import { createContext, useContext, useMemo } from "react";

export const createStore = (store) => {
  const context = createObservable({
      store:store,
      get data() {
        return this.getData();
      },
      async add(...args){
        const response = await this.store.add(...args);
        return response;
      },
      async remove(...args){
        const response = await this.store.remove(...args);
        return response;
      },
      async getData() {
        return this.store.getData();
      },
  })
  const StoreContext = createContext(context);
  const useStore = () => useContext(StoreContext);
  const StoreProvider = ({children}) => {
    return(
      <StoreContext.Provider value={context}>
        {children}
      </StoreContext.Provider>
    )
  }
  return {
    ...context,
    useStore,
    StoreProvider,
  }
}
