import { useEffect, useState } from "react";
import { monthData } from "../../utils/today"
import { Day } from "./Day";
import { useAppState } from "context";

function spreadNumber(count){
  return Array(Number(count)).fill()
}
function forEachNumber(number,cb){
  return spreadNumber(number).map((_,i) => cb(i))
}

export const Days = ( { month , year , day } ) => {
  const state = useAppState();
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

  useEffect(() => {
    const update = async () => {
      const activeBirthdays = await birthdays.getByMonth(month);
      const activeEvents = await events.findByMonth(month, await events.data)
      console.log(activeEvents,month)
      setActiveBirthdays(activeBirthdays);
      setActiveEvents(activeEvents);
    }
    update();
  },[month,year,birthdays,events])
  
  return <div className="days">
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
}
