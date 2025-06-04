export const Day = (props) => {
  return (
    <div key={props.key} 
        day={props.day} 
        className={props.styles}>
    <div className="markers">
      { props.isBday && <div className="bday-marker marker"></div> }
      { props.isEvent && <div className="event-marker marker"></div> }
    </div>

    <div className="daynum">{props.day}</div>
    </div>
  )
}
