import { convertMinutes, secondsInMinutes, convertSeconds, toMinutes } from "../../utils/Convert"

export const Template = ({
    title = 'focus',
    category = 'none',
    type = 'timer',
    time = {minutes:25,hours:0,seconds:0},
    rest = 5,
    intermission = 0,
  }) => { 

  const total = toMinutes(time);
  return {

      title: title,
      category: category,
      type: type,
    
      timeElapsed: type === 'tracker' ? 0 : total * 60, // seconds
      timeAlloted: total,                          // minutes
                          
      breakElapsed: rest * secondsInMinutes,        // seconds
      breakAlloted: rest,                           // minutes

      started_at: null,                             // epoc date
      stopped_at: null,                              // epoc date
      completed_at: null,                            // epoc date
      rest_start: null,                                // epoc date

      session: 1,                                 // current break
      interval: undefined,                        // current setInterval
      restInterval: undefined,                    // current break interval
      used: 0,                                    // times completed

      limit: 5,                                   // break time in minutes
      intermission: intermission,                 // longbreak time in minutes
      sessions: 4,                                // breaks before complete
      
      state: 'stopped',                            // running | rest | stopped | complete | intermission
      events: {},
  //-----------------------------------------------------------------------------------------//
      get time() {
        return convertMinutes(this.timeAlloted)
      },
      get current() {
        return convertSeconds(this.timeElapsed)
      },

  //-----------------------------------------------------------------------------------------//

      play() {
        if (this.state === 'running'){
          return;
        }
          this.state = 'running'
          this.started_at = Date.now();
          this.interval = setInterval(() => {
            this.handleInterval();
            this.notify('interval',this.current);
          },1000);
          this.notify('start')

      },

      reset() {
        this.interval = clearInterval(this.interval);
        this.stopped_at = null;
        this.state = 'stopped'
        this.timeElapsed = this.timeAlloted * secondsInMinutes;
        this.session = 1;
        this.notify('reset', this.current);
      },
      
      stop() {
        this.interval = clearInterval(this.interval);
        this.stopped_at = Date.now();
        this.state = 'stopped'
        this.notify('stop',this.current);
      },
      destroy() {
        this.interval = clearInterval(this.interval);
        this.restInterval = clearInterval(this.restInterval);
        this.state = 'stopped';
        this.notify('destroyed');
      },
      startBreak() {
        if (this.restInterval === undefined){
          this.session = this.session + 1;
          this.interval = clearInterval(this.interval)
          this.state = 'break'
          this.rest_start = Date.now();
          this.restInterval = setInterval(() => {
            this.handleBreakInterval();
          },1000)
          this.notify('breakStart')
        }
      },
      pauseBreak(){
        this.state = 'stopped'
        this.restInterval = clearInterval(this.restInterval)
        this.notify('breakStop', this.current)
      },

      clearBreak() {

      },

  //-----------------------------------------------------------------------------------------//
    
    setTime() {
      if (this.type === 'timer'){
        this.timeElapsed = this.timeElapsed - 1;
        console.log(this.timeElapsed)
      }
      if (this.type === 'tracker'){
        this.timeElapsed = this.timeElapsed + 1;
      }
    },
    isComplete() {
      if (this.type === 'timer'){
        return this.timeElapsed <= 0;
      } else if (this.type === 'tracker' && this.time !== 0){
        return this.timeElapsed >= this.timeAlloted;
      } else throw Error('invalid timer type');
    },
    handleTimeElapsed() {
        this.interval = clearInterval(this.interval);
        this.timeElapsed = this.timeAlloted * secondsInMinutes;
        this.notify('timeElapsed', this.current)
      },
      handleComplete() {
        this.state = 'complete';
        this.timeElapsed = this.timeAlloted * secondsInMinutes;
        this.session = 1;
        this.completed_at = Date.now();
        this.used++;
        this.notify('complete')
      },
      handleInterval(){
        const isComplete = this.isComplete();
        const breaksLeft = this.session < this.limit;
        if (!isComplete){
          this.setTime();
          this.notify('interval',this.timeElapsed);
          return;
        } else {
          this.handleTimeElapsed();
          if (!breaksLeft) this.handleComplete();
          else this.startBreak();
        }
      },

      handleBreakInterval(){
        const timeLeft = this.breakElapsed > 0;
        if (timeLeft){
          this.breakElapsed = this.breakElapsed - 1;
          this.notify('breakInterval',this.breakElapsed);
        } else {
          this.restInterval = clearInterval(this.restInterval);
          this.breakElapsed = this.breakAlloted * secondsInMinutes;
          this.notify('breakElapsed',this.session);
          this.play();
        }
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
