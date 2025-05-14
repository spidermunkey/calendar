import { useEffect, useMemo, useRef, useState, useCallback, startTransition } from 'react';
import { Template } from './Template';

export const useTimer = (config) => {
  const timerRef = useRef(null);
  if (!timerRef.current) timerRef.current = Template(config);
  const [currentTime,setCurrentTime] = useState(timerRef.current.current);
  const [currentTitle, setCurrentTitle] = useState(timerRef.current.title)
  const [state,setState] = useState('stopped');
  const [session,setSession] = useState(1);
  // test
  const [transitioning, setTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const [currentTransition, setCurrentTransition] = useState('none')

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

    const timer = timerRef.current
    let timeouts = [];
    const queueTransition = (...args) => timeouts.push(transitionToState(...args));
    const update = (time) => setCurrentTime(prev => (prev !== time ? time : prev))
    const cleanup = (timeouts) => timeouts.forEach(timeout => clearTimeout(timeout))

    timer.on('start', () => queueTransition('running',timer.title))
    timer.on('breakStart',() => queueTransition('breakStart','Take A Break!'))
    timer.on('breakElapsed',(session) => queueTransition('breakStop','Lets get back to work!',() => setSession(session)));
    timer.on('breakStop',() => queueTransition('stopped','paused'));

    timer.on('complete',() => queueTransition('complete', 'Well Done!'))
    timer.on('stop', () => queueTransition('stopped', 'paused'));
    timer.on('timeElapsed',() => queueTransition('elapsed','Session Complete!'));

    timer.on('interval',update);
    timer.on('breakInterval', update);
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
