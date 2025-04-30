import { DateTime } from "../../utils/DateTime";
import { useState,useRef } from "react";
import { cursorLeft } from "../../assets/icons/cursor-left";
import { cursorRight } from "../../assets/icons/cursor-right";

const days = (month,year) => {
  // last month
  const lastDayOfLastMonth = new Date(year,month,0,12).getDate();
  // this month
  const dayOne = new Date(year,month,1,12);
  const dayOfWeek = dayOne.getDay();
  const daysFromSunday = dayOfWeek + 1;
  const daysInMonth = new Date(year,month + 1,0,12).getDate()
  const lastDayOfThisMonth = new Date(year,month,daysInMonth,12)
  const daysFromSaturday = 7 - (lastDayOfThisMonth.getDay() + 1);

  console.dir({
    dfs: daysFromSunday,
    dow: dayOfWeek,
    month: DateTime.month(month),
    ldlm: lastDayOfLastMonth,
    zday: dayOne,
  })
    const previousDays = [];
    const currentDays = [];
    const lastDays = [];
    for (let i = 1; i < daysFromSunday; i++){
      let dateNum = lastDayOfLastMonth - (i - 1)
      previousDays.push(<div key={`prev-${dateNum}`} day={dateNum} className="day null-day"><div className="daynum">{dateNum}</div></div>)
    }
    for (let i = 0; i < daysInMonth; i++){
      let dateNum = i + 1
      currentDays.push(<div key={i} day={dateNum} className="day"><div className="daynum">{dateNum}</div></div>)
    }
    for (let i = 0; i < daysFromSaturday; i++){
      let dateNum = i + 1
      lastDays.push(<div key={`next-${dateNum}`} day={dateNum} className="day null-day"><div className="daynum">{dateNum}</div></div>)
    }
    return [...previousDays.reverse(),...currentDays,...lastDays];
}

export const Month = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
}
) => {
  const [currentMonth,setMonth] = useState(month);
  const thisMonth = useRef(month).current;
  const thisYear = useRef(year).current;
  const next = () => currentMonth + 1;
  const prev = () => currentMonth - 1;
  const current = () => thisMonth;
  return (
    <>
      <div className="cal-month">
        <div className="this-month flex">
          <div className="prev-month px-4 cursor-pointer" onClick={() => setMonth(prev)}>
            {cursorLeft}
            </div>
            <div className="month-name px-4" onClick={() => setMonth(current)}>{DateTime.month(currentMonth)}</div>
          <div className="next-month px-4 cursor-pointer" onClick={() => setMonth(next)}>{cursorRight}</div>
        </div>
        <div className="days">
          {days(currentMonth,year)}
        </div> 
      </div>
    </>
  )
}
