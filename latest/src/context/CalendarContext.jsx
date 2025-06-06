import { useContext, createContext, useState, useRef } from "react";
import { useAppState } from "./AppContext";

export const CalendarContext = createContext({});

export const useCalendarState = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {

  const {calendar} = useAppState();
  const [day, updateDay] = useState(calendar.day)
  const [month,updateMonth] = useState(calendar.month)
  const [year,updateYear] = useState(calendar.year)
  const today = useRef((new Date())).current;
  
  const setMonth = (index) => {
    calendar.month = index;
    updateMonth(index)
  }
  const setYear = (yearNum) => {
    calendar.year = yearNum;
    updateYear(yearNum)
  }
  const setDay = (dayNum) => {
    calendar.day = dayNum;
    updateDay(dayNum)
    console.log('here',calendar.day)
  }
  return (
    <CalendarContext.Provider value={{
      day,setDay,
      month,setMonth,
      year,setYear,
      today,
      get date() {
        console.log(month)
        return `${String(year)}-${String(month).padStart(2,0)}-${String(day).padStart(2,0)}`
      },
    }}>
      {children}
    </CalendarContext.Provider>
  )
}
