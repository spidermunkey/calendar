export const EventListItem = ({event}) => {
  return (
    <div className="event-list-item">{event.title}</div>
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
