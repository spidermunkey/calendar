import './App.css'
import '../sass/main.scss'
import { Calendar } from './exercises/calendar/Calendar'
import { Tabber } from './exercises/tabs/Tabs'
import { CalendarTabs } from './exercises/tabs/tab_data'
function App() {
  return (
    <>
      <div className="app">
        <Calendar/>
        <Tabber tabs={CalendarTabs}/>
      </div>
    </>
  )
}

export default App
