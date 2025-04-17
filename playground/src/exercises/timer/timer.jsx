import React, { useEffect, useRef, useState } from 'react'
import Clock from './components/clock';
import Controller from './components/Controller';

let interval;

const secondsInHour = 3600;
const secondsInMinutes = 60;
const minutesInHour = 60;

const converted = (seconds) => {
  return {
    hours:Math.floor(seconds / secondsInHour),
    minutes:Math.floor((seconds / (secondsInHour / secondsInMinutes)) % minutesInHour),
    seconds: seconds % 60,
  }
}

const toSeconds = (time) => {
  const {hours,minutes,seconds} = time;
  const hoursToSeconds = Math.floor(hours * secondsInHour)
  const minutesToSeconds = Math.floor(minutes * secondsInMinutes);
  return hoursToSeconds + minutesToSeconds + seconds;
}

const Timer = ( {props} ) => {
  const ref = useRef(props.time);
  const element = useRef(null)
  const { hours,minutes,seconds } = ref.current;
  const {title} = props.info;

  const total = toSeconds(props.time);
  const [current,setTime] = useState(total);
  const current_time = converted(current);
  const notifyEnd = () => {
    alert('timer end')
  }

  const start = () => {
    interval = setInterval(() => {

      setTime(prev => prev - 1)
    },1000)
  }
  const stop = () => {
    interval = clearInterval(interval)
  }
  const reset = () => {
    stop();
    setTime(toSeconds(ref.current));
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
  useEffect(() => {
    console.log(total,current)
    if (current <= 0){
      stop();
      notifyEnd();
      return;
    }
  })
  return (
    <div className="timer">
      <div className="timer-title">{title}</div>
      <Clock hours={current_time.hours} minutes={current_time.minutes} seconds={current_time.seconds} />
      <Controller handler={delegate}/>
    </div>
  )
}

export default Timer
