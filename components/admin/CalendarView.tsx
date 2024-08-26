"use client"
import React, { useRef, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
// import '@fullcalendar/daygrid/main.css';

const CalendarView = () => {
  const calendarEl = useRef(null);

  useEffect(() => {
    if (calendarEl.current) {
      const calendar = new Calendar(calendarEl.current, {
        weekends:false,
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: '',
            // center: 'title',
            right: 'prev,next'
            // right: 'prev,next'
          }
      });

      calendar.render();
    }

    
    return () => {
    //   if (calendarEl.current) {
    //     calendar.destroy();
    //   }
    };
  }, []);

  return (
    <div ref={calendarEl}></div>
  );
};

export default CalendarView;
