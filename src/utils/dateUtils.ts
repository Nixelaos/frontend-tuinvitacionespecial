/**
 * Utilidades para procesamiento y formateo automático de fechas de eventos.
 * Permite mantener una única fecha ISO centralizada y derivar automáticamente
 * todos los formatos necesarios (Google Calendar, ICS, displays en español, sellos, etc.).
 */

export interface EventDateFormats {
  /** Formato ISO original: '2027-10-22T17:00:00' */
  iso: string;
  /** Objeto Date instanciado */
  date: Date;
  /** Formato para Google Calendar e ICS: '20271022T170000' */
  startDateIcs: string;
  /** Formato de término para Google Calendar e ICS: '20271022T230000' */
  endDateIcs: string;
  /** Texto completo para el encabezado: 'Viernes, 22 de Octubre de 2027' */
  displayDateLong: string;
  /** Texto corto para mensajes: '22 de Octubre' */
  displayDateShort: string;
  /** Hora formateada: '17:00 hrs' */
  displayTime: string;
  /** Año para la estampilla: '2027' */
  stampYear: string;
  /** Día y mes corto para el matasellos: '22.OCT' */
  stampDate: string;
  /** Fecha límite de confirmación (display): '01 de Octubre de 2027' */
  rsvpDeadlineDisplay: string;
  /** Fecha límite de confirmación (corta): '01 de Octubre' */
  rsvpDeadlineShort: string;
}

const DAYS_ES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const MONTHS_ES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const SHORT_MONTHS_ES = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
];

const pad2 = (n: number): string => String(n).padStart(2, '0');

/**
 * Genera todos los formatos y derivados de fecha a partir de una única fecha ISO.
 *
 * @param isoString Fecha en formato 'YYYY-MM-DDTHH:mm:ss'
 * @param durationHours Duración estimada del evento en horas (por defecto 6)
 * @param rsvpDaysBefore Días de anticipación para la fecha límite de RSVP (por defecto 21)
 */
export const generateEventDateFormats = (
  isoString: string,
  durationHours = 6,
  rsvpDaysBefore = 21
): EventDateFormats => {
  const [datePart, timePart = '00:00:00'] = isoString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  // Instanciación local segura (evita desfasajes por zona horaria de UTC)
  const eventDate = new Date(year, month - 1, day, hours, minutes);

  // Formato ICS inicio: YYYYMMDDTHHmm00
  const startDateIcs = `${year}${pad2(month)}${pad2(day)}T${pad2(hours)}${pad2(minutes)}00`;

  // Formato ICS fin
  const endDate = new Date(eventDate.getTime() + durationHours * 3600 * 1000);
  const endDateIcs = `${endDate.getFullYear()}${pad2(endDate.getMonth() + 1)}${pad2(
    endDate.getDate()
  )}T${pad2(endDate.getHours())}${pad2(endDate.getMinutes())}00`;

  // Display largo y corto en español
  const dayName = DAYS_ES[eventDate.getDay()];
  const monthName = MONTHS_ES[month - 1];
  const displayDateLong = `${dayName}, ${day} de ${monthName} de ${year}`;
  const displayDateShort = `${day} de ${monthName}`;
  const displayTime = `${pad2(hours)}:${pad2(minutes)} hrs`;

  // Estampillas del sobre
  const stampYear = String(year);
  const stampDate = `${pad2(day)}.${SHORT_MONTHS_ES[month - 1]}`;

  // Fecha límite de RSVP
  const deadlineDate = new Date(eventDate.getTime() - rsvpDaysBefore * 86400 * 1000);
  const deadlineMonthName = MONTHS_ES[deadlineDate.getMonth()];
  const rsvpDeadlineDisplay = `${pad2(deadlineDate.getDate())} de ${deadlineMonthName} de ${deadlineDate.getFullYear()}`;
  const rsvpDeadlineShort = `${pad2(deadlineDate.getDate())} de ${deadlineMonthName}`;

  return {
    iso: isoString,
    date: eventDate,
    startDateIcs,
    endDateIcs,
    displayDateLong,
    displayDateShort,
    displayTime,
    stampYear,
    stampDate,
    rsvpDeadlineDisplay,
    rsvpDeadlineShort,
  };
};
