import { useState,useContext,createContext } from "react";
import { CalendarTabs } from '../dashboard/Tabs'

const TabContext = createContext(null);

export const useTabState = () => useContext(TabContext)

export const TabProvider = ({children}) => {
  const [activeTab,setActiveTab] = useState(0)
  return (
    <TabContext.Provider value={{ activeTab , setActiveTab, Tabs:CalendarTabs }}>
        {children}
    </TabContext.Provider>
  )
}
