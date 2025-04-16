import { useRef, useEffect, useState } from "react";

export const RefExample = () => {
  const onClick = () => {
    const element = inputRef.current
    console.log(element.value)
    element.focus()
    element.value = 'Pedro'
  }

  const inputRef = useRef()

  useEffect(() => {
    console.log("Page Rerendered")
  })
  
  return (
  <>
    <input type="text" ref={inputRef} />
    <button className="button" onClick={onClick}>Console Log</button>
  </>
  )
}

export const RefExample2 = () => {
  const [count, setCount] = useState(0);
  const previousCount = useRef(0);
  useEffect(() => {
    previousCount.current = count
  },[count])
  return (
  <>
    <div className="column">
      <div>
        <p>Count: {count}</p>
      </div>
      <div>
        <p>Previous Count: {previousCount.current} </p>
      </div>
      <div>
        <button className="button" onClick={() => setCount(prev => prev + 1)}>Increment</button>
      </div>
    </div>

  </>
  )
}
