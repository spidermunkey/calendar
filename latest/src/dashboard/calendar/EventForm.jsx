import { useEffect, useState } from "react";

const milisecondsInDay = 86400000;

const getTime = date => date.toISOString().split('T')[1].slice(0,5);
const getDate = date => date.toISOString().slice(0,10);
const midnight = (date) => new Date( getDate(date) + 'T00:00:00');

const today = midnight(new Date());
const tommorow = midnight(new Date(Date.now() + milisecondsInDay));

export const frequencyMap = {
  days:Array(7).fill(undefined),
  weeks: Array(4).fill(undefined),
  months: Array(12).fill(undefined),
}
export const monthlyFrequency = {
  days: Array(7).fill(undefined),
  weeks: Array(4).fill(undefined),
  months: ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'],
}
export const weeklyFrequency = {
  days: Array(7).fill(undefined),  
  weeks: ['1','2','3','4'],
  months: ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'],
}
export const dailyFrequency = {
  days:['mon','tue','wed','thu','fri','sat','sun'],
  weeks: ['1','2','3','4'],
  months: ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'],

}
export const EventTemplate = (date = today) => {
  return {
    title: 'untitled',
    description: 'none',
    frequencyType: 'once',
    frequency: 'once',
    dynamic_frequency: {
      days:[],
      weeks: [],
      months: [],
    },
    dated_frequency: [date],
    category: 'general',
    time: getTime(date),
    duration: '24',
    duration_type: 'hours',
  }
}
export const validateTemplate = (eventDate) => {
  const template = EventTemplate();
  const event = {};
  for (const prop in eventDate){
    if (template[prop] && typeof template[prop] === typeof eventDate[prop] ){
      event[prop] = eventDate[prop]
    }
  }
  return {
    ...template,
    ...event
  }
}
export const GenericModal = ({ eventDate, onSubmit }) => {

  const [ event , setEvent ] = useState({...validateTemplate(eventDate)});
  const [ frequencyType, setFrequencyType ] = useState(event.frequencyType);
  const [ frequency, setFrequency ] = useState(event.frequency);
  const [category,setCategory] = useState(event.category);
  const [description,setDescription] = useState(event.description);
  const [title,setTitle] = useState(event.title);

  console.log(event,eventDate)

  useEffect(() => {
    const data = validateTemplate(eventDate)
    setEvent(data)
    setFrequencyType(data.frequencyType)
    setFrequency(data.frequency)
    setCategory(data.category)
    setDescription(data.description)
    setTitle(data.title)
    console.log('cat',data.category)
  },[eventDate])

  return (
    <div className="create-modal">
      <div className="modal-header">
        <div className="modal-title">Create Event</div>
        <div className="close" onClick={() => {
          const ref = document.querySelector('.interface-modal.events .create-modal')
          return ref && ref.classList.remove('active')
        }}>close</div>
      </div>
      <div className="modal-content">
        <div className="modal-form">
          <form action="">
            <div className="flexbox">
            <TitleInput controller={{title,setTitle}}/>
            <CategorySelectInput controller={{category,setCategory}} categories={["general","bill","deadline","birthday","deposit"]}/>

            </div>
           
            <DescriptionInput controller={{description,setDescription}}/>
            {category === 'general' && <GeneralEventForm template={event} controller={{frequencyType,setFrequencyType}} />}
            
          </form>
        </div>
      </div>
      <div className="btn-submit" onClick={(e) => {
        onSubmit(e);
        console.log(event)
      }}>
        submit
      </div>
    </div>
  )
}
export const DailyModal = ({eventDate, onSubmit}) => {
  const [ event , setEvent ] = useState({...validateTemplate(eventDate)});
  const [ frequencyType, setFrequencyType ] = useState(event.frequencyType);
  const [ frequency, setFrequency ] = useState(event.frequency);
  const [ category,setCategory] = useState(event.category);
  const [ description,setDescription] = useState(event.description);
  const [ title,setTitle] = useState(event.title);

  console.log(event,eventDate)

  useEffect(() => {
    const data = validateTemplate(eventDate)
    setEvent(data)
    setFrequencyType(data.frequencyType)
    setFrequency(data.frequency)
    setCategory(data.category)
    setDescription(data.description)
    setTitle(data.title)
    console.log('cat',data.category)
  },[eventDate])

  return (
    <div className="create-modal daily-modal">
      <div className="modal-header">
        <div className="modal-title">{frequency} Event</div>
        <div className="close" onClick={() => {
          const ref = document.querySelector('.interface-modal.events .create-modal')
          return ref && ref.classList.remove('active')
        }}>close</div>
      </div>
      <div className="modal-content">
        <div className="modal-form">
          <form action="">
            <TitleInput controller={{title,setTitle}}/>
            <DescriptionInput controller={{description,setDescription}}/>
            <CategorySelectInput 
              controller={{category,setCategory}} 
              categories={["general","bill","deadline","deposit"]}/>
          </form>
        </div>
      </div>
      <div className="btn-submit" onClick={(e) => {
        onSubmit(e);
        console.log(event)
      }}>
        submit
      </div>
    </div>
  )
    
}
function TitleInput({controller}) {
  const {title,setTitle} = controller;
  return (<div className="modal-form-section title">
            <div className="input-label">Event Title</div>
            <input className="input" type="text" value={title} placeholder={title} onChange={(event) => setTitle(event.target.value)}></input>
          </div>)
}

