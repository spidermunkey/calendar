import { DateTime } from "mojo";
import { useState,useRef } from "react";

const days = (month,year) => {
  // last month
  const lastDayOfLastMonth = new Date(year,month,0).getDate();
  // this month
  const current = new Date(year,month)
  const dayOne = new Date(year,month,1);
  const dayOfWeek = dayOne.getDay();
  const daysFromSunday = dayOfWeek + 1;
  const daysInMonth = new Date(year,month + 1,0).getDate()
  const lastDayOfThisMonth = new Date(year,month,daysInMonth)
  const daysFromSaturday = 7 - (lastDayOfThisMonth.getDay() + 1);

  console.dir({
    dfs: daysFromSunday,
    dow: dayOfWeek,
    month: DateTime.month(month),
    ldlm: lastDayOfLastMonth,
    zday: dayOne,
    curr: current,
  })
    const previousDays = [];
    const currentDays = [];
    const lastDays = [];
    for (let i = 1; i < daysFromSunday; i++){
      previousDays.push(<div day={daysInMonth - i} className="day bg-grey-100">{lastDayOfLastMonth - (i - 1)}</div>)
    }
    for (let i = 0; i < daysInMonth; i++){
      currentDays.push(<div key={i} day={i + 1} className="day border w-[30px] h-[30px]">{i + 1}</div>)
    }
    for (let i = 0; i < daysFromSaturday; i++){
      lastDays.push(<div day={daysInMonth - i} className="day bg-grey-100">{i + 1}</div>)
    }
    return [...previousDays.reverse(),...currentDays,...lastDays];
}

export const Month = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear()}
) => {
  const [currentMonth,setMonth] = useState(month);
  const thisMonth = useRef(month).current;
  const next = () => currentMonth + 1;
  const prev = () => currentMonth - 1;
  const current = () => thisMonth
  return (
    <>
      <div className="month border">
        <div className="this-month flex">
        <div className="prev-month px-4 cursor-pointer" onClick={() => setMonth(prev)}>{'<'}</div>
          <div className="month-name border px-4" onClick={() => setMonth(current)}>{DateTime.month(currentMonth)}</div>
        <div className="next-month px-4 cursor-pointer" onClick={() => setMonth(next)}>{'>'}</div>
        </div>
        <div className="days border flex flex-row flex-wrap">
          {days(currentMonth,year)}
        </div>
      </div>
    </>
  )
}
