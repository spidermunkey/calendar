import { useEffect, useState } from "react";
import { DateTime } from "utils";

const today = DateTime.midnight(new Date());

export const frequency = {

  get monthly() {
    return {
      days:Array(7).fill(false),
      weeks: Array(4).fill(false),
      months: Array(12).fill(true),
    }
  },
  get yearly() {
    return {  
      days:Array(7).fill(false).map((value,index) => {
        if (today.getDay() === index) 
          value = true; 
        return value
      }),
      weeks: Array(4).fill(true),
      months: Array(12).fill(true),
    }
  },
  get daily() {
    return {
      days: Array(7).fill(true).map((value,index) => {
        if (today.getDay() === index) 
          value = true; 
        return value
      }),
      weeks: Array(4).fill(true),
      months: Array(12).fill(true),
    }
  },
  get template() {
    return {
      days:Array(7).fill(false),
      weeks: Array(4).fill(false),
      months: Array(12).fill(false),
    }
  },

}

export const frequencyMap = {
  days:Array(7).fill(false),
  weeks: Array(4).fill(false),
  months: Array(12).fill(false),
}

export const monthlyFrequency = {
  days:Array(7).fill(false),
  weeks: Array(4).fill(false),
  months: Array(12).fill(true),
}

export const weeklyFrequency = {
  days:Array(7).fill(false).map((value,index) => {if (today.getDay() === index) value = true; return value}),
  weeks: Array(4).fill(true),
  months: Array(12).fill(true),
}

export const dailyFrequency = {
    days: Array(7).fill(true).map((value,index) => {if (today.getDay() === index) value = true; return value}),
    weeks: Array(4).fill(true),
    months: Array(12).fill(true),
}

export const createTemplate = (eventDate) => {
  const date = today;
  const template = {
    title: '',
    description: '',
    frequencyType: 'once',
    frequency: 'once',
    dynamic_frequency: {
      days:Array(7).fill(false),
      weeks: Array(4).fill(false),
      months: Array(12).fill(false),
    },
    dated_frequency: [date],
    category: 'general',
    date: DateTime.getDate(date),
    time: DateTime.getTime(date),
    duration: '24',
    duration_type: 'hours',
    dom: DateTime.getDate(date).slice(-2),
    dow: date.getDay(),
  }
  const event = {};
  for (const prop in eventDate){
    if (template[prop] && typeof template[prop] === typeof eventDate[prop] ){
      event[prop] = eventDate[prop]
    }
  }
  const result = {
    ...template,
    ...event
  }
  return result
}

export const GenericModal = ({ eventDate, handleSubmit }) => {
  return (
    <div className="event-form-modal custom-modal">
      <div className="modal-header">
        <div className="modal-title">Create Event</div>
        <CloseButton selector={'.event-form-modal.custom-modal'}>close</CloseButton>
      </div>
      <div className="modal-content">
        <div className="modal-form">
          <EventForm eventData={eventDate} handleSubmit={handleSubmit}/>
        </div>
      </div>
    </div>
  )
}

export const DailyModal = ({eventDate, handleSubmit}) => {
  return (
    <div className="event-form-modal daily-modal">
      <div className="modal-header">
        <div className="modal-title">{eventDate.frequency} Event</div>
        <CloseButton selector={'.event-form-modal.daily-modal'}>close</CloseButton>
      </div>
      <div className="modal-content">
        <div className="modal-form">
          <DailyEventForm eventData={eventDate} handleSubmit={handleSubmit}/>
        </div>
      </div>
    </div>
  ) 
}

export const useEventForm = (eventData) => {

  const [data,setData] = useState(createTemplate(eventData));

  const onInput =  (e) => {
    const {name,value} = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const updateProperty = (name,value) => {
    setData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());
    const {title,description,category,frequency,frequencyType,dynamic_frequency,dom,dow} = data;
    const values = {
      ...entries,
      dom,
      dow,
      title,
      description,
      category,
      frequency,
      frequencyType,
      dynamic_frequency,
    }
    console.log(values)
    return values
  }

  useEffect(() => {
    setData(createTemplate(eventData));
  }, [eventData]);

  return {
    data,
    onInput,
    onSubmit,
    updateProperty,
  }
}

