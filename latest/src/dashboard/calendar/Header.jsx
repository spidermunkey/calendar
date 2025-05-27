import { DateTime } from "../../utils/DateTime";
import { useEffect, useState } from "react"
import { useClock } from "../../hooks/useClock";
export const Header = () => {
  const time = useClock()
  const {dow,month,date,hour,context,minute} = time;
  return (
    <div className="cal-header">
      <div className="header-toolbar"></div>
      <div className="header-module-container">
        <div className="dayToday">
         <div className="time">
            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" pid="m9ui3rf5-00EF9TMYCIJU"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z" pid="m9ui3rf5-01NLICRKT6DI"></path></svg></div>
            <div className="curtime">
              <div className="hour">{String(hour)}</div>
                <div className="divider">:</div>
                <div className="minute">{String(minute)}</div>
                <div className="context">{context.toLowerCase()}</div>
              </div>
          </div>
          <div className="today">
            <div className="dow dayPart">{dow}</div>
            <div className="date dayPart">{String(date)}</div>
            <div className="month dayPart">{month}</div>
          </div>

        </div>
      </div>
    </div>
  )
}
