export type AttendanceStatus = 'yes' | 'no';

export interface MenuOption {
  id: string;
  label: string;
}

export interface InvitationGuestData {
  guestName: string;
  maxPasses: number;
  token: string | null;
}

export interface RsvpFormValues {
  attendance: AttendanceStatus;
  attendeesCount: number;
  selectedMenus: string[];
  allergies: string;
  song: string;
  dedication: string;
}

export interface RsvpEventConfig {
  eventTitle: string;
  coupleNames: string;
  uid: string;
  icsFileName: string;
  startDateIcs: string;
  endDateIcs: string;
  calendarDescription: string;
  location: string;
  rsvpDeadlineDisplay: string;
  rsvpDeadlineShort: string;
  eventDateShort: string;
  whatsappNumber: string;
}