export const EventForm = ({ eventData , handleSubmit }) => {
  const { onInput, updateProperty, onSubmit, data } = useEventForm(eventData)
  const handleCategoryChange = (event) => {
    const {value} = event.target;
    if (value === 'bill' || value === 'deposit'){
      updateProperty('frequency','monthly')
      updateProperty('frequencyType','once')
    }
    else if (value === 'general' || value === 'birthday' || value === 'deadline'){
      updateProperty('frequency','once')
      updateProperty('frequencyType','once')
    }

    return onInput(event)
  }
  return (
      <form onSubmit={(e) => {
      const result = onSubmit(e);
      return handleSubmit && handleSubmit(result)
      }}>
        <div className="flexbox row-1">
          <TitleInput title={data.title} onChange={onInput}/>
          <StartDateInput date={data.date} onChange={onInput}/>
        </div>
        <div className="flexbox row-2">
          <DescriptionInput description={data.description} onChange={onInput}/>
          <CategorySelectInput category={data.category} onChange={handleCategoryChange} categories={["general","bill","deadline","birthday","deposit"]}/>
        </div>
        {data.category === 'general' ? 
        <>
          <TimeForm/>
          <FrequencyForm data={data} handleChange={updateProperty}/>
        </>
        : data.category === 'bill' || data.category === 'deposit' || data.category === 'deadline' ?
        <>
        <div className="modal-form-section frequency">
          <div className="frequency-modal">
            <FrequencyPicker isActive={true} frequency={data.frequency} handleChange={updateProperty}/>
          </div>
        </div>

        </>
        : null
        }
        <input className="btn-submit" type="submit"/>
      </form>
  )
}

export const DailyEventForm = ({ eventData, handleSubmit }) => {
  const { onInput, updateProperty, onSubmit, data } = useEventForm(eventData)
  return (          
    <form onSubmit={(e) => {
      const result = onSubmit(e);
      return handleSubmit && handleSubmit(result)
    }}>
      <div className="flexbox">
      <div className="flexbox column ">
        <TitleInput title={data.title} onChange={onInput}/>
        <DescriptionInput description={data.description} onChange={onInput}/>
        <CategorySelectInput category={data.category} onChange={onInput} categories={["general","bill","deadline","birthday","deposit"]}/>
      </div>
      {data.frequency === 'daily'
        ? <DynamicDayPicker dynamicFrequency={data.dynamic_frequency} handleChange={updateProperty}/>
        : data.frequency === 'weekly'
        ? <div className="flexbox column">
            <DynamicDayPicker dynamicFrequency={data.dynamic_frequency} handleChange={updateProperty}/>
            <DynamicWeekPicker dynamicFrequency={data.dynamic_frequency} handleChange={updateProperty}/>
          </div>
        : data.frequency === 'monthly'
        ? <div className="flexbox column">
            <DynamicDatePicker dom={data.dom} onChange={onInput}/>
            <DynamicMonthPicker dynamicFrequency={data.dynamic_frequency} handleChange={updateProperty}/>
          </div>
        : <StartDateInput date={data.date} onChange={onInput}/>
      }
      </div>
      <input className="btn-submit" type="submit"/>
    </form>)
}

function CloseButton({selector,children}) {
  return (        
    <div className="close" onClick={() => {
          const ref = document.querySelector(`${selector}`)
          return ref && ref.classList.remove('active')}}>
      {children}
    </div>
    )
}

function TitleInput({title,onChange}) {
  return (<div className="modal-form-section title">
            <div className="input-label">Event Title</div>
            <input name="title" id="title" className="input" type="text" value={title} placeholder={title} onChange={onChange}></input>
          </div>)
}

function DescriptionInput({description,onChange}) {
  return (          
    <div className="modal-form-section description">
      <div className="input-label">Event Description</div>
      <textarea id="description" name="description" value={description} onChange={onChange}></textarea>
    </div>)
}

function CategorySelectInput({ category, onChange, categories }) {
  return (
    <div className="modal-form-section category">
      <div className="input-label">Category</div>
      <select name="category" value={category} onChange={onChange}>
        {categories.map(cat => <CategoryOption key={cat} category={cat}/>)}
      </select>
    </div>
  )
}

function CategoryOption({category}) {
  return <option name="category" className="category-option" value={category}>{category}</option>
}