function DescriptionInput({ controller }) {
  const {description,setDescription} = controller
  return (          
    <div className="modal-form-section description">
      <div className="input-label">Event Description</div>
      <textarea name="description" value={description} onChange={event => setDescription(event.target.value)}></textarea>
    </div>)
}

function CategorySelectInput({ controller, categories }) {
  const {category,setCategory} = controller;
  return (
    <div className="modal-form-section category">
      <div className="input-label">Category</div>
      <select name="category" value={category} onChange={(event => {
        const element = event.target;
        const cat = element.value;
        setCategory(cat)
        console.log(cat,category)
      })}>
        {categories.map(cat => <CategoryOption key={cat} category={cat}/>)}
      </select>
    </div>
  )
}

function CategoryOption({category}) {
  return <option  name="category" className="category-option" value={category}>{category}</option>
}

function TimeInput(){
 const [minutes,setMinutes] = useState(0);
 const [hours,setHours] = useState(12);
 const [context,setContext] = useState('am');
 const [type, setType] = useState('noon')
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
    <input className="digit" type="number"  max="12" min="1" value={hours} placeholder="12" onChange={(e) => {
      setHours(e.target.value)
      setType('custom')
      }}/>
    <input className="digit" type="number" min="0" max="59" value={minutesFormatted()} placeholder="00" onChange={(e) => {
      setMinutes(e.target.value)
      setType('custom')
    }}/>
    <select className="context-input" name="context" value={context} onChange={(e) => {
      setContext(e.target.value)
    }}>
      <option name="context" value="am">am</option>
      <option name="context" value="pm">pm</option>
    </select>
    </div>
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
      ? <input type="number" max='24' min="1" value={Math.min(duration,24)} placeholder="24" onChange={(e) => setDuration(e.target.value)}/>
      : <input type="number" placeholder="1" min='1' value={duration} onChange={(e) => setDuration(e.target.value)}/>
      }
    </div>
  </div>
  )
}

function GeneralEventForm({ controller } ) {
  const { frequencyType, setFrequencyType } = controller;
  const [duration,setDuration] = useState('hours');
  const [timeopt,setTimeOpt] = useState('midnight');
  return (
  <>
    <div className="modal-form-section time">
      <div className="time-options">
        <TimeInput/>
        <DurationInput/>
      </div>
    </div>

    <div className="modal-form-section frequency">
      <div className="input-label">Frequency</div>
      <div className="input-options">
        <div 
        className={frequencyType === 'once' ? "opt-1 opt active": "opt opt-1"} 
        onClick={() => setFrequencyType('once')}>Once</div>
        <div 
        className={frequencyType === 'dynamic' ? "opt-2 opt active": "opt opt-2"} 
        onClick={() => setFrequencyType('dynamic')}>Dynamic</div>
        <div 
        className={frequencyType === 'dated' ? "opt-3 opt active": "opt opt-3"} 
        onClick={() => setFrequencyType('dated')}>Dated</div>
      </div>
      <div className="frequency-modal">
        <div className={frequencyType === 'once' ? 'active once option-modal' : 'option-modal'}>
          <div className="fm-list-item once">once</div>
          <div className="fm-list-item daily">daily</div>
          <div className="fm-list-item weekly">weekly</div>
          <div className="fm-list-item monthly">monthly</div>
        </div>
        <div className={frequencyType === 'dynamic' ? 'active dynamic option-modal' : 'option-modal'}>
          <div className="dynamic-days">
            <div className="options option-buttons">
              <div className="df-list-item opt"> MON </div>
              <div className="df-list-item opt"> TUE </div>
              <div className="df-list-item opt"> WED </div>
              <div className="df-list-item opt"> THU </div>
              <div className="df-list-item opt"> FRI </div>
              <div className="df-list-item opt"> SAT </div>
              <div className="df-list-item opt"> SUN </div>
            </div>
          </div>
          <div className="flexbox">
            <div className="dynamic-weeks">
              <div className="option-buttons">
                <div className="df-list-item opt"> 1 </div>
                <div className="df-list-item opt"> 2 </div>
                <div className="df-list-item opt"> 3 </div>
                <div className="df-list-item opt"> 4 </div>
              </div>
            </div>
            <div className="dynamic-months">
              <div className="option-buttons">
                <div className="opt dm-list-item">Jan</div> 
                <div className="opt dm-list-item">Feb</div> 
                <div className="opt dm-list-item">Mar</div> 
                <div className="opt dm-list-item">Apr</div> 
                <div className="opt dm-list-item">May</div> 
                <div className="opt dm-list-item">Jun</div> 
                <div className="opt dm-list-item">Jul</div> 
                <div className="opt dm-list-item">Aug</div> 
                <div className="opt dm-list-item">Sep</div> 
                <div className="opt dm-list-item">Oct</div> 
                <div className="opt dm-list-item">Nov</div> 
                <div className="opt dm-list-item">Dec</div>
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
  </>)
}
