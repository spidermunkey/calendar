import { Stopwatch } from './Stopwatch'
import Timer from './Timer'

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

export const Timers = () => {
  return (    
  <>
  <div className="timers flex-col p-12">
    <Timer props={timer1}/>
    <Timer props={timer2}/>
    <Stopwatch/>
  </div>

  </>
  )
}
