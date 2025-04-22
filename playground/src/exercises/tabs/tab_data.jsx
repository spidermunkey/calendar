import { Birthdays } from "../birthdays/Birthdays"
import { Timers } from "../timer/Timers"
export const CalendarTabs = [
  {
    label:'birthdays',
    element: <Birthdays/>,
  },
  {
    label: 'timers',
    element: <Timers/>
  }
]
