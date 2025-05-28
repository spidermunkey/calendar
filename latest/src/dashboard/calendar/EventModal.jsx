import { PlusIcon } from "../../assets/icons/plus"
import { useState } from "react"


const CreateModal = () => (
  <div className="create-modal">
    <div className="modal-header">
      <div className="modal-title">Create Event</div>
      <div className="close" onClick={() => {
      document.querySelector('.interface-modal.events .create-modal').classList.remove('active')
      }}>close</div>
    </div>
    <div className="modal-content">
      <div className="modal-form">
        <form action="">
          <div className="title modal-form-section">
            <div className="input-label">Event Title</div>
            <input className="input" type="text" placeholder="event title"></input>
          </div>
          <div className="description modal-form-section">
            <div className="input-label">Event Description</div>
            <textarea name="description"></textarea>
          </div>

          <div className="category modal-form-section">
            <div className="input-label">Category</div>
            <select name="category" id="">
              <option value="">General</option>
              <option value="">Bill</option>
              <option value="">Deadline</option>
              <option value="">Birthday</option>
              <option value="">Deposit</option>
              <option value="">Holiday</option>
            </select>
          </div>
          <div className="time modal-form-section">
            <div className="input-label">Time</div>
            <div className="checkbox">
              <div className="input-label">all day</div>
              <input type="checkbox" checked/>
            </div>
          </div>

          <div className="frequency modal-form-section">
            <div className="input-label">Frequency</div>
            <div className="input-options">
              <div className="opt-1">Once</div>
              <div className="opt-2">Dynamic</div>
              <div className="opt-3">Dated</div>
            </div>
            <div className="frequency-modal">

            </div>
          </div>
        </form>

      </div>
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
            }}>back</div>
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
            }}>back</div>
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
            }}>back</div>
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
