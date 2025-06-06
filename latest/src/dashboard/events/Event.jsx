import { useEffect, useRef, useState } from "react"
import { DateTime } from "../../utils"
import { ago } from "../../utils"
import { eventMaps } from "../../utils"
import { CheckIcon, CloseIcon, CursorLeftIcon } from "../../assets/icons"
import { PencilIcon } from "../../assets/icons/pencil"

import { useEventStore } from "../../context"

export const EventListItem = ({event,onSubmit}) => {
  const date = parseDate(event.date);
  const inputRef = useRef(null);
  const [title,setTitle] = useState(event.title);
  const [stale,setStale] = useState(false);
  const {events} = useEventStore();

  function parseDate(datestring){
    console.log(datestring)
    const today = new Date();
    const day = datestring.slice(-2);
    const month = datestring.slice(5,7);
    const year = datestring.slice(0,4);
    const date = new Date(year,month - 1,day);
    const context = ago(date.getTime());
    const dow = DateTime.day(date.getDay());
    const monthName = DateTime.month(date.getMonth());
    if (context.suffix === 'hours') context.string = 'today'
    return {
      day,
      month,
      year,
      dow,
      context,
      monthName,
    }
  }
  useEffect(() => {
    const updateTitle = async () => {
      console.log(title)
      const response = await events.update({
        ...event,
        title:title,
      })
      const result = await response.json();
      console.log('resy',result.title && result.title === title);
    }
    updateTitle();
  },[stale])
  return (
    <>
      <div className="event-list-item">
        
        <div className="event-list-item__controls">

        </div>
        <div className="event-list-item__context">{date.context.string}</div>

        <div className="event-list-item__container title-container">
          <div className="event-list-item__title" onClick={() => {
            if(inputRef.current){
              inputRef.current.querySelector('input').focus();
              inputRef.current.classList.add('active') 
            }
            return
          }}>{title}<PencilIcon/></div>
          <div className="event-list-item__date">{date.dow} {date.monthName} {date.day}</div>
          <div className="edit-input" ref={inputRef} onKeyDown={
            (e) => {
              if (eventMaps.enter(e)){
                inputRef.current.classList.remove('active')
                setTitle(e.target.value)
                setStale(true)
              }
            }
          }><input type="text" name="title" placeholder="enter new title..."/>
            <div className="btn-input btn-submit"onClick={(e) => {
              inputRef.current.classList.remove('active'); setTitle(inputRef.current.value); setStale(true) }}><CheckIcon/></div>
            <div className="btn-input btn-close" onClick={() => inputRef.current.classList.remove('active')}><CloseIcon/></div>
          </div>
        </div>

        <div className="event-list-item__frequency">
          <div className="event-list-item__marker" category={event.category}></div>
          
          {event.frequency} {event.category}</div>
      </div>
      
    </>
    
  )
}

export const EventList = ({ ref, events, isActive, setActive }) => {
  const style = ["event-list", isActive && 'active'].filter(Boolean).join(' ')
  return (
    <div ref={ref} className={style}>
        <div className="btn-back" onClick={() => setActive(false)}>
        <CursorLeftIcon/> back
      </div>
      { events.map((event) => event.date && event.id && <EventListItem event={event}/>)}
    </div>
  )
}
