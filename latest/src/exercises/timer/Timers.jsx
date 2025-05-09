import {Timer} from './Timer'

const timer1 = {
  info:{
    title: 'Pomodoro',
    running: false, // date,
    finished: false, // date,
    used: 0, // times completed
    started: 0, // times started from 0
  },
  time:{
      hours: 1,
      minutes: 30,
      seconds: 0,
  },
  type: 'timer',
  interval: {
    break: 30, // minutes // if type timer (break) // if type tracker (overtime)
    intermission: 90, // minutes // if type timer (break) // if type tracker (ignore)
    limit: 3,
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
    <Timer/>
  </div>

  </>
  )
}
