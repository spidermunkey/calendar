const secondsInHour = 3600;
const secondsInMinutes = 60;
const minutesInHour = 60;

const msns = 1000;
const msnMinute = 60000;
const msnHour = 3600000;

export const convertSeconds = (seconds) => {
  return {
    hours: Math.floor(seconds / secondsInHour),
    minutes: Math.floor((seconds / (secondsInHour / secondsInMinutes)) % minutesInHour),
    seconds: seconds % 60,
  }
}

export const convertMinutes = (minutes) => {
  return {
    hours: Math.floor( minutes / minutesInHour ),
    minutes: Math.floor(minutes % minutesInHour),
    seconds: Math.floor((minutes % 1) * secondsInMinutes),
    total: minutes,
  }
}

export const convertMilliseconds = (milliseconds) => { 
  return {
    hours: Math.floor( milliseconds / msnHour ),
    minutes: Math.floor( milliseconds % msnHour / msnMinute ),
    seconds: Math.floor( (milliseconds / msns) % 60),
  }
}

export const toSeconds = ({ hours , minutes, seconds}) => {
  const hoursToSeconds = Math.floor(hours * secondsInHour)
  const minutesToSeconds = Math.floor(minutes * secondsInMinutes);
  return hoursToSeconds + minutesToSeconds + seconds;
}

export const toMinutes = ({ hours = 0 , minutes = 0, seconds = 0}) => {
  const hoursToSeconds = Math.floor(Number(hours) * secondsInHour)
  const minutesToSeconds = Math.floor(Number(minutes) * secondsInMinutes);
  const totalSecondsToMinutes = Math.floor((hoursToSeconds + minutesToSeconds + Number(seconds)) / secondsInMinutes)
  return totalSecondsToMinutes;
}

export const toMilliseconds = ({ hours , minutes, seconds }) => {
  const hoursToSeconds = Math.floor(hours * secondsInHour)
  const minutesToSeconds = Math.floor(minutes * secondsInMinutes);
  return hoursToSeconds + minutesToSeconds + seconds;
}

export const timeSince = (startTimeInMs) => {
  return convertMilliseconds(Date.now() - startTimeInMs)
}

export {
  msnHour,
  msnMinute,
  msns,

  secondsInHour,
  secondsInMinutes,

  minutesInHour,
}
