import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Check,
  CheckCircle2,
  Church,
  PartyPopper,
  ArrowLeft,
  ExternalLink,
  Feather,
  Sparkles,
  Heart,
  Shirt,
  Smartphone,
  Tablet,
  Monitor,
  Palette,
  Send,
  MailOpen,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export interface ArtisanalOlivePalette {
  id: string;
  name: string;
  swatchColor: string;
  rawIvory: string;      // Marfil crudo principal (tarjetas)
  softIvory: string;     // Marfil cálido secundario
  linenBeige: string;    // Beige lino principal (fondo)
  deepLinen: string;     // Beige lino intenso (sombras / alterno)
  olivePrimary: string;  // Verde oliva principal
  oliveDark: string;     // Verde oliva profundo (botones / contraste)
  oliveLight: string;    // Verde oliva suave / salvia
  oliveTint: string;     // Tinte oliva muy suave
  inkDark: string;       // Carbón oliva oscuro para textos
  inkMuted: string;      // Tinta secundaria cálida
  fiberEdge: string;     // Borde de fibra de papel rasgado
}

export const ARTISANAL_OLIVE_PALETTES: ArtisanalOlivePalette[] = [
  {
    id: 'oliva-marfil-lino',
    name: 'Marfil Crudo, Beige Lino & Verde Oliva',
    swatchColor: '#5C6B47',
    rawIvory: '#FAF6EE',
    softIvory: '#F4EFE4',
    linenBeige: '#E8DFCE',
    deepLinen: '#DDD1BC',
    olivePrimary: '#5C6B47',
    oliveDark: '#3A462B',
    oliveLight: '#8A9A73',
    oliveTint: '#E6EADF',
    inkDark: '#2A3022',
    inkMuted: '#5E6453',
    fiberEdge: '#CFC2AA',
  },
  {
    id: 'salvia-algodon',
    name: 'Algodón Rústico & Hoja de Olivo',
    swatchColor: '#6B7F5E',
    rawIvory: '#FBF9F4',
    softIvory: '#F2EFE7',
    linenBeige: '#E4E0D5',
    deepLinen: '#D6D0C2',
    olivePrimary: '#637856',
    oliveDark: '#3E4E34',
    oliveLight: '#94A888',
    oliveTint: '#E5ECE0',
    inkDark: '#262E22',
    inkMuted: '#5A6355',
    fiberEdge: '#C7C0B0',
  },
  {
    id: 'lino-tostado-oliva',
    name: 'Lino Tostado & Oliva Silvestre',
    swatchColor: '#4E5D3C',
    rawIvory: '#F8F3E8',
    softIvory: '#EFE8D8',
    linenBeige: '#E2D6C1',
    deepLinen: '#D3C4AA',
    olivePrimary: '#4E5D3C',
    oliveDark: '#2F3A22',
    oliveLight: '#7D8D69',
    oliveTint: '#E2E6DA',
    inkDark: '#282C1E',
    inkMuted: '#615F50',
    fiberEdge: '#C4B499',
  },
];

/**
 * Irregular polygon paths that eliminate 100% of straight artificial lines.
 * Combined with SVG turbulence filters so edges stay organically frayed on mobile and desktop.
 */
const POLYGON_MAIN_SHEET =
  'polygon(0.6% 0.9%, 4.2% 0.2%, 8.8% 1.1%, 14.1% 0.3%, 19.5% 1.2%, 25.4% 0.4%, 31.8% 1.0%, 38.2% 0.2%, 44.9% 1.1%, 51.3% 0.3%, 58.1% 1.2%, 64.7% 0.4%, 71.5% 1.0%, 78.2% 0.2%, 84.6% 1.1%, 91.2% 0.3%, 96.4% 1.0%, 99.4% 0.5%, 99.8% 6.2%, 99.1% 13.5%, 99.7% 21.8%, 99.0% 29.4%, 99.6% 37.9%, 98.9% 46.2%, 99.7% 54.8%, 99.1% 63.1%, 99.8% 71.6%, 99.0% 80.2%, 99.6% 88.5%, 99.2% 95.4%, 99.5% 99.1%, 95.3% 99.7%, 89.6% 98.9%, 83.2% 99.8%, 76.8% 99.0%, 70.1% 99.7%, 63.4% 98.8%, 56.9% 99.7%, 49.8% 98.9%, 42.7% 99.8%, 35.8% 98.9%, 28.9% 99.7%, 22.1% 98.8%, 15.4% 99.6%, 8.7% 98.9%, 3.4% 99.7%, 0.4% 99.2%, 0.9% 92.8%, 0.2% 84.5%, 1.0% 76.1%, 0.3% 67.4%, 0.9% 58.8%, 0.2% 49.6%, 1.1% 41.2%, 0.3% 32.7%, 0.9% 23.9%, 0.2% 15.2%, 1.0% 7.4%)';

const POLYGON_CARD_A =
  'polygon(0.8% 1.4%, 5.5% 0.4%, 11.8% 1.7%, 18.4% 0.5%, 26.2% 1.6%, 34.1% 0.3%, 42.5% 1.5%, 51.2% 0.4%, 59.8% 1.7%, 68.4% 0.5%, 77.1% 1.4%, 85.6% 0.3%, 93.4% 1.6%, 99.1% 0.8%, 99.6% 9.5%, 98.7% 19.8%, 99.5% 31.2%, 98.6% 42.6%, 99.4% 54.1%, 98.7% 65.8%, 99.6% 77.4%, 98.8% 88.9%, 99.3% 98.6%, 93.8% 99.5%, 86.2% 98.4%, 78.1% 99.6%, 69.5% 98.5%, 60.8% 99.7%, 51.9% 98.6%, 43.2% 99.6%, 34.6% 98.4%, 25.8% 99.7%, 17.2% 98.5%, 9.1% 99.6%, 1.2% 98.8%, 0.4% 89.2%, 1.3% 78.5%, 0.5% 67.1%, 1.4% 55.4%, 0.4% 43.8%, 1.3% 32.1%, 0.5% 20.6%, 1.2% 9.8%)';

const POLYGON_CARD_B =
  'polygon(1.1% 0.8%, 7.2% 1.8%, 14.5% 0.4%, 22.8% 1.5%, 31.4% 0.5%, 40.2% 1.7%, 49.5% 0.3%, 58.6% 1.6%, 67.9% 0.4%, 76.5% 1.7%, 85.2% 0.5%, 93.8% 1.5%, 99.2% 0.7%, 98.6% 11.4%, 99.5% 23.1%, 98.7% 35.6%, 99.6% 47.9%, 98.8% 60.2%, 99.5% 72.8%, 98.6% 85.1%, 99.4% 98.9%, 92.4% 98.3%, 83.7% 99.6%, 74.9% 98.4%, 65.8% 99.7%, 56.4% 98.5%, 47.1% 99.6%, 37.8% 98.4%, 28.5% 99.7%, 19.3% 98.5%, 10.4% 99.5%, 1.6% 98.4%, 0.6% 86.4%, 1.4% 73.8%, 0.5% 61.2%, 1.3% 48.5%, 0.4% 35.9%, 1.4% 23.4%, 0.5% 11.2%)';

