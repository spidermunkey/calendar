export const CardForm = () => {
  return (
  <>
    <div className="card-form">
      <div className="card-info">
        <div className="card-title">Add Flashcard</div>
        <div className="inp card-title-input">
          <div className="label">Enter word or phrase</div>
          <input type="text"/>
        </div>
        <div className="inp card-answer-input">
          <div className="label">Enter Answer</div>
          <input type="text" />
        </div>
        <div className="inp card-description-input">
          <div className="label">enter description/tag</div>
          <input type="text" />
        </div>
      </div>
      <div className="btn-add">
        <button>add to library</button>
      </div>
    </div>
  </>)
}
