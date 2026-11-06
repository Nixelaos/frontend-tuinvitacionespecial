import type { RsvpEventConfig } from '../types/rsvp';

/**
 * Construye la URL para agregar el evento directamente a Google Calendar.
 */
export const buildGoogleCalendarUrl = (config: RsvpEventConfig): string => {
  const { eventTitle, startDateIcs, endDateIcs, calendarDescription, location } = config;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${startDateIcs}/${endDateIcs}&details=${encodeURIComponent(
    calendarDescription
  )}&location=${encodeURIComponent(location)}`;
};

/**
 * Genera y descarga un archivo .ics compatible con Apple Calendar y Outlook.
 */
export const downloadIcsFile = (config: RsvpEventConfig): void => {
  const {
    eventTitle,
    uid,
    icsFileName,
    startDateIcs,
    endDateIcs,
    calendarDescription,
    location,
  } = config;

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tu Invitacion Especial//Evento//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${eventTitle}`,
    `UID:${uid}`,
    `DTSTART:${startDateIcs}`,
    `DTEND:${endDateIcs}`,
    `DESCRIPTION:${calendarDescription}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', icsFileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
