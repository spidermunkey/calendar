import { convertSeconds, toSeconds } from "../../utils/Convert"

// Count down timer
export const Clock = ({ minutes = 25, hours = 0, seconds = 0 }) => {
  const total = toSeconds(time);
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
        return convertSeconds(this.timeAlloted);
      },

      play(){
        if (this.state === 'running'){
          return;
        }
        this.state = 'running';
        this.started_at = Date.now();
        this.interval = setInterval(this.handleInterval.bind(this),1000);
        this.notify('start',this.current);
      },
      stop(){
        this.interval = clearInterval(this.interval);
        this.stopped_at = Date.now();
        this.state = 'stopped';
        this.notify('stop',this.current);
      },
      reset(){
        this.interval = clearInterval(this.interval);
        this.stopped_at = null;
        this.started_at = null;
        this.state = 'stopped'
        this.timeElapsed = total,
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
        return this.type === 'timer' ? this.timeElapsed <= 0 : this.timeElapsed >= this.timeAlloted;
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
  const clock = new Clock({minutes,hours,seconds})
  clock.timeElapsed = 0;
  clock.elapsed = false;
  clock.tick = () => clock.timeElapsed = clock.timeElapsed + 1;
  clock.handleInterval = () => {
    if(clock.isComplete() && clock.elapsed == false) {
      clock.elapsed = false;
      clock.notify('complete')
    }
      this.tick();
      this.notify('interval',this.current);
      return;
  }
  clock.on('reset',() => {
    clock.elapsed = false;
    clock.timeElapsed = 0;
  });
}
