export const CreateModal = ({onSubmit}) => (
  <div className="create-modal">
    <div className="modal-header">
      <div className="modal-title">Create Event</div>
      <div className="close" onClick={() => {
        const ref = document.querySelector('.interface-modal.events .create-modal')
        return ref && ref.classList.remove('active')
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
            <select name="category">
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
    <div className="btn-submit" onClick={onSubmit}>
      submit
    </div>
  </div>)
