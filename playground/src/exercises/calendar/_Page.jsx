import React from 'react'
import { Tabber } from './tabs/Tabs'
import { CalendarTabs } from './tabs/tab_data'
import { Header } from './Header'
import { Month } from './Month'
const Calendar = () => {
  return (
        <>
          <div className="app">
            <div className="calendar">
              <Header></Header>
              <Month></Month>
            </div>
            <Tabber tabs={CalendarTabs}/>
          </div>
        </>
  )
}

export default Calendar

