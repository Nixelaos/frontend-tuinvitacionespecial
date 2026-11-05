import type {
  InvitationTemplate,
  PricingPlan,
  InteractiveFeature,
  ProcessStep,
  Testimonial,
  FaqItem,
} from '../types/wedding';

export const WHATSAPP_NUMBER = '56950781737'; // Número WhatsApp (+56 9 5078 1737)
export const BRAND_NAME = 'Tu Invitación Especial';

export const INVITATION_TEMPLATES: InvitationTemplate[] = [
  {
    id: 'invi-playa',
    slug: 'invi-playa',
    name: 'Playa & Efecto Supernova',
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
      date: '2026-11-14T12:30:00',
      displayDate: 'Sábado, 14 de Noviembre de 2026',
      city: 'Playa Blanca, Bahía Serena',
      ceremonyVenue: 'Explanada Frente al Mar · Playa Blanca',
      ceremonyTime: '12:30 hrs',
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
    secondaryImage: '/images/pareja-playa-casual.jpg',
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

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-esencial',
    name: 'Colección Esencial',
    tagline: 'Elegancia pura para anunciar su gran día con estilo.',
    price: 69990,
    originalPrice: 89990,
    currency: 'CLP',
    billingNote: 'Pago único · Envíos ilimitados',
    deliveryDays: 'Entrega en 48 horas hábiles',
    description:
      'Ideal para matrimonios íntimos o civiles que buscan una invitación web impecable con toda la información esencial y confirmación directa.',
    features: [
      { label: 'Elección de cualquier diseño de nuestro catálogo', included: true },
      { label: 'Portada personalizada con nombres, fecha y frase', included: true },
      { label: 'Cuenta regresiva en tiempo real', included: true },
      { label: 'Ubicación de ceremonia y recepción con mapa directo', included: true },
      { label: 'Itinerario de actividades y código de vestimenta', included: true },
      { label: 'Información de dress code y recomendaciones para invitados', included: true },
      { label: 'Confirmación de asistencia (RSVP) directo a WhatsApp', included: true },
      { label: 'Música de fondo y apertura con sobre animado', included: false },
      { label: 'Pases personalizados con nombre de cada invitado', included: false },
      { label: 'Panel de control de invitados en tiempo real', included: false },
    ],
    ctaLabel: 'Elegir Plan Esencial',
  },
  {
    id: 'plan-atelier',
    name: 'Colección Atelier',
    tagline: 'La experiencia interactiva completa favorita de nuestras parejas en Chile.',
    price: 99990,
    originalPrice: 129990,
    currency: 'CLP',
    billingNote: 'Pago único · Envíos ilimitados',
    badge: 'Más Elegido',
    highlighted: true,
    deliveryDays: 'Entrega en 48 a 72 horas hábiles',
    description:
      'Incluye apertura de sobre con sello de lacre o cinta de seda, música romántica, galería fotográfica y confirmación directa a WhatsApp.',
    features: [
      { label: 'Todo lo incluido en la Colección Esencial', included: true, highlight: true },
      { label: 'Sobre digital interactivo con sello de lacre e iniciales', included: true, highlight: true },
      { label: 'Música de fondo con su canción especial', included: true },
      { label: 'Galería editorial con fotografías de preboda', included: true },
      { label: 'Personalización de paleta de colores y tipografías', included: true },
      { label: 'Formulario RSVP con alergias alimentarias y canción sugerida', included: true },
      { label: 'Confirmación inmediata a tu WhatsApp con mensaje especial', included: true, highlight: true },
      { label: 'Diseño 100% responsive adaptado a celulares, tablets y PC', included: true },
      { label: 'Itinerario detallado y mapas interactivos con Waze y Google Maps', included: true },
      { label: 'Dominio propio (.cl / .com) y códigos QR de acceso en recepción', included: false },
    ],
    ctaLabel: 'Reservar Colección Atelier',
  },
  {
    id: 'plan-haute-couture',
    name: 'Haute Couture Bespoke',
    tagline: 'Diseño a medida con control de acceso QR y conserjería digital.',
    price: 149990,
    originalPrice: 189990,
    currency: 'CLP',
    billingNote: 'Pago único · Servicio VIP',
    badge: 'Todo Incluido VIP',
    deliveryDays: 'Prioridad VIP · Atención personalizada',
    description:
      'Para matrimonios que buscan diseño exclusivo a medida, pases con código QR, versión bilingüe opcional y ajustes ilimitados.',
    features: [
      { label: 'Todo lo incluido en la Colección Atelier', included: true, highlight: true },
      { label: 'Generador de pases individuales con Código QR para entrada', included: true, highlight: true },
      { label: 'Versión bilingüe opcional (Español + Inglés)', included: true },
      { label: 'Programa completo de celebración', included: true },
      { label: 'Álbum digital QR para que los invitados suban sus fotos', included: true, highlight: true },
      { label: 'Ilustración del lugar o monograma exclusivo a medida', included: true },
      { label: 'Cambios de horario o detalles sin costo hasta el día de la boda', included: true },
      { label: 'Vigencia extendida por 12 meses después del evento', included: true },
      { label: 'Soporte prioritario directo con diseñador asignado', included: true },
      { label: 'Dominio personalizado opcional (.cl o .com)', included: true },
    ],
    ctaLabel: 'Solicitar Haute Couture',
  },
];

