export const EventListItem = ({event}) => {
  return (
    <div className="event-list-item">{event.title}</div>
  )
}

export const EventList = ({ events, isActive }) => {
  const style = ["event-list", isActive && 'active'].filter(Boolean).join(' ')
  return (
    <div className={style}>
        <div className="close" onClick={() => {
        const ref = document.querySelector('.event-list');
        return ref && ref.classList.remove('active');
      }}>
        close
      </div>
      { events.map((event) => <EventListItem event={event}/>)}
    </div>
  )
}
