import { monthData } from "../../utils/today"

export const Days = ( { month , year , activeBirthdays, activeDay } ) => {
  // last month
  const { lastDayOfLastMonth, dayOne,  dayOfWeek,  daysFromSunday,  daysInMonth,  lastDayOfThisMonth,  daysFromSaturday } = monthData(month,year);
  const previousDays = []
  const currentDays = []
  const lastDays = []
  const isBday = (day) => activeBirthdays.find(bday => bday.day == day)
  const today = new Date();
  for (let i = 1; i < daysFromSunday; i++){
    let dateNum = lastDayOfLastMonth - (i - 1)
    previousDays.push(<div key={`prev-${dateNum}`} day={dateNum} className="day null-day"><div className="daynum">{dateNum}</div></div>)
  }
  for (let i = 0; i < daysInMonth; i++){
    let dateNum = i + 1
    let isToday = today.getDate() === dateNum && today.getMonth() === month;
    console.log(month,today.getMonth(),today)
    let bday = isBday(dateNum)
    let active = activeDay == dateNum
    currentDays.push(<div key={i} day={dateNum} className={`day ${ bday ? 'bday' : ''} ${isToday ? 'today': ''} ${active?'active':''}`.trim()} >
      {bday ? <div className="bday-marker"></div> : ''}
        <div className="daynum">{dateNum}</div>
      </div>)
  }
  for (let i = 0; i < daysFromSaturday; i++){
    let dateNum = i + 1
    lastDays.push(<div key={`next-${dateNum}`} day={dateNum} className="day null-day"><div className="daynum">{dateNum}</div></div>)
  }
  const elements = [...previousDays.reverse(),...currentDays,...lastDays]
  return <div className="days">{elements}</div> 
}
