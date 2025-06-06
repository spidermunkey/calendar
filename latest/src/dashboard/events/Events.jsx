import { 
  GenericModal, 
  DailyModal, 
  dailyFrequency,
  monthlyFrequency, 
  weeklyFrequency,
  frequencyMap } from "./EventForms"

import { EventList } from "./Event"

import { PlusIcon, CursorLeftIcon } from "icons"
import { useEffect, useState, useRef } from "react"
import { useEventStore, useTabState } from "context"

export const Events = () => {

  const { events } = useEventStore();

  const [ template , setTemplate ] = useState({});
  const [ today, setToday ] = useState([]);
  const [ thisMonth, setThisMonth ] = useState([]);

  const eventListRef = useRef(null);
  const genericFormRef = useRef(null);
  const dailyFormRef = useRef(null);

  const [ eventListActive, setEventListActive ] = useState(false);
  const [ eventList, setEventList ] = useState([]);

  const { setActiveTab} = useTabState();

  const closeModal = () => setActiveTab(4);

  const handleData = async (formData) => {
    const response = await events.add(formData);
    const result = await response.json();
    console.log('event added',result);
  }
  
  const showDailyForm = () => {
    if (dailyFormRef.current){
      dailyFormRef.current.classList.add('active');
      console.log(genericFormRef)
      return genericFormRef.current && genericFormRef.current.classList.remove('active')
    }
  }

  const showGenericForm = () => {
    if (genericFormRef.current){
      genericFormRef.current.classList.add('active');
      return dailyFormRef.current && dailyFormRef.current.classList.remove('active')
    }
  }

  useEffect(() => {
    const refresh = async () => {
      setToday(await events.today());
      setThisMonth(await events.thisMonth());
    }
    refresh();
  },[])

  return (
    <>
      <div className="interface-modal events">
        <DailyModal ref={dailyFormRef} eventDate={template} handleSubmit={handleData}/>
        <GenericModal ref={genericFormRef} eventDate={template} handleSubmit={handleData}/>
        <div className="interface-header">
          <div className="interface-title" onClick={closeModal}><div className="btn-back"><CursorLeftIcon/></div>Events</div>
          <div className="btn-add-event" onClick={e => {
            setTemplate({
              frequencyType:'custom',
              frequency:'once',
              dynamic_frequency:{...frequencyMap},
            })
            showGenericForm();
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
                        setEventListActive(true);
                      }
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

