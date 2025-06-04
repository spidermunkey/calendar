import { createContext, useContext } from "react";
import { useAppState } from "./AppContext";

export const EventContext = createContext({});

export const useEventStore = () => useContext(EventContext);

export const EventProvider = ({children}) => {
  const { events } = useAppState();
  return (
    <EventContext.Provider value={{store:events}}>{children}</EventContext.Provider>
  )
}
