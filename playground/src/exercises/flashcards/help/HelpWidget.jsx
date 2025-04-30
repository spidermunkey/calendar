import { HelpIcon } from './HelpIcon'
import { HelpMenu } from './HelpMenu'
export const HelpWidget = ({ active, setActive}) => {
  return (
    <div className="help-widget">
      <HelpMenu className={`help-menu ${active ? 'active' : ''}`}/>
      <HelpIcon onClick={setActive} className={`help-icon ${active ? 'active' : ''}`}/>
    </div>
  )
}

