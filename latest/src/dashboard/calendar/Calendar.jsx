
import { TabModal,TabTray } from './Tabs';
import { Header } from './Header';
import { useState,useRef, useEffect } from "react";
import { CalendarCursor } from "./CalendarCursor";
import { Days } from "./Days";
import { TabProvider, TimerProvider, CalendarProvider } from "context";

const Calendar = () => {
  return (
        <>
          <div className="app">
            <TabProvider>
            <CalendarProvider>
              <TimerProvider>


              <div className="calendar">
                <Header></Header>
                <div className="cal-month-header">
                    <CalendarCursor />
                    <TabTray/>
                </div>
                    <Days/>
              </div>
            
                <TabModal/>
              </TimerProvider>

            </CalendarProvider>
            </TabProvider>

          </div>
        </>
  )
}

export default Calendar
