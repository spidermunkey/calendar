import { birthdayStore } from './birthdays'

export const createAppModel = () => {
  const date = new Date();
  return {
    name:'My first app',
    currentMonth: date.getMonth(),
    currentDay: date.getDate(),
    today: {
      month: date.getMonth(), 
      year: date.getFullYear(),
      day: date.getDate(),
    },

    birthdays: {
      data:birthdayStore,
      async getData() {
        return this.data.getData();
      },
      async isToday(){
        const data = await this.getData();
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const found = data.filter(bday => bday.month === month && bday.day === day);
        return found;
      },
      async isThisMonth() {
        const date = new Date();
        const thisMonth = await this.getByMonth(date.getMonth())
        return thisMonth
      },
      async getByDate({ month, day }){
        const data = await this.getData();
        const found = data.filter(bday => bday.month == month + 1 && bday.day == day);
        return found;
      },
      async getByMonth(monthIndex){
        const data = await this.getData();
        const isThisMonth = data.filter(bday => bday.month == monthIndex + 1);
        return isThisMonth;
      },
    },

    async getDay(day = this.currentDay , month = this.currentMonth){
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
