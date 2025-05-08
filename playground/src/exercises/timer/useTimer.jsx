import { useEffect, useRef, useState, useCallback, startTransition } from 'react';
import { Template } from './Template';

export const useTimer = (config) => {
  const timerRef = useRef(null);

  const [currentTime,setCurrentTime] = useState(0);
  const [state,setState] = useState('stopped');
  const [session,setSession] = useState(1);
  // test
  const [transitioning, setTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const [currentTransition, setCurrentTransition] = useState('none')

  const play = useCallback(() => timerRef.current?.play(),[])
  const stop = useCallback(() => timerRef.current?.stop(),[])
  const reset = useCallback(() => timerRef.current?.reset(),[])
  const pauseBreak = useCallback(() => timerRef.current?.pauseBreak(),[])
  const clearBreak = useCallback(() => timerRef.current?.clearBreak(),[])
  

  const transitionToState = (newState, text, optionalHook) => {
    setTransitionText(text);
    setTransitioning(true);
    setState(newState);
    setCurrentTransition(newState);
    if (typeof optionalHook === 'function') optionalHook()
    return setTimeout(() => {
      setTransitioning(false); // hide animation
    }, 1500); // match animation duration
  };
  
  useEffect(() => {

    const timer = Template(config);
    let timeouts = [];
    timerRef.current = timer;

    const queueTransition = (args) => timeouts.push(transitionToState(...args));
    const update = (time) => setCurrentTime(prev => (prev !== time ? time : prev))
    const cleanup = (timeouts) => timeouts.forEach(timeout => clearTimeout(timeout))

    timer.on('start', () => queueTransition('start',timer.title))
    timer.on('breakStart',() => queueTransition('breakStart','Take A Break!'))
    timer.on('breakElapsed',(session) => queueTransition('breakStop','Lets get back to work!',() => setSession(session)));
    timer.on('breakStop',() => queueTransition('stopped','paused'));

    timer.on('complete',() => queueTransition('complete', 'Well Done!'))
    timer.on('stop', () => queueTransition('stopped', 'paused'));
    timer.on('timeElapsed',() => queueTransition('elapsed','Session Complete!'));

    timer.on('interval',update);
    timer.on('breakInterval', update);
    timer.on('reset', update);

    update(timer.current);
    setState(timer.state);

    return () => {
      timer.destroy();
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
    pauseBreak,
    clearBreak,

    transitioning,
    transitionText,
    currentTransition,
  };
}
