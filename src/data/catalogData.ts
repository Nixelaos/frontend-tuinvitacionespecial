import type { InvitationTemplate } from '../types/wedding';

/**
 * Catálogo de plantillas y diseños de invitaciones interactivas en venta.
 */
export const INVITATION_TEMPLATES: InvitationTemplate[] = [
  {
    id: 'papel-rasgado',
    slug: 'papel-rasgado',
    name: 'Papel Rasgado & Partículas de Luz',
    collection: 'Colección Costa & Luz de Mediodía',
    price: 109990,
    originalPrice: 139990,
    badge: 'Sello de Lacre & Supernova',
    isPopular: true,
    shortDescription:
      'Sobre de papel pastel con sello de lacre realista en relieve, revelado fotográfico en spray frente al mar con destello supernova y tarjeta de papel rasgado.',
    description:
      'Invitación digital interactiva de boda en la playa con apertura de sobre de papel pastel y sello de lacre realista, revelación fotográfica con efecto aerógrafo, destello supernova al abrir, tarjeta artesanal con bordes rasgados, cronograma completo de la celebración y cuenta regresiva en vivo.',
    coupleDemo: {
      bride: 'Valentina',
      groom: 'Sebastián',
      initials: 'V & S',
      date: '2027-10-22T17:00:00',
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
    coverImage: '/images/comprometidos.jpg',
    secondaryImage: '/images/pareja-playa-casual.webp',
    includedFeatures: [
      'Sobre de papel pastel con sello de lacre realista V & S en relieve y estampillas postales',
      'Efecto visual Supernova y revelado fotográfico suave al abrir la invitación',
      'Tarjeta de papel artesanal rasgado con textura orgánica y aparición progresiva al deslizar',
      'Cuenta regresiva en tiempo real integrada en hoja de papel de algodón',
      'Nueva sección de itinerario dividida con bordes de papel rasgado artesanal',
      'Sección de código de vestimenta (dress code) con reserva de color para la novia',
      'Sección de regalo para los novios con mensaje emotivo y datos bancarios protegidos',
      'Sección de álbum colaborativo con código QR para compartir las fotos del matrimonio',
      'Confirmación de asistencia R.S.V.P. directa a WhatsApp y calendario',
      'Diseño 100% adaptable a celular, tablet y computador',
    ],
    itinerary: [
      {
        time: '5:00 PM',
        title: 'Llegada de invitados',
        iconType: 'welcome',
      },
      {
        time: '5:30 PM',
        title: 'Ceremonia',
        iconType: 'ceremony',
      },
      {
        time: '6:15 PM',
        title: 'Cóctel y fotos con invitados',
        iconType: 'cocktail',
      },
      {
        time: '7:30 PM',
        title: 'Cena',
        iconType: 'dinner',
      },
      {
        time: '9:00 PM',
        title: 'Fiesta',
        iconType: 'party',
      },
    ],
  },
];
