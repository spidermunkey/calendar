import { useAppStore } from "context";
import { createContext, useContext, useState } from "react";

const TimerContext = createContext(null);

export const useTimerState = () => useContext(TimerContext)

export const TimerProvider = ({children}) => {
  const {timers} = useAppStore();
  const [activeTimer,setActiveTimer] = useState(null);
  const updateActiveTimer = (props) => setActiveTimer({...props});

  return (
    <TimerContext.Provider value={{
      timers:{
        ...timers,
        activeTimer,
        updateActiveTimer,
      }
    }}>
      {children}
    </TimerContext.Provider>
  )
}

