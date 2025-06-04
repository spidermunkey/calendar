import { Cursor } from "./Cursor";
import { TabTray } from "./Tabs";

export const Header = () => {
  return (
    <div className="cal-month-header">
        <Cursor />
        <TabTray/>
    </div>
  )
}
