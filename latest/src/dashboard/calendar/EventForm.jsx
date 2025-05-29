import { useEffect, useState } from "react";

const milisecondsInDay = 86400000;

const getTime = date => date.toISOString().split('T')[1].slice(0,5);
const getDate = date => date.toISOString().slice(0,10);
const midnight = (date) => new Date( getDate(date) + 'T00:00:00');

const today = midnight(new Date());
const tommorow = midnight(new Date(Date.now() + milisecondsInDay));

export const frequencyMap = {
  days:Array(7).fill(0),
  weeks: Array(4).fill(0),
  months: Array(12).fill(0),
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
      days:Array(7).fill(false),
      weeks: Array(4).fill(false),
      months: Array(12).fill(false),
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
  const [ dynamicFrequency, setDynamicFrequency] = useState(event.dynamic_frequency)
  const [ category,setCategory] = useState(event.category);
  const [ description,setDescription] = useState(event.description);
  const [ title,setTitle] = useState(event.title);

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
    <div className="event-form-modal custom-modal">
      <div className="modal-header">
        <div className="modal-title">Create Event</div>
        <div className="close" onClick={() => {
          const ref = document.querySelector('.interface-modal.events .custom-modal')
          return ref && ref.classList.remove('active')
        }}>close</div>
      </div>
      <div className="modal-content">
        <div className="modal-form">
          <form onSubmit={
            e => {
              e.preventDefault()
              const form = e.target;
              const formData = new FormData(form);
              const entries = Object.fromEntries(formData.entries());
              console.log('form',{
                ...entries,
                title,
                description,
                category,
                frequency,
                frequencyType,
                dynamic_frequency: dynamicFrequency,
              })
            }
          }>
            <div className="flexbox">
              <TitleInput title={title} setTitle={setTitle}/>
              <CategorySelectInput controller={{category,setCategory}} categories={["general","bill","deadline","birthday","deposit"]}/>
            </div>
           
            <DescriptionInput description={description} setDescription={setDescription}/>
            {category === 'general' && <GeneralEventForm template={event} controller={{frequency,setFrequency,frequencyType,setFrequencyType,dynamicFrequency,setDynamicFrequency}} />}
            <input className="btn-submit" type="submit"/>
          </form>
        </div>
      </div>
      {/* <input className="btn-submit" type="submit" onSubmit={(e) => {
        onSubmit(e);
        console.log(event)
      }}/> */}
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
    <div className="event-form-modal daily-modal">
      <div className="modal-header">
        <div className="modal-title">{frequency} Event</div>
        <div className="close" onClick={() => {
          const ref = document.querySelector('.interface-modal.events .daily-modal')
          return ref && ref.classList.remove('active')
        }}>close</div>
      </div>
      <div className="modal-content">
        <div className="modal-form">
          <form action="">
            <TitleInput title={title} setTitle={setTitle}/>
            <DescriptionInput controller={{description,setDescription}}/>
            <CategorySelectInput 
              controller={{category,setCategory}} 
              categories={["general","bill","deadline","deposit"]}/>
          </form>
        </div>
      </div>
      <div className="btn-submit">
        submit
      </div>
    </div>
  )
    
}

function TitleInput({title,setTitle}) {
  return (<div className="modal-form-section title">
            <div className="input-label">Event Title</div>
            <input name="title" id="title" className="input" type="text" value={title} placeholder={title} onChange={(event) => setTitle(event.target.value)}></input>
          </div>)
}

function DescriptionInput({description,setDescription}) {
  return (          
    <div className="modal-form-section description">
      <div className="input-label">Event Description</div>
      <textarea id="description" name="description" value={description} onChange={event => setDescription(event.target.value)}></textarea>
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
      ? <input type="number" name="hours" max='24' min="1" value={Math.min(duration,24)} placeholder="24" onChange={(e) => setDuration(e.target.value)}/>
      : <input type="number" name="days" placeholder="1" min='1' value={duration} onChange={(e) => setDuration(e.target.value)}/>
      }
    </div>
  </div>
  )
}

function GeneralEventForm({ controller }) {
  return (<>
    <TimeForm/>
    <FrequencyForm controller = { controller }/>
  </>)
}

function TimeForm(){
   return(<div className="modal-form-section time">
      <div className="time-options">
        <TimeInput/>
        <DurationInput/>
      </div>
    </div>)
}

function FrequencyForm({controller}){
  const { 
    frequency,
    setFrequency,
    frequencyType, 
    setFrequencyType, 
    dynamicFrequency, 
    setDynamicFrequency } = controller
  return (
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
        <div className={frequencyType === 'once' ? 'active once option-modal' : 'option-modal'}
        onClick={(event) => {
          const option = event.target.closest('.opt');
          if (option){
            const input = option.querySelector('input')
            const siblings = Array.from(document.querySelectorAll(`input[name="${input.name}"][type="radio"]`))
            siblings.forEach(sib => sib.parentElement.classList.remove('active'))
            setFrequency(input.getAttribute('frequency'))
            option.classList.add('active')
            }
        }}>
          <div className="fm-list-item opt once"><input name="once" type="radio" frequency="once" value={frequency === 'once'}/>once</div>
          <div className="fm-list-item opt daily"><input name="once" type="radio" frequency="daily" value={frequency === 'daily'}/>daily</div>
          <div className="fm-list-item opt weekly"><input name="once" type="radio" frequency="weekly" value={frequency === 'weekly'}/>weekly</div>
          <div className="fm-list-item opt monthly"><input name="once" type="radio" frequency="monthly" value={frequency === 'monthly'}/>monthly</div>
        </div>
        <div className={frequencyType === 'dynamic' ? 'active dynamic option-modal' : 'option-modal'}>
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
                  if (input.checked){
                    option.classList.add('active') 
                  } else {
                    option.classList.remove('active')
                  }
                }
              }}>
            <div className="options option-buttons">
              <div className="df-list-item opt"><input type="checkbox" frequency={0} value={dynamicFrequency.days[0]}/> MON </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={1} value={dynamicFrequency.days[1]}/> TUE </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={2} value={dynamicFrequency.days[2]}/> WED </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={3} value={dynamicFrequency.days[3]}/> THU </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={4} value={dynamicFrequency.days[4]}/> FRI </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={5} value={dynamicFrequency.days[5]}/> SAT </div>
              <div className="df-list-item opt"><input type="checkbox" frequency={6} value={dynamicFrequency.days[6]}/> SUN </div>
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
