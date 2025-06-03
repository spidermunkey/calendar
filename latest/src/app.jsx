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
        return this.getByMonth()
      },
      async getByDate({ month, day }){
        const data = await this.data;
        const found = data.filter(bday => bday.month == month + 1 && bday.day == day);
        return found;
      },
      async getByMonth(monthIndex = (new Date()).getMonth()){
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

      async today(){
        const data = await this.data;
        const today = new Date();
        const date = today.toISOString().slice(0,10)
        const day = today.getDate();
        const found = data.filter(
          event => {
            const isDaily = event.frequency === 'daily' || event.frequency === 'weekly' || event.frequency === 'monthly';
            const isDow = event?.dynamic_frequency?.days[today.getDay()] == true;
            const isDom = event?.dom == day;
            const isToday = event?.date == date;
            return isToday || isDaily && isDow || isDaily && isDom;
        })
        return found;
      },
      async thisMonth() {
        return this.getByMonth();
      },
      async getByMonth(monthIndex = (new Date()).getMonth()) {
        const data = await this.data;
        const isThisMonth = data.filter(event => {
          console.log(event)
            const isDaily = event.frequency === 'monthly';
            const isMonthOfYear = event?.dynamic_frequency?.months[monthIndex] == true;
            const isThisMonth = event?.date?.slice(5,7) == monthIndex + 1;
            return isDaily && isMonthOfYear || isThisMonth
        });
        return isThisMonth;
      }
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
