import { useState } from "react";

export const CreateForm = ({add,isActive, setActive}) => {
  const formData = {
    name: '',
    day: '',
    month: '',
    year: '',
  }

  const [form,updateForm] = useState(formData)

  const update = (prop,value) => {
    return {
      ...form,
      [prop]:value,
    }
  }
  const onFormSubmit = () => {
    updateForm({name: '',
      day:'',
      month: '',
      year:'',
    })
  }
  const submitForm = (event) => {
    event.preventDefault();
    add(form).then(onFormSubmit)
  } 

  return ( 
  <>
    <div className={`create-birthday ${isActive ? 'active' : ''}`}>
      <div className="create-form">
        <div className="btn-close-form" onClick={() => setActive(false)}>
          <div className="label">close</div>
          <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" pid="m9ui3rg2-00WYVZS1JDOB"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" pid="m9ui3rg2-00FL6VUU22QV"></path></svg></div>
        </div>
        <form onSubmit={submitForm}>
          <div className="form-title">Add Birthday</div>
          <div className="name-field">
            <div className="label">name</div>
            <div className="input">
              <input required type="text" 
                value={form.name} placeholder="Name" 
                onChange={event => updateForm(() => update('name', event.target.value))}/>
            </div>
            <div className="day-field">
              <div className="label">Day</div>
              <input required type="number" 
                value={form.day} 
                onChange={event => updateForm(() => update('day', event.target.value))}/>
            </div>
            <div className="month-field">
              <div className="label">Month</div>
              <input required type="number" 
                value={form.month} 
                onChange={event =>  updateForm(() => update('month', event.target.value))}/>
            </div>
            <div className="year-field">
              <div className="label">Year</div>
              <input type="number" 
                value={form.year} 
                onChange={event =>  updateForm(() => update('year', event.target.value))}/>
            </div>
          </div>
          <div className="btn-add-birthday"><button type="submit"> add </button></div>
        </form>
      </div>

    </div>
  </>
  )
}
