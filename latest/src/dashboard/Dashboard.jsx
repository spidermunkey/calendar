import { TabProvider, CalendarProvider, TimerProvider } from 'context';
import { Calendar } from "./calendar/Calendar";
import { Header } from './Header';

export const Dashboard = () => {
  return (
    <TabProvider>
      <CalendarProvider>
        <TimerProvider>

          <Header/>
          <Calendar/>
        
        </TimerProvider>
      </CalendarProvider>
    </TabProvider>
  )
}
