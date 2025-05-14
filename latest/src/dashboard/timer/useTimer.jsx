import { useEffect, useMemo, useRef, useState, useCallback, startTransition } from 'react';
import { Clock, Tracker, Pomodoro } from './Clock'

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
          sessions: Number(config.sessions),
          rest: Number(config.rest),
        });
        break;
      }
      case 'tracker': {
        timerRef.current = Tracker(time);
        break;
      }
      default: {
        timerRef.current = Clock(time)
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

  const play = useCallback(() => {
    timerRef.current?.play()
    setState('running')
  },[])
  const stop = useCallback(() => { 
    timerRef.current?.stop()
    setState('stopped')
  },[])
  const reset = useCallback(() => timerRef.current?.reset(),[])

  const startBreak = useCallback(() => timerRef.current?.startBreak(),[])
  const pauseBreak = useCallback(() => timerRef.current?.pauseBreak(),[])
  const clearBreak = useCallback(() => timerRef.current?.clearBreak(),[])
  

  const transitionToState = (newState, text, optionalHook) => {
    setCurrentTitle(text);
    console.log(newState,text)
    setTransitioning(true);
    setState(newState);
    setCurrentTransition(newState);
    if (typeof optionalHook === 'function') optionalHook()
    return setTimeout(() => {
      setTransitioning(false); // hide animation
      newState === 'sessionComplete' ? setCurrentTitle('break:' + config.title) : setCurrentTitle(config.title)
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
      timer.on('sessionComplete',() => queueTransition('sessionComplete','Take A Break!'))
      timer.on('sessionStart',(session) => queueTransition('sessionStart','Lets get back to work!',() => setSession(session)));
      timer.on('breakInterval', update);
    }

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

    transitioning,
    currentTitle,
    currentTransition,
    
    timer:timerRef.current,
  };
}
