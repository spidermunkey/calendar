import { TabProvider, CalendarProvider, TimerProvider, EventProvider } from 'context';
import { Calendar } from "./calendar/Calendar";
import { Header } from './Header';
import { TodoProvider } from '../context/TodoContext';

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
