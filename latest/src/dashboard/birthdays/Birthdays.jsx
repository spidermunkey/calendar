import { useEffect, useState } from "react";

import { CreateForm } from "./CreateBirthdayForm";
import { NamedList} from './NameList';
import { BtnAdd } from "./AddButton";
import { CloseIcon } from "icons";
import { useAppState } from "../../context";

export const Birthdays = () => {
  const state = useAppState();
  const { currentMonth } = state;
  const [birthdays,setBirthdays] = useState([]);
  const [formActive,setFormActive] = useState(false);
  useEffect(() => {
    const update = async () => setBirthdays(await state.birthdays.getData())
    update();

  },[])
  return (
    <div className='interface-modal birthdays'>
      <div className="interface-header">
        <div className="interface-title">Birthdays</div>
        <div className="btn-close">
          <div className="label">close</div>
          <div className="icon"><CloseIcon/></div>
        </div>
      </div>
      <CreateForm add={state.birthdays.add.bind(state.birthdays)} isActive={formActive} setActive={setFormActive}/>
      <BtnAdd onClick={() => setFormActive(!formActive)}/>
      <NamedList currentMonth={currentMonth} birthdays={birthdays} onDelete={state.birthdays.destroy}/>
    </div>
  )
}

