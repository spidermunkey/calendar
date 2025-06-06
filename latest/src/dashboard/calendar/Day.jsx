export const Day = (props) => {
  return (
    <div key={props.key} day={props.day} className={props.styles}>
    <div className="markers">
      { ( props.events && props.events.isBirthday || props.isBday ) && <div className="bday-marker marker"></div> }
      { props.events && props.events.isEvent && <div className="event-marker marker"></div> }
      { props.events && props.events.isBill && <div className="bill-marker marker"></div> }
      { props.events && props.events.isDeposit && <div className="deposit-marker marker"></div> }
      { props.events && props.events.isDeadline && <div className="deadline-marker marker"></div> }
    </div>

    <div className="daynum">{props.day}</div>
    </div>
  )
}
