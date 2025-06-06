import { eventMaps, uuid } from "utils"
import { useRef, useState, useEffect } from "react"
import { PlusIcon, CheckIcon, CloseIcon2, PencilIcon, CursorLeftIcon  } from "icons"
import { useTodoStore, useCalendarStore, useTabState } from "context"

export const Todo = ({item, onComplete, onDelete}) => {
  return (
    <div className={[`todo-item`,item.status === 'complete' && 'complete'].filter(Boolean).join(' ')} id={item.id}>
      <div className="item-text">{item.title}
      {
        item.status === 'complete' ? 
          item.title.length > 60 
            ? <><div className="marker complete-marker-1"></div> <div className="marker complete-marker-2"></div> <div className="marker complete-marker-3"></div></>
            : item.title.length > 20 
              ? <><div className="marker complete-marker-1"></div> <div className="marker complete-marker-3"></div> </>
            : <div className="complete-marker marker"></div> : false
      }
      </div>

      <div className="item-control">
        <div className="complete" onClick={() => onComplete(item)}><div className="icon"><CheckIcon/></div></div>
        <div className="destroy" onClick={onDelete}><div className="icon"><CloseIcon2/></div></div>
        {/* <div className="edit"><div className="icon"><PencilIcon/></div></div> */}
      
      </div>
    </div>
  )
}
export const Todos = () => {
  const todos = useTodoStore();
  const { calendar } = useCalendarStore();
  const {month,day,year} = calendar;
  const [list, setList] = useState([]);
  const [stale, setStale] = useState(true);

  const {setActiveTab} = useTabState();
  const closeModal = () => {
    setActiveTab(4);
  }
  const onDelete = async (event) => {
    const id = event.target.closest('.todo-item').getAttribute('id')
    console.log(id)
    if (id){
      const response = await todos.remove(id)
      console.log('item deletion requested',id,response.json())
      setStale(true);
    }
  }
  const onComplete = async (item) => {
    console.log(item)
    if (item){
      const response = await todos.update({
        ...item,
        status: 'complete',
        completed_at: Date.now(),
      })
      const result = await response.json();
      console.log('item edit requested', result)
      setStale(true);
    }
  }
  useEffect(() => {
    setStale(true)
  },[day,month,year])
  useEffect(() => {
    const getData = async () => {
      if (stale){
        const todosByCurrentDate = await todos.fetch(calendar.date);
        setList(todosByCurrentDate);
        setStale(false);
        return todosByCurrentDate;
      }
    }
    getData()
  },[stale] )
  return (
  <>
    <div className="interface-modal todos">
      <div className="interface-header">
        
        <div className="interface-title" onClick={closeModal}><div className="btn-back"><CursorLeftIcon/></div>Todo</div>
      </div>
      <TodoForm onSubmit={async (event,form,data) => {
        if (!data.success || data.success == true){
          setStale(true);
        }
      }}/>
      <div className="todo-list">
        {
          list.filter(item => item.id).length > 0 
          ? list.map((item,index) => item.id && <Todo key={index} item={item} onComplete={onComplete} onDelete={onDelete} />)
          : 'you have no todos'
        }
      </div>
    </div>
  </>
  )
}

export const TodoForm = ({onSubmit}) => {
  const todos = useTodoStore();
  const { calendar } = useCalendarStore();
  const [title, setTitle] = useState('');
  const formRef = useRef(null);

  const form = () => formRef.current;
  const formData = () => Object.fromEntries(new FormData(form()));
  const input = (formField) => formField.querySelector(input);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('NEW TODO',formData())
    const response = await todos.add({...formData(), date: calendar.date, id:uuid() });
    const data = await response.json();
    console.log(data)
    if (onSubmit){
      onSubmit(event,formRef,data)
    }
    setTitle('')
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
                <input name="title" type="text"  onChange={e => setTitle(e.target.value)} value={title} placeholder="enter a new item..." required />
                <div className="btn-submit"><PlusIcon/></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

