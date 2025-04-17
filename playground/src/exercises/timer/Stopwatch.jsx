import { useState } from "react"
import Controller from "./components/Controller";
import Clock from "./components/clock";
const secondsInHour = 3600;
const minutesInHour = 60;
const secondsInMinutes = 60;

const initial = 0;
let timeInSeconds = 0;
let interval = null;

export const Stopwatch = ({title = "untitled"}) => {
  const [time,setTime] = useState(timeInSeconds)
  const converter = {
    get hours(){
      return Math.floor(time / secondsInHour)
    },
    get minutes(){
      return Math.floor((time / (secondsInHour / secondsInMinutes)) % minutesInHour)
    },
    get seconds(){
      return time % 60
    },
  }
  const start = () => {
    interval = setInterval(() => {
      setTime(seconds => seconds + 1)
    }, 1000)
  }
  const stop = () => {
    console.log('clearing interval',interval)
    interval = clearInterval(interval)
  }
  const reset = () => {
    stop();
    setTime(() => initial)
  }
  const delegate = (event) => {
      console.log('triggered')
      const startTimer = event.target.closest('[btn="play"]')
      const pauseTimer = event.target.closest('[btn="pause"]')
      const resetTimer = event.target.closest('[btn="reset"]')
      if (startTimer) start()
      else if (pauseTimer) stop()
      else if (resetTimer) reset()
  }

  return (
     <>
        <div className="stopwatch">
          <div className="stopwatch-title">{title}</div>
          <Clock hours={converter.hours} minutes={converter.minutes} seconds={converter.seconds}/>
          <Controller handler={delegate}/>
        </div>
    </>
  )
}
