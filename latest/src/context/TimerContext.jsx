import { useAppState } from "context";
import { createContext, useContext, useState } from "react";

const TimerContext = createContext(null);

export const TimerProvider = ({children}) => {
  const {timers} = useAppState();
  const [activeTimer,setActiveTimer] = useState(null);
  const updateActiveTimer = (props) => setActiveTimer({...props});

  return (
    <TimerContext.Provider value={{
      ...timers,
      activeTimer,
      updateActiveTimer,
    }
    }>
      {children}
    </TimerContext.Provider>
  )
}

export const useTimerState = () => useContext(TimerContext)
