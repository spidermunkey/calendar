import { useTimer } from './useTimer';
import { useTimerState } from '../../context';
import { Play } from '../../assets/icons/play';
import { Pause } from '../../assets/icons/pause';
export const Timer = ({ props }) => {
  const { state, play, stop, currentTitle, timer } = useTimer(props);
  const { hours, minutes, seconds } = timer.current;
  const timers = useTimerState();
  return (
    <div className="timer tracker-element">
      {state === 'running' && <div className="activity-sensor"></div>}
      <div className="info">
        <div className="timer-title">{currentTitle}</div>
        <div className="current-time">
          {hours >= 1 && <><div className="hours">{hours}</div><div className="divider">:</div></>}
          <div className="minutes">{minutes < 10 ? String(minutes).padStart(2,'0') : minutes}</div>
          <div className="divider">:</div>
          <div className="seconds">{seconds < 10 ? String(seconds).padStart(2,'0') : seconds}</div>
        </div>
      </div>
      <div className="stopwatch-controls" >
      { state === 'stopped' || state === 'complete' 
        ? <div className="btn-control play" onClick={() => {
          play();
          timers.updateActiveTimer(props);
          console.log(props,timers.activeTimer,timers.updateActiveTimer);
        }}><Play/></div>
        : <div className="btn-control pause" onClick={stop}><Pause/></div>
        }
      </div>
    </div>
  )
}
