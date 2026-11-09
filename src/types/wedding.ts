export type StyleCategory =
  | 'Todos'
  | 'Editorial Clásico'
  | 'Botánico & Salvia'
  | 'Minimalista Lujo'
  | 'Hacienda & Romántico';

export interface ItineraryEvent {
  time: string;
  title: string;
  location?: string;
  iconType: string;
}

export interface InvitationTemplate {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: Exclude<StyleCategory, 'Todos'>;
  price: number;
  originalPrice?: number;
  badge?: string;
  isPopular?: boolean;
  shortDescription: string;
  description: string;
  coupleDemo: {
    bride: string;
    groom: string;
    initials: string;
    date: string;
    displayDate: string;
    city: string;
    ceremonyVenue: string;
    ceremonyTime: string;
    receptionVenue: string;
    receptionTime: string;
    dressCode: string;
    quote: string;
    songTitle: string;
    songArtist: string;
  };
  palette: {
    name: string;
    bgHex: string;
    cardHex: string;
    accentHex: string;
    textHex: string;
    secondaryHex: string;
  };
  coverImage: string;
  secondaryImage: string;
  includedFeatures: string[];
  itinerary: ItineraryEvent[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  linkText?: string;
  linkHref?: string;
}
