import { eventMaps } from "utils"
import { useRef, useState, useEffect } from "react"
import { FloatingActionClose, FloatingActionToggle } from "../../components"
import { PlusIcon } from "../../assets/icons/plus"
import { CloseIcon } from "../../assets/icons"
import { useTodoStore } from "../../context/TodoContext"

export const Todos = () => {
  const todos = useTodoStore();
  const [list, setList] = useState([]);
  const [stale, setStale] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (stale){
        const data = await todos.getData();
        setList(data);
        setStale(false);
        console.log('data',data,1)
        return data;
      }

    }
    getData()
  },[stale] )
  return (
  <>
    <div className="tabber-modal todo-modal">
      <TodoForm onSubmit={async (event,form,data) => {
        if (!data.success || data.success == true){
          setStale(true);
        }
      }}/>
      <TodoList list={list}/>
    </div>
  </>
  )
}

export const TodoForm = ({onSubmit}) => {
  const todos = useTodoStore();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('NEW TODO',formData())
    const response = await todos.add(formData());
    const data = await response.json();
    console.log(data)
    if (onSubmit){
      onSubmit(event,formRef,data)
    }
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
        <div className="container">
          <div className="flexbox column">
            <div className="flexbox">
              <div className="field title-field">
                <input name="title" type="text" placeholder="title"/>
                <FloatingActionToggle ref={menuRef}> <div className="btn-open-menu"><PlusIcon/></div> </FloatingActionToggle>
              </div>
            </div>
            <div className="flexbox column">
              <div className="field opt-field description-field" ref={descriptionRef}>
                <textarea name="description" id=""></textarea>
                <FloatingActionClose ref={descriptionRef}><CloseIcon/></FloatingActionClose>
              </div>
              <div className="field opt-field time-field" ref={timeRef}>
                <input name="time" type="time" />
                <FloatingActionClose ref={timeRef}><CloseIcon/></FloatingActionClose>
              </div>
            </div>
          </div>
          <div className="field-menu" ref={menuRef}>
            <FloatingActionToggle ref={descriptionRef}> <div className="menu-option">descrition</div> </FloatingActionToggle>
            <FloatingActionToggle ref={timeRef}> <div className="menu-option">time</div> </FloatingActionToggle>
          </div>
        </div>

      </form>
    </div>

  )
}

export const TodoList = ({list}) => {
  return (
    <div className="todo-list">
      {
        list.length > 0 
        ? list.map(item => {
          return <div className="todo-item">{ item.title }</div>
        })
        : 'you have no todos'
      }
    </div>
  )
}
