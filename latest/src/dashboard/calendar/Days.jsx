import { useCallback, useEffect, useState } from "react";
import { useAppState, useCalendarState } from "context";

export const Days  = () => {

  const state = useAppState()
  const { day, month } = useCalendarState();
  const [ dayData, setDayData ] = useState({ 
    birthdays : {
      today:[],
      thisMonth:[],
    }, 
    events:[]
  })

  const birthdaysToday = useCallback(() => dayData.birthdays.today.map(bday => <span className="bullet">  {bday.name}'s birthday </span>),[dayData])
  const birthdaysThisMonth = useCallback(() => dayData.birthdays.thisMonth.map(bday => (<span className="bullet">  {bday.name}  </span>)),[dayData])
  const eventsToday = useCallback(() => dayData.events,[dayData])
  const monthName = state.monthName(month)
  const namesToday = birthdaysToday();
  const events = eventsToday();

  useEffect(() => {
    const getData = async () => {
      const dayData = await state.getDay(day,month)
      setDayData(dayData)
    }
    getData();
  },[day,month])
  
    return (
      <div className="interface-modal dayView">
        <div className="interface-header">
          <div className="interface-title">Summary</div>
        </div>
        <div className="section today">
          <div className="day-data">{monthName}  {day}</div>
        </div>

        <div className="section daily">
          <div className="section-title">Birthdays</div>
          <div className="section-data daily">
            { namesToday.length > 0 ?
              namesToday.length === 1 ?
              <div className="bday-list">
                  {namesToday}
              </div>
              : <div className="bday-data">
              <div className="section-title label"> { namesToday.length } birthday{namesToday.length !== 1 && 's'}</div>
              <div className="bullet">{ namesToday.length } birthday{namesToday.length !== 1 && 's'}</div>
                {/* <div className="bday-list">
                  {namesToday.length > 0 ? namesToday : 'none'}
                </div> */}
              </div>
              : <span className="bullet">none</span>
            }
          </div>
        </div>

        <div className="section monthly">
          <div className="section-title">Events</div>
          <div className="section-data monthly">
            
            <div className="bullet">{events.length} event{events.length !== 1 && 's'}</div>
          </div>
        </div>

        <div className="section todo">
          <div className="section-title">Todo</div>
          <div className="section-data todo">
            <div className="bullet">none</div>
          </div>
        </div>


      </div>
    )


}
