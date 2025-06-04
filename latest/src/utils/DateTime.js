import { ago } from "./ago";
import { date } from "./date";
export class DateTime {

  constructor(dateObject) {}
  static mns = 1 / 1000;
  static snm = 1 / 60;
  static mnh = 1 / 60;
  static hnd = 1 / 24;
  static dny = 1 / 365;
  static mny = 1 / 12;
  static msns = 1000;
  static msnMinute = 60000;
  static msnHour = 3600000;
  static msnDay = 86400000;
  static msnYear = DateTime.msnDay * 365;

  static daysIn(month) {
    const abbrv = month.slice(0, 3);
    if (DateTime.monthMap[month]) return DateTime.monthMap[month];
    else if (DateTime.monthMap[abbrv]) return DateTime.monthMap[abbrv];
  }
  static dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thurday",
    5: "Friday",
    6: "Saturday",
    7: null,
    toArray() {
      return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];;
    },
  };

  static get days() {
    return DateTime.dayMap.toArray();
  }

  static get monthMap() {
    return {
      january: 31,
      get february() {
        if (DateTime.thisYearIsLeap()) return 29;
        return 28;
      },
      march: 31,
      april: 30,
      may: 31,
      june: 30,
      july: 31,
      august: 31,
      september: 30,
      october: 31,
      november: 30,
      december: 31,
    };
  }

  static get months() {
    return ["january","february","march","april","may","june","july","august","september","october","november","december",];
  }

  static get clock() {
    const curDate = new Date();
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Format date/time in the provided time zone
    const options = {
      timeZone: 'America/Denver',
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(Date.now());

    // Extract relevant pieces from the formatted parts
    const dateParts = Object.fromEntries(parts.map(p => [p.type, p.value]));
    const hour = parseInt(dateParts.hour);
    const minute = parseInt(dateParts.minute);
    const second = parseInt(dateParts.second);
    const context = dateParts.dayPeriod;
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    // 24-hour format values
    const hours24 = curDate.getHours();
    const minutes = curDate.getMinutes();
    const seconds = curDate.getSeconds();
    const milliseconds = curDate.getMilliseconds();
    return {
      dow: days[curDate.getDay()],
      month: months[curDate.getMonth()],
      date: curDate.getDate(),
      hour: hours24 <= 12 ? hours24.toString() : (hours24 - 12).toString(),
      minute: minutes >= 10 ? minutes.toString() : minutes.toString().padStart(2, '0'),
      second: seconds >= 10 ? seconds.toString() : seconds.toString().padStart(2, '0'),
      miliseconds: curDate.getMilliseconds(),
      context,
      time: {
        // hour: hours <= 12 ? hours.toString() : (hours - 12).toString(),
        // minute: minutes >= 10? minutes.toString() : minutes.toString().padStart(2, "0"),
        // second: seconds >= 10 ? seconds.toString() : seconds.toString().padStart(2, "0"),
        hour: hours24 <= 12 ? hours24.toString() : (hours24 - 12).toString(),
        minute: minutes >= 10 ? minutes.toString() : minutes.toString().padStart(2, '0'),
        second: seconds >= 10 ? seconds.toString() : seconds.toString().padStart(2, '0'),
        context,
        get string() {
          return ([this.hour, this.minute, this.second].join(":") + " " + context);
        },
        get military(){
          return [this.hour, this.minute].join(":") + " " + context;
        },
        get default() {
          return [hour, minute].join(":") + " " + context;
        },
      },
    };
  }

  static time() {
    return DateTime.clock.time.default;
  }

  static date = {
    standard: undefined,
    default: undefined,
    universal: undefined,
    east: undefined,
    west: undefined,
    central: undefined,
    leap: DateTime.thisYearIsLeap(),
    dayMap: {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thurday",
      5: "Friday",
      6: "Saturday",
      7: null,
    },
    get monthMap() {
      return {
        January: 31,
        get February() {
          if (DateTime.date.leap) return 29;
          return 28;
        },
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31,
      };
    },
    days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",null],
    daysABRV: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", null],
    months: ["January","February","March","April","May","June","July","August","September","October","November","December",null],
    monthsABRV: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Nov","Dec",null],
  }

  static getDate(date) {
    return date.toISOString().slice(0,10);
  }

  static getTime(date){
    return date.toISOString().split('T')[1].slice(0,5);
  }

  static midnight = (date) => new Date( DateTime.getDate(date) + 'T00:00:00')

  static tommorow = DateTime.midnight(new Date(Date.now() + DateTime.msnDay))

  static now() {
    return new Date();
  }

  static stamp() {
    return {
      day: DateTime.today(),
      month: DateTime.thisMonth(),
      year: DateTime.thisYear(),
      date: DateTime.currentDate(),
      time: DateTime.currentTime(),
      isLeap: DateTime.thisYearIsLeap(),
      ms: Date.now(),
    };
  }

  static compareStamps(current, prev) {
    return ago(new Date(current.ms), prev.ms);
  }

  static weekOf(stamp) {}
  static monthOf(stamp) {}
  static yearOf(stamp) {}
  
  static today() {
    return DateTime.date.days[new Date().getDay()];
  }

  static currentTime() {
    return new Date().toLocaleTimeString();
  }

  static currentDate() {
    return new Date().getDate();
  }

  static thisMonth() {
    return DateTime.date.months[new Date().getMonth()];
  }

  static month(index = new Date().getMonth()){
    return DateTime.date.months[Number(index)]
  }

  static thisYear() {
    return new Date().getFullYear();
  }

  static thisYearIsLeap() {
    return DateTime.isLeap(DateTime.thisYear());
  }

  static isLeap(year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  static getLeaps(to, from) {
    function countFrom(lowest, highest) {
      let leapSince = 0;
      for (let i = lowest; i <= highest; i++) {
        if (DateTime.isLeap(i)) leapSince++;
      }
      return leapSince;
    }
    return to < from ? countFrom(to, from) : countFrom(from, to);
  }

  static daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  static msnMonth(month, year) {
    let days = DateTime.daysInMonth(month, year);
    let msInMonth = days * DateTime.msnDay;
    return msInMonth;
  }

  static hoursAgo(stamp) {
    const then = DateTime.toHours(stamp);
    const now = DateTime.toHours(Date.now());
    const diffy = now - then;
    return diffy;
  }

  static secondsAgo(stamp) {
    const then = DateTime.toSecondsFloat(stamp);
    const now = DateTime.toSecondsFloat(Date.now());
    const diffy = now - then;
    const ago = {
      seconds: Math.floor(diffy),
      milliseconds: null,
    };
    return ago;
  }

  static secondsLeft(milliseconds) {
    const minutes = DateTime.toMinutesFloat(milliseconds);
    return minutes;
  }

  static toSeconds(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    return seconds;
  }
  static toSecondsFloat(milliseconds) {
    const seconds = milliseconds / 1000;
    return seconds;
  }

  static toMinutes(milliseconds) {
    let seconds = DateTime.toSeconds(milliseconds);
    let minutes = Math.floor(seconds / 60);
    return minutes;
  }

  static toMinutesFloat(milliseconds) {
    const minutes = DateTime.toSecondsFloat(milliseconds) / 60;
    const floored = Math.floor(minutes);
    const seconds = Math.floor((minutes - floored) / date.snm);

    const ago = {
      floored: floored,
      minutes: minutes,
      seconds: seconds,
      string: `${minutes} : minutes, and ${seconds} : seconds ago`,
    };
    return ago;
  }

  static minutesAgo(stamp) {
    const now = DateTime.toMinutesFloat(Date.now()).minutes;
    const then = DateTime.toMinutesFloat(stamp).minutes;
    const minutes = Math.floor(now - then);
    const seconds = Math.floor((now - then - Math.floor(now - then)) / date.snm);
    const ago = {
      minutes: minutes,
      seconds: seconds,
      string: `${minutes} minutes, and ${seconds} seconds ago`,
    };
    return ago;
  }

  static toHours(milliseconds) {
    let minutes = DateTime.toMinutes(milliseconds);
    let hours = Math.floor(minutes / 60);
    return hours;
  }

  static toHoursFloat(milliseconds) {
    let minutes = DateTime.toMinutesFloat(milliseconds);
    let hours = minutes / 60;
    return hours;
  }

  static toDays(milliseconds) {
    let hours = DateTime.toHours(milliseconds);
    let days = Math.floor(hours / 24);
    return days;
  }

  static toDaysFloat(milliseconds) {
    let hours = DateTime.toHoursFloat(milliseconds);
    let days = hours / 24;
    return days;
  }

  static toMonths(milliseconds) {}
  static toMonthsFloat(milliseconds) {}

  static toYears(milliseconds) {
    let days = DateTime.toDays(milliseconds);
    let years = Math.floor(days / 365);
    return years;
  }

  static from(since, compare = Date.now()) {
    console.warn('months ago algorithm is WRONG... Weeks ago too')
    const now = compare,
          then = since.getTime(),
          nowDate = new Date(compare),
          weeksInYear = 52,
          monthsInYear = 1 / 12,
          msnYear = DateTime.msnDay * 365,
          msInWeek = 604800000,
          msInDay = 86400000,
          msInHour = 3600000,
          msInMin = 60000,
          msInSec = 1000,
          minutesInHour = 60,
          secondsInMinute = 60,
          monthOf = DateTime.months[since.getMonth()],
          prevMonthOf = DateTime.months[nowDate.getMonth()],
          daysIn = DateTime.monthMap[monthOf],
          prevDaysIn = DateTime.monthMap[prevMonthOf],
          dayOf = since.getDate(),
          prevDayOf = nowDate.getDate(),
          days = Math.abs(dayOf - prevDayOf),
          leapSince = DateTime.getLeaps(since.getFullYear(), new Date(now).getFullYear());
    let msAgo = now - then, 
        context = msAgo < 0 ? "til" : "ago";
    msAgo = Math.abs(msAgo)

    const years = msAgo >= msnYear ? msAgo / msnYear : 0,
          monthsAgo = DateTime.getRemainder(years),
          months = monthsAgo / monthsInYear,
          weeksAgo = msAgo >= msInWeek ? Math.floor(msAgo / msInWeek) : 0,
          weeks = monthsAgo / weeksInYear,
          daysAgo = msAgo >= msInDay ? Math.floor(msAgo / msInDay) + leapSince : 0,
          hoursAgo = msAgo >= msInHour ? Math.floor(msAgo / msInHour) : 0,
          hours = hoursAgo,
          minutesAgo = msAgo >= msInMin ? Math.floor(msAgo / msInMin) : 0,
          minutes = Math.floor(DateTime.getRemainder(msAgo / msInHour) * minutesInHour),
          secondsAgo = msAgo >= msInSec ? Math.floor(msAgo / msInSec) : 0,
          seconds = Math.floor(DateTime.getRemainder(msAgo / msInMin) * secondsInMinute),
          ago = {
            since: new Date(now),
            then: new Date(then),
            years: Math.floor(years),
            months: Math.floor(months),
            days: days,
            yearsAgo: years,
            weeksAgo: weeksAgo,
            daysAgo: daysAgo,
            hoursAgo: hoursAgo,
            hours,
            minutesAgo: minutesAgo,
            minutes,
            secondsAgo: secondsAgo,
            seconds,
            milisecondsAgo: msAgo,
            // milliseconds: msAgo,
            leaps: leapSince,
            string: undefined,
          };
    if (ago.yearsAgo >= 1) {
      if (ago.months >= 1)
        ago.string = `${ago.years} Years, ${ago.months} Months ${context}`;
      else if (ago.months < 1) 
        ago.string = `${ago.years} Years ${context}`;
      else if (ago.weeksAgo < 4 && ago.weeksAgo > 2)
        ago.string = `${ago.weeksAgo} Weeks ${context}`;
      else if (ago.daysAgo < 14 && ago.daysAgo > 2)
        ago.string = `${ago.daysAgo} Days ${context}`;
      else if (ago.hoursAgo <= 48 && ago.hoursAgo >= 1) {
        if (ago.hoursAgo < 2 && ago.hoursAgo >= 1) {
          ago.string = `${ago.hoursAgo} Hour ${context}`;
        } else {
          ago.string = `${ago.hoursAgo} Hours ${context}`;
        }
    } else if (ago.minutesAgo < 59 && ago.minutesAgo > 1) {
      ago.string = `${ago.minutesAgo} Minutes ${context}`;
    } else if (ago.secondsAgo < 60 && ago.secondsAgo > 30) {
      ago.string = `${ago.secondsAgo} Seconds ${ago}`;
    } else if (ago.secondsAgo < 30) {
      // ago.string = `Just Now`
      ago.time = "Just Now";
      ago["context"] = context;
      return ago;
    } else return ago;
    ago.time = ago.string.split(" ")[0];
    ago.suffix = ago.string.split(" ")[1];
    ago["context"] = context;
    }
    return ago;
  }
  static getRemainder(float) {
    // miliseconds left after floored value IN DECIMAL
    return float - Math.floor(float);
  }
}
