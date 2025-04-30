export const date = {
  standard: undefined,
  default: undefined,
  universal: undefined,
  east: undefined,
  west: undefined,
  central: undefined,
  leap: false,
  dayMap: {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thurday',
      5: 'Friday',
      6: 'Saturday',
      7: null,
  },
  monthMap: {
      'January': 31,
      get 'February'(){
          if (this.leap) return 29
          return 28;
      },
      'March': 31,
      'April': 30,
      'May': 31,
      'June': 30,
      'July': 31,
      'August': 31,
      'September': 30,
      'October': 31,
      'November': 30,
      'December': 31,
  },
  days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',null],
  daysABRV: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat', null],
  months: ['January','February','March','April','May','June','July','August','September','October','November','December', null],
  monthsABRV: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec', null],
  isLeap: (year) => {
      return ((year % 4 == 0) && (year % 100 !=0)) || (year % 400 == 0)     
  },
  getLeaps: (to,from) => {
      function countFrom(lowest,highest) {
          let leapSince = 0;
          for (let i = lowest; i <= highest; i++) {
              if (date.isLeap(i))
                  leapSince++;
          }
          return leapSince;
      }
      return to < from ? countFrom(to,from) : countFrom(from,to);
  },
  mns: 1/1000,
  snm: 1/60,
  mnh: 1/60, 
  hnd: 1/24,
  dny: 1/365,
  mny: 1/12,

  msns: 1000,
  msnMinute: 60000,
  msnHour: 3600000,
  msnDay: 86400000,
  get msnYear() { return this.msnDay * 365},
}
