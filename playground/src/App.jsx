import './App.css'
import { Stopwatch } from './exercises/timer/Stopwatch'
import Timer from './exercises/timer/Timer'
const timer1 = {
  info:{
    title: 'Pomodoro',
  },
  time:{
      hours: 1,
      minutes: 30,
      seconds: 0,
  }
}
const timer2 = {
  info:{
    title: 'test',
  },
  time: {
    hours: 0,
    minutes: 0,
    seconds: 5,
  }
}

function App() {
  return (
    <>
        <Timer props={timer1}/>
        <Timer props={timer2}/>
        <Stopwatch/>
    </>
  )
}

export default App
