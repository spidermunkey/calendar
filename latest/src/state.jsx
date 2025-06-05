import { createObservable } from 'utils';
import { createStore } from 'utils'
import { DateTime } from 'utils';

const date = new Date();

export const createAppModel = () => {
  return createObservable({
  
    name:'My first app',
    currentMonth: date.getMonth(),
    currentDay: date.getDate(),
    currentDow: date.getDay(),

    today: {
      month: date.getMonth(), 
      year: date.getFullYear(),
      day: date.getDate(),
      date: DateTime.getDate(date),
    },

    calendar: {
      month: date.getMonth(),
      day: date.getDate(),
      dow: date.getDay(),
      year: date.getFullYear(),
      Date(){
        return new Date(this._year,this._month,this._day)
      },
      get date() {
        return `${this.year}-${this.month.padStart(2,0)}-${this.day.padStart(2,0)}`
      },
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
    todos: {
      ...createStore('api/todos'),
      test:[],
    },
    timers: {
      ...createStore('api/timers'),
      activeTimer:null,
    },

    events: {
      ...createStore('/api/events'),
      current:{},
      async today(){
        const data = await this.data;
        return this.findByDate(new Date(),data)
      },
      async thisMonth() {
        return this.findByMonth( date.getMonth() , await this.data);
      },
      match(date,event){
        const isDaily = event.frequency === 'daily' || event.frequency === 'weekly' || event.frequency === 'monthly';
        const isDow = event?.dynamic_frequency?.days[date.getDay()] == true;
        const isDom = event?.dom == date.getDate();
        const isToday = event?.date == date.toISOString().slice(0,10);
        return isToday || isDaily && isDow || isDaily && isDom;
      },
      async findByDay(day, monthIndex = date.getMonth()){
        console.log(day,monthIndex)
        const data = await this.data;
        const today = new Date();
        today.setMonth(monthIndex);
        today.setDate(day);
        return this.findByDate(today,data)
      },
      findByDate(date,events = this._data){
        return events.filter(this.match.bind(this,date))
      },
      findByMonth(monthIndex = (new Date()).getMonth(), events = this._data) {
        return events.filter(event => {
            const isDaily = event.frequency === 'monthly';
            const isMonthOfYear = event?.dynamic_frequency?.months[monthIndex] == true;
            const isThisMonth = event?.date?.slice(5,7) == monthIndex + 1;
            return isDaily && isMonthOfYear || isThisMonth
        });
      },
    },

    async getDay(day = calendar.day , month = calendar.month){
      const birthdaysToday = await this.birthdays.getByDate({month,day})
      const birthdaysThisMonth = await this.birthdays.getByMonth(month)
      const eventsToday = await this.events.findByDay(day,month);
      return {
        birthdays:{
          today:[...birthdaysToday],
          thisMonth:[...birthdaysThisMonth],
        },
        events: [...eventsToday],
      }
    },

    monthName:(monthIndex) => DateTime.month(monthIndex)
  })
}
