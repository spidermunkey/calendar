import { Trash } from "icons"

export const Birthday = ({name,day,month,onDelete}) => {
  return (
    <>
      <div className="info">
        <span className="bday-element name">{name}</span>
        <span className="bday-element date">{month}/{day} </span>
      </div>

      <div className="btn-delete">
        <div className="bday-element del" onClick={onDelete}><Trash/></div>
      </div>
    </>
  )
}
