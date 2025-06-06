import { date } from "./date";
import { getRemainder } from "./getRemainder";

export function ago(msDate) {
  console.log(msDate)
  const now = Date.now();
  const then = new Date(msDate);
  
  const monthsInYear = 1/12;

  const msInWeek = 604800000;
  const msInDay = 86400000;
  const msInHour = 3600000;
  const msInMin = 60000;
  const msInSec = 1000;
  const msnYear = msInDay * 365
  const monthOf = date.months[then.getMonth()]

  const daysIn = date.monthMap[monthOf];
  const dayOf = then.getDate();
  const days = daysIn - dayOf;

  const leapSince = date.getLeaps(then.getFullYear(), new Date(now).getFullYear())
  let msAgo = now - then.getTime();
  let context = 'ago'
  if (msAgo < 0) {
      context = 'from now'
  }

  msAgo = Math.abs(msAgo);

  const years = msAgo / (msnYear + (leapSince * msInDay));
  const monthsAgo = getRemainder(years);
  const months = monthsAgo / monthsInYear;

  // const weeks = monthsAgo / weeksInYear;

  const weeksAgo = Math.floor(msAgo / msInWeek);
  const daysAgo = (Math.floor(msAgo / msInDay) + leapSince);
  const hoursAgo = Math.floor(msAgo / msInHour);
  const minutesAgo = Math.floor(msAgo / msInMin);
  const secondsAgo = Math.floor(msAgo / msInSec);

  const ago = {
      since: new Date(now),
      then: new Date(then),

      years: Math.floor(years),
      months: Math.floor(months),
      days: days,

      yearsAgo: years,
      weeksAgo: weeksAgo,
      daysAgo: daysAgo,
      hoursAgo: hoursAgo,
      minutesAgo: minutesAgo,
      secondsAgo: secondsAgo,

      leaps: leapSince,
      string: undefined,
  };
  
  if (ago.yearsAgo >= 1) {
      if (ago.months >= 1) 
          ago.string = `${ago.years} Years, ${ago.months} Months ${context}`
      else if (ago.months < 1 ) 
          ago.string = `${ago.years} Years ${context}`
  } else if (months < 12 & months >= 1) {
      let rounded = ago.months === 1 && days > 0 ? 2 : 1
      ago.string = `${rounded} ${rounded === 1 ? 'month' : 'months'} ${context}`
  }
  else if (ago.weeksAgo <= 4 && ago.weeksAgo > 2) {
      ago.string = `${ago.weeksAgo} weeks ${context}`
  }

  else if (ago.daysAgo <= 14 && ago.daysAgo >= 2) {
      ago.string = `${ago.daysAgo} days ${context}`
  }
  else if (ago.hoursAgo <= 48 && ago.hoursAgo >= 1) {
      if (ago.hoursAgo < 2 && ago.hoursAgo >=1) {
          ago.string = `${ago.hoursAgo} hour ${context}`
      } else {
          ago.string = `${ago.hoursAgo} hours ${context}`
      }
  }
  else if (ago.minutesAgo < 59 && ago.minutesAgo > 1) {
      ago.string = `${ago.minutesAgo} minutes ${context}`
  }
  else if (ago.secondsAgo < 60 && ago.secondsAgo > 30) {
      ago.string = `${ago.secondsAgo} seconds ${ago}`
  }
  else if (ago.secondsAgo < 30) {
      ago.string = `few seconds`
  }
  else {
      ago.string = '';
  }
  ago.time = ago.string.split(' ')[0];
  ago.suffix = ago.string.split(' ')[1];
  ago['context'] = context;

  return ago;
}
