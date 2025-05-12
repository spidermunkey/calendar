import { useEffect, useState } from "react";

import { CreateForm } from "./CreateBirthdayForm";
import { NamedList} from './NameList';
import { BtnAdd } from "./AddButton";
import { CloseIcon } from "icons";

export const Birthdays = ({ birthdays, add , update , remove , currentMonth}) => {
  const [formActive,setFormActive] = useState(false);
  useEffect(update,[birthdays])
  return (
    <div className='interface-modal birthdays'>
      <div className="interface-header">
        <div className="interface-title">Birthdays</div>
        <div className="btn-close">
          <div className="label">close</div>
          <div className="icon"><CloseIcon/></div>
        </div>
      </div>
      <CreateForm add={add} isActive={formActive} setActive={setFormActive}/>
      <BtnAdd onClick={() => setFormActive(!formActive)}/>
      <NamedList currentMonth={currentMonth} birthdays={birthdays} onDelete={remove}/>
    </div>
  )
}