const POLYGON_PILL_BUTTON =
  'polygon(1.8% 6.5%, 6.4% 1.8%, 13.5% 4.8%, 21.8% 1.2%, 31.2% 4.5%, 41.5% 1.4%, 51.8% 4.2%, 62.4% 1.5%, 72.9% 4.6%, 83.1% 1.4%, 92.4% 4.2%, 98.2% 2.5%, 99.6% 18.5%, 98.4% 38.2%, 99.5% 58.6%, 98.3% 79.4%, 99.1% 94.2%, 93.8% 98.6%, 84.5% 95.4%, 74.2% 98.8%, 63.5% 95.2%, 52.4% 98.9%, 41.2% 95.5%, 30.1% 98.7%, 19.4% 95.3%, 9.2% 98.6%, 1.9% 94.8%, 0.5% 78.2%, 1.6% 57.4%, 0.4% 36.8%, 1.7% 19.2%)';

/**
 * Reusable Frayed Handmade Paper Container:
 * Renders multi-layered torn paper fibers + SVG turbulence displacement + irregular polygon clipping
 * so no straight box edge ever appears on mobile or desktop.
 */
const FrayedPaperCard: React.FC<{
  children: React.ReactNode;
  bgFill: string;
  fiberFill: string;
  variant?: 'main' | 'cardA' | 'cardB';
  className?: string;
  innerClassName?: string;
}> = ({
  children,
  bgFill,
  fiberFill,
  variant = 'cardA',
  className = '',
  innerClassName = 'p-6 sm:p-8',
}) => {
  const clipPoly =
    variant === 'main'
      ? POLYGON_MAIN_SHEET
      : variant === 'cardB'
      ? POLYGON_CARD_B
      : POLYGON_CARD_A;

  return (
    <div className={`relative group ${className}`}>
      {/* Outer Organic Fiber Shadow Layer (Frayed Translucent Deckle Halo) */}
      <div
        className="absolute -inset-[5px] sm:-inset-[7px] pointer-events-none transition-colors duration-500 opacity-75"
        style={{
          backgroundColor: fiberFill,
          clipPath: clipPoly,
          filter: 'url(#deckle-edge-turbulence)',
        }}
        aria-hidden="true"
      />

      {/* Second Soft Torn Paper Pulp Layer (Simulates raw cotton deckle edge) */}
      <div
        className="absolute -inset-[2.5px] sm:-inset-[3.5px] pointer-events-none transition-colors duration-500 opacity-90"
        style={{
          backgroundColor: '#FAF6EE',
          clipPath: clipPoly,
          filter: 'url(#deckle-edge-fine)',
        }}
        aria-hidden="true"
      />

      {/* Main Handmade Paper Surface with Irregular Polygon + SVG Displacement */}
      <div
        className="relative transition-colors duration-500 shadow-[0_18px_38px_-14px_rgba(42,48,34,0.16)]"
        style={{
          backgroundColor: bgFill,
          clipPath: clipPoly,
        }}
      >
        {/* Subtle Paper Grain Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.22] mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(rgba(92, 107, 71, 0.14) 1px, transparent 0), radial-gradient(rgba(160, 142, 110, 0.12) 1px, transparent 0)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
          aria-hidden="true"
        />

        {/* Irregular Inner Stitched/Inked Organic Sketch Path */}
        <svg
          className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] pointer-events-none opacity-35"
          viewBox="0 0 400 300"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6,8 Q45,3 95,9 T195,6 T295,10 T392,7 Q397,55 391,110 T395,215 T391,292 Q340,297 270,291 T140,295 T8,291 Q3,230 9,160 T5,65 Z"
            stroke={fiberFill}
            strokeWidth="1.2"
            strokeDasharray="6 4 2 3"
          />
        </svg>

        <div className={`relative z-10 ${innerClassName}`}>{children}</div>
      </div>
    </div>
  );
};

/**
 * Hand-drawn SVG Olive Branch Illustration
 */
const OliveBranchOrnament: React.FC<{ color: string; className?: string; flip?: boolean }> = ({
  color,
  className = 'w-36 h-10',
  flip = false,
}) => (
  <svg
    viewBox="0 0 220 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
    aria-hidden="true"
  >
    {/* Main Organic Stem */}
    <path
      d="M15 42 C60 36, 115 24, 202 18"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Left & Right Olive Leaves */}
    <path
      d="M48 37 C40 24, 52 15, 65 23 C58 32, 52 36, 48 37 Z"
      fill={color}
      fillOpacity="0.22"
      stroke={color}
      strokeWidth="1.3"
    />
    <path
      d="M68 35 C76 46, 92 47, 98 37 C86 32, 75 33, 68 35 Z"
      fill={color}
      fillOpacity="0.18"
      stroke={color}
      strokeWidth="1.3"
    />
    <path
      d="M95 29 C89 16, 102 7, 115 16 C108 24, 100 28, 95 29 Z"
      fill={color}
      fillOpacity="0.26"
      stroke={color}
      strokeWidth="1.3"
    />
    <path
      d="M118 27 C126 39, 143 39, 149 29 C137 24, 125 25, 118 27 Z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="1.3"
    />
    <path
      d="M144 23 C140 11, 153 4, 165 13 C158 20, 150 22, 144 23 Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="1.3"
    />
    <path
      d="M168 20 C176 30, 190 30, 196 22 C185 18, 174 19, 168 20 Z"
      fill={color}
      fillOpacity="0.18"
      stroke={color}
      strokeWidth="1.3"
    />
    {/* Small Olives */}
    <circle cx="72" cy="30" r="3.2" fill={color} />
    <circle cx="122" cy="22" r="3.5" fill={color} />
    <circle cx="166" cy="17" r="2.8" fill={color} />
  </svg>
);

/**
 * Multi-layered Frayed Torn Paper Section Divider
 */
const FrayedSectionEdge: React.FC<{
  topFill: string;
  bottomFill: string;
  fiberColor: string;
}> = ({ topFill, bottomFill, fiberColor }) => (
  <div
    className="relative w-full h-10 sm:h-14 overflow-hidden select-none pointer-events-none"
    style={{ backgroundColor: topFill }}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      {/* Frayed cotton fiber back edge */}
      <path
        d="M0,42 L28,29 L61,48 L94,25 L132,44 L174,21 L215,43 L258,28 L302,51 L348,23 L392,45 L439,27 L485,49 L531,20 L578,44 L624,26 L671,48 L718,22 L765,46 L812,28 L859,50 L906,24 L953,45 L1001,27 L1048,49 L1095,21 L1142,44 L1189,28 L1236,51 L1283,25 L1330,46 L1377,29 L1415,44 L1440,32 L1440,90 L0,90 Z"
        fill={fiberColor}
        fillOpacity="0.55"
      />
      {/* Mid raw ivory pulp torn edge */}
      <path
        d="M0,50 L34,37 L69,55 L105,33 L144,51 L186,29 L227,49 L271,35 L314,57 L360,31 L404,52 L451,34 L497,56 L543,29 L590,51 L636,34 L683,55 L730,30 L777,53 L824,35 L871,57 L918,32 L965,52 L1013,35 L1060,56 L1107,30 L1154,51 L1201,35 L1248,57 L1295,33 L1342,53 L1389,37 L1422,51 L1440,39 L1440,90 L0,90 Z"
        fill="#FAF6EE"
        fillOpacity="0.85"
      />
      {/* Main lower paper layer */}
      <path
        d="M0,58 L41,45 L76,63 L114,41 L153,58 L195,38 L236,57 L280,43 L323,64 L369,39 L413,59 L460,42 L506,63 L552,37 L599,58 L645,42 L692,62 L739,38 L786,60 L833,43 L880,64 L927,40 L974,59 L1022,43 L1069,63 L1116,38 L1163,58 L1210,43 L1257,64 L1304,41 L1351,60 L1398,45 L1426,58 L1440,47 L1440,90 L0,90 Z"
        fill={bottomFill}
      />
    </svg>
  </div>
);

