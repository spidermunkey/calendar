
import { CalendarTabs,TabProvider,TabModal,TabTray } from './Tabs';
import { Header } from './Header';
import { DateTime } from "../../utils/DateTime";
import { useState,useRef, useEffect } from "react";
import { CalendarCursor } from "./CalendarCursor";
import { Days } from "./Days";
import { useAppState } from "context";
import { TimerProvider } from '../../context';

const Calendar = () => {
  
  const state = useAppState();

  const [ activeTab, setActiveTab ] = useState(0);
  const [ month, setMonth ] = useState(state.currentMonth);
  const [ day, setDay ] = useState(state.currentDay);
  const today = useRef((new Date())).current;

  const handleDashboardClick = async (event) => {
    const dayElement = event.target.closest('.day');
    if (dayElement) {
      const day = dayElement.getAttribute('day');
      setActiveTab(3);
      state.currentDay = day;
      setDay(day);
    }
  }

  state.observe('currentMonth',() => { setMonth(state.currentMonth)} )

  return (
        <>
          <div className="app">
            <TabProvider>
              <div className="calendar">
                <Header></Header>
                <div className="cal-month-header">
                    <CalendarCursor />
                    <TabTray/>
                </div>
                <div className="cal-month" onClick={handleDashboardClick}>
                    <Days day={day} month={month} year={today.getFullYear()} />
                </div>
              </div>
            
              <TimerProvider>
                <TabModal/>
              </TimerProvider>
            </TabProvider>
          </div>
        </>
  )
}

export default Calendar
