import './App.css'
import '../sass/main.scss'
import { Tabber } from './exercises/tabs/Tabs'
import { CalendarTabs } from './exercises/tabs/tab_data'
import { Month } from './exercises/calendar/Month'
function App() {
  return (
    <>
      <div className="app">
        <Month/>
        <Tabber tabs ={CalendarTabs}/>
      </div>
    </>
  )
}

export default App
