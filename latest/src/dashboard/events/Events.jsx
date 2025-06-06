import { 
  GenericModal, 
  DailyModal, 
  dailyFrequency,
  monthlyFrequency, 
  weeklyFrequency,
  frequencyMap } from "./EventForms"

import { EventList } from "./Event"
import { PlusIcon } from "../../assets/icons/plus"
import { useEffect, useState, useRef } from "react"
import { useEventStore } from "context"
import { useCalendarState } from "../../context"

export const Events = () => {

  const { events } = useEventStore();
  const { day, month, date } = useCalendarState();
  
  const [ template , setTemplate ] = useState({});
  const [ today, setToday ] = useState([]);
  const [ thisMonth, setThisMonth ] = useState([]);

  const eventListRef = useRef(null)
  const [ eventListActive, setEventListActive ] = useState(false);
  const [ eventList, setEventList ] = useState([]);

  const handleData = async (formData) => {
    console.log('posting data',formData)
    const response = await events.add(formData);
    const result = await response.json();
    console.log('eventForm response',result);
  }

  useEffect(() => {
    const test = async () => {
      const today = setToday(await events.findByDay(day,month));
      const thisMonth = setThisMonth(await events.thisMonth());
      console.log('total', await events.data)
      console.log('today', await events.today())
      console.log('this month', await events.thisMonth())
      console.log('test date', await events.findByDay(9))

    }
    test();
  },[])

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
        <div className="widget-list">
            <EventList ref={eventListRef} setActive={setEventListActive} isActive={eventListActive} label={template.frequency} events={eventList} />

            <div className="section daily">
              <div className="section-title">Today</div>
              <div className="section-data">{
                  today.length === 0 ? 
                    <div className="bullet">none</div>
                  : <div className="bullet">
                    <div className="fab" onClick={() => {
                      const ref = document.querySelector('.event-list');
                      if (ref) {
                        setEventList(today);
                        ref.classList.add('active')
                      }
                      return ref && ref.classList.add('active');
                    }}>
                      {today.length} events today
                    </div>
                    </div>
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
                  : <div className="bullet">
                    <div className="fab" onClick={() => {
                      const ref = eventListRef.current;
                      if (ref){
                        setEventList(thisMonth);
                        setEventListActive(true);
                      }
                      return ref && ref.classList.add('active');
                    }}>
                      {thisMonth.length} events this month
                    </div>
                    </div>

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
  
  function FloatingActionButton({selector, children}){
    return (
      <div className="fab" onClick={() => {
        const ref = document.querySelector(selector);
        return ref && ref.classList.add('active');
      }}>
        {children}
      </div>
    )
  }

  function CloseButton({selector, children}) {
      <div className="close" onClick={() => {
        const ref = document.querySelector(selector);
        return ref && ref.classList.remove('active');
      }}>
        {children}
      </div>
  }
