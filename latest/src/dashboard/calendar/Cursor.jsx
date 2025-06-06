import { CursorLeftIcon } from "icons";
import { CursorRightIcon } from "icons";

import { DateTime } from "utils";
import { useCalendarState } from "context";

export const Cursor = () => {

  const { month, setMonth, year, setYear, setDay, today} = useCalendarState();

  const updateCurrentMonth = (month) => {
    if (month > 11){
      setYear(year + 1)
      month = 0;
    } else if (month < 0) {
      setYear(year - 1)
      month = 11;
    }
    setMonth(month);
  }
  const reset = () => {
    setDay(today.getDate());
    setMonth(today.getMonth());
    setYear(today.getYear());
  }
  const toggleNext = () => updateCurrentMonth(month + 1)
  const togglePrev = () => updateCurrentMonth(month - 1)

  return (<div className="this-month flex">
            <div className="prev-month px-4 cursor-pointer" onClick={togglePrev}><CursorLeftIcon/></div>
              <div className="month-name px-4" onClick={reset}>{DateTime.month(month)}</div>
            <div className="next-month px-4 cursor-pointer" onClick={toggleNext}>{CursorRightIcon}</div>
          </div>)
}
