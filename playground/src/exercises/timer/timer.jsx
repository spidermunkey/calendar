import Clock from './Clock';
import Controller from './Controller';

import { useTimer } from './useTimer';

export const Timer = ({ name = 'focus', time={hours:0,minutes:25,seconds:0}, type='timer'}) => {
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
    timer,
  } = useTimer({name,time,type});
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
      <div className="timer-title">{timer.title}</div>
      <Clock hours={hours} minutes={minutes} seconds={seconds} />
      <Controller handler={delegate}/>
    </div>
  )
}
