import { Birthdays } from "./birthdays/Birthdays"
import { Timers } from "./timer/Timers"
import { Events } from "./events/Events"
import { Todos } from "./todo/Todo"
import { Days } from "./calendar/Days"

import { composeElement } from "utils";
import { CalendarIcon, NoteIcon, ClockIcon, PresentIcon } from "icons";


export const CalendarTabs = [
  {
    label: 'events',
    icon: (<CalendarIcon/>),
    element: composeElement(Events),
    buttonType: 'inline',
    id:3,
  },
  {
    label: 'notes',
    icon:(<NoteIcon/>),
    element: composeElement(Todos),
    buttonType: 'inline',
    index: 5,
  },
  {
    label: 'timers',
    icon: (<ClockIcon/>),
    element: composeElement(Timers),
    buttonType: 'inline',
    id: 2,
  }, 
  {
    label:'birthdays',
    icon: (<PresentIcon/>),
    element: composeElement(Birthdays),
    buttonType: 'inline',
    id:1,
  },
  {
    label: 'dayview',
    element: composeElement(Days),
    buttonType: 'floating',
    id: 4,
  },

]
