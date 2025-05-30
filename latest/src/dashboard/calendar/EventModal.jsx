import { PlusIcon } from "../../assets/icons/plus"
import { useAppState } from "../../context"
import { GenericModal, DailyModal, dailyFrequency,  monthlyFrequency, weeklyFrequency,frequencyMap } from "./EventForm"
import { useState } from "react"

export const EventModal = () => {
  const {events} = useAppState();
  const [template,setTemplate] = useState({});
  const handleData = async (formData) => {
    console.log('posting data',formData)
    const response = await events.add(formData);
    const result = await response.json();
    console.log('eventForm response',result)
  }
  const showGenericForm = () => {
    const ref = document.querySelector('.interface-modal.events .event-form-modal.custom-modal')
    closeDailyForm();
    return ref && ref.classList.add('active')
  }
  const closeGenericForm = () => {
    const ref = document.querySelector('.interface-modal.events .event-form-modal.custom-modal')
    return ref && ref.classList.remove('active')
  }
  const showDailyForm = () => {
    const ref = document.querySelector('.interface-modal.events .event-form-modal.daily-modal')
    closeGenericForm();
    return ref && ref.classList.add('active');
    
  }
  const closeDailyForm = () => {
        const ref = document.querySelector('.interface-modal.events .event-form-modal.daily-modal')
    return ref && ref.classList.remove('active')
  }
  const hideForm = () => {
    const ref = document.querySelector('.interface-modal.events .create-modal')
    return ref && ref.classList.remove('active')
  }
  
  return (<>
      <div className="interface-modal events">
          <DailyModal eventDate={template} handleSubmit={handleData}/>
          <GenericModal eventDate={template} handleSubmit={handleData}/>
       <div/>

        <div className="interface-header">
          <div className="interface-title">Events</div>

          <div className="btn-add-event" onClick={e => {
            setTemplate({
              frequencyType:'custom',
              frequency:'once',
              dynamic_frequency:{...frequencyMap},
            })
            showGenericForm('daily')
          }}>
            <div className="icon"><PlusIcon/></div>
            <div className="label">Add Event</div>
          </div>
        </div>

        <div className="section daily">
          <div className="section-title">Today</div>
          <div className="section-data">
            <div className="bullet">none</div>
          </div>
          <div className="btn-add-event" onClick={() => {
            setTemplate({
              frequencyType:'once',
              frequency:'daily',
              dynamic_frequency:{...dailyFrequency}
            })
            showDailyForm('daily')
          }}>
            <div className="text">Daily Event</div>
            <div className="btn-add-icon" handle="daily">
              <PlusIcon/>
            </div>
          </div>
        </div>
        <div className="section weekly">
          <div className="section-title">This Week</div>
          <div className="section-data">
            <div className="bullet">none</div>
          </div>
          <div className="btn-add-event" onClick={() => {
            setTemplate({
              frequencyType:'once',
              frequency:'weekly',
              dynamic_frequency:{...weeklyFrequency}
            })
            showDailyForm('weekly')
          }}>
            <div className="text">Weekly Event</div>
            <div className="btn-add-icon" handle="daily">
              <PlusIcon/>
            </div>
          </div>
        </div>
        <div className="section monthly">
          <div className="section-title">This Month</div>
          <div className="section-data">
            <div className="bullet">none</div>
          </div>
          <div className="btn-add-event" onClick={() => {
            setTemplate({
              frequencyType:'once',
              frequency:'monthly',
              dynamic_frequency:{...monthlyFrequency}
            })
            showDailyForm('monthly')
          }}>
            <div className="text">Monthly Event</div>
            <div className="btn-add-icon" handle="daily">
              <PlusIcon/>
            </div>
          </div>
        </div>
        
      </div>
    </>
)}