function TimeInput(){
 const [minutes,setMinutes] = useState(0);
 const [hours,setHours] = useState(12);
 const [context,setContext] = useState('am');
 const [type, setType] = useState('midnight')
 const minutesFormatted = () => String(minutes).padStart(2,0)
 return (
  <div className="option option-time">
    <div className="input-label">Start Time</div>
    <div className="time-input">
    <select className="time-type" name="time" value={type} onChange={(e) => {
        const currentContext = e.target?.value;
        setType(currentContext)
        console.log(currentContext)
        if (currentContext != 'custom'){
          setHours(12);
          setMinutes(0);
          if (currentContext === 'midnight'){
            setContext('am')
          }
          if (currentContext === 'noon'){
            setContext('pm')
          }
        }

      }}>
      <option name="time" value="midnight">midnight</option>
      <option name="time" value="noon">noon</option>
      <option name="time" value="custom">custom</option>
    </select>
    <input className="digit" type="number"  max="12" min="1" name="hour" value={hours} placeholder="12" onChange={(e) => {
      setHours(e.target.value)
      setType('custom')
      }}/>
    <input className="digit" type="number" min="0" max="59" name="minute" value={minutesFormatted()} placeholder="00" onChange={(e) => {
      setMinutes(e.target.value)
      setType('custom')
    }}/>
    <select className="context-input" name="context" value={context} onChange={(e) => {
      setContext(e.target.value)
      setType('custom')
    }}>
      <option name="context" value="am">am</option>
      <option name="context" value="pm">pm</option>
    </select>
    </div>
  </div>)
      
}

function StartDateInput({date,onChange}) {
  return (<div className="modal-form-section date">
            <div className="input-label">Start Date</div>
            <input name="date" type="date" value={date} onChange={onChange}/>
          </div>)
}

function DurationInput(){
  const [context,setContext] = useState('hours');
  const [duration,setDuration] = useState(24);
  return (
  <div className="option option-duration">
    <div className="input-label">Duration</div>
    <div className="duration-options">
      <select name="duration" value={context} onChange={(e) => setContext(e.target.value)}>
        <option name="duration" value="hours">hours</option>
        <option name="duration" value="days">days</option>
      </select>
      { context === 'hours' 
      ? <input type="number" name="hours" max='24' min="1" value={Math.min(duration,24)} placeholder="24" onChange={(e) => setDuration(e.target.value)}/>
      : <input type="number" name="days" placeholder="1" min='1' value={duration} onChange={(e) => setDuration(e.target.value)}/>
      }
    </div>
  </div>
  )
}

function TimeForm(){
   return(<div className="modal-form-section time">
      <div className="time-options">
        <TimeInput/>
        <DurationInput/>
      </div>
    </div>)
}

