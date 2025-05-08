import { useState } from "react";
export const Tabber = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
  <div className="tabber">
    <div className="tabber-labels">
      { tabs.map((tab,index) => <button className={`tabber-tab text-[18px] ${tab.element == tabs[activeTab]?.element ? 'active': ""}`} key={index} onClick={() => setActiveTab(index)}> <div className="icon">{tab.icon}</div><div className="tool-tip">{tab.label}</div> </button>)}
    </div>
    <div className="tabber-modals">
      { tabs[activeTab].element }
    </div>
  </div>
    )
}
