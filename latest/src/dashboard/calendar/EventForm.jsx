import { useEffect, useState } from "react";

const milisecondsInDay = 86400000;

const getTime = date => date.toISOString().split('T')[1].slice(0,5);
const getDate = date => date.toISOString().slice(0,10);
const midnight = (date) => new Date( getDate(date) + 'T00:00:00');

const today = midnight(new Date());
const tommorow = midnight(new Date(Date.now() + milisecondsInDay));

const frequencyMap = {
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
    start_time: getTime(date),
    start_date: getDate(date),
    end_time: getTime(tommorow),
    end_date: getDate(tommorow),
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
export const CreateModal = ({ eventDate, onSubmit }) => {
const [ event , setEvent ] = useState({...validateTemplate(eventDate)});
const [ frequencyType, setFrequencyType ] = useState(event.frequencyType);
const [ frequency, setFrequency ] = useState(event.frequency);
console.log(event,eventDate)
useEffect(() => {
  const data = validateTemplate(eventDate)
  setEvent(data)
  setFrequencyType(data.frequencyType)
  setFrequency(data.frequency)
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
          <div className="title modal-form-section">
            <div className="input-label">Event Title</div>
            <input className="input" type="text" placeholder={event.title}></input>
          </div>
          <div className="description modal-form-section">
            <div className="input-label">Event Description</div>
            <textarea name="description" value={event.description}></textarea>
          </div>
          <div className="category modal-form-section">
            <div className="input-label">Category</div>
            <select name="category" value={event.category}>
              <option value="">General</option>
              <option value="">Bill</option>
              <option value="">Deadline</option>
              <option value="">Birthday</option>
              <option value="">Deposit</option>
              <option value="">Holiday</option>
            </select>
          </div>
          <div className="time modal-form-section">
            <div className="input-label">Start Time</div>
            <div className="time-options">
              <select name="time" id="">
                <option value="">midnight</option>
                <option value="">noon</option>
                <option value="">custom</option>
              </select>
            </div>
          </div>
          <div className="time modal-form-section">
            <div className="input-label">duration</div>
            <div className="duration-options">
              <select name="duration" id="">
                <option value="">hours</option>
                <option value="">days</option>
              </select>
              <input type="number" value="24"/>
            </div>
          </div>
          <div className="frequency modal-form-section">
            <div className="input-label">Frequency</div>
            <div className="input-options">
              <div className={frequencyType === 'once' ? "opt-1 opt active": "opt opt-1"} onClick={() => setFrequencyType('once')}>Once</div>
              <div className={frequencyType === 'dynamic' ? "opt-2 opt active": "opt opt-2"} onClick={() => setFrequencyType('dynamic')}>Dynamic</div>
              <div className={frequencyType === 'dated' ? "opt-3 opt active": "opt opt-3"} onClick={() => setFrequencyType('dated')}>Dated</div>
            </div>
            <div className="frequency-modal">
              <div className={frequencyType === 'once' ? 'active option-modal' : 'option-modal'}>
                <div className="once">once</div>
                <div className="daily">daily</div>
                <div className="weekly">weekly</div>
                <div className="monthly">monthly</div>
              </div>
              <div className={frequencyType === 'dynamic' ? 'active option-modal' : 'option-modal'}>
                <div className="dynamic-days">
                  <div className="input-label">Select Every Day</div>
                  <div className="options">M T W T F S S</div>
                </div>
                <div className="dynamic-weeks">
                  <div className="input-label">Select Every Week</div>
                  <div className="options">1st 2nd 3rd 4th</div>
                </div>
                <div className="dynamic-months">
                  <div className="input-label">Select Every Month</div>
                  <div className="options">Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec</div>
                </div>
              </div>
              <div className={frequencyType === 'dated' ? 'active option-modal' : 'option-modal'}>
                <div className="calendar-widget">
                  <input type="date"/>
                </div>
              </div>
            </div>
          </div>
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

