import { useState } from "react";

export const CardForm = () => {

  const [title,setTitle] = useState('');
  const [answer,setAnswer] = useState('');
  const [description,setDescription] = useState('');
  const handleSubmit = async () => {
    const data = {
      title,
      answer,
      description
    }
    const submit = async () => {
      await fetch('/api/flashcards',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
    await submit()
    console.log('DAT',data, submit)
    setAnswer('')
    setTitle('')
    setDescription('')
  }
  return (
  <>
    <div className="card-form">
      <form onSubmit={async (event) => {
            event.preventDefault();
            await handleSubmit()
          }}>
        <div className="card-info">
          <div className="card-title">Add Flashcard</div>
          <div className="inp card-title-input">
            <div className="label">Enter word or phrase</div>
            <input required type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
          </div>
          <div className="inp card-answer-input">
            <div className="label">Enter Answer</div>
            <input required type="text" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
          </div>
          <div className="inp card-description-input">
            <div className="label">enter description/tag</div>
            <input type="text" value={description} onChange={(event) => setDescription(event.target.value)}/>
          </div>
        </div>
        <div className="btn-add">
          <button type="submit">add to library</button>
        </div>
      </form>

    </div>
  </>)
}
