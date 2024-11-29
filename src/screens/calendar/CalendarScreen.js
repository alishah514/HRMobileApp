import React from 'react';
import GoogleCalendar from './GoogleCalendar';

export default function CalendarScreen() {
  return (
    <GoogleCalendar
      calendarId="syedalisultanbukhari5@gmail.com"
      timezone="Asia/Karachi"
    />
  );
}
