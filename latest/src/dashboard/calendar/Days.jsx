import { useEffect, useState } from "react";
import { monthData } from "utils"
import { Day } from "./Day";
import { useAppState,useTabState,useCalendarState } from "context";

function spreadNumber(count){
  return Array(Number(count)).fill()
}
function forEachNumber(number,cb){
  return spreadNumber(number).map((_,i) => cb(i))
}

export const Days = () => {
  const state = useAppState();
  const { setActiveTab } = useTabState();
  const { day, setDay, month, year } = useCalendarState()
  const { birthdays, events } = state;

  const [activeBirthdays,setActiveBirthdays] = useState([]);
  const [activeEvents,setActiveEvents] = useState([]);

  const { 
    lastDayOfLastMonth,  
    daysFromSunday,  
    daysInMonth, 
    daysFromSaturday 
  } = monthData(year,month);
  
  const isBday = (day) => activeBirthdays.find(bday => bday.day == day)
  const isEvent = (day) => activeEvents.find(event => event?.date?.slice(8,10) == day)
  const today = new Date();

  const handleClick = (event) => {
    const dayElement = event.target.closest('.day');
    if (dayElement) {
      const day = dayElement.getAttribute('day');
      setActiveTab(4);
      setDay(day);
   }
  }

  useEffect(() => {
    const update = async () => {
      const activeBirthdays = await birthdays.getByMonth(month);
      const activeEvents = await events.findByMonth(month, await events.data)
      setActiveBirthdays(activeBirthdays);
      setActiveEvents(activeEvents);
    }
    update();
  },[month,year,birthdays,events])
  
  return (
  <div className="cal-month" onClick={handleClick}>
    <div className="days">
      {/* fill in previous days of month */}
      {forEachNumber(daysFromSunday, index => {
        let dateNum = lastDayOfLastMonth - index;
        return <Day styles={"day null-day"} day={dateNum} key={`prev-${dateNum}`}/>
      }).reverse()}
      {/* Current Day Set */}
      {forEachNumber(daysInMonth, index => {
        let dateNum = index + 1
        let isToday = today.getDate() === dateNum && today.getMonth() === month && 'today';
        let styles = ['day', isBday(dateNum) && 'bday', isEvent(dateNum) && 'event', isToday, day == dateNum && 'active'].filter(Boolean).join(' ')
        return <Day isEvent={isEvent(dateNum)} isBday={isBday(dateNum)} styles={styles} day={dateNum} key={dateNum}/>
        })}
      {/* fill in first days of next month */}
      {forEachNumber(daysFromSaturday, index => {
        let dateNum = index + 1
        return <Day styles={"day null-day"} day={dateNum}  key={`next-${dateNum}`}></Day>
      })}
    </div>
  </div>
  )
}
