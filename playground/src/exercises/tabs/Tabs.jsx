import { useState } from "react";
export const Tabber = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
  <div className="tabber">
    <div className="tabber-labels">
      { tabs.map((tab,index) => <button className="tabber-tab text-[18px]" key={index} onClick={() => setActiveTab(index)}> {tab.label} </button>)}
    </div>
    <div className="tabber-modals">
      { tabs[activeTab].element }
    </div>
  </div>
    )
}
