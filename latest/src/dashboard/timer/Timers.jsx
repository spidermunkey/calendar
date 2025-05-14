import {Timer} from './Timer'
import { BtnAdd } from './AddButton'
import { useAppState } from 'context'
import { CloseIcon } from 'icons'
import { uuid } from 'utils'

import { useCallback, useState, useEffect } from 'react'
import { PlusIcon } from '../../assets/icons/plus'
const FavoriteTimerTemplate = () => {
  return (
    <div className="favorite-timer favorite">
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" pid="m91x24ts-01LWS811JV39">
      <path d="M12 17V7" stroke="black" stroke-width="1.5" stroke-linecap="round" pid="m91x24ts-00PZJJP4KRQZ"></path>
      <path d="M7 12L17 12" stroke="black" stroke-width="1.5" stroke-linecap="round" pid="m91x24ts-01D8ZJNF6NYJ"></path>
    </svg>
    </div>
  )
}
export const Timers = () => {
  const {timers} = useAppState();
  console.log(timers)
  const [currentTab,setTab] = useState('timers');
  const [currentTimers,setCurrentTimers] = useState([]);
  const [createTimerModalActive,setCreateTimerModalActive] = useState(false)
  const toggleActiveTab = useCallback((event) => {
    const selected = event.target.closest('.tab')
    if (selected){
      const tabTray = event.target.closest('.tab-tray');
      const tabs = tabTray.querySelectorAll('.tab');
      tabs.forEach(tab => tab.classList.remove('active'));
      selected.classList.add('active');
      setTab(selected.getAttribute('tab'));
    }

  },[])
  const parseTimers = timers => timers.map(timer => <Timer {...timer}/>)
  const handleForm = (event) => {
    const form = event.target.closest('form');
    if (form){
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const settings = {
        title: data.title,
        category: data.category,
        time: {
          minutes: data.time
        },
        rest: data.break || 5,
        sessions: data.sessions,
        id: uuid(),
      }
      timers.add(settings).then(res => console.log(res))
    }
  }
  useEffect(() => {
    const getTimers = async () => {
      const data = await timers.data;
      setCurrentTimers(data)
    }
    getTimers();
  },[])
  return (
  <>
  <div className={[`create-timer-modal`,createTimerModalActive && 'active'].filter(Boolean).join(' ')}>
      <div className="modal-header">
        <div className="modal-title">New Timer</div>
        <div className="close" onClick={() => setCreateTimerModalActive(false)}>close</div>
      </div>
      <div className="form" onSubmit={(event) => event.preventDefault()}>
        <form>
          <div className="title">
            <div className="label">Title</div>
            <input name="title" type="text" spellCheck="false" />
          </div>
          <div className="category">
            <div className="label">Category</div>
            <input name="category" type="text" spellCheck="false" />
          </div>
          <div className="time">
            <div className="time">Time</div>
            <input name="time" type="number"/>
          </div>
          <div className="break">
            <div className="break">Break</div>
            <input name="break" type="number"/>
          </div>
          <div className="sessions">
            <div className="label">Sessions</div>
            <input name="sessions" type="number"/>
          </div>
          <BtnAdd onClick={handleForm}/>
        </form>
      </div>
  </div>
  <div className="interface-modal timers flex-col p-12">

    <div className="interface-header">
      <div className="interface-title">Timers</div>
      <div className="btn-close">
        <div className="label">close</div>
        <div className="icon"><CloseIcon/></div></div>
    </div>
    <div className="tab-tray" onClick={toggleActiveTab}>
      <div className={`tab ${currentTab === 'timers' ? 'active' : ''}`} tab="timers">timers</div>
      <div className={`tab ${currentTab === 'trackers' ? 'active' : ''}`} tab="trackers">trackers</div>
    </div>
    <div className="favorites">
      <div className="section-title">Favorites</div>
      <div className="favorite-tray">
        <FavoriteTimerTemplate/>
        <FavoriteTimerTemplate/>
        <FavoriteTimerTemplate/>
        <FavoriteTimerTemplate/>
        <FavoriteTimerTemplate/>
      </div>
    </div>
    <div className="most-recent">
      <div className="section-title">
        Most Recent
      </div>
      <Timer/>
    </div>
    <div tab="timers" className={`interface-tab ${currentTab === 'timers' ? 'active' : ''}`}>
      <div className="section-title">My Timers</div>
      <div className="btn-add-timer" onClick={() => setCreateTimerModalActive(true)}><div className="icon"><PlusIcon/></div><div className="label">New Timer</div></div>

      <div className="timer-list">
        {currentTimers.length == 0 ? <div className='bullet'>You have no timers saved</div>:
          parseTimers(currentTimers)
        }
      </div>
    </div>
    <div tab="trackers" className={`interface-tab ${currentTab === 'trackers' ? 'active' : ''}`}>
      <div className="section-title">My Trackers</div>
      <div className="tracker-list">
        
      </div>
    </div>
  </div>

  </>
  )
}
