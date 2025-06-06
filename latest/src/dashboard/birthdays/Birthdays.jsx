import { useEffect, useState } from "react";

import { BirthdayForm } from "./BirthdayForm";
import { BirthdayList } from './BirthdayList';
import { CursorLeftIcon } from "icons";
import { useAppStore, useTabState } from "context";

export const Birthdays = () => {
  const state = useAppStore();
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
      <div className="btn-toggle-form" onClick={() => setFormActive(!formActive)}>
        <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" pid="m91curqy-023IJ77B0GWW" height="18px" width="18px"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="#000" pid="m91curqy-00EU1KK6E105"></path></svg></div>
        <div className="label">Add Birthday</div>
      </div>
      <BirthdayList  currentMonth={currentMonth} birthdays={birthdays} onDelete={state.birthdays.destroy}/>
    </div>
  )
}

