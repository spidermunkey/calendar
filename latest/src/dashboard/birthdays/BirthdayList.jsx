import { Birthday } from "./Birthday";
export const BirthdayList = ({currentMonth,birthdays,onDelete}) =>{
  const checkIsThisMonth = month => month == currentMonth + 1

 return (
  <div className="bday-name-list list column">
    {birthdays.sort(data => checkIsThisMonth(data.month) ? -1 : 1).map((data,index)=>{
      const {name,day,month,year} = data;
      const today = new Date();
      const thisMonth = today.getMonth();
      const isThisMonth = checkIsThisMonth(month)
      if (name) {
        return (
          <div key={index} className={` birthday ${ isThisMonth ? 'active' : ''}`}>
            <Birthday onDelete={() => {onDelete(data)}} month={month} day={day} name={name} />
          </div>
        )
      }

    })}
  </div>
)}
