import { cursorLeft } from "../../assets/icons/cursor-left";
import { cursorRight } from "../../assets/icons/cursor-right";

export const CalendarCursor = ({currentMonth,prev,next,reset}) => {
  return (<div className="this-month flex">
            <div className="prev-month px-4 cursor-pointer" onClick={prev}>{cursorLeft}</div>
              <div className="month-name px-4" onClick={reset}>{currentMonth}</div>
            <div className="next-month px-4 cursor-pointer" onClick={next}>{cursorRight}</div>
          </div>)
}
