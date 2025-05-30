import { createObservable } from 'utils';
import { createStore } from 'utils'
import { DateTime } from 'utils';

export const createAppModel = () => {
  const date = new Date();
  return createObservable({
    name:'My first app',

    currentMonth: date.getMonth(),
    currentDay: date.getDate(),
    currentDow: date.getDay(),
    today: {
      month: date.getMonth(), 
      year: date.getFullYear(),
      day: date.getDate(),
    },

    birthdays: {
      ...createStore('api/birthdays'),
      async isToday(){
        const data = await this.data;
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
        const data = await this.data;
        const found = data.filter(bday => bday.month == month + 1 && bday.day == day);
        return found;
      },
      async getByMonth(monthIndex){
        const data = await this.data;
        const isThisMonth = data.filter(bday => bday.month == monthIndex + 1);
        return isThisMonth;
      },
    },

    timers: {
      ...createStore('api/timers'),
      activeTimer:null,
    },

    events: {
      ...createStore('/api/events'),
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

    monthName:(monthIndex) => DateTime.month(monthIndex)
  })
}
