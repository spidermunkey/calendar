import './App.css'
import { Timers } from './exercises/timer/Timers'
import { Birthdays } from './exercises/birthdays/Birthdays'
import { Calendar } from './exercises/calendar/Calendar'
import { Month } from './exercises/calendar/Month'
function App() {
  return (
    <>
      <Birthdays/>
      <Month/>
      <Timers/>
    </>
  )
}

export default App
