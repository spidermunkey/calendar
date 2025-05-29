import { PlusIcon } from "../../assets/icons/plus"
import { GenericModal, DailyModal, dailyFrequency,  monthlyFrequency, weeklyFrequency,frequencyMap } from "./EventForm"
import { useState } from "react"

export const EventModal = () => {

  const [template,setTemplate] = useState({});
  console.log(template.frequencyType)
  const onFormSubmit = (e) => {
    console.log(e)
  }

  const showForm = () => {
    const ref = document.querySelector('.interface-modal.events .create-modal')
    return ref && ref.classList.add('active')
  }

  const hideForm = () => {
    const ref = document.querySelector('.interface-modal.events .create-modal')
    return ref && ref.classList.remove('active')
  }

  return (<>
      <div className="interface-modal events">
        { template.frequencyType === 'once' 
          ? <DailyModal eventDate={template} onSubmit={onFormSubmit}/>
          : <GenericModal eventDate={template} onSubmit={onFormSubmit}/>
        } <div/>
        <div className="interface-header">
          <div className="interface-title">Events</div>

          <div className="btn-add-event" onClick={e => {
            setTemplate({
              frequencyType:'dynamic',
              frequency:'once',
              dynamic_frequency:frequencyMap,
            })
            showForm('daily')
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
              dynamic_frequency:dailyFrequency
            })
            showForm('daily')
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
              dynamic_frequency:weeklyFrequency
            })
            showForm('weekly')
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
              dynamic_frequency:monthlyFrequency
            })
            showForm('monthly')
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
