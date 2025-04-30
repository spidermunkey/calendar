import {useState} from 'react'
import { HelpWidget } from './HelpWidget'

const Flashcards = () => {
  const [helpActive, setHelpActive] = useState(false);
  const toggleHelp = () => setHelpActive(active => !active);
  return (
    <div className="app">
      <HelpWidget active={helpActive} setActive={toggleHelp}/>
    </div>
  )
}

export default Flashcards
