import { birthdayStore } from './birthdays.js'
import { timerStore } from './timers.js';
import { createObservable } from 'utils';
import { createStore } from '../utils/createStore.jsx'
import { DateTime } from '../utils/DateTime.js';
export const createAppModel = () => {
  const date = new Date();
  return createObservable({
    name:'My first app',
    currentMonth: date.getMonth(),
    currentDay: date.getDate(),
    today: {
      month: date.getMonth(), 
      year: date.getFullYear(),
      day: date.getDate(),
    },

    birthdays: {
      ...createStore(birthdayStore),
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

    timers: {
      activeTimer:null,
      ...createStore(timerStore),
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
