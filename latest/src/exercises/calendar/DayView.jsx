import { useEffect, useState } from "react";
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

  useEffect(() => {
    const getData = async () => {
      const dayData = await state.dayData(currentDay,currentMonth)
      console.log('YO',dayData,state.currentDay)
      setDayData(dayData)
    }
    getData();
    return () => {
      unsubCurrentDay();
      unsubCurrentMonth();
    }
  },[currentDay,currentMonth])
  
  return (
    <div className="DayView">
      <div className="day-data">{currentDay}</div>
      <div className="bday-data"><span className="label">birthdays today:  </span>{dayData.birthdays.today.map(bday => bday.name)}</div>
      <div className="bday-data"><span className="label">birthdays this month:  </span>{dayData.birthdays.thisMonth.map(bday => (<span>  {bday.name}  </span>))}</div>
    </div>
  )
}
