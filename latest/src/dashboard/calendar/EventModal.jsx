import { PlusIcon } from "../../assets/icons/plus"
import { useState } from "react"


const CreateModal = () => (
  <div className="create-modal">
    <div className="interface-header">
      <div className="interface-title">Create Event</div>
      <div className="close" onClick={() => {
      document.querySelector('.interface-modal.events .create-modal').classList.remove('active')
      }}>close</div>
    </div>
  </div>)

export const EventModal = () => {
  const [view,setCurrentView] = useState('')
      
  const closeModal = () => document.querySelector('.interface-modal.events .create-modal').classList.remove('active')
      if (view === 'daily'){
      return (
        <div className="interface-modal events">
          <CreateModal/>
          <div className="interface-header">
            <div className="interface-title">Events Today</div>
            <div className="close" onClick={()=> {
              setCurrentView('');
              closeModal();
            }}>close</div>
          </div>
        </div>
      )}
      else if (view === 'weekly'){
        return (
          <div className="interface-modal events">
            <CreateModal/>

          <div className="interface-header">
            <div className="interface-title">Events This Week</div>
            <div className="close" onClick={()=> {
              setCurrentView('');
              closeModal();
            }}>close</div>
          </div>
          </div>
      )}
      else if (view === 'monthly'){
        return (
          <div className="interface-modal events">
            <CreateModal/>
          <div className="interface-header">
            <div className="interface-title">Events This Month</div>
            <div className="close" onClick={()=> {
              setCurrentView('');
              closeModal();
            }}>close</div>
          </div>
          </div>
      )}
      else {
        return (
        <>
          <div className="interface-modal events">
            <CreateModal/>
            <div className="interface-header">
              <div className="interface-title">Events</div>
            </div>

            <div className="section daily">
              <div className="section-title">Today</div>
              <div className="section-data">
                <div className="bullet">none</div>
              </div>
              <div className="btn-add-event" onClick={() => {
                setCurrentView(('daily'))
                document.querySelector('.interface-modal.events .create-modal').classList.add('active')

              }}>
                <div className="text">Add Daily Event</div>
                <div className="btn-add-icon" handle="daily">
                  <PlusIcon/>
                </div>
              </div>
            </div>
            <div className="section weekly">
              <div className="section-title">This Week</div>
              <div className="section-data">
                <div className="bullet">none</div>
              </div>
              <div className="btn-add-event" onClick={() => {
                setCurrentView('weekly')
                document.querySelector('.interface-modal.events .create-modal').classList.add('active')
              }}>
                <div className="text">Add Weekly Event</div>
                <div className="btn-add-icon" handle="daily">
                  <PlusIcon/>
                </div>
              </div>
            </div>
            <div className="section monthly">
              <div className="section-title">This Month</div>
              <div className="section-data">
                <div className="bullet">none</div>
              </div>
              <div className="btn-add-event" onClick={() => {
                setCurrentView('monthly')
                document.querySelector('.interface-modal.events .create-modal').classList.add('active')
              }}>
                <div className="text">Add Monthly Event</div>
                <div className="btn-add-icon" handle="daily">
                  <PlusIcon/>
                </div>
              </div>
            </div>
            
          </div>
        </>
        )}
}
