export const Day = (props) => {
  return (
  <div key={props.key} 
       day={props.day} 
       className={props.styles}>
  {props.isBday ? <div className="bday-marker"></div> : ''}
  <div className="daynum">{props.day}</div>
  </div>
  )
}
