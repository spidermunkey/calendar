import { useState } from "react";

export const StateExample = () => {
  // re-render on state change
  let [count,setCount] = useState(0)
  const increaseCount = () => {
    setCount(prev => prev + 1)
  }
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increaseCount}> Increase Counter</button>
    </div>
  )
}