export const INTERACTIVE_FEATURES: InteractiveFeature[] = [
  {
    id: 'feat-rsvp',
    title: 'Confirmación RSVP Directa',
    subtitle: 'Confirmación inmediata a tu WhatsApp',
    description:
      'Tus invitados confirman asistencia en segundos indicando número de asistentes, restricciones alimentarias y dedicándote un mensaje especial directo a tu WhatsApp.',
    iconName: 'CalendarCheck',
    badge: 'Imprescindible',
  },
  {
    id: 'feat-envelope',
    title: 'Apertura de Sobre & Lacre',
    subtitle: 'Emoción desde el primer segundo',
    description:
      'Al abrir el enlace, tus invitados descubren un sobre interactivo con sus iniciales en lacre o cinta de seda que, al tocarse, revela la invitación e inicia la música.',
    iconName: 'Sparkles',
    badge: 'Experiencia Sensorial',
  },
  {
    id: 'feat-music',
    title: 'Su Melodía Favorita',
    subtitle: 'Su canción en cada pantalla',
    description:
      'Integramos la melodía de su primer baile o canción favorita con un reproductor flotante sutil que acompaña la lectura de principio a fin.',
    iconName: 'Music',
  },
  {
    id: 'feat-maps',
    title: 'Ubicaciones a Un Toque',
    subtitle: 'Mapas directos al lugar que elijas',
    description:
      'Nadie llegará tarde ni se perderá. Botones directos con la ubicación exacta de la ceremonia y la recepción.',
    iconName: 'MapPin',
  },
  {
    id: 'feat-countdown',
    title: 'Cuenta Regresiva en Vivo',
    subtitle: 'Días, horas, minutos y segundos',
    description:
      'Un contador marca segundo a segundo el tiempo restante para su fecha especial.',
    iconName: 'Clock',
  },
  {
    id: 'feat-gallery',
    title: 'Galería de Fotos & Momentos',
    subtitle: 'Sesión pre-boda en alta definición',
    description:
      'Comparte con tus seres queridos los momentos más memorables de su sesión de fotos o historia de amor en una elegante galería integrada.',
    iconName: 'Camera',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    couple: 'Mariana & Diego',
    location: 'Pirque, Región Metropolitana',
    weddingDate: 'Octubre 2026',
    templateName: 'Marfil & Menta',
    quote:
      '«Nuestros invitados no paraban de escribirnos para decirnos que era la invitación más hermosa que habían visto. El sobre animado con nuestras iniciales y la música hicieron llorar a nuestras mamás.»',
    guestCount: 240,
    avatarUrl:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-2',
    couple: 'Catalina & Álvaro',
    location: 'Viña del Mar, Región de Valparaíso',
    weddingDate: 'Septiembre 2026',
    templateName: 'Cinta de Seda & Bordes Rasgados',
    quote:
      '«La ubicación directa, la cuenta regresiva y el formulario de confirmación a WhatsApp con alergias alimentarias nos ahorraron semanas enteras de organización.»',
    guestCount: 185,
    avatarUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-3',
    couple: 'Francisca & Patricio',
    location: 'Puerto Varas, Región de Los Lagos',
    weddingDate: 'Agosto 2026',
    templateName: 'Marfil & Menta',
    quote:
      '«Buscábamos algo sumamente sobrio y elegante, lejos de las invitaciones digitales recargadas. El resultado superó todo y la confirmación directa a WhatsApp fue un éxito.»',
    guestCount: 210,
    avatarUrl:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=300&q=80',
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
