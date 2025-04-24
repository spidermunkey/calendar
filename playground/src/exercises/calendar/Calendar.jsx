import { Month } from "./Month"
import { Header } from "./Header"
export const Calendar = () => {
  return (
  <>
    <div className="calendar">
      <Header/>
      <Month/>
    </div>
  </>
  )
}