function FrequencyForm({data,handleChange}){
  const [frequency,setFrequency] = useState(data.frequency)
  const [frequencyType, setFrequencyType] = useState(data.frequencyType); 
  const [dynamicFrequency, setDynamicFrequency] = useState(data.dynamic_frequency); 
  return (
    <div className="modal-form-section frequency">
      <div className="input-label">Frequency</div>
      <div className="input-options">
        <div 
        className={frequencyType === 'once' ? "opt-1 opt active": "opt opt-1"} 
        onClick={() => {
          setFrequencyType('once')
          handleChange('frequencyType','once')}
          }>Once</div>
        <div 
        className={frequencyType === 'dynamic' || frequencyType === 'custom' ? "opt-2 opt active": "opt opt-2"} 
        onClick={() => {
          setFrequencyType('dynamic')
          handleChange('frequencyType','dynamic')}
          }>Dynamic</div>
        <div 
        className={frequencyType === 'dated' ? "opt-3 opt active": "opt opt-3"} 
        onClick={() => {
          setFrequencyType('dated')
          handleChange('frequencyType','dated')}}>Dated</div>
      </div>
      <div className="frequency-modal">
        <div className={frequencyType === 'once' ? 'active once option-modal' : 'option-modal'}
        onClick={(event) => {
          const option = event.target.closest('.opt');
          if (option){
            const input = option.querySelector('input')
            const siblings = Array.from(document.querySelectorAll(`input[name="${input.name}"][type="radio"]`));
            const value = input.getAttribute('frequency')
            siblings.forEach(sib => sib.parentElement.classList.remove('active'))
            setFrequency(value)
            option.classList.add('active')
            handleChange('frequency',value)
          }
        }}>
          <div className="fm-list-item opt active once"><input name="once" type="radio" frequency="once" value={frequency === 'once'} />once</div>
          <div className="fm-list-item opt daily"><input name="once" type="radio" frequency="daily" value={frequency === 'daily'}/>daily</div>
          <div className="fm-list-item opt weekly"><input name="once" type="radio" frequency="weekly" value={frequency === 'weekly'}/>weekly</div>
          <div className="fm-list-item opt monthly"><input name="once" type="radio" frequency="monthly" value={frequency === 'monthly'}/>monthly</div>
        </div>
        <div className={frequencyType === 'dynamic' || frequencyType ==='custom' ? 'active dynamic option-modal' : 'option-modal'}>
          <div className="dynamic-days"
              onClick={(e) => {
                const option = e.target.closest('.opt');
                if (option){
                  const input = option.querySelector('input')
                  const index = input.getAttribute('frequency');
                  dynamicFrequency.days[Number(index)] = input.checked
                    setDynamicFrequency({
                      ...dynamicFrequency,
                    })
                  handleChange('dynamic_frequency',dynamicFrequency)
                  if (input.checked){
                    option.classList.add('active') 
                  } else {
                    option.classList.remove('active')
                  }
                }
              }}>
            <div className="options option-buttons">
              <div className="df-list-item opt"><input type="checkbox" frequency={1} value={dynamicFrequency.days[0]}/> MON </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={2} value={dynamicFrequency.days[1]}/> TUE </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={3} value={dynamicFrequency.days[2]}/> WED </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={4} value={dynamicFrequency.days[3]}/> THU </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={5} value={dynamicFrequency.days[4]}/> FRI </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={6} value={dynamicFrequency.days[5]}/> SAT </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={0} value={dynamicFrequency.days[6]}/> SUN </div>
            </div>
          </div>
          <div className="flexbox">
            <div className="dynamic-weeks"
              onClick={(e) => {
                const option = e.target.closest('.opt');
                if (option){
                  const input = option.querySelector('input')
                  const index = input.getAttribute('frequency');
                  dynamicFrequency.weeks[Number(index)] = input.checked
                    setDynamicFrequency({
                      ...dynamicFrequency,
                    })
                  handleChange('dynamic_frequency',dynamicFrequency)
                  if (input.checked){
                    option.classList.add('active') 
                  } else {
                    option.classList.remove('active')
                  }
                }
              }}>
              <div className="option-buttons">
                <div className="df-list-item opt"><input frequency={0} value={dynamicFrequency.weeks[0]} type="checkbox"/> 1 </div>
                <div className="df-list-item opt"><input frequency={1} value={dynamicFrequency.weeks[1]} type="checkbox"/> 2 </div>
                <div className="df-list-item opt"><input frequency={2} value={dynamicFrequency.weeks[2]} type="checkbox"/> 3 </div>
                <div className="df-list-item opt"><input frequency={3} value={dynamicFrequency.weeks[3]} type="checkbox"/> 4 </div>
              </div>
            </div>
            <div className="dynamic-months"
            onClick={(e) => {
                const option = e.target.closest('.opt');
                if (option){
                  const input = option.querySelector('input')
                  const index = input.getAttribute('frequency');
                  dynamicFrequency.months[Number(index)] = input.checked
                    setDynamicFrequency({
                      ...dynamicFrequency,
                    })
                    handleChange('dynamic_frequency',dynamicFrequency)
                  if (input.checked){
                    option.classList.add('active') 
                  } else {
                    option.classList.remove('active')
                  }
                }
              }}>
              <div className="option-buttons">
                <div className="opt dm-list-item"><input frequency={0} value={dynamicFrequency.months[0]} type="checkbox"/>Jan</div> 
                <div className="opt dm-list-item"><input frequency={1} value={dynamicFrequency.months[1]} type="checkbox"/>Feb</div> 
                <div className="opt dm-list-item"><input frequency={2} value={dynamicFrequency.months[3]} type="checkbox"/>Mar</div> 
                <div className="opt dm-list-item"><input frequency={3} value={dynamicFrequency.months[3]} type="checkbox"/>Apr</div> 
                <div className="opt dm-list-item"><input frequency={4} value={dynamicFrequency.months[4]} type="checkbox"/>May</div> 
                <div className="opt dm-list-item"><input frequency={5} value={dynamicFrequency.months[5]} type="checkbox"/>Jun</div> 
                <div className="opt dm-list-item"><input frequency={6} value={dynamicFrequency.months[6]} type="checkbox"/>Jul</div> 
                <div className="opt dm-list-item"><input frequency={7} value={dynamicFrequency.months[7]} type="checkbox"/>Aug</div> 
                <div className="opt dm-list-item"><input frequency={8} value={dynamicFrequency.months[8]} type="checkbox"/>Sep</div> 
                <div className="opt dm-list-item"><input frequency={9} value={dynamicFrequency.months[9]} type="checkbox"/>Oct</div> 
                <div className="opt dm-list-item"><input frequency={10} value={dynamicFrequency.months[10]} type="checkbox"/>Nov</div> 
                <div className="opt dm-list-item"><input frequency={11} value={dynamicFrequency.months[11]} type="checkbox"/>Dec</div>
              </div>
            </div>
          </div>

        </div>
        <div className={frequencyType === 'dated' ? 'active dated option-modal' : 'option-modal'}>
          <div className="calendar-widget">
            <input type="date"/>
          </div>
        </div>
      </div>
    </div>
  )
}

