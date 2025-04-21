import { DateTime } from "mojo";
import { useState } from "react";

const date = () => new Date();
const month = () => new Date().getMonth();
const monthName = () => DateTime.getMonth();
const year = () => new Date().getFullYear();
const getDays = (monthIndex = month(), year = year()) => {
  console.log('here yee', monthIndex, year)
  return new Date(year,monthIndex +1,0).getDate()
}
const days = () => getDays()

export const Month = ({m = month(),y = year()}) => {
  const [month,setMonth] = useState(m);
  const days = (() => {
    const d = getDays(month,y)
    const e = [];
    for (let i = 0; i < d; i++){
      e.push(<div key={i} day={i + 1} className="day border w-[30px] h-[30px]">{i + 1}</div>)
      console.log(i)
    }
    return e;
  })()
  return (
    <>
      <div className="month border">
        <div className="this-month flex">
        <div className="prev-month px-4 cursor-pointer" onClick={() => setMonth(month => month - 1)}>{'<'}</div>
          <div className="month-name border px-4" onClick={() => setMonth(() => m)}>{DateTime.month(month)}</div>
        <div className="next-month px-4 cursor-pointer" onClick={() => setMonth(month => month + 1)}>{'>'}</div>
        </div>

        <div className="days border flex flex-row flex-wrap">
          {days}
        </div>
      </div>
    </>
  )
}
