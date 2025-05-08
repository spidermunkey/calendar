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
  const [currentTransition, setTransition] = useState('none')

  const transitionToState = (newState, text, optionalHook) => {
    setTransitionText(text);
    setTransitioning(true);
    setState(newState);
    setTransition(newState);
    optionalHook()
    return setTimeout(() => {
      setTransitioning(false); // hide animation
    }, 1500); // match animation duration
  };
  const cleanup = (timouts) => {
    timouts.forEach(timout => clearTimeout(timout))
  }
  
  useEffect(() => {
    const timer = Template(config);
    let timouts = [];
    timerRef.current = timer;

    timer.on('start', () => timouts.push( transitionToState('start',timer.title)))
    timer.on('breakStart',() => timouts.push( transitionToState('breakStart','Take A Break!')))
    timer.on('complete',() => timouts.push( transitionToState('complete', 'Well Done!')))
    timer.on('breakElapsed',(session) => timouts.push( transitionToState('breakStop','Lets get back to work!',() => setSession(session))));
    timer.on('stop', (time) => timouts.push( transitionToState('stopped', 'stopped', () => setCurrentTime(time) ) ));
    timer.on('timeElapsed',() => timouts.push( transitionToState('elapsed','Session Complete!')));

    timer.on('interval',(time) => setCurrentTime(time));
    timer.on('breakInterval', (time) => setCurrentTime(time));
    timer.on('reset', (time) => setCurrentTime(time));

    setCurrentTime(timer.current);
    setState(timer.state);

    return () => {
      timer.destroy();
      cleanup();
    }
  },[config])

  const play = useCallback(() => timerRef.current?.play(),[])
  const stop = useCallback(() => timerRef.current?.stop(),[])
  const reset = useCallback(() => timerRef.current?.reset(),[])
  const pauseBreak = useCallback(() => timerRef.current?.pauseBreak(),[])
  const clearBreak = useCallback(() => timerRef.current?.clearBreak(),[])

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