function FrequencyPicker({isActive,frequency,handleChange}){
    const [ current, setCurrent ] = useState(frequency);

    return (
    <div className={ isActive ? 'active once option-modal' : 'option-modal'}
        onClick={(event) => {
          const option = event.target.closest('.opt');
          if (option){
            const input = option.querySelector('input')
            const siblings = Array.from(document.querySelectorAll(`input[name="${input.name}"][type="radio"]`));
            const value = input.getAttribute('frequency')
            siblings.forEach(sib => sib.parentElement.classList.remove('active'))
            option.classList.add('active')
            handleChange('frequency', value )
            setCurrent(value)
          }
        }}>
          <div className={["fm-list-item opt once",frequency === 'once' && 'active'].filter(Boolean).join(' ')}><input name="once" type="radio" frequency="once" value={current === 'once'} />once</div>
          <div className={["fm-list-item opt daily",frequency === 'daily' && 'active'].filter(Boolean).join(' ')}><input name="once" type="radio" frequency="daily" value={current === 'daily'}/>daily</div>
          <div className={["fm-list-item opt weekly",frequency === 'weekly' && 'active'].filter(Boolean).join(' ')}><input name="once" type="radio" frequency="weekly" value={current === 'weekly'}/>weekly</div>
          <div className={["fm-list-item opt monthly",frequency === 'monthly' && 'active'].filter(Boolean).join(' ')}><input name="once" type="radio" frequency="monthly" value={current === 'monthly'}/>monthly</div>
        </div>
      )
}
function DynamicDatePicker({dom,onChange}){
  const [context,setContext] = useState(dom)
  useEffect(() => {
    const context = String(dom.slice(-1))
    setContext(context === '1' 
          ? 'st'
          : context === '2'
          ? 'nd'
          : context === '3'
          ? 'rd'
          : 'th')
  },[dom])
  return (
    <div className="datePicker">
      <input type="number" name="dom" max="31" value={dom} onChange={onChange} min="1" />
      <div className="floating-context">
        { context }
      </div>
    </div>
  )
}

function DynamicDayPicker({dynamicFrequency,handleChange}){
  const [frequency,setFrequency] = useState(dynamicFrequency)
  useEffect(() => {
    setFrequency(dynamicFrequency)
  },[dynamicFrequency])
  return (<div className="dynamic-days"
    onClick={(e) => {
      const option = e.target.closest('.opt');
      const input = option.querySelector('input');
      if (option){
        const index = input.getAttribute('frequency');
        const current = frequency.days[index]
        frequency.days[index] = !current;
        setFrequency(frequency)
        handleChange('dynamic_frequency',frequency)
      }
    }}>
  <div className="options option-buttons">
    <div className="df-list-item opt" active={`${frequency.days[1]}`}><input type="checkbox" frequency={1}/> MON </div>
    <div className="df-list-item opt" active={`${frequency.days[2]}`}><input type="checkbox" frequency={2}/> TUE </div>
    <div className="df-list-item opt" active={`${frequency.days[3]}`}><input type="checkbox" frequency={3}/> WED </div>
    <div className="df-list-item opt" active={`${frequency.days[4]}`}><input type="checkbox" frequency={4}/> THU </div>
    <div className="df-list-item opt" active={`${frequency.days[5]}`}><input type="checkbox" frequency={5}/> FRI </div>
    <div className="df-list-item opt" active={`${frequency.days[6]}`}><input type="checkbox" frequency={6}/> SAT </div>
    <div className="df-list-item opt" active={`${frequency.days[0]}`}><input type="checkbox" frequency={0}/> SUN </div>
  </div>
</div>)
}

