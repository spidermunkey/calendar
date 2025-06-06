import { useState, useEffect } from 'react'
import { useTimerState, useTabState } from 'context'
import { Timer } from './Timer'
import { uuid } from 'utils'
import { PlusIcon, CursorLeftIcon } from 'icons'
  
export const Timers = () => {
  const { timers } = useTimerState();
  const [currentTab,setTab] = useState('timers');
  const [currentTimers,setCurrentTimers] = useState([]);
  const [createTimerModalActive,setCreateTimerModalActive] = useState(false);
  const {setActiveTab} = useTabState();
  const closeModal = () => setActiveTab(4);

  const parseTimers = timers => timers.map((timer,index) => <Timer key={timer.id} props={timer}/>);
  
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
        rest: data.rest || 5,
        sessions: data.sessions,
        type: data.type,
        id: uuid(),
      }

      timers.add(settings).then(res => console.log(res))
    }
  };
  
  useEffect(() => {
    const getTimers = async () => {
      const data = await timers.data;
      setCurrentTimers(data);
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
              <div className="label">Time</div>
              <input name="time" type="number"/>
            </div>
            <div className="type">
              <div className="label">Type</div>
              <select name="type">
                <option value="pomodoro">Pomodoro</option>
                <option value="timer">Timer</option>
                <option value="tracker">Tracker</option>
              </select>
            </div>
            <div className="break">
              <div className="label">Break</div>
              <input name="rest" type="number"/>
            </div>
            <div className="sessions">
              <div className="label">Sessions</div>
              <input name="sessions" type="number"/>
            </div>
              <div className="btn-toggle-form" onClick={handleForm}>
                <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" pid="m91curqy-023IJ77B0GWW" height="18px" width="18px"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="#000" pid="m91curqy-00EU1KK6E105"></path></svg></div>
                <div className="label">Add Timer</div>
              </div>
          </form>
        </div>
    </div>
    <div className="interface-modal timers flex-col p-12">

      <div className="interface-header">
         <div className="interface-title" onClick={closeModal}><div className="btn-back"><CursorLeftIcon/></div>Timers</div>
        <div className="btn-add-timer" onClick={() => setCreateTimerModalActive(true)}>
          <div className="icon"><PlusIcon/></div>
          <div className="label">New Timer</div>
        </div>

      </div>
      <div className="most-recent">
        <div className="section-title">
          Most Recent
        </div>
        {timers.activeTimer 
          ? <Timer key={timers.activeTimer.id} props={timers.activeTimer} />
          : <Timer key={'default'} props={{title:'focus',time:{minutes:25},type:'timer'}}/>
          }
      </div>
      <div tab="timers" className={`interface-tab ${currentTab === 'timers' ? 'active' : ''}`}>
        <div className="section-title">My Timers</div>
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
