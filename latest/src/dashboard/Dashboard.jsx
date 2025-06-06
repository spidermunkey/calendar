import { TabProvider, CalendarProvider, TimerProvider, EventProvider, TodoProvider} from 'context';
import { Calendar } from "./calendar/Calendar";
import { Header } from './Header';

export const Dashboard = () => {
  return (
    <TabProvider>
      <CalendarProvider>
        <TodoProvider>
        <EventProvider>
        <TimerProvider>

          <Header/>
          <Calendar/>
        
        </TimerProvider>
        </EventProvider>
        </TodoProvider>
      </CalendarProvider>
    </TabProvider>
  )
}
