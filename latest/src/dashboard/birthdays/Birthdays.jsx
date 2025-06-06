import { useEffect, useState } from "react";

import { BirthdayForm } from "./BirthdayForm";
import { BirthdayList } from './BirthdayList';
import { BtnAdd } from "./AddButton";
import { CursorLeftIcon } from "icons";
import { useAppState, useTabState } from "../../context";

export const Birthdays = () => {
  const state = useAppState();
  const { currentMonth } = state;
  const {setActiveTab} = useTabState();
  const closeModal = () => {
    setActiveTab(4);
  }
  const [birthdays,setBirthdays] = useState([]);
  const [formActive,setFormActive] = useState(false);
  useEffect(() => {
    const update = async () => setBirthdays(await state.birthdays.getData())
    update();

  },[])
  return (
    <div className='interface-modal birthdays'>
      <div className="interface-header">
        <div className="interface-title" onClick={closeModal}><div className="btn-back"><CursorLeftIcon/></div>Birthdays</div>

      </div>
      <BirthdayForm add={state.birthdays.add.bind(state.birthdays)} isActive={formActive} setActive={setFormActive}/>
      <BtnAdd onClick={() => setFormActive(!formActive)}/>
      <BirthdayList  currentMonth={currentMonth} birthdays={birthdays} onDelete={state.birthdays.destroy}/>
    </div>
  )
}

