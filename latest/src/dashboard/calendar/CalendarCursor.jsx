import { cursorLeft } from "icons";
import { cursorRight } from "icons";

import { DateTime } from "utils";
import { useAppState } from "context";
import { useState, useRef } from "react";

export const CalendarCursor = () => {

  const state = useAppState();
  const [ month, setMonth ] = useState(state.currentMonth);
  const updateCurrentMonth = (month) => {
    state.currentMonth = month;
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
