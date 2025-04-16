import { useReducer } from "react";

const reducerFunc = (state, action) => {
  switch(action.type){
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'double':
      return { count: state.count * 2 }
    default: console.log('invalid action type')
  }
}

export const ReducerExample = () => {
  const [state, dispatch ] = useReducer( reducerFunc , { count: 0 });

  return (
      <div>
        <p> Count: {state.count} </p>
        <button onClick={() => dispatch({type: "increment"}) }>+</button>
        <button onClick={() => dispatch({type: "decrement"})}>-</button>
        <button onClick={() => dispatch({type: "double"})}>*</button>
      </div>
  )
}
