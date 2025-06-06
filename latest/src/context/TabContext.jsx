import { useState,useContext,createContext } from "react";
import { CalendarTabs } from '../dashboard/Tabs'

const TabContext = createContext(null);

export const useTabState = () => useContext(TabContext)

export const TabProvider = ({children}) => {
  const [activeTab,setActiveTab] = useState(0)
  const Tabs = CalendarTabs;
  
  return (
    <TabContext.Provider value={{ activeTab , setActiveTab, Tabs, 
    setTab(name){
      let found = CalendarTabs.find(tab => tab.name === name);
      if (found){
        setActiveTab(CalendarTabs.indexOf(found))
      }
    } }}>
        {children}
    </TabContext.Provider>
  )
}
