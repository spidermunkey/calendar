import { Birthdays } from "../../birthdays/Birthdays"
import { Timers } from "../../timer/Timers"
import { Todo } from "../../todo/Todo"

export const CalendarTabs = [
  {
    label:'birthdays',
    element: <Birthdays/>,
  },
  {
    label: 'timers',
    element: <Timers/>
  },
  {
    label: 'todo',
    element: <Todo/>
  }
]
