const date = new Date();

const today = () => {
  return {
    month: date.getMonth(), 
    year: date.getFullYear(),
    day: date.getDate(),
}}

const monthData = (year = today.year, month = today.month) => {
  console.log(year,month)
  const lastDayOfLastMonth = new Date(year,month,0,12).getDate()
  // this month
  const dayOne = new Date(year,month,1,12)
  const dayOfWeek = dayOne.getDay()
  const daysFromSunday = dayOfWeek
  const daysInMonth = new Date(year,month + 1,0,12).getDate()
  const lastDayOfThisMonth = new Date(year,month,daysInMonth,12)
  const daysFromSaturday = 7 - (lastDayOfThisMonth.getDay() + 1)
  return {
    lastDayOfLastMonth,
    dayOne,
    dayOfWeek,
    daysFromSunday,
    daysInMonth,
    lastDayOfThisMonth,
    daysFromSaturday,
  }
}
export {
  today,
  monthData,
}
