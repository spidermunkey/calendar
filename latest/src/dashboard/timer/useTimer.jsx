import { useEffect, useMemo, useRef, useState, useCallback, startTransition } from 'react';
import { Template } from './Template';
import { Clock, Tracker, Pomodoro} from './Clock'

export const useTimer = (config) => {
  const timerRef = useRef(null);
  if (!timerRef.current) {
    const time = {
      hours: Number(config.time.hours) || 0,
      minutes: Number(config.time.minutes) || 0,
      seconds: Number(config.time.seconds) || 0,
    }
    switch (config.type){
      case 'timer': {
        timerRef.current = Clock(time);
        break;
      }
      case 'pomodoro': {
        timerRef.current = Pomodoro({
          time,
          sessions: config.sessions,
          rest: config.res,
        });
        break;
      }
      case 'tracker': {
        timerRef.current = Tracker(time);
        break;
      }
      default: {
        throw new Error('error setting up Timer Hooks')
      }
    }
  }
  let timer = timerRef.current;
  const [currentTime,setCurrentTime] = useState(timer.current);
  const [currentTitle, setCurrentTitle] = useState(config.title);

  const [state,setState] = useState('stopped');
  const [session,setSession] = useState(1);
  // test
  const [transitioning, setTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const [currentTransition, setCurrentTransition] = useState('none');

  const play = useCallback(() => timerRef.current?.play(),[])
  const stop = useCallback(() => timerRef.current?.stop(),[])
  const reset = useCallback(() => timerRef.current?.reset(),[])

  const startBreak = useCallback(() => timerRef.current?.startBreak(),[])
  const pauseBreak = useCallback(() => timerRef.current?.pauseBreak(),[])
  const clearBreak = useCallback(() => timerRef.current?.clearBreak(),[])
  

  const transitionToState = (newState, text, optionalHook) => {
    setCurrentTitle(text);
    setTransitioning(true);
    setState(newState);
    setCurrentTransition(newState);
    if (typeof optionalHook === 'function') optionalHook()
    return setTimeout(() => {
      setTransitioning(false); // hide animation
    }, 1500); // match animation duration
  };
  
  useEffect(() => {
    let timeouts = [];
    const queueTransition = (...args) => timeouts.push(transitionToState(...args));
    const update = (time) => setCurrentTime(prev => (prev !== time ? time : prev));
    const cleanup = (timeouts) => timeouts.forEach(timeout => clearTimeout(timeout));
    if (config.type === 'tracker') {
      timer.on('elapsed',() => queueTransition('elapsed','Session Complete!'));
    }
    if (config.type === 'pomodoro') {
      timer.on('sessionStart',() => queueTransition('sessionStart','Take A Break!'))
      timer.on('sessionComplete',(session) => queueTransition('sessionComplete','Lets get back to work!',() => setSession(session)));
      timer.on('breakInterval', update);
    }

    timer.on('start', () => queueTransition('running',timer.title))
    timer.on('complete',() => queueTransition('complete', 'Well Done!'));
    timer.on('stop', () => queueTransition('stopped', 'paused'));
    timer.on('interval',update);
    timer.on('reset', update);

    return () => {
      cleanup(timeouts);
    }
  },[config])



  return {
    currentTime,
    state,
    session,

    play,
    stop,
    reset,

    startBreak,
    pauseBreak,
    clearBreak,

    transitioning,
    currentTitle,
    currentTransition,
    
    timer:timerRef.current,
  };
}
