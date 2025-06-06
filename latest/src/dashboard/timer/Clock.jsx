import { convertSeconds, toSeconds } from "utils"

// Count down timer
export const Clock = ({ minutes = 25, hours = 0, seconds = 0 }) => {
  // NOTIFIERS
  /* complete, start, stop, reset, interval */
  const total = toSeconds({minutes,hours,seconds});
  if (total == 0) throw new Error('invalid time setting');
  return {
      initial: {minutes,seconds,hours,total},
      timeElapsed: total,                               // seconds
      timeAlloted: total,                               // seconds

      started_at: null,                                 // epoc date
      stopped_at: null,                                 // epoc date
      completed_at: null,                               // epoc date

      interval: null,                                   // current setInterval
      state: 'stopped',                                 // running || stopped

      events: {},
      
      get current() {
        return convertSeconds(this.timeElapsed);
      },

      play(){
        if (this.state === 'running'){
          return;
        }
        this.state = 'running';
        this.started_at = Date.now();
        this.interval = setInterval(() => this.handleInterval(),1000);
        this.notify('start',this.current);
      },
      stop(){
        this.interval = clearInterval(this.interval);
        this.stopped_at = Date.now();
        this.state = 'stopped';
        this.notify('stop',this.current);
      },
      reset(){
        this.stop();
        this.started_at = null;
        this.timeElapsed = total;
        console.log('reset',this.current,this)
        this.notify('reset', this.current);
      },
      tick() {
        this.timeElapsed = this.timeElapsed - 1;
      },
      handleInterval(){
        if(this.isComplete()) {
          this.stop();
          this.notify('complete',this.current);
          return;
        } else {
          this.tick();
          this.notify('interval',this.current);
          return;
        }
      },
      isComplete(){
        return this.timeElapsed <= 0;
      },

      on(event,cb){
        if (!this.events[event]){
          this.events[event] = [cb]
        } else {
          this.events[event].push(cb)
        }
      },
      notify(event,...args){
        if (this.events[event]){
          this.events[event].forEach(listener => listener(...args))
        }
      },

  }
}

// Count up timer
export const Tracker = ({ minutes = 25, hours = 0, seconds = 0}) => {
  const tracker = Clock({minutes,hours,seconds})
  tracker.timeElapsed = 0;
  tracker.elapsed = false;
  tracker.tick = () => tracker.timeElapsed = tracker.timeElapsed + 1;
  tracker.handleInterval = () => {
    if(tracker.isComplete() && tracker.elapsed == false) {
      tracker.elapsed = false;
      tracker.notify('complete')
    }
      this.tick();
      this.notify('interval',this.current);
      return;
  }
  tracker.on('reset',() => {
    tracker.elapsed = false;
    tracker.timeElapsed = 0;
  });
  tracker.isComplete = () => {
    return tracker.timeElapsed >= tracker.timeAlloted;
  }
  return tracker;
}

// Revolving Timer with breaks
export const Pomodoro = ({
    time = {minutes:25,hours:0,seconds:0},
    rest = 5,
    sessions = 1,
  } = {}) => {
  const mainTimer = Clock(time);
  const restTimer = Clock({minutes:rest});
  const totalSessions = sessions != null && sessions != undefined && Number(sessions) >= 1 ? Number(sessions) : 1
  const timer = {

      currentTimer: mainTimer,

      time: mainTimer,
      rest: restTimer,
      sessions: totalSessions,
      currentSession:1,

      state: 'stopped',
      events: {},

      get current() {
        return this.currentTimer.current;
      },
      play() {
        this.currentTimer.play();
        this.notify('start',this.current);
      },
      stop() {
        this.currentTimer.stop();
        this.notify('stopped',this.current);
      },
      reset(){
        this.currentTimer = mainTimer;
        this.time.reset();
        this.rest.reset();
        this.currentSession = 1;
        this.notify('reset',this.current);
      },
      isComplete(){
        return this.currentSession === this.sessions
      },

      on(event,cb){
        if (!this.events[event]){
          this.events[event] = [cb]
        } else {
          this.events[event].push(cb)
        }
      },
      notify(event,...args){
        if (this.events[event]){
          this.events[event].forEach(listener => listener(...args))
        }
      },

      onRest(event,cb){
        this.restTimer.on(event,cb)
      },
      onTimer(event,cb){
        this.mainTimer.on(event,cb)
      }
    }

    // handle break switch
    mainTimer.on('complete',(...args) => {
      mainTimer.reset();
      if (!timer.isComplete()) {
        timer.currentTimer = restTimer;
        timer.currentSession = timer.currentSession + 1;
        timer.notify('sessionComplete',timer.currentSession);
        timer.play();
      } else {
        console.log('pomodoro finished',timer.current,timer,timer.currentTimer)
        timer.notify('complete',mainTimer);
      }
    })
    restTimer.on('complete', (...args) => {
      timer.currentTimer = mainTimer;
      restTimer.reset();
      timer.notify('sessionStart',...args);
      console.log('new session',timer.sessions,timer.currentTimer === mainTimer,timer)
      timer.play();
    })

    // handle separate intervals
    mainTimer.on('interval',(...args) => timer.notify('interval',...args))
    restTimer.on('interval',(...args) => timer.notify('breakInterval',...args))
    
    return timer;
}
