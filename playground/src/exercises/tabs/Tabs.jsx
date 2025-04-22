import { useState } from "react";
export const Tabber = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
  <div className="tabber flex flex-col center">
    <div className="tabber-labels flex items-center justify-evenly border">
      { tabs.map((tab,index) => <button className="text-[18px]" key={index} onClick={() => setActiveTab(index)}> {tab.label} </button>)}
    </div>
    <div className="tabber-modals">
      { tabs[activeTab].element }
    </div>
  </div>
    )
}
