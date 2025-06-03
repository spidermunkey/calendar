import { DateTime } from "../../utils/DateTime";
import { useState,useRef, useEffect } from "react";

import { CalendarTabs } from "./Tabs";
import { CalendarCursor } from "./CalendarCursor";
import { Days } from "./Days";

import { useAppState } from "context";

export const Month = () => {

  const { birthdays, today } = useAppState();
  const { month, year } = today;

  const [currentMonth,setMonth] = useState(month)
  const [activeBirthdays,setActiveBirthdays] = useState([])

  const thisMonth = useRef(today.month).current

  const toggleNext = () => setMonth(currentMonth + 1)
  const togglePrev = () => setMonth(currentMonth - 1)
  const toggleCurrent = () => setMonth(thisMonth)

  return (
      <div className="cal-month">
        <div className="cal-month-header">
          <CalendarCursor currentMonth={ DateTime.month(currentMonth) } next={toggleNext} prev={togglePrev} reset={toggleCurrent}/>
        </div>
          <Days month={month} year={year} />
      </div>
  )
}
