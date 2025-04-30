import {useState} from 'react'
import { HelpWidget } from './help/HelpWidget'

import { CardForm } from './cards/CardForm';

const Flashcards = () => {
  const [helpActive, setHelpActive] = useState(false);
  const toggleHelp = () => setHelpActive(active => !active);
  return (
    <div className="app">
      <CardForm/>


      <HelpWidget active={helpActive} setActive={toggleHelp}/>
    </div>
  )
}

export default Flashcards
