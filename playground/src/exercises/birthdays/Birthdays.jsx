import { useEffect, useState } from "react";

const getBirthdays = async () => {
  try {
    const enpoint = '/api/birthdays'
    const birthdays = await (await fetch(enpoint)).json()
    return birthdays
  }catch (error){
    console.log('errrrr',error)
    return []
  }

}
export const Birthdays = () => {
  const [birthdays,setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getBirthdays();
      setData(data)
    }
    getData()
  },[])
  return (
    <div className='birthdays flex-col p-12'>
      Birthdays
      <div className="list column">
        {birthdays.map((data,index)=>{
          const {name,day,month,year} = data;
          const today = new Date();
          const thisMonth = today.getMonth();
          const isThisMonth = month == thisMonth + 1
          if (isThisMonth){
            console.log(`${name}s birthday is this month! ${month}/${day}/${year}`, data)
          }
          return (
            <div key={index} className={` birthday ${ isThisMonth ? 'border border-lime-400 ml-20' : 'border'}`}>
              {name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

