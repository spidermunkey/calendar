
import { CalendarTabs } from './Tabs';
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

  const updateCurrentMonth = (month) => {
    state.currentMonth = month;
    setMonth(month);
  }
  const today = useRef((new Date())).current;
  const toggleNext = () => updateCurrentMonth(month + 1)
  const togglePrev = () => updateCurrentMonth(month - 1)
  const toggleCurrent = () => updateCurrentMonth(today.getMonth())
  
  const handleDashboardClick = async (event) => {
    const dayElement = event.target.closest('.day');
    if (dayElement) {
      const day = dayElement.getAttribute('day');
      setActiveTab(3);
      state.currentDay = day;
      setDay(day);
    }
  }

  state.observe('currentMonth',() => {setMonth(state.currentMonth)})

  return (
        <>
          <div className="app">

            <div className="calendar">
              <Header></Header>
              <div className="cal-month-header">
                  <CalendarCursor />
                  <div className="tabber-labels">
                    { CalendarTabs.map((tab,index) => {
                      if (tab.buttonType === 'inline')
                        return ( 
                        <div className={`tabber-tab text-[18px] ${tab.element == CalendarTabs[activeTab]?.element && 'active'}`} key={index} onClick={() => setActiveTab(index)}> 
                            <div className="icon">{tab.icon}</div>
                            <div className="tool-tip">{tab.label}</div> 
                          </div>)
                      })
                    }
                  </div>
              </div>
              <div className="cal-month" onClick={handleDashboardClick}>
                  <Days day={day} month={month} year={today.getFullYear()} />
              </div>
            </div>
            
            <TimerProvider>
              <div className="tabber-modals">{CalendarTabs[activeTab].element()}</div>
            </TimerProvider>
          </div>
        </>
  )
}

export default Calendar
