import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, Container } from 'react-bootstrap';

const Calendar = () => (
  <Container>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      // placeholder
      events={[
        { title: 'event 1', date: '2023-04-01' },
        { title: 'event 2', date: '2023-04-02' },
      ]}
    />
    <Button>Add Session</Button>
  </Container>
);

export default Calendar;
