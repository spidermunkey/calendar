import { useCallback, useEffect, useState } from "react";
import { useAppState } from "../../context";

export const DayView = () => {
  const state = useAppState()
  const [currentDay,setCurrentDay] = useState(state.currentDay)
  const [currentMonth,setCurrentMonth] = useState(state.currentMonth)

  const unsubCurrentDay = state.observe('currentDay', setCurrentDay);
  const unsubCurrentMonth = state.observe('currentMonth',setCurrentMonth)

  const [dayData,setDayData] = useState({ birthdays : {
    today:[],
    thisMonth:[],
  }})

  const birthdaysToday = useCallback(() => dayData.birthdays.today.map(bday => <span className="bullet">  {bday.name}'s birthday </span>),[dayData])
  const birthdaysThisMonth = useCallback(() => dayData.birthdays.thisMonth.map(bday => (<span className="bullet">  {bday.name}  </span>)),[dayData])
  const monthName = state.monthName(currentMonth)
  const namesToday = birthdaysToday();
  const namesThisMonth = birthdaysThisMonth();
  useEffect(() => {
    const getData = async () => {
      const dayData = await state.getDay(currentDay,currentMonth)
      setDayData(dayData)
    }
    getData();
    return () => {
      unsubCurrentDay();
      unsubCurrentMonth();
    }
  },[currentDay,currentMonth])
  
  return (
    <div className="interface-modal dayView">
      <div className="day-data">{monthName}  {currentDay}</div>
      <div className="section-title">Daily Events</div>
      <div className="event-list daily">
        { namesToday.length > 0 ? 
          namesToday.length === 1 ?
          <div className="bday-list">
              {namesToday}
          </div>
          : <div className="bday-data">
          <div className="section-title label"> { namesToday.length } birthday{namesToday.length !== 1 ? 's' : ''}</div>
            <div className="bday-list">
              
              {/* {namesToday.length > 0 ? namesToday : 'none'} */}
            </div>
          </div>
          : <span className="bullet">none</span>
        }
      </div>

      <div className="section-title">Monthly Events</div>
      <div className="event-list monthly">
        <div className="bday-data">
          <div className="bullet">{ namesThisMonth.length } birthday{namesThisMonth.length !== 1 ? 's' : ''}</div>
          <div className="bday-list">
            {/* {namesThisMonth.length > 0 ? namesThisMonth : 'none'} */}
          </div>  
        </div>
      </div>

    </div>
  )
}
