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
  console.log(state)
  return (
    <div className="timer">
      <div className="info">
        <div className="current-time">
          {hours > 1 ? <><div className="hours">{hours}</div><div className="divider">:</div></> : ''}
          <div className="minutes">{minutes < 10 ? String(minutes).padStart(2,'0') : minutes}</div>
          <div className="divider">:</div>
          <div className="seconds">{seconds < 10 ? String(seconds).padStart(2,'0') : seconds}</div>
        </div>
        <div className="timer-title">{timer.title}</div>

      </div>


      <div className="stopwatch-controls" >
      {state === 'stopped' 
        ? <div className="btn-control play" onClick={play}>play</div>
        : <div className="btn-control pause" onClick={stop}>Pause</div>
    }
    </div>
    </div>
  )
}
