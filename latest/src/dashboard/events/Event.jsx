
export const EventListItem = ({event}) => {
  console.log(event)
  return (
    <>
      <div className="event-list-item">
        <div className="event-list-item__marker" category={event.category}></div>
        <div className="event-list-item__date">{event.date}</div>
        <div className="event-list-item__title">{event.title}</div>
        <div className="event-list-item__category">{event.category}</div>
        <div className="event-list-item__frequency">{event.frequency}</div>
      </div>
      
    </>
    
  )
}

export const EventList = ({ ref, events, isActive, setActive }) => {
  const style = ["event-list", isActive && 'active'].filter(Boolean).join(' ')
  return (
    <div ref={ref} className={style}>
        <div className="close" onClick={() => setActive(false)}>
        close
      </div>
      { events.map((event) => <EventListItem event={event}/>)}
    </div>
  )
}
