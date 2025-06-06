import { useEffect, useState } from "react";
import { monthData, forEachNumber } from "utils"
import { Day } from "./Day";
import { useAppState, useTabState, useCalendarState } from "context";

export const Month = () => {
  const state = useAppState();
  const { setActiveTab } = useTabState();
  const { day, setDay, month, year } = useCalendarState();
  const { birthdays, events } = state;

  const [activeBirthdays,setActiveBirthdays] = useState([]);
  const [activeEvents,setActiveEvents] = useState([]);

  const { 
    lastDayOfLastMonth,  
    daysFromSunday,  
    daysInMonth, 
    daysFromSaturday 
  } = monthData(year,month);
  
  const isBday = (day) => activeBirthdays.find(bday => bday.day == day);
  const eventsByDay = (day) => activeEvents.filter(event => event?.date?.slice(8,10) == day);
  const parseEvents = (day) => {
    const events = eventsByDay(day);
    const isEvent = events.length > 0;
    const isDeadline = isEvent && events.find(event => event.category === 'deadline')
    const isBirthday = isEvent && events.find(event => event.category === 'birthday')
    const isBill = isEvent && events.find(event => event.category === 'bill')
    const isDeposit = isEvent && events.find(event => event.category === 'deposit')
    return {
      isEvent,
      isDeadline,
      isBirthday,
      isBill,
      isDeposit
    }
  }
  const today = new Date();

  const handleClick = (event) => {
    const dayElement = event.target.closest('.day');
    if (dayElement) {
      const day = dayElement.getAttribute('day');
      setDay(day);
   }
  }

  useEffect(() => {
    const update = async () => {
      const activeBirthdays = await birthdays.getByMonth(month);
      const activeEvents = await events.findByMonth(month, await events.data);
      setActiveBirthdays(activeBirthdays);
      setActiveEvents(activeEvents);
    }
    update();
  },[month,year,birthdays,events]);
  
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
        let events = parseEvents(dateNum);
        let styles = ['day', isToday, day == dateNum && 'active'].filter(Boolean).join(' ')
        return <Day isBday={isBday(dateNum)} events={events} styles={styles} day={dateNum} key={dateNum}/>
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
