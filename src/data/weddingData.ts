import type {
  InvitationTemplate,
  FaqItem,
} from '../types/wedding';
import type { MenuOption, RsvpEventConfig } from '../types/rsvp';

export const WHATSAPP_NUMBER = '56950781737'; // Número WhatsApp (+56 9 5078 1737)
export const BRAND_NAME = 'Tu Invitación Especial';

export const DEFAULT_MENU_OPTIONS: MenuOption[] = [
  { id: 'standard', label: 'Estándar' },
  { id: 'vegetarian', label: 'Vegetariano' },
  { id: 'vegan', label: 'Vegano' },
  { id: 'celiac', label: 'Celíaco / Sin Gluten' },
  { id: 'kids', label: 'Menú Infantil' },
];

export const BEACH_WEDDING_RSVP_CONFIG: RsvpEventConfig = {
  eventTitle: 'Boda Valentina & Sebastián',
  coupleNames: 'Valentina & Sebastián',
  uid: 'boda-valentina-sebastian-20261114@tuinvitacionespecial.cl',
  icsFileName: 'Boda-Valentina-y-Sebastian.ics',
  startDateIcs: '20261114T170000',
  endDateIcs: '20261114T230000',
  calendarDescription:
    'Celebración de Boda de Valentina & Sebastián en Palacio Las Majadas de Pirque, Chile.',
  location: 'Palacio Las Majadas de Pirque · José Julio Nieto s/n, Pirque, Chile',
  rsvpDeadlineDisplay: '25 de Octubre de 2026',
  rsvpDeadlineShort: '25 de Octubre',
  eventDateShort: '14 de Noviembre',
  whatsappNumber: WHATSAPP_NUMBER,
};

export const INVITATION_TEMPLATES: InvitationTemplate[] = [
  {
    id: 'invi-playa',
    slug: 'invi-playa',
    name: 'Papel Trozado & Partículas de Luz',
    collection: 'Colección Costa & Luz de Mediodía',
    category: 'Editorial Clásico',
    price: 109990,
    originalPrice: 139990,
    badge: 'Sello de Lacre & Supernova',
    isPopular: true,
    shortDescription:
      'Sobre de papel pastel con sello de lacre realista en relieve, revelado fotográfico en spray frente al mar con destello supernova y tarjeta de papel rasgado.',
    description:
      'Invitación digital interactiva de boda en la playa con apertura de sobre de papel pastel y sello de lacre realista, revelación fotográfica con efecto aerógrafo, destello supernova al abrir y tarjeta artesanal con bordes rasgados y cuenta regresiva en vivo.',
    coupleDemo: {
      bride: 'Valentina',
      groom: 'Sebastián',
      initials: 'V & S',
      date: '2026-11-14T17:00:00',
      displayDate: '',
      city: '',
      ceremonyVenue: 'Explanada Frente al Mar · Playa Blanca',
      ceremonyTime: '17:00 hrs',
      receptionVenue: 'Terraza Costera Bahía Serena',
      receptionTime: '14:00 hrs',
      dressCode: 'Casual Formal de Playa · Lino & Tonos Claros',
      quote:
        '«Hay momentos en la vida que son inolvidables, y compartirlos con las personas que más amamos los hace eternos.»',
      songTitle: 'Brisa de Mediodía',
      songArtist: 'Acústico frente al Mar',
    },
    palette: {
      name: 'Arena Pastel, Marfil & Dorado Costero',
      bgHex: '#F5ECE0',
      cardHex: '#FCF9F3',
      accentHex: '#B8864E',
      textHex: '#2F2420',
      secondaryHex: '#8C6947',
    },
    coverImage: '/images/comprometidos.webp',
    secondaryImage: '/images/pareja-playa-casual.webp',
    includedFeatures: [
      'Sobre de papel pastel con sello de lacre realista V & S en relieve y estampillas postales',
      'Efecto visual Supernova y revelado fotográfico suave al abrir la invitación',
      'Tarjeta de papel artesanal rasgado con textura orgánica y aparición progresiva al deslizar',
      'Cuenta regresiva en tiempo real integrada en hoja de papel de algodón',
      'Diseño 100% adaptable a celular, tablet y computador',
    ],
    itinerary: [
      {
        time: '12:30 hrs',
        title: 'Ceremonia Frente al Mar',
        location: 'Playa Blanca, Bahía Serena',
        iconType: 'ceremony',
      },
      {
        time: '14:00 hrs',
        title: 'Recepción & Almuerzo Costero',
        location: 'Terraza Bahía Serena',
        iconType: 'dinner',
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Experiencia & Funciones',
    question: '¿Cómo funcionan las invitaciones digitales interactivas?',
    answer:
      'Tus invitados reciben un enlace web que abre una experiencia sensorial única en la pantalla: un sobre animado con apertura interactiva (donde el sello de lacre o la cinta de seda son efectos visuales 100% digitales que se tocan o desatan en pantalla), su melodía favorita sonando de fondo, mapas interactivos para llegar directo a la ubicación y toda la información de la boda, sin necesidad de descargar ninguna aplicación.',
  },
  {
    id: 'faq-2',
    category: 'Confirmación de Asistencia',
    question: '¿Cómo confirman su asistencia nuestros invitados?',
    answer:
      'Es directo y muy sencillo para cualquier persona: tus invitados tocan el botón de confirmación, seleccionan la cantidad de lugares o acompañantes que asistirán y te envían un mensaje personalizado directamente a tu WhatsApp con sus datos y dedicatoria. Sin registros difíciles ni plataformas complejas.',
  },
  {
    id: 'faq-3',
    category: 'Personalización & Asesoría',
    question: '¿Cómo coordinamos la personalización de nuestra invitación?',
    answer:
      'Tras elegir tu colección, coordinaremos una entrevista personalizada donde nos compartirás sus fotos, música favorita, paleta de colores, ubicaciones de la ceremonia y detalles del evento. Nosotros nos encargamos de todo el montaje artesanal y diseño web.',
  },
  {
    id: 'faq-4',
    category: 'Compatibilidad & Dispositivos',
    question: '¿Se verá bien en celulares, tablets y pantallas grandes?',
    answer:
      'Totalmente. Cada diseño está optimizado para adaptarse con máxima nitidez y fluidez a cualquier dispositivo (iPhone, Android, iPad y computadores). Además, todas nuestras invitaciones incluyen un selector en vivo para previsualizar en modalidad Celular, Tablet o Pantalla Grande.',
  },
  {
    id: 'faq-5',
    category: 'Valores & Moneda',
    question: '¿En qué moneda están los valores y cuáles son los medios de pago en Chile?',
    answer:
      'Todos nuestros servicios e invitaciones están expresados 100% en Pesos Chilenos (CLP $). Puedes reservar y pagar cómodamente mediante transferencia bancaria electrónica o tarjetas nacionales en un pago único y sin mensualidades.',
  },
  {
    id: 'faq-6',
    category: 'Envíos & Entrega',
    question: '¿A cuántos invitados puedo enviar la invitación? ¿Hay un límite?',
    answer:
      '¡Los envíos son 100% ilimitados! Una vez lista tu invitación, puedes compartir el enlace cuantas veces quieras por WhatsApp, correo electrónico o Instagram con todos tus seres queridos en Chile y el mundo sin ningún costo adicional.',
  },
];
