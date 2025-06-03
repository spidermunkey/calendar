import { 
  GenericModal, 
  DailyModal, 
  dailyFrequency,
  monthlyFrequency, 
  weeklyFrequency,
  frequencyMap } from "./EventForm"

import { PlusIcon } from "../../assets/icons/plus"
import { useAppState } from "../../context"
import { useEffect, useState } from "react"

export const EventModal = () => {
  const {events} = useAppState();
  const [template,setTemplate] = useState({});
  const [today,setToday] = useState([])
  const [thisMonth,setThisMonth] = useState([])
  const handleData = async (formData) => {
    console.log('posting data',formData)
    const response = await events.add(formData);
    const result = await response.json();
    console.log('eventForm response',result);
  }
  useEffect(() => {
    const test = async () => {
      const today = setToday(await events.today());
      const thisMonth = setThisMonth(await events.thisMonth());
      console.log('total', await events.data)
      console.log('today',today)
      console.log('this month', thisMonth)
    }
    test();
  },[events])

  return (
    <>
      <div className="interface-modal events">
        <DailyModal eventDate={template} handleSubmit={handleData}/>
        <GenericModal eventDate={template} handleSubmit={handleData}/>
        <div className="interface-header">
          <div className="interface-title">Events</div>
          <div className="btn-add-event" onClick={e => {
            setTemplate({
              frequencyType:'custom',
              frequency:'once',
              dynamic_frequency:{...frequencyMap},
            })
            showGenericForm()
          }}>
            <div className="icon"><PlusIcon/></div>
            <div className="label">Add Event</div>
          </div>
        </div>


        <div className="section daily">
          <div className="section-title">Today</div>
          <div className="section-data">{
              today.length === 0 ? 
                <div className="bullet">none</div>
              : <div className="bullet">{today.length} events today</div>
            }
          </div>
          <div className="btn-add-event" onClick={() => {
            setTemplate({
              frequencyType:'once',
              frequency:'daily',
              dynamic_frequency:{...dailyFrequency}
            })
            showDailyForm()
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
            <div className="bullet">None this week</div>
          </div>
          <div className="btn-add-event" onClick={() => {
            setTemplate({
              frequencyType:'once',
              frequency:'weekly',
              dynamic_frequency:{...weeklyFrequency}
            })
            showDailyForm()
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
            {
              thisMonth.length === 0 ? 
                <div className="bullet">none</div>
              : <div className="bullet">{thisMonth.length} events this month</div>
            }
          </div>
          <div className="btn-add-event" onClick={() => {
            setTemplate({
              frequencyType:'once',
              frequency:'monthly',
              dynamic_frequency:{...monthlyFrequency}
            })
            showDailyForm()
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

  function showGenericForm() {
    const ref = document.querySelector('.interface-modal.events .event-form-modal.custom-modal')
    closeDailyForm();
    return ref && ref.classList.add('active');
  }

  function closeGenericForm() {
    const ref = document.querySelector('.interface-modal.events .event-form-modal.custom-modal')
    return ref && ref.classList.remove('active');
  }

  function showDailyForm() {
    const ref = document.querySelector('.interface-modal.events .event-form-modal.daily-modal')
    closeGenericForm();
    return ref && ref.classList.add('active');
  }

  function closeDailyForm() {
    const ref = document.querySelector('.interface-modal.events .event-form-modal.daily-modal')
    return ref && ref.classList.remove('active')
  }

  function hideForm() {
    const ref = document.querySelector('.interface-modal.events .create-modal')
    return ref && ref.classList.remove('active')
  }
  