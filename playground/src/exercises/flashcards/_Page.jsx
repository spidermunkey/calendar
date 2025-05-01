import {useState} from 'react'
import { HelpWidget } from './help/HelpWidget'

import { CardForm } from './cards/CardForm';
import { CardList } from './cards/CardList';
const Flashcards = () => {
  const [helpActive, setHelpActive] = useState(false);
  const [refresh,setRefresh] = useState(false);
  const toggleHelp = () => setHelpActive(active => !active);
  return (
    <div className="app">
      <CardForm notifier={() => setRefresh(!refresh)}/>
      <CardList hasChanged={refresh}/>

      <HelpWidget active={helpActive} setActive={toggleHelp}/>
    </div>
  )
}

export default Flashcards
