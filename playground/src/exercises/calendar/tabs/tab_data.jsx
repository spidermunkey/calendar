import { Birthdays } from "../../birthdays/Birthdays"
import { Timers } from "../../timer/Timers"
import { Todo } from "../../todo/Todo"
import { DayView } from "../DayView"

const compose = (Element) => (props) => <Element {...props}/> 
export const CalendarTabs = [
  {
    label:'birthdays',
    element: compose(Birthdays),
    buttonType: 'inline',
    id:1,
  },
  {
    label: 'timers',
    element: compose(Timers),
    buttonType: 'inline',
    id: 2,
  },
  {
    label: 'todo',
    element: compose(Todo),
    buttonType: 'inline',
    id:3,
  },
  {
    label: 'dayview',
    element: compose(DayView),
    buttonType: 'floating',
    index: 4,
  }
]
