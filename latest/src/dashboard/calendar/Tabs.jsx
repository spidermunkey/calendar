

import { useTabState } from "context";

export const TabTray = () => {
  const { Tabs, setActiveTab, activeTab } = useTabState();
  return ( 
  <div className="tabber-labels">
    { Tabs.map(
          (tab,i) => {
          if (tab.buttonType === 'inline')
            return ( 
            <div 
            className={`tabber-tab ${ tab.element == Tabs[activeTab]?.element && 'active'}`} 
            key={i} 
            onClick={() => {
              if(activeTab !== i) {
                setActiveTab(i)
              }else {
                setActiveTab(4)
              }

            }}> 
                <div className="icon">{tab.icon}</div>
                <div className="tool-tip">{tab.label}</div> 
              </div>)
      })}
  </div> )
}

export const TabModal = () => {
  const { Tabs, activeTab } = useTabState();
  return (<div className="tabber-modals">{Tabs[activeTab].element()}</div>)
}
