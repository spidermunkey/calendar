import { useState } from "react";
const AddIcon = () => (<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" pid="m90dboff-008VMJ60Q1R9">
  <path d="M7.00739 12C7.00739 11.5858 7.34317 11.25 7.75739 11.25H11.25V7.75735C11.25 7.34314 11.5858 7.00735 12 7.00735C12.4142 7.00735 12.75 7.34314 12.75 7.75735V11.25H16.2427C16.6569 11.25 16.9927 11.5858 16.9927 12C16.9927 12.4142 16.6569 12.75 16.2427 12.75H12.75V16.2426C12.75 16.6569 12.4142 16.9926 12 16.9926C11.5858 16.9926 11.25 16.6569 11.25 16.2426V12.75H7.75739C7.34317 12.75 7.00739 12.4142 7.00739 12Z" fill="black" pid="m90dboff-01YOSV9KJNW8"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.31673 3.76876C10.4043 3.42368 13.5957 3.42368 16.6832 3.76876C18.5096 3.97288 19.9845 5.41153 20.1994 7.24849C20.5686 10.4054 20.5686 13.5946 20.1994 16.7515C19.9845 18.5885 18.5096 20.0271 16.6832 20.2313C13.5957 20.5763 10.4043 20.5763 7.31673 20.2313C5.49035 20.0271 4.01545 18.5885 3.8006 16.7515C3.43137 13.5946 3.43137 10.4054 3.8006 7.24849C4.01545 5.41153 5.49035 3.97288 7.31673 3.76876ZM16.5166 5.25948C13.5398 4.92677 10.4602 4.92677 7.48334 5.25948C6.33891 5.38738 5.42286 6.29063 5.29045 7.42274C4.93476 10.4639 4.93476 13.5361 5.29045 16.5773C5.42286 17.7094 6.33891 18.6126 7.48334 18.7405C10.4602 19.0732 13.5398 19.0732 16.5166 18.7405C17.6611 18.6126 18.5771 17.7094 18.7095 16.5773C19.0652 13.5361 19.0652 10.4639 18.7095 7.42274C18.5771 6.29063 17.6611 5.38738 16.5166 5.25948Z" fill="black" pid="m90dboff-006UGQEHQ36V"></path>
  </svg>)
const RemoveIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24px" height="24px" fill="#000" pid="m9ui3rai-01XS0A2U6GLN"><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm1 9h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z" fill="#000" pid="m9ui3rai-01RGG01XMDJH"></path></svg>)

export const CardForm = () => {

  const [title,setTitle] = useState('');
  const [answer,setAnswer] = useState('');
  const [description,setDescription] = useState('');

  const [options,setOptions] = useState([])

  const addOption = () => {
    const updated = [...options,'']
    setOptions(updated)
  }
  const removeOption = (index) => {
    setOptions(() => options.filter((_,i) => i !== index))
  }
  const editOption = (index,value) => {
    setOptions((options) => {
      const updated = [...options];
      updated[index] = value;
      return updated;
    })
  }

  const handleSubmit = async () => {
    const data = {
      title,
      answer,
      description,
      options: [...options]
    }
    const submit = async () => {
      return fetch('/api/flashcards',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
    const res = await submit()
    console.log('DAT',data, res)
    setAnswer('')
    setTitle('')
    setDescription('')
    setOptions([])
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
            <div className="btn-add-option"><span className="label" onClick={addOption}>add option</span><AddIcon/></div>
          </div>
          {options.map((option,index)=>{
            return(          
              <div className="inp card-answer-input">
                <div className="label">Enter Answer</div>
                <input required type="text" 
                  value={options[index] || ''} 
                  onChange={(event) => {
                    console.log(options)
                    editOption(index,event.target.value)
                  }}/>
                <div className="btn-remove-option" onClick={() => removeOption(index)}>
                    <span className="label" key={index} id={index}>remove option</span><RemoveIcon/>
                </div>
              </div>
            )
          })}
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
