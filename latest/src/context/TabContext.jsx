import { Birthdays } from "../dashboard/birthdays/Birthdays"
import { Timers } from "../dashboard/timer/Timers"
import { Events } from "../dashboard/event/Events"

import { DayModal } from "../dashboard/calendar/DayModal"

import { useState,useContext,createContext} from "react";
import { composeElement } from "utils";
import { CalendarIcon, NoteIcon, ClockIcon, PresentIcon } from "icons";

const CalendarTabs = [
  {
    label: 'events',
    icon: (<CalendarIcon/>),
    element: composeElement(Events),
    buttonType: 'inline',
    id:3,
  },
  {
    label: 'notes',
    icon:(<NoteIcon/>),
    element: (props) => <div className="notes"></div>,
    buttonType: 'inline',
    index: 5,
  },
  {
    label: 'timers',
    icon: (<ClockIcon/>),
    element: composeElement(Timers),
    buttonType: 'inline',
    id: 2,
  }, 
  {
    label:'birthdays',
    icon: (<PresentIcon/>),
    element: composeElement(Birthdays),
    buttonType: 'inline',
    id:1,
  },
  {
    label: 'dayview',
    element: composeElement(DayModal),
    buttonType: 'floating',
    id: 4,
  },

]

const TabContext = createContext(null);

export const useTabState = () => useContext(TabContext)

export const TabProvider = ({children}) => {
  const [activeTab,setActiveTab] = useState(0)
  // const Tabs = CalendarTabs
  return (
    <TabContext.Provider value={{ activeTab , setActiveTab, Tabs:CalendarTabs }}>
        {children}
    </TabContext.Provider>
  )
}
