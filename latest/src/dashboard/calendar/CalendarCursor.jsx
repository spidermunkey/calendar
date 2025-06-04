import { cursorLeft } from "icons";
import { cursorRight } from "icons";

import { DateTime } from "utils";
import { useCalendarState } from "context";
import { useState, useRef } from "react";

export const CalendarCursor = () => {

  const {month,setMonth,year,setYear} = useCalendarState();
  
  const updateCurrentMonth = (month) => {
    if (month > 11){
      state.calendar.year = year + 1;
      setYear(year + 1)
      month = 0;
    } else if (month < 0) {
      state.calendar.year = year - 1;
      setYear(year - 1)
      month = 11;
    }
    state.calendar.month = month;
    setMonth(month);
  }

  const today = useRef((new Date())).current;
  const toggleNext = () => updateCurrentMonth(month + 1)
  const togglePrev = () => updateCurrentMonth(month - 1)
  const toggleCurrent = () => updateCurrentMonth(today.getMonth())

  return (<div className="this-month flex">
            <div className="prev-month px-4 cursor-pointer" onClick={togglePrev}>{cursorLeft}</div>
              <div className="month-name px-4" onClick={toggleCurrent}>{DateTime.month(month)}</div>
            <div className="next-month px-4 cursor-pointer" onClick={toggleNext}>{cursorRight}</div>
          </div>)
}
