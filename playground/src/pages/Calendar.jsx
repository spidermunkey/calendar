import React from 'react'
import { Calendar } from '../exercises/calendar/Calendar'
import { Tabber } from '../exercises/calendar/tabs/Tabs'
import { CalendarTabs } from '../exercises/calendar/tabs/tab_data'

const CalendarPage = () => {
  return (
        <>
          <div className="app">
            <Calendar/>
            <Tabber tabs={CalendarTabs}/>
          </div>
        </>
  )
}

export default CalendarPage
