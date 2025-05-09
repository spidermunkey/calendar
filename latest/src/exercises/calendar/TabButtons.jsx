export const TabButton = ({ isActive, handleActiveTab , label }) => {
return (
  <button 
  className={`tabber-tab text-[18px] ${ isActive ? 'active': ""}`} 
  onClick={handleActiveTab}> 
    {label} 
    </button>)
}