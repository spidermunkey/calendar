import { eventMaps } from "utils"
import { useRef, useState } from "react"
import { FloatingActionClose, FloatingActionToggle } from "../../components"
import { PlusIcon } from "../../assets/icons/plus"
import { CloseIcon } from "../../assets/icons"

export const Todo = () => {
  
  return (
  <>
    <div className="tabber-modal todo-modal">
      <TodoForm/>
      <div className="todo-list">

      </div>
    </div>
  </>
  )
}

export const TodoForm = () => {
  
  const [descriptionActive,setDescriptionActive] = useState(false);
  const [timeActive,setTimeActive] = useState(false);

  const cosms = useRef([]);
  const formRef = useRef(null);
  const menuRef = useRef(null); 
  const descriptionRef = useRef(null);
  const timeRef = useRef(null);

  const form = () => formRef.current;
  const formData = () => Object.fromEntries(new FormData(form()));
  const input = (formField) => formField.querySelector(input);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('NEW TODO',formData())
  }

  const handleClick = (event) => {
    // if (menuRef.current && !event.target.closest('.field-menu') && menuRef.current.classList.contains('active'))
    //   menuRef.current.classList.remove('active')
  }

  const handleShortcuts = (event) => {
    if (eventMaps.enter(event)){
      console.log('TODO SUBMISSION REQUESTED', formData() );
    }
  }




  return (
    <div className="todo-form">
      <form ref={formRef} name={'todo'} onSubmit={handleSubmit} onKeyDown={handleShortcuts} onClick={handleClick}>
        <div className="field title-field">
          <input name="title" type="text" placeholder="title"/>
          <FloatingActionToggle ref={menuRef}> <div className="btn-open-menu"><PlusIcon/></div> </FloatingActionToggle>
          <div className="field-menu" ref={menuRef}>
            <FloatingActionToggle ref={descriptionRef}> <div className="menu-option">descrition</div> </FloatingActionToggle>
            <FloatingActionToggle ref={timeRef}> <div className="menu-option">time</div> </FloatingActionToggle>
          </div>
        </div>
        <div className="field opt-field description-field" ref={descriptionRef}>
          <textarea name="description" id=""></textarea>
          <FloatingActionClose ref={descriptionRef}><CloseIcon/></FloatingActionClose>
        </div>
        <div className="field opt-field time-field" ref={timeRef}>
          <input name="time" type="time" />
          <FloatingActionClose ref={timeRef}><CloseIcon/></FloatingActionClose>
        </div>
      </form>
    </div>

  )
}
