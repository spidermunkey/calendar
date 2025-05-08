import Clock from './Clock';
import Controller from './Controller';

import { useTimer } from './useTimer';

export const Timer = () => {
  const {
    currentTime,
    state,
    session,
    play,
    stop,
    reset,
    pauseBreak,
    clearBreak,

    transitioning,
    transitionText,
    currentTransition,
    title,
  } = useTimer();

  const { hours, minutes, seconds } = currentTime;
  const notifyEnd = () => {
    alert('timer end')
  }
  const delegate = (event) => {
    console.log('triggered')
    const startTimer = event.target.closest('[btn="play"]')
    const pauseTimer = event.target.closest('[btn="pause"]')
    const resetTimer = event.target.closest('[btn="reset"]')
    if (startTimer) play()
    else if (pauseTimer) stop()
    else if (resetTimer) reset()
}

  return (
    <div className="timer">
      <div className="timer-title">{title}</div>
      <Clock hours={hours} minutes={minutes} seconds={seconds} />
      <Controller handler={delegate}/>
    </div>
  )
}
