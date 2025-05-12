import {Timer} from './Timer'
import { BtnAdd } from './AddButton'
import { useAppState } from '../../context'

export const Timers = () => {
  const state = useAppState();

  return (    
  <>
  <div className="timers flex-col p-12">
    <BtnAdd/>
    <Timer/>
  </div>

  </>
  )
}
