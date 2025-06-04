import { TabProvider, CalendarProvider, TimerProvider, EventProvider } from 'context';
import { Calendar } from "./calendar/Calendar";
import { Header } from './Header';

export const Dashboard = () => {
  return (
    <TabProvider>
      <CalendarProvider>
        <EventProvider>
        <TimerProvider>

          <Header/>
          <Calendar/>
        
        </TimerProvider>
        </EventProvider>
      </CalendarProvider>
    </TabProvider>
  )
}
