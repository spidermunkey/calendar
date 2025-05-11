import { useEffect, useState } from "react";

import { CreateForm } from "./CreateBirthdayForm";
import { NamedList} from './NameList';
import { BtnAdd } from "./AddButton";

export const Birthdays = ({birthdays,add,update,remove,currentMonth}) => {
  const [formActive,setFormActive] = useState(false);
  useEffect(update,[birthdays])
  return (
    <div className='birthdays flex-col p-12'>
      <CreateForm add={add} isActive={formActive} setActive={setFormActive}/>
      <BtnAdd onClick={() => setFormActive(!formActive)}/>
      <NamedList currentMonth={currentMonth} birthdays={birthdays} onDelete={remove}/>
    </div>
  )
}

