import {Timer} from './Timer'
import { BtnAdd } from './AddButton'
import { useAppState } from 'context'
import { CloseIcon } from 'icons'
import { useCallback, useState } from 'react'
export const Timers = () => {
  const state = useAppState();
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
      <div className="interface-title">Timer Tracker</div>
      <div className="btn-close">
        <div className="label">close</div>
        <div className="icon"><CloseIcon/></div></div>
    </div>
    <div className="tab-tray" onClick={toggleActiveTab}>
      <div className={`tab ${currentTab === 'timers' ? 'active' : ''}`} tab="timers">timers</div>
      <div className={`tab ${currentTab === 'trackers' ? 'active' : ''}`} tab="trackers">trackers</div>
      <div className={`tab ${currentTab === 'dates' ? 'active' : ''}`} tab="dates">dates</div>
    </div>
    
    <div tab="timers" className={`interface-tab ${currentTab === 'timers' ? 'active' : ''}`}>
      <BtnAdd/>
      <Timer/>
    </div>
    <div tab="trackers" className={`interface-tab ${currentTab === 'trackers' ? 'active' : ''}`}>
      trackers
    </div>
    <div tab="timers" className={`interface-tab ${currentTab === 'dates' ? 'active' : ''}`}>
      dates
    </div>
  </div>

  </>
  )
}
