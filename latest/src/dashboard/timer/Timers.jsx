import {Timer} from './Timer'
import { BtnAdd } from './AddButton'
import { useAppState } from 'context'
import { CloseIcon } from 'icons'
import { useCallback, useState } from 'react'
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
  const state = useAppState();
  const timers = state.timers;
  console.log(timers)
  const [currentTab,setTab] = useState('timers');
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
  return (
  <>
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
      <div className="timer-list">

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
