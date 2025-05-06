import { useContext, useEffect, useState } from "react";
import { useAppState } from "context";
const getBirthdays = async () => {
  try {
    const enpoint = 'api/birthdays'
    const response = await fetch(enpoint)
    console.log(response)
    const birthdays = await response.json();
    return birthdays;
  }catch (error){
    console.log('errrrr',error)
    return []
  }
}

const addBirthday = async ({
  name,
  day,
  month,
  year,
}) => {
  const endpoint = 'api/birthdays'
  const response = await (await fetch(endpoint,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      day,
      month,
      year
    })
  })).json()
  console.log(response);
  return response;
}

const CreateForm = ({onUpdate}) => {
  const state = useAppState();
  const [name,setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');


  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log('submiting form')
    console.log(name)
    console.log(`${day}-${month}${year ? '-' + year : ''}`)
    // addBirthday({name,day,month,year}).then(res => onUpdate ? onUpdate(res) : console.log('RESY',res))
    // console.log(state)
  } 

  return ( 
  <>
    <div className="create-birthday">
      <div className="label">Add Birthday</div>
      <div className="create-form">
        <form onSubmit={onFormSubmit}>
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

const NamedList = ({birthdays}) => (
  <div className="list column">
    {birthdays.map((data,index)=>{
      const {name,day,month,year} = data;
      const today = new Date();
      const thisMonth = today.getMonth();
      const isThisMonth = month == thisMonth + 1
      if (name) {
        return (
          <div key={index} className={` birthday ${ isThisMonth ? 'active' : ''}`}>
            {name}
          </div>
        )
      }

    })}
  </div>
)

export const Birthdays = () => {
  const state = useAppState();
  const bdays = state.birthdays;

  const [birthdays,setData] = useState([]);
  const update = () => {
    const getData = async () => {
      const data = await bdays.data
      const isToday = await bdays.isToday();
      const isThisMonth = await bdays.isThisMonth();
      console.log(isToday.length + ' birthdays today');
      console.log(isThisMonth.length + ' birthdays this month')
      setData(data)
    }
    getData()
  }
  useEffect(update,[])
  return (
    <div className='birthdays flex-col p-12'>
      <CreateForm onUpdate={update}/>
      <NamedList birthdays={birthdays}/>
    </div>
  )
}

