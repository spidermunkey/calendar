import { PlusIcon } from "../../assets/icons/plus"
export const EventModal = () => {
  return (
  <>
    <div className="interface-modal events">

      <div className="interface-header">
        <div className="interface-title">Events</div>
      </div>

      <div className="section daily">
        <div className="section-title">Today</div>
        <div className="section-data">
          <div className="bullet">none</div>
        </div>
        <div className="btn-add-event">
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
        <div className="btn-add-event">
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
        <div className="btn-add-event">
          <div className="text">Add Monthly Event</div>
          <div className="btn-add-icon" handle="daily">
            <PlusIcon/>
          </div>
        </div>
      </div>
      
    </div>
  </>
  )
}
