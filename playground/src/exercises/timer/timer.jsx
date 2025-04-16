import { useState } from "react"

const secondsInHour = 3600;
const minutesInHour = 60;
const secondsInMinutes = 60;

const initial = 0;
let timeInSeconds = 0;
let interval = null;


export const Stopwatch = () => {
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
  return (
     <>
        <div className="stopwatch">
          <div className="current-time row p-12 border rounded-md">
            <div className="hours mr-4">hours: {converter.hours}</div>
            <div className="minutes mr-4">minutes: {converter.minutes}</div>
            <div className="seconds">seconds: {converter.seconds}</div>
          </div>
          <div className="stopwatch-controls row pt-6 pl-16">
            <div className="play"><button className="button mr-4 border rounded-sm cursor-pointer" onClick={start}>Play</button></div>
            <div className="pause"><button className="button mr-4 border rounded-sm cursor-pointer" onClick={stop}>Pause</button></div>
            <div className="reset"><button className="button border rounded-sm cursor-pointer" onClick={reset}>Reset</button></div>
          </div>
        </div>
    </>
  )
}