export const FrayedHandmadePaperInvitation: React.FC = () => {
  // Hero iframe preview detection
  const [isHero, setIsHero] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isInsideIframe = window.self !== window.top;
      const hasHeroParam = window.location.search.includes('hero=true');
      if (isInsideIframe || hasHeroParam) {
        setIsHero(true);
      }
    }
  }, []);

  // Responsive Device Simulator Mode (Celular, Tablet, Escritorio)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [windowWidth, setWindowWidth] = useState(1280);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialW = window.innerWidth;
      setWindowWidth(initialW);
      if (initialW < 640) {
        setDeviceMode('mobile');
      } else if (initialW < 1024) {
        setDeviceMode('tablet');
      } else {
        setDeviceMode('desktop');
      }

      const updateWidth = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  const effectiveMode: DeviceMode = isHero
    ? 'mobile'
    : deviceMode === 'mobile' || windowWidth < 520
    ? 'mobile'
    : deviceMode === 'tablet' || (deviceMode === 'desktop' && windowWidth < 900)
    ? 'tablet'
    : 'desktop';

  const isMobile = effectiveMode === 'mobile';
  const isTablet = effectiveMode === 'tablet';

  // Palette state (Default: Marfil Crudo, Beige Lino & Verde Oliva)
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const theme = ARTISANAL_OLIVE_PALETTES[selectedPaletteIndex];

  // Optional envelope view state (default false so Portada, Countdown, Ceremony/Reception & RSVP button are immediately visible)
  const [showEnvelopeCover, setShowEnvelopeCover] = useState(false);
  const [unsealing, setUnsealing] = useState(false);

  // Music toggle
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Live Countdown State (Sábado, 20 de Noviembre de 2027 · 16:30 hrs)
  const [timeLeft, setTimeLeft] = useState({
    days: 390,
    hours: 14,
    minutes: 28,
    seconds: 45,
  });

  useEffect(() => {
    const target = new Date('2027-11-20T16:30:00').getTime();
    const updateTimer = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  // RSVP Interactive State
  const [rsvpExpanded, setRsvpExpanded] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'si' | 'no'>('si');
  const [passes, setPasses] = useState('2');
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const RSVP_WHATSAPP_NUMBER = '56950781737';

  const buildWhatsAppRsvpUrl = (recipient: 'novia' | 'novio' = 'novia') => {
    const statusText =
      attending === 'si'
        ? `🌿 *SÍ ASISTIREMOS* (${passes} ${Number(passes) === 1 ? 'persona' : 'personas'})`
        : `🤍 *NO PODREMOS ASISTIR*, los acompañamos con el corazón`;

    const greeting =
      recipient === 'novia'
        ? `¡Hola Valentina! 🌿💍 (Confirmación para la novia)`
        : `¡Hola Mateo! 🌿💍 (Confirmación para el novio)`;

    const lines = [
      greeting,
      `Confirmamos nuestra asistencia a su boda en Hacienda Los Olivos:`,
      ``,
      `• *Nombre / Familia:* ${guestName.trim() || 'Familia Invitada'}`,
      `• *Asistencia:* ${statusText}`,
      attending === 'si' && dietary.trim() ? `• *Restricción alimentaria:* ${dietary.trim()}` : '',
      message.trim()
        ? `\n💌 *Dedicatoria:*\n"${message.trim()}"`
        : `\n💌 *Mensaje:* ¡Les deseamos toda la felicidad del mundo en su matrimonio!`,
    ].filter(Boolean);

    return `https://wa.me/${RSVP_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleOpenFromEnvelope = () => {
    setUnsealing(true);
    setTimeout(() => {
      setShowEnvelopeCover(false);
      setUnsealing(false);
      setMusicPlaying(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  };

  const isFramedSimulator =
    !isHero &&
    ((deviceMode === 'mobile' && windowWidth >= 480) ||
      (deviceMode === 'tablet' && windowWidth >= 800));

  const getContainerWrapper = () => {
    if (isHero) {
      return 'w-full min-h-screen';
    }
    if (deviceMode === 'mobile') {
      return windowWidth >= 480
        ? 'w-full max-w-[410px] min-h-[824px] mx-auto shadow-2xl relative transition-all duration-500'
        : 'w-full min-h-screen relative transition-all duration-500';
    }
    if (deviceMode === 'tablet') {
      return windowWidth >= 800
        ? 'w-full max-w-[768px] min-h-[1024px] mx-auto shadow-2xl relative transition-all duration-500'
        : 'w-full max-w-[768px] min-h-screen mx-auto relative shadow-xl transition-all duration-500';
    }
    return 'w-full min-h-screen relative transition-all duration-500';
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
        isFramedSimulator ? 'pt-24 pb-14 px-3 sm:px-6' : ''
      }`}
      style={{
        backgroundColor: isFramedSimulator ? theme.deepLinen : theme.linenBeige,
        color: theme.inkDark,
      }}
    >
      {/* ====================================================================
          SVG TURBULENCE & DISPLACEMENT FILTERS FOR ORGANIC FRAYED PAPER EDGES
          Works across both mobile and desktop screens
      ==================================================================== */}
      <svg
        width="0"
        height="0"
        className="fixed pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <defs>
          {/* Coarse Handmade Paper Turbulence Filter */}
          <filter id="deckle-edge-turbulence" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.038"
              numOctaves="4"
              seed="11"
              result="roughNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="roughNoise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Fine Cotton Fiber Edge Filter */}
          <filter id="deckle-edge-fine" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.065"
              numOctaves="3"
              seed="23"
              result="fineNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="fineNoise"
              scale="4.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ====================================================================
          TOP FLOATING BAR (CATALOG RETURN, DEVICE MODES & PALETTE SWITCHER)
      ==================================================================== */}
      <div className="fixed top-3 inset-x-2 sm:inset-x-6 z-50 pointer-events-none">
        {isHero ? (
          <div className="flex items-center justify-center gap-1.5 max-w-full mx-auto">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 shadow-md pointer-events-auto"
              style={{
                backgroundColor: theme.rawIvory,
                clipPath: POLYGON_PILL_BUTTON,
              }}
            >
              <Palette className="w-3.5 h-3.5 mr-0.5" style={{ color: theme.olivePrimary }} />
              {ARTISANAL_OLIVE_PALETTES.map((pal, idx) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => setSelectedPaletteIndex(idx)}
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${
                    selectedPaletteIndex === idx
                      ? 'scale-125 ring-2 ring-charcoal shadow-sm'
                      : 'hover:scale-110 opacity-80'
                  }`}
                  style={{ backgroundColor: pal.swatchColor }}
                  title={pal.name}
                  aria-label={pal.name}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMusicPlaying(!musicPlaying)}
              className="p-2 text-ivory-50 transition shadow-md pointer-events-auto"
              style={{
                backgroundColor: theme.oliveDark,
                clipPath: POLYGON_PILL_BUTTON,
              }}
              title={musicPlaying ? 'Silenciar música' : 'Escuchar música'}
            >
              {musicPlaying ? (
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
            {/* Return to Catalog + Envelope Cover Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
              <a
                href="/#catalogo"
                className="px-3.5 sm:px-4 py-2 shadow-sm text-xs uppercase tracking-[0.16em] font-medium transition flex items-center gap-1.5"
                style={{
                  backgroundColor: theme.rawIvory,
                  color: theme.inkDark,
                  clipPath: POLYGON_PILL_BUTTON,
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" style={{ color: theme.olivePrimary }} />
                <span>Catálogo</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowEnvelopeCover(!showEnvelopeCover);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-2 shadow-sm text-xs uppercase tracking-[0.14em] font-medium transition flex items-center gap-1.5"
                style={{
                  backgroundColor: theme.rawIvory,
                  color: theme.oliveDark,
                  clipPath: POLYGON_PILL_BUTTON,
                }}
              >
                <MailOpen className="w-3.5 h-3.5" style={{ color: theme.olivePrimary }} />
                <span className="hidden sm:inline">
                  {showEnvelopeCover ? 'Ver Invitación Directa' : 'Ver Sobre Artesanal'}
                </span>
              </button>
            </div>

            {/* Device Switcher (Móvil, Tablet, Escritorio) */}
            <div
              className="flex items-center p-1 shadow-md pointer-events-auto order-3 sm:order-2 mx-auto sm:mx-0"
              style={{
                backgroundColor: theme.rawIvory,
                clipPath: POLYGON_PILL_BUTTON,
              }}
              role="group"
              aria-label="Cambiar vista móvil o escritorio"
            >
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className="px-3 py-1.5 text-[11px] uppercase tracking-wider transition flex items-center gap-1.5"
                style={{
                  backgroundColor: deviceMode === 'mobile' ? theme.oliveDark : 'transparent',
                  color: deviceMode === 'mobile' ? '#FAF6EE' : theme.inkDark,
                  clipPath: deviceMode === 'mobile' ? POLYGON_PILL_BUTTON : undefined,
                }}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Móvil</span>
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode('tablet')}
                className="px-3 py-1.5 text-[11px] uppercase tracking-wider transition flex items-center gap-1.5"
                style={{
                  backgroundColor: deviceMode === 'tablet' ? theme.oliveDark : 'transparent',
                  color: deviceMode === 'tablet' ? '#FAF6EE' : theme.inkDark,
                  clipPath: deviceMode === 'tablet' ? POLYGON_PILL_BUTTON : undefined,
                }}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className="px-3 py-1.5 text-[11px] uppercase tracking-wider transition flex items-center gap-1.5"
                style={{
                  backgroundColor: deviceMode === 'desktop' ? theme.oliveDark : 'transparent',
                  color: deviceMode === 'desktop' ? '#FAF6EE' : theme.inkDark,
                  clipPath: deviceMode === 'desktop' ? POLYGON_PILL_BUTTON : undefined,
                }}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Escritorio</span>
              </button>
            </div>

            {/* Right: Olive & Linen Palettes + Audio */}
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto order-2 sm:order-3">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 shadow-sm"
                style={{
                  backgroundColor: theme.rawIvory,
                  clipPath: POLYGON_PILL_BUTTON,
                }}
                title="Matices de Marfil Crudo, Lino y Verde Oliva"
              >
                <Palette
                  className="w-3.5 h-3.5 hidden md:inline"
                  style={{ color: theme.olivePrimary }}
                />
                {ARTISANAL_OLIVE_PALETTES.map((pal, idx) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPaletteIndex(idx)}
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      selectedPaletteIndex === idx
                        ? 'scale-125 ring-2 ring-charcoal shadow-sm'
                        : 'hover:scale-110 opacity-85'
                    }`}
                    style={{ backgroundColor: pal.swatchColor }}
                    title={pal.name}
                    aria-label={pal.name}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setMusicPlaying(!musicPlaying)}
                className="px-3.5 py-2 text-ivory-50 shadow-sm flex items-center gap-1.5 text-xs transition"
                style={{
                  backgroundColor: theme.oliveDark,
                  clipPath: POLYGON_PILL_BUTTON,
                }}
              >
                {musicPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#DCE3D1] animate-pulse" />
                    <span className="text-[11px] tracking-wider hidden lg:inline">
                      Cuerdas del Olivar
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 opacity-80" />
                    <span className="text-[11px] tracking-wider hidden lg:inline">Música</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          MAIN WRAPPER (ORGANIC FRAYED PAPER CONTAINER IN MOBILE & DESKTOP)
      ==================================================================== */}
      <div
        className={getContainerWrapper()}
        style={{
          backgroundColor: theme.linenBeige,
          clipPath: isFramedSimulator ? POLYGON_MAIN_SHEET : undefined,
        }}
      >
        {showEnvelopeCover ? (
          /* OPTIONAL HANDMADE PAPER ENVELOPE WITH OLIVE WAX SEAL */
          <div
            className={`flex flex-col justify-center items-center relative overflow-hidden select-none ${
              isMobile ? 'p-4 min-h-[760px]' : isTablet ? 'p-8 min-h-[920px]' : 'p-12 min-h-screen'
            }`}
            style={{ backgroundColor: theme.linenBeige }}
          >
            <div className={`w-full mx-auto ${isMobile ? 'max-w-sm' : 'max-w-xl'}`}>
              <FrayedPaperCard
                bgFill={theme.rawIvory}
                fiberFill={theme.fiberEdge}
                variant="main"
                innerClassName={`${
                  isMobile ? 'p-6' : 'p-12'
                } text-center transition-all duration-700 ${
                  unsealing ? 'scale-105 opacity-0 -translate-y-6' : 'scale-100 opacity-100'
                }`}
              >
                <OliveBranchOrnament color={theme.olivePrimary} className="w-36 h-10 mx-auto" />
                <span
                  className="text-[10px] uppercase tracking-[0.3em] font-semibold block mt-2"
                  style={{ color: theme.olivePrimary }}
                >
                  Papel Artesanal Hecho a Mano
                </span>
                <h2
                  className={`font-serif font-normal mt-2 ${
                    isMobile ? 'text-4xl' : 'text-6xl'
                  }`}
                  style={{ color: theme.inkDark }}
                >
                  Valentina{' '}
                  <span className="italic font-light" style={{ color: theme.olivePrimary }}>
                    &amp;
                  </span>{' '}
                  Mateo
                </h2>
                <p
                  className="text-xs uppercase tracking-[0.22em] mt-2 mb-8"
                  style={{ color: theme.inkMuted }}
                >
                  20 de Noviembre de 2027 · Hacienda Los Olivos
                </p>

                {/* Wax Seal Button */}
                <div className="relative my-6 flex items-center justify-center">
                  <div
                    className="w-full h-3 opacity-60"
                    style={{
                      backgroundColor: theme.oliveLight,
                      clipPath: POLYGON_PILL_BUTTON,
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleOpenFromEnvelope}
                    className="group absolute w-32 h-32 flex flex-col items-center justify-center text-[#FAF6EE] shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: theme.oliveDark,
                      clipPath:
                        'polygon(50% 0%, 66% 4%, 81% 11%, 92% 24%, 99% 39%, 98% 55%, 93% 71%, 83% 85%, 69% 95%, 52% 99%, 35% 96%, 20% 88%, 9% 74%, 2% 58%, 3% 41%, 10% 25%, 22% 12%, 36% 4%)',
                    }}
                  >
                    <span className="font-serif text-3xl tracking-widest">V&amp;M</span>
                    <span className="text-[9px] uppercase tracking-[0.22em] mt-1 opacity-90">
                      Abrir Pliego
                    </span>
                  </button>
                </div>

                <p
                  className="font-serif italic text-lg pt-10"
                  style={{ color: theme.inkMuted }}
                >
                  Toca el sello de lacre verde oliva para desplegar la invitación
                </p>
              </FrayedPaperCard>
            </div>
          </div>
        ) : (
          /* ==================================================================
              CONTENIDO PRINCIPAL DE LA PLANTILLA ARTESANAL (PROMPT 1.1)
              1. Portada con los nombres de la pareja
              2. Cuenta regresiva en papel rasgado
              3. Bloque de Ceremonia y Recepción
              4. Código de Vestimenta & Detalles
              5. Botón de Confirmación y RSVP interactivo
          ================================================================== */
          <div className="space-y-0">
            {/* ================================================================
                1. PORTADA CON LOS NOMBRES DE LA PAREJA
                Contenedor principal en marfil crudo sobre beige lino con bordes
                deshilachados mediante turbulencia SVG + recorte poligonal irregular
            ================================================================ */}
            <header
              className={`${
                isHero
                  ? 'pt-16 pb-10 px-3.5'
                  : isMobile
                  ? 'pt-16 pb-10 px-3.5'
                  : isTablet
                  ? 'pt-20 pb-14 px-6'
                  : 'pt-28 pb-20 px-8'
              } relative transition-colors duration-500`}
              style={{ backgroundColor: theme.linenBeige }}
            >
              <div
                className={`${
                  isMobile ? 'max-w-sm' : isTablet ? 'max-w-2xl' : 'max-w-4xl'
                } mx-auto`}
              >
                <FrayedPaperCard
                  bgFill={theme.rawIvory}
                  fiberFill={theme.fiberEdge}
                  variant="main"
                  innerClassName={`${
                    isMobile ? 'p-5 sm:p-6' : isTablet ? 'p-9' : 'p-12 sm:p-16'
                  } text-center space-y-6`}
                >
                  {/* Top Frayed Olive Badge */}
                  <div className="flex flex-col items-center gap-2">
                    <OliveBranchOrnament
                      color={theme.olivePrimary}
                      className={isMobile ? 'w-32 h-9' : 'w-44 h-11'}
                    />
                    <div
                      className="inline-flex items-center gap-2 px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-semibold"
                      style={{
                        backgroundColor: theme.oliveTint,
                        color: theme.oliveDark,
                        clipPath: POLYGON_PILL_BUTTON,
                      }}
                    >
                      <Feather className="w-3.5 h-3.5 shrink-0" />
                      <span>Nos Casamos · 20 de Noviembre de 2027</span>
                    </div>
                  </div>

                  {/* Couple Names in Artisanal Editorial Serif */}
                  <div className="space-y-2 py-1">
                    <p
                      className="text-[11px] uppercase tracking-[0.3em] font-medium"
                      style={{ color: theme.inkMuted }}
                    >
                      Con la bendición de nuestras familias
                    </p>
                    <h1
                      className={`font-serif font-normal tracking-tight leading-[1.05] ${
                        isMobile
                          ? 'text-5xl'
                          : isTablet
                          ? 'text-6xl'
                          : 'text-7xl lg:text-[84px]'
                      }`}
                      style={{ color: theme.inkDark }}
                    >
                      Valentina{' '}
                      <span
                        className="italic font-light inline-block mx-1"
                        style={{ color: theme.olivePrimary }}
                      >
                        &amp;
                      </span>{' '}
                      Mateo
                    </h1>
                    <p
                      className="text-xs sm:text-sm uppercase tracking-[0.25em] pt-1 font-medium"
                      style={{ color: theme.olivePrimary }}
                    >
                      Hacienda Los Olivos · Valle de Colchagua
                    </p>
                  </div>

                  {/* Couple Photograph with Irregular Torn-Paper Frame (No straight lines) */}
                  <div
                    className={`${
                      isMobile ? 'max-w-xs' : isTablet ? 'max-w-lg' : 'max-w-2xl'
                    } mx-auto pt-2`}
                  >
                    <div className="relative p-2.5 sm:p-4">
                      {/* Torn Linen Backing Behind Photo */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: theme.deepLinen,
                          clipPath: POLYGON_CARD_B,
                          filter: 'url(#deckle-edge-turbulence)',
                        }}
                        aria-hidden="true"
                      />
                      <div
                        className={`relative ${
                          isMobile ? 'h-[260px]' : isTablet ? 'h-[350px]' : 'h-[430px]'
                        } overflow-hidden shadow-md`}
                        style={{
                          clipPath: POLYGON_CARD_A,
                        }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"
                          alt="Valentina y Mateo entre olivos"
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A3022]/45 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Romantic Quote & Direct Scroll Action */}
                  <div className="max-w-2xl mx-auto pt-2 space-y-4">
                    <blockquote
                      className={`font-serif italic leading-relaxed ${
                        isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'
                      }`}
                      style={{ color: theme.inkDark }}
                    >
                      «Como las raíces del olivo antiguo, nuestro amor creció con paciencia,
                      luz natural y la certeza de pertenecer al mismo suelo.»
                    </blockquote>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href="#confirmar-asistencia"
                        className="px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#FAF6EE] transition-transform duration-300 hover:scale-[1.02] shadow-md inline-flex items-center gap-2"
                        style={{
                          backgroundColor: theme.oliveDark,
                          clipPath: POLYGON_PILL_BUTTON,
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#DCE3D1]" />
                        <span>Confirmar Asistencia</span>
                      </a>
                    </div>
                  </div>
                </FrayedPaperCard>
              </div>
            </header>

            {/* TORN PAPER EDGE TRANSITION */}
            <FrayedSectionEdge
              topFill={theme.linenBeige}
              bottomFill={theme.softIvory}
              fiberColor={theme.fiberEdge}
            />

            {/* ================================================================
                2. CUENTA REGRESIVA ARTESANAL
                Cada dígito vive dentro de un recorte de papel rasgado individual
                con filtro de turbulencia SVG y detalles en verde oliva
            ================================================================ */}
            <section
              className={`${
                isMobile ? 'py-10 px-3.5' : isTablet ? 'py-14 px-6' : 'py-20 px-8'
              } transition-colors duration-500`}
              style={{ backgroundColor: theme.softIvory }}
            >
              <div
                className={`${
                  isMobile ? 'max-w-sm' : isTablet ? 'max-w-2xl' : 'max-w-4xl'
                } mx-auto text-center space-y-8`}
              >
                <div className="space-y-2.5">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold"
                    style={{
                      backgroundColor: theme.oliveTint,
                      color: theme.oliveDark,
                      clipPath: POLYGON_PILL_BUTTON,
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Cuenta Regresiva</span>
                  </div>

                  <h2
                    className={`font-serif font-normal ${
                      isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'
                    }`}
                    style={{ color: theme.inkDark }}
                  >
                    Sábado, 20 de Noviembre de 2027
                  </h2>

                  <p
                    className={`${isMobile ? 'text-xs' : 'text-sm'} max-w-md mx-auto`}
                    style={{ color: theme.inkMuted }}
                  >
                    Contamos cada segundo para celebrar junto a ustedes bajo la sombra de los
                    olivos centenarios
                  </p>
                </div>

                {/* 4 Individual Torn-Paper Countdown Cards */}
                <div
                  className={`grid ${
                    isMobile
                      ? 'grid-cols-2 gap-3.5 max-w-xs'
                      : 'grid-cols-4 gap-5 max-w-3xl'
                  } mx-auto`}
                >
                  {[
                    { value: timeLeft.days, label: 'Días', variant: 'cardA' as const },
                    {
                      value: String(timeLeft.hours).padStart(2, '0'),
                      label: 'Horas',
                      variant: 'cardB' as const,
                    },
                    {
                      value: String(timeLeft.minutes).padStart(2, '0'),
                      label: 'Minutos',
                      variant: 'cardA' as const,
                    },
                    {
                      value: String(timeLeft.seconds).padStart(2, '0'),
                      label: 'Segundos',
                      variant: 'cardB' as const,
                    },
                  ].map((unit) => (
                    <FrayedPaperCard
                      key={unit.label}
                      bgFill={theme.rawIvory}
                      fiberFill={theme.fiberEdge}
                      variant={unit.variant}
                      innerClassName={`${
                        isMobile ? 'py-4 px-3' : 'py-6 px-4'
                      } flex flex-col items-center justify-center text-center`}
                    >
                      <span
                        className={`font-serif font-semibold leading-none tabular-nums ${
                          isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'
                        }`}
                        style={{ color: theme.olivePrimary }}
                      >
                        {unit.value}
                      </span>
                      <span
                        className="text-[10px] sm:text-xs uppercase tracking-[0.22em] mt-2 font-semibold"
                        style={{ color: theme.inkMuted }}
                      >
                        {unit.label}
                      </span>
                    </FrayedPaperCard>
                  ))}
                </div>
              </div>
            </section>

            {/* TORN PAPER EDGE TRANSITION */}
            <FrayedSectionEdge
              topFill={theme.softIvory}
              bottomFill={theme.linenBeige}
              fiberColor={theme.fiberEdge}
            />

            {/* ================================================================
                3. BLOQUE DE CEREMONIA Y RECEPCIÓN
                Tarjetas gemelas con contorno de papel rasgado hecho a mano,
                eliminando cualquier línea recta artificial tanto en móvil como en escritorio
            ================================================================ */}
            <section
              className={`${
                isMobile ? 'py-10 px-3.5' : isTablet ? 'py-14 px-6' : 'py-20 px-8'
              } transition-colors duration-500`}
              style={{ backgroundColor: theme.linenBeige }}
            >
              <div
                className={`${
                  isMobile ? 'max-w-sm' : isTablet ? 'max-w-2xl' : 'max-w-5xl'
                } mx-auto space-y-10`}
              >
                <div className="text-center space-y-2.5">
                  <OliveBranchOrnament
                    color={theme.olivePrimary}
                    className="w-32 h-8 mx-auto"
                    flip
                  />
                  <span
                    className="text-[11px] uppercase tracking-[0.26em] font-semibold block"
                    style={{ color: theme.olivePrimary }}
                  >
                    Coordenadas de Nuestra Celebración
                  </span>
                  <h2
                    className={`font-serif font-normal ${
                      isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'
                    }`}
                    style={{ color: theme.inkDark }}
                  >
                    Ceremonia &amp; Recepción
                  </h2>
                </div>

                {/* Ceremony & Reception Torn Paper Cards Grid */}
                <div
                  className={`grid ${
                    isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'
                  } items-stretch`}
                >
                  {/* CEREMONIA CARD */}
                  <FrayedPaperCard
                    bgFill={theme.rawIvory}
                    fiberFill={theme.fiberEdge}
                    variant="cardA"
                    className="h-full"
                    innerClassName={`${
                      isMobile ? 'p-6' : 'p-8 sm:p-10'
                    } flex flex-col justify-between h-full space-y-6`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold"
                          style={{
                            backgroundColor: theme.oliveTint,
                            color: theme.oliveDark,
                            clipPath: POLYGON_PILL_BUTTON,
                          }}
                        >
                          Ceremonia Religiosa
                        </span>
                        <div
                          className="w-11 h-11 flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: theme.oliveTint,
                            color: theme.olivePrimary,
                            clipPath: POLYGON_CARD_B,
                          }}
                        >
                          <Church className="w-5 h-5" />
                        </div>
                      </div>

                      <h3
                        className={`font-serif font-normal ${
                          isMobile ? 'text-2xl' : 'text-3xl'
                        }`}
                        style={{ color: theme.inkDark }}
                      >
                        Capilla de Piedra Los Olivos
                      </h3>

                      <div
                        className="space-y-2 pt-1 text-xs sm:text-sm"
                        style={{ color: theme.inkMuted }}
                      >
                        <p className="flex items-center gap-2 font-medium" style={{ color: theme.oliveDark }}>
                          <Clock className="w-4 h-4 shrink-0" style={{ color: theme.olivePrimary }} />
                          <span>16:30 hrs · Se ruega puntualidad</span>
                        </p>
                        <p className="flex items-start gap-2 leading-relaxed">
                          <MapPin
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: theme.olivePrimary }}
                          />
                          <span>
                            Camino Los Olivos Km 14, Santa Cruz, Valle de Colchagua.
                          </span>
                        </p>
                      </div>

                      <p
                        className="text-xs leading-relaxed pt-1"
                        style={{ color: theme.inkMuted }}
                      >
                        Nos daremos el «Sí, acepto» en la antigua capilla colonial rodeada de
                        olivos centenarios y muros de adobe artesanal.
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href="https://maps.google.com/?q=Santa+Cruz+Valle+de+Colchagua+Chile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-5 text-xs uppercase tracking-[0.18em] font-semibold text-[#FAF6EE] transition hover:opacity-95 flex items-center justify-center gap-2 shadow-sm"
                        style={{
                          backgroundColor: theme.olivePrimary,
                          clipPath: POLYGON_PILL_BUTTON,
                        }}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>Cómo Llegar a la Ceremonia</span>
                        <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                      </a>
                    </div>
                  </FrayedPaperCard>

                  {/* RECEPCIÓN CARD */}
                  <FrayedPaperCard
                    bgFill={theme.rawIvory}
                    fiberFill={theme.fiberEdge}
                    variant="cardB"
                    className="h-full"
                    innerClassName={`${
                      isMobile ? 'p-6' : 'p-8 sm:p-10'
                    } flex flex-col justify-between h-full space-y-6`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold"
                          style={{
                            backgroundColor: theme.oliveTint,
                            color: theme.oliveDark,
                            clipPath: POLYGON_PILL_BUTTON,
                          }}
                        >
                          Recepción &amp; Banquete
                        </span>
                        <div
                          className="w-11 h-11 flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: theme.oliveTint,
                            color: theme.olivePrimary,
                            clipPath: POLYGON_CARD_A,
                          }}
                        >
                          <PartyPopper className="w-5 h-5" />
                        </div>
                      </div>

                      <h3
                        className={`font-serif font-normal ${
                          isMobile ? 'text-2xl' : 'text-3xl'
                        }`}
                        style={{ color: theme.inkDark }}
                      >
                        Explanada del Lagar Antiguo
                      </h3>

                      <div
                        className="space-y-2 pt-1 text-xs sm:text-sm"
                        style={{ color: theme.inkMuted }}
                      >
                        <p className="flex items-center gap-2 font-medium" style={{ color: theme.oliveDark }}>
                          <Clock className="w-4 h-4 shrink-0" style={{ color: theme.olivePrimary }} />
                          <span>18:00 hrs · Cóctel al Atardecer y Cena</span>
                        </p>
                        <p className="flex items-start gap-2 leading-relaxed">
                          <MapPin
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: theme.olivePrimary }}
                          />
                          <span>
                            Jardines interiores de Hacienda Los Olivos (a 150 metros de la capilla).
                          </span>
                        </p>
                      </div>

                      <p
                        className="text-xs leading-relaxed pt-1"
                        style={{ color: theme.inkMuted }}
                      >
                        Brindaremos al caer el sol con gastronomía de campo, mesas de lino crudo
                        y música en vivo bajo guirnaldas cálidas.
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href="https://maps.google.com/?q=Santa+Cruz+Valle+de+Colchagua+Chile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-5 text-xs uppercase tracking-[0.18em] font-semibold text-[#FAF6EE] transition hover:opacity-95 flex items-center justify-center gap-2 shadow-sm"
                        style={{
                          backgroundColor: theme.oliveDark,
                          clipPath: POLYGON_PILL_BUTTON,
                        }}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>Ver Mapa de la Recepción</span>
                        <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                      </a>
                    </div>
                  </FrayedPaperCard>
                </div>

                {/* Dress Code Note in Frayed Handmade Strip */}
                <FrayedPaperCard
                  bgFill={theme.softIvory}
                  fiberFill={theme.fiberEdge}
                  variant="cardA"
                  innerClassName={`${
                    isMobile ? 'p-5' : 'p-7'
                  } flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left`}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: theme.oliveTint,
                        color: theme.oliveDark,
                        clipPath: POLYGON_CARD_B,
                      }}
                    >
                      <Shirt className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-[0.24em] font-semibold block"
                        style={{ color: theme.olivePrimary }}
                      >
                        Código de Vestimenta Sugerido
                      </span>
                      <h3
                        className="font-serif text-2xl font-normal"
                        style={{ color: theme.inkDark }}
                      >
                        Elegante Rústico · Lino &amp; Tonos de la Tierra
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: theme.inkMuted }}>
                        Damas: Vestido largo fluido (evitar blanco y marfil crudo). Caballeros:
                        Traje sastre o lino formal.
                      </p>
                    </div>
                  </div>
                </FrayedPaperCard>
              </div>
            </section>

            {/* TORN PAPER EDGE TRANSITION */}
            <FrayedSectionEdge
              topFill={theme.linenBeige}
              bottomFill={theme.deepLinen}
              fiberColor={theme.fiberEdge}
            />

            {/* ================================================================
                4. BOTÓN DE CONFIRMACIÓN & BLOQUE RSVP ARTESANAL
                Contenedor de papel artesanal rasgado con botón de confirmación
                prominente de bordes orgánicos desflecados y envío directo
            ================================================================ */}
            <section
              id="confirmar-asistencia"
              className={`${
                isMobile ? 'py-12 px-3.5' : isTablet ? 'py-16 px-6' : 'py-24 px-8'
              } transition-colors duration-500`}
              style={{ backgroundColor: theme.deepLinen }}
            >
              <div
                className={`${
                  isMobile ? 'max-w-sm' : isTablet ? 'max-w-2xl' : 'max-w-3xl'
                } mx-auto`}
              >
                <FrayedPaperCard
                  bgFill={theme.rawIvory}
                  fiberFill={theme.fiberEdge}
                  variant="main"
                  innerClassName={`${
                    isMobile ? 'p-6 space-y-6' : isTablet ? 'p-9 space-y-7' : 'p-12 space-y-8'
                  } text-center`}
                >
                  <div className="space-y-3 max-w-xl mx-auto">
                    <OliveBranchOrnament
                      color={theme.olivePrimary}
                      className="w-32 h-8 mx-auto"
                    />
                    <span
                      className="text-[11px] uppercase tracking-[0.28em] font-semibold block"
                      style={{ color: theme.olivePrimary }}
                    >
                      R.S.V.P. · Confirmación de Asistencia
                    </span>
                    <h2
                      className={`font-serif font-normal ${
                        isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'
                      }`}
                      style={{ color: theme.inkDark }}
                    >
                      ¿Nos acompañas en nuestro gran día?
                    </h2>
                    <p
                      className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}
                      style={{ color: theme.inkMuted }}
                    >
                      Tu presencia es el mejor regalo. Por favor confirma tu asistencia antes
                      del <strong>20 de Octubre de 2027</strong> tocando el botón de
                      confirmación artesanal.
                    </p>
                  </div>

                  {/* Primary Frayed-Edge Confirmation Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setRsvpExpanded(!rsvpExpanded)}
                      className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#FAF6EE] shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
                      style={{
                        backgroundColor: theme.oliveDark,
                        clipPath: POLYGON_PILL_BUTTON,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-[#DCE3D1] shrink-0" />
                      <span>
                        {rsvpExpanded
                          ? 'Ocultar Formulario de Confirmación'
                          : 'Confirmar Asistencia Ahora'}
                      </span>
                    </button>

                    <a
                      href={buildWhatsAppRsvpUrl('novia')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: theme.oliveTint,
                        color: theme.oliveDark,
                        clipPath: POLYGON_PILL_BUTTON,
                      }}
                    >
                      <FaWhatsapp className="w-4 h-4 shrink-0" style={{ color: theme.olivePrimary }} />
                      <span>Confirmar Directo por WhatsApp</span>
                    </a>
                  </div>

                  {/* Interactive Artisanal RSVP Form (Always available or toggled) */}
                  <div className="pt-4 border-t border-dashed" style={{ borderColor: theme.fiberEdge }}>
                    {!rsvpSuccess ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setRsvpSuccess(true);
                          window.open(buildWhatsAppRsvpUrl('novia'), '_blank', 'noopener,noreferrer');
                        }}
                        className="space-y-4 text-left max-w-xl mx-auto"
                      >
                        <div>
                          <label
                            className="block text-[11px] uppercase tracking-[0.18em] font-semibold mb-1.5"
                            style={{ color: theme.inkMuted }}
                          >
                            Nombre completo o Familia *
                          </label>
                          <input
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Ej. Familia Domínguez / Sofía y Lucas"
                            className="w-full px-4 py-3 text-sm focus:outline-none"
                            style={{
                              backgroundColor: theme.softIvory,
                              color: theme.inkDark,
                              clipPath: POLYGON_PILL_BUTTON,
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setAttending('si')}
                            className="py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold transition flex items-center justify-center gap-2"
                            style={{
                              backgroundColor:
                                attending === 'si' ? theme.olivePrimary : theme.softIvory,
                              color: attending === 'si' ? '#FAF6EE' : theme.inkDark,
                              clipPath: POLYGON_PILL_BUTTON,
                            }}
                          >
                            <Check className="w-4 h-4 shrink-0" />
                            <span>¡Sí, Asistiremos!</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setAttending('no')}
                            className="py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold transition flex items-center justify-center gap-2"
                            style={{
                              backgroundColor:
                                attending === 'no' ? theme.oliveDark : theme.softIvory,
                              color: attending === 'no' ? '#FAF6EE' : theme.inkDark,
                              clipPath: POLYGON_PILL_BUTTON,
                            }}
                          >
                            <Heart className="w-4 h-4 shrink-0" />
                            <span>No Podremos Asistir</span>
                          </button>
                        </div>

                        {attending === 'si' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label
                                className="block text-[11px] uppercase tracking-[0.18em] font-semibold mb-1.5"
                                style={{ color: theme.inkMuted }}
                              >
                                Personas confirmadas
                              </label>
                              <select
                                value={passes}
                                onChange={(e) => setPasses(e.target.value)}
                                className="w-full px-4 py-3 text-sm focus:outline-none"
                                style={{
                                  backgroundColor: theme.softIvory,
                                  color: theme.inkDark,
                                  clipPath: POLYGON_PILL_BUTTON,
                                }}
                              >
                                <option value="1">1 Persona</option>
                                <option value="2">2 Personas</option>
                                <option value="3">3 Personas</option>
                                <option value="4">4 Personas</option>
                              </select>
                            </div>

                            <div>
                              <label
                                className="block text-[11px] uppercase tracking-[0.18em] font-semibold mb-1.5"
                                style={{ color: theme.inkMuted }}
                              >
                                Menú / Alergias
                              </label>
                              <input
                                type="text"
                                value={dietary}
                                onChange={(e) => setDietary(e.target.value)}
                                placeholder="Ej. Vegetariano, Celíaco, Ninguna"
                                className="w-full px-4 py-3 text-sm focus:outline-none"
                                style={{
                                  backgroundColor: theme.softIvory,
                                  color: theme.inkDark,
                                  clipPath: POLYGON_PILL_BUTTON,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label
                            className="block text-[11px] uppercase tracking-[0.18em] font-semibold mb-1.5"
                            style={{ color: theme.inkMuted }}
                          >
                            Mensaje para los novios
                          </label>
                          <textarea
                            rows={2}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Escríbenos tus buenos deseos..."
                            className="w-full px-4 py-3 text-sm focus:outline-none"
                            style={{
                              backgroundColor: theme.softIvory,
                              color: theme.inkDark,
                              clipPath: POLYGON_CARD_A,
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <button
                            type="submit"
                            className="w-full py-4 px-5 text-xs uppercase tracking-[0.18em] font-semibold text-[#FAF6EE] transition hover:opacity-95 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                            style={{
                              backgroundColor: theme.olivePrimary,
                              clipPath: POLYGON_PILL_BUTTON,
                            }}
                          >
                            <Send className="w-3.5 h-3.5 shrink-0" />
                            <span>Enviar Confirmación a la Novia</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setRsvpSuccess(true);
                              window.open(
                                buildWhatsAppRsvpUrl('novio'),
                                '_blank',
                                'noopener,noreferrer'
                              );
                            }}
                            className="w-full py-4 px-5 text-xs uppercase tracking-[0.18em] font-semibold text-[#FAF6EE] transition hover:opacity-95 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                            style={{
                              backgroundColor: theme.oliveDark,
                              clipPath: POLYGON_PILL_BUTTON,
                            }}
                          >
                            <FaWhatsapp className="w-4 h-4 shrink-0" />
                            <span>Enviar Confirmación al Novio</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="py-6 space-y-3 text-center">
                        <CheckCircle2
                          className="w-10 h-10 mx-auto"
                          style={{ color: theme.olivePrimary }}
                        />
                        <h4
                          className="font-serif text-2xl"
                          style={{ color: theme.inkDark }}
                        >
                          ¡Gracias por confirmar, {guestName || 'Familia Invitada'}!
                        </h4>
                        <p className="text-xs max-w-md mx-auto" style={{ color: theme.inkMuted }}>
                          Tu confirmación ha sido preparada para enviarse por WhatsApp. ¡Nos
                          vemos en Hacienda Los Olivos!
                        </p>
                        <button
                          type="button"
                          onClick={() => setRsvpSuccess(false)}
                          className="text-xs underline uppercase tracking-widest pt-1"
                          style={{ color: theme.olivePrimary }}
                        >
                          Modificar confirmación
                        </button>
                      </div>
                    )}
                  </div>
                </FrayedPaperCard>
              </div>
            </section>

            {/* FOOTER ARTESANAL */}
            <footer
              className="py-12 px-4 text-center"
              style={{ backgroundColor: theme.oliveDark, color: theme.rawIvory }}
            >
              <div className="max-w-xl mx-auto space-y-3">
                <OliveBranchOrnament color={theme.oliveLight} className="w-28 h-7 mx-auto" />
                <p className="font-serif italic text-2xl">Valentina &amp; Mateo</p>
                <p className="text-[11px] uppercase tracking-[0.26em] opacity-75">
                  20 · Noviembre · 2027 · Hacienda Los Olivos
                </p>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};
