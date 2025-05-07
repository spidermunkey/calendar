import { birthdayModel } from './birthdays'

export const createAppModel = () => {

  const date = new Date();

  return {
    name:'My first app',
    birthdays: birthdayModel,
    currentMonth: date.getMonth(),
    currentDay: date.getDate(),

    today: {
      month: date.getMonth(), 
      year: date.getFullYear(),
      day: date.getDate(),
    },

    async dayData(day = this.currentDay , month = this.currentMonth){
      console.log(day,month)
      const birthdaysToday = await this.birthdays.getByDate({month,day})
      const birthdaysThisMonth = await this.birthdays.getByMonth(month)
      return {
        birthdays:{
          today:[...birthdaysToday],
          thisMonth:[...birthdaysThisMonth],
        }
      }
    },

    observables: {},
    observe(prop,cb) {
      console.log(this)
      if (!this.observables[prop]){
        this.observables[prop] = {
          value:this[prop],
          actions:[],
        }
        Object.defineProperty(this,prop,{
          get: () => this.observables[prop].value,
          set(value){
            if (value !== this.observables[prop].value){
              this.observables[prop].value = value;
              this.notify(prop,value);
            }
          }
        })
      }
      this.observables[prop].actions.push(cb);
      // Return unsubscribe function
      return () => {
        const i = this.observables[prop].actions.indexOf(cb);
        if (i >= 0) this.observables[prop].actions.splice(i, 1);
      };
    },
    notify(prop,value){
      if (this.observables[prop]){
        for (const cb of this.observables[prop].actions){
          cb(value);
        }
      }
    },
  }
}
