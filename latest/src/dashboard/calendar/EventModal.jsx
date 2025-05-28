import { PlusIcon } from "../../assets/icons/plus"
import { CreateModal, dailyFrequency, monthlyFrequency, weeklyFrequency } from "./EventForm"
import { useState } from "react"

export const EventModal = () => {

  const [template,setTemplate] = useState({});

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
        <CreateModal eventDate={template} onSubmit={onFormSubmit} />
        <div className="interface-header">
          <div className="interface-title">Events</div>
        </div>

        <div className="section daily">
          <div className="section-title">Today</div>
          <div className="section-data">
            <div className="bullet">none</div>
          </div>
          <div className="btn-add-event" onClick={() => {
            setTemplate({
              frequencyType:'dynamic',
              frequency:'daily',
              dynamic_frequency:dailyFrequency
            })
            showForm('daily')
          }}>
            <div className="text">Add Daily Event</div>
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
              frequencyType:'dynamic',
              frequency:'weekly',
              dynamic_frequency:weeklyFrequency
            })
            showForm('weekly')
          }}>
            <div className="text">Add Weekly Event</div>
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
              frequencyType:'dynamic',
              frequency:'monthly',
              dynamic_frequency:monthlyFrequency
            })
            showForm('monthly')
          }}>
            <div className="text">Add Monthly Event</div>
            <div className="btn-add-icon" handle="daily">
              <PlusIcon/>
            </div>
          </div>
        </div>
        
      </div>
    </>
)}
