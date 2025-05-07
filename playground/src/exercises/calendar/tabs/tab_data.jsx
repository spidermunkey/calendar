import { Birthdays } from "../../birthdays/Birthdays"
import { Timers } from "../../timer/Timers"
import { Todo } from "../../todo/Todo"
import { DayView } from "../DayView"

export const CalendarTabs = [
  {
    label:'birthdays',
    element: <Birthdays/>,
    buttonType: 'inline',
    id:1,
  },
  {
    label: 'timers',
    element: <Timers/>,
    buttonType: 'inline',
    id: 2,
  },
  {
    label: 'todo',
    element: <Todo/>,
    buttonType: 'inline',
    id:3,
  },
  {
    label: 'dayview',
    element: <DayView/>,
    buttonType: 'floating',
  }
]
