
import { TabModal } from './Tabs';
import { Header } from './Header';
import { Month } from "./Month";

export const Calendar = () => {
  return (
        <>
          <div className="calendar">
            <div className="flexbox column">
              <Header/>
              <Month/>
            </div>
            <TabModal/>
          </div>
        </>
  )
}
