import { createContext, useContext } from "react";
import { useAppStore } from "./AppContext";

export const EventContext = createContext({});

export const useEventStore = () => useContext(EventContext);

export const EventProvider = ({children}) => {
  const { events } = useAppStore();
  return (
    <EventContext.Provider value={{events}}>{children}</EventContext.Provider>
  )
}
