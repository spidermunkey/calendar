import { DateTime } from "../../utils/DateTime";
import { useState,useRef, useEffect } from "react";

import { CalendarCursor } from "./CalendarCursor";
import { Days } from "./Days";

import { useAppState } from "context";

const date = new Date();
const today = {
    month: date.getMonth(), 
    year: date.getFullYear(),
    day: date.getDate(),
}

export const Month = () => {
  
  const { birthdays, today } = useAppState()
  const { month, year } = today;
  const [currentMonth,setMonth] = useState(month)
  const [activeBirthdays,setActiveBirthdays] = useState([])

  const thisMonth = useRef(today.month).current

  const toggleNext = () => setMonth(currentMonth + 1)
  const togglePrev = () => setMonth(currentMonth - 1)
  const toggleCurrent = () => setMonth(thisMonth)

  const updateBirthdaysThisMonth = () => {
    const update = async () => setActiveBirthdays(await birthdays.getByMonth(currentMonth)) 
    update();
  }

  useEffect(updateBirthdaysThisMonth,[currentMonth])
  return (
      <div className="cal-month">
          <CalendarCursor currentMonth={ DateTime.month(currentMonth) } next={toggleNext} prev={togglePrev} reset={toggleCurrent}/>
          <Days activeBirthdays={activeBirthdays} month={month} year={year} />
      </div>
  )
}
