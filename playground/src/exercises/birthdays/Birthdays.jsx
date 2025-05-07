import { useEffect, useState } from "react";
import { useAppState } from "context";

const CreateForm = ({add}) => {
  const state = useAppState();
  const [name,setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(`adding date: ${name}: ${day}-${month}${year ? '-' + year : ''}`)
    add({name,day,month,year})
  } 

  return ( 
  <>
    <div className="create-birthday">
      <div className="label">Add Birthday</div>
      <div className="create-form">
        <form onSubmit={(event) => {
          setTimeout(() => console.log('is anyone home?'),2000)
          event.preventDefault()
          onFormSubmit(event)
          }}>
          <div className="name-field">
            <div className="label">name</div>
            <div className="input">
              <input required type="text" value={name} placeholder="Name" onChange={event => setName(event.target.value)}/>
            </div>
            <div className="day-field">
              <div className="label">Day</div>
              <input required type="number" value={day} onChange={event => setDay(event.target.value)}/>
            </div>
            <div className="month-field">
              <div className="label">Month</div>
              <input required type="number" value={month} onChange={event => setMonth(event.target.value)}/>
            </div>
            <div className="year-field">
              <div className="label">Year</div>
              <input type="number" value={year} onChange={event => setYear(event.target.value)}/>
            </div>
          </div>
          <div className="btn-add-birthday"><button type="submit"> add </button></div>
        </form>
      </div>

    </div>
  </>
  )
}

const NamedList = ({currentMonth,birthdays,onDelete}) =>{
 return (
  <div className="list column">
    {birthdays.map((data,index)=>{
      const {name,day,month,year} = data;
      const today = new Date();
      const thisMonth = today.getMonth();
      const isThisMonth = month == currentMonth + 1
      if (name) {
        return (
          <div key={index} className={` birthday ${ isThisMonth ? 'active' : ''}`}>
            <span className="name">{name}  {day}/{month} </span><span className="del" onClick={() => {
              console.log('deleting: ',data)
              onDelete(data)
            }
              }> delete </span> 
          </div>
        )
      }

    })}
  </div>
)}

export const Birthdays = ({birthdays,add,update,remove,currentMonth}) => {
  useEffect(update,[birthdays])
  return (
    <div className='birthdays flex-col p-12'>
      <CreateForm add={add}/>
      <NamedList currentMonth={currentMonth} birthdays={birthdays} onDelete={remove}/>
    </div>
  )
}

