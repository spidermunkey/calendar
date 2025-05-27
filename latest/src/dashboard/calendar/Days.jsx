import { date } from "../../utils/date";
import { monthData } from "../../utils/today"
import { Day } from "./Day";
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
    let key = `prev-${dateNum}`
    let styles = "day null-day"
    previousDays.push(<Day styles={styles} day={dateNum} key={key}/>)
  }
  for (let i = 0; i < daysInMonth; i++){
    let dateNum = i + 1
    let isToday = today.getDate() === dateNum && today.getMonth() === month && 'today';
    let bday = isBday(dateNum) && 'bday'
    let active = activeDay == dateNum && 'active'
    let styles = ['day', bday, isToday, active].filter(Boolean).join(' ')
    let key = dateNum
    currentDays.push(<Day isBday={isBday(dateNum)} styles={styles} day={dateNum} key={key}/>)
  }
  for (let i = 0; i < daysFromSaturday; i++){
    let dateNum = i + 1
    let key = `next-${dateNum}`
    let styles = "day null-day"
    lastDays.push(<Day key={key} day={dateNum} styles={styles}></Day>)
  }
  const elements = [...previousDays.reverse(),...currentDays,...lastDays]
  return <div className="days">{elements}</div> 
}
