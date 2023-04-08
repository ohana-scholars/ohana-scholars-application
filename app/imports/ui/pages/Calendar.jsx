import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => (
  <FullCalendar
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
  />
);

export default Calendar;