function DynamicWeekPicker({dynamicFrequency,handleChange}){
  const [frequency,setFrequency] = useState(dynamicFrequency)
  useEffect(() => {
    setFrequency(dynamicFrequency)
  },[dynamicFrequency])
  return (            
    <div className="dynamic-weeks"
      onClick={(e) => {
      const option = e.target.closest('.opt');
      const input = option.querySelector('input');
      if (option){
        const index = input.getAttribute('frequency');
        const current = frequency.weeks[index]
        frequency.weeks[index] = !current;
        setFrequency(frequency)
        handleChange('dynamic_frequency',frequency)
      }}} >
      <div className="option-buttons">
        <div className="df-list-item opt" active={`${frequency.weeks[0]}`}><input frequency={0} type="checkbox"/> 1 </div>
        <div className="df-list-item opt" active={`${frequency.weeks[1]}`}><input frequency={1} type="checkbox"/> 2 </div>
        <div className="df-list-item opt" active={`${frequency.weeks[2]}`}><input frequency={2} type="checkbox"/> 3 </div>
        <div className="df-list-item opt" active={`${frequency.weeks[3]}`}><input frequency={3} type="checkbox"/> 4 </div>
      </div>
    </div>)
}

function DynamicMonthPicker({dynamicFrequency,handleChange}){
  const [frequency,setFrequency] = useState(dynamicFrequency)
  useEffect(() => {
    setFrequency(dynamicFrequency)
  },[dynamicFrequency])
  return (            
    <div className="dynamic-months"
      onClick={(e) => {
      const option = e.target.closest('.opt');
      const input = option.querySelector('input');
      if (option){
        const index = input.getAttribute('frequency');
        const current = frequency.months[index]
        frequency.months[index] = !current;
        setFrequency(frequency)
        handleChange('dynamic_frequency',frequency)
      }}} >
      <div className="option-buttons">
        <div className="dm-list-item opt" active={`${frequency.months[0]}`}><input frequency={0} type="checkbox"/> JAN </div>
        <div className="dm-list-item opt" active={`${frequency.months[1]}`}><input frequency={1} type="checkbox"/> FEB </div>
        <div className="dm-list-item opt" active={`${frequency.months[2]}`}><input frequency={2} type="checkbox"/> MAR </div>
        <div className="dm-list-item opt" active={`${frequency.months[3]}`}><input frequency={3} type="checkbox"/> APR </div>
        <div className="dm-list-item opt" active={`${frequency.months[4]}`}><input frequency={4} type="checkbox"/> MAY </div>
        <div className="dm-list-item opt" active={`${frequency.months[5]}`}><input frequency={5} type="checkbox"/> JUN </div>
        <div className="dm-list-item opt" active={`${frequency.months[6]}`}><input frequency={6} type="checkbox"/> JUL </div>
        <div className="dm-list-item opt" active={`${frequency.months[7]}`}><input frequency={7} type="checkbox"/> AUG </div>
        <div className="dm-list-item opt" active={`${frequency.months[8]}`}><input frequency={8} type="checkbox"/> SEP </div>
        <div className="dm-list-item opt" active={`${frequency.months[9]}`}><input frequency={9} type="checkbox"/> OCT </div>
        <div className="dm-list-item opt" active={`${frequency.months[10]}`}><input frequency={10} type="checkbox"/> NOV </div>
        <div className="dm-list-item opt" active={`${frequency.months[11]}`}><input frequency={11} type="checkbox"/> DEC </div>
      </div>
    </div>
    )
}
