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
    id: 'papel-artesanal-deshilachado',
    slug: 'papel-artesanal-deshilachado',
    name: 'Papel Artesanal & Bordes Deshilachados',
    collection: 'Colección Rústica & Olivo Artesanal',
    category: 'Botánico & Salvia',
    price: 99990,
    originalPrice: 129990,
    badge: 'Papel Rasgado SVG & Verde Oliva',
    isPopular: true,
    shortDescription:
      'Estética rústica y artesanal con contornos de papel rasgado hecho a mano mediante filtros de turbulencia SVG y recorte poligonal irregular en marfil crudo, beige lino y verde oliva.',
    description:
      'Plantilla de invitación con estética rústica y artesanal. Aplica a los contenedores principales y tarjetas un contorno de papel rasgado hecho a mano utilizando filtros de turbulencia SVG y recorte poligonal irregular, eliminando cualquier línea recta artificial en marfil crudo, beige lino y verde oliva.',
    coupleDemo: {
      bride: 'Valentina',
      groom: 'Mateo',
      initials: 'V & M',
      date: '2027-11-20T16:30:00',
      displayDate: 'Sábado, 20 de Noviembre de 2027',
      city: 'Hacienda Los Olivos, Valle de Colchagua',
      ceremonyVenue: 'Capilla de Piedra Los Olivos',
      ceremonyTime: '16:30 hrs',
      receptionVenue: 'Explanada del Lagar Antiguo',
      receptionTime: '18:00 hrs',
      dressCode: 'Elegante Rústico · Lino & Tonos de la Tierra',
      quote: '«Como las raíces del olivo antiguo, nuestro amor creció con paciencia y luz natural.»',
      songTitle: 'Cuerdas del Olivar',
      songArtist: 'Ensamble Acústico',
    },
    palette: {
      name: 'Marfil Crudo, Beige Lino & Verde Oliva',
      bgHex: '#E8DFCE',
      cardHex: '#FAF6EE',
      accentHex: '#5C6B47',
      textHex: '#2A3022',
      secondaryHex: '#5E6453',
    },
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    includedFeatures: [
      'Contornos de papel rasgado con filtros de turbulencia SVG y recorte poligonal irregular',
      'Paleta orgánica en marfil crudo, beige lino y toques verde oliva',
      'Portada con nombres de la pareja y cuenta regresiva artesanal en vivo',
      'Bloque de ceremonia y recepción sin líneas rectas artificiales',
      'Botón de confirmación y formulario RSVP adaptable a móvil y escritorio',
    ],
    itinerary: [
      {
        time: '16:30 hrs',
        title: 'Ceremonia en Capilla de Piedra',
        location: 'Hacienda Los Olivos',
        iconType: 'ceremony',
      },
      {
        time: '18:00 hrs',
        title: 'Recepción en Explanada del Lagar',
        location: 'Jardines de Olivos Centenarios',
        iconType: 'dinner',
      },
    ],
  },
  {
    id: 'invitacion-papel-artesanal',
    slug: 'invitacion-papel-artesanal',
    name: 'Cinta de Seda & Bordes Rasgados',
    collection: 'Colección Texturas Artesanales',
    category: 'Hacienda & Romántico',
    price: 99990,
    originalPrice: 129990,
    badge: 'Cinta de Seda & Bordes Orgánicos',
    isPopular: true,
    shortDescription:
      'Invitación digital que se abre desatando una cinta de seda, con tarjetas de bordes orgánicos rasgados, un solo Dress Code y confirmación directa a WhatsApp.',
    description:
      'Invitación web con estética artesanal: tarjetas de bordes rasgados, tipografía romántica, cuenta regresiva e itinerario de campo.',
    coupleDemo: {
      bride: 'Lucía',
      groom: 'Rodrigo',
      initials: 'L & R',
      date: '2027-11-06T16:00:00',
      displayDate: 'Sábado, 06 de Noviembre de 2027',
      city: 'Valle de Casablanca',
      ceremonyVenue: 'Capilla de la Viña',
      ceremonyTime: '16:00 hrs',
      receptionVenue: 'Terraza de los Parrones',
      receptionTime: '17:30 hrs',
      dressCode: 'Formal de Campo',
      quote: '«Contigo cada camino se convierte en nuestra mejor historia.»',
      songTitle: 'Bésame Mucho (Guitarra)',
      songArtist: 'Ensamble de Cuerdas',
    },
    palette: {
      name: 'Arena Cálida & Terracota',
      bgHex: '#F4ECE1',
      cardHex: '#FCF9F2',
      accentHex: '#A86448',
      textHex: '#2C221E',
      secondaryHex: '#69564A',
    },
    coverImage:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    includedFeatures: [
      'Tarjetas digitales con bordes orgánicos rasgados',
      'Apertura animada desatando una cinta de seda',
      '1 solo Dress Code unificado',
      'Confirmación personalizada a WhatsApp',
      'Itinerario con mapas interactivos',
    ],
    itinerary: [
      {
        time: '16:00 hrs',
        title: 'Ceremonia en la Capilla',
        location: 'Viña Los Aromos',
        iconType: 'ceremony',
      },
      {
        time: '17:30 hrs',
        title: 'Banquete bajo los Parrones',
        location: 'Terraza Principal',
        iconType: 'dinner',
      },
    ],
  },
  {
    id: 'invitacion-marfil-menta',
    slug: 'invitacion-marfil-menta',
    name: 'Marfil & Menta Pura',
    collection: 'Colección Botánica Sensorial',
    category: 'Minimalista Lujo',
    price: 109990,
    originalPrice: 139990,
    badge: 'Armonía Botánica & 5 Paletas',
    isPopular: true,
    shortDescription:
      'Tonos marfil y menta suave con sobre interactivo animado, 5 paletas de color y confirmación directa a WhatsApp.',
    description:
      'Una creación poética y luminosa en tonos marfil y menta, selector en tiempo real de 5 armonías de color y visualizador en marcos de móvil y tablet.',
    coupleDemo: {
      bride: 'Isabella',
      groom: 'Tomás',
      initials: 'I & T',
      date: '2027-10-23T17:00:00',
      displayDate: 'Sábado, 23 de Octubre de 2027',
      city: 'Pirque, Región Metropolitana',
      ceremonyVenue: 'Parroquia Santa María de las Rosas',
      ceremonyTime: '17:00 hrs',
      receptionVenue: 'Jardín de las Hortensias',
      receptionTime: '19:00 hrs',
      dressCode: 'Formal Elegante · Jardín de Gala',
      quote: '«En tus ojos encontré mi lugar favorito en el mundo.»',
      songTitle: 'River Flows In You',
      songArtist: 'Yiruma',
    },
    palette: {
      name: 'Marfil & Menta Pura',
      bgHex: '#F6F8F6',
      cardHex: '#FCFDFB',
      accentHex: '#68947F',
      textHex: '#1E2D25',
      secondaryHex: '#587063',
    },
    coverImage:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    includedFeatures: [
      'Sobre sensorial con sello interactivo',
      'Selector interactivo de 5 paletas cromáticas',
      'Modo simulador Celular, Tablet y Pantalla Completa',
      'Dress code elegante unificado',
      'Galería editorial de fotos',
    ],
    itinerary: [
      {
        time: '17:00 hrs',
        title: 'Ceremonia Religiosa',
        location: 'Parroquia Santa María',
        iconType: 'ceremony',
      },
      {
        time: '19:00 hrs',
        title: 'Recepción en las Hortensias',
        location: 'Jardín Principal',
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
