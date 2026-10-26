import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  MapPin,
  Volume2,
  VolumeX,
  Shirt,
  CheckCircle2,
  Church,
  GlassWater,
  RotateCcw,
  ArrowLeft,
  ExternalLink,
  MessageSquareHeart,
  Smartphone,
  Tablet,
  Monitor,
  Palette,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { WHATSAPP_NUMBER } from '../data/weddingData';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export interface MintPalette {
  id: string;
  name: string;
  swatchColor: string;
  bgHex: string;
  cardHex: string;
  primaryHex: string;
  secondaryHex: string;
  textHex: string;
  mutedHex: string;
  borderHex: string;
  heartColor: string;
  sealGradient: string;
}

export const MINT_PALETTES: MintPalette[] = [
  {
    id: 'menta-marfil',
    name: 'Verde Menta & Marfil',
    swatchColor: '#558A70',
    bgHex: '#F4F7F5',
    cardHex: '#FCFDFB',
    primaryHex: '#4F7C66',
    secondaryHex: '#E3EFE9',
    textHex: '#1A2921',
    mutedHex: '#526D60',
    borderHex: '#BCD1C6',
    heartColor: '#79A891',
    sealGradient: 'from-[#6E9E86] via-[#4F7C66] to-[#365A48]',
  },
  {
    id: 'menta-oro',
    name: 'Oro Champán & Vainilla',
    swatchColor: '#B89758',
    bgHex: '#F9F7F2',
    cardHex: '#FFFDF9',
    primaryHex: '#A38140',
    secondaryHex: '#F5EEDC',
    textHex: '#2C2518',
    mutedHex: '#786749',
    borderHex: '#DCCBA8',
    heartColor: '#C9AA6A',
    sealGradient: 'from-[#CCA963] via-[#A88643] to-[#7A5E28]',
  },
  {
    id: 'menta-rosa',
    name: 'Rosa Cuarzo & Crema',
    swatchColor: '#C27481',
    bgHex: '#FAF5F6',
    cardHex: '#FFFDFC',
    primaryHex: '#B05E6C',
    secondaryHex: '#F7E4E7',
    textHex: '#2F1E22',
    mutedHex: '#7C585F',
    borderHex: '#E5C0C7',
    heartColor: '#D68996',
    sealGradient: 'from-[#D17C8B] via-[#B2606E] to-[#803945]',
  },
  {
    id: 'menta-sereno',
    name: 'Azul Sereno & Perla',
    swatchColor: '#4B7B94',
    bgHex: '#F3F6F8',
    cardHex: '#FBFCFD',
    primaryHex: '#3C6C85',
    secondaryHex: '#DFEAF0',
    textHex: '#18252C',
    mutedHex: '#546A76',
    borderHex: '#B6CBD7',
    heartColor: '#6795AE',
    sealGradient: 'from-[#5A8DA7] via-[#3C6C85] to-[#254A5D]',
  },
  {
    id: 'menta-terracota',
    name: 'Terracota Cálido & Almendra',
    swatchColor: '#B86246',
    bgHex: '#F9F5F3',
    cardHex: '#FFFCFA',
    primaryHex: '#A85236',
    secondaryHex: '#F7E6E0',
    textHex: '#2E1E19',
    mutedHex: '#775246',
    borderHex: '#DFBFB4',
    heartColor: '#CE785D',
    sealGradient: 'from-[#CA6C4F] via-[#A85236] to-[#78331D]',
  },
];

export const MintHeartsWeddingInvitation: React.FC = () => {
  // Hero Preview detection (iframe or query param ?hero=true)
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

  // Opening seal state
  const [opened, setOpened] = useState(false);
  const [openingAnim, setOpeningAnim] = useState(false);

  // Audio state
  const [audioActive, setAudioActive] = useState(false);

  // Rain of Hearts toggle
  const [rainEnabled, setRainEnabled] = useState(true);

  // 5 Color Palettes State
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);

  // Live Countdown (Sept 18, 2027 17:00)
  const [countdown, setCountdown] = useState({
    days: 332,
    hours: 19,
    minutes: 42,
    seconds: 18,
  });

  // RSVP Form State
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'si' | 'no'>('si');
  const [passes, setPasses] = useState('2');
  const [song, setSong] = useState('');
  const [dietary, setDietary] = useState('');
  const [notes, setNotes] = useState('');

  const currentTheme = MINT_PALETTES[selectedPaletteIndex];
  const RSVP_WHATSAPP_NUMBER = '56912345678';

  useEffect(() => {
    const target = new Date('2027-10-23T17:00:00').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleOpenInvitation = () => {
    setOpeningAnim(true);
    setTimeout(() => {
      setOpened(true);
      setOpeningAnim(false);
      setAudioActive(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  const buildWhatsAppRsvp = (recipient: 'novia' | 'novio') => {
    const status =
      attending === 'si'
        ? `🌿 *SÍ ASISTIREMOS* (${passes} ${Number(passes) === 1 ? 'pase' : 'pases'})`
        : `🤍 *NO PODREMOS ASISTIR*, pero los acompañamos de corazón`;

    const greeting =
      recipient === 'novia'
        ? `¡Hola Isabella! 💍✨ (Confirmación para la novia)`
        : `¡Hola Tomás! 💍✨ (Confirmación para el novio)`;

    const lines = [
      greeting,
      `Queremos confirmar nuestra asistencia a su boda en Jardín de las Hortensias:`,
      ``,
      `• *Invitado / Familia:* ${guestName.trim() || 'Familia Invitada'}`,
      `• *Confirmación:* ${status}`,
      attending === 'si' && dietary.trim() ? `• *Alergias / Menú:* ${dietary.trim()}` : '',
      attending === 'si' && song.trim() ? `• *Canción sugerida:* ${song.trim()}` : '',
      notes.trim()
        ? `\n💌 *Mensaje con cariño:*\n"${notes.trim()}"`
        : `\n💌 *Mensaje:* ¡Que su amor florezca cada día más!`,
    ].filter(Boolean);

    return `https://wa.me/${RSVP_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // Hearts rain particles (almost transparent SVG hearts floating down)
  const heartRainItems = [
    { left: '4%', delay: '0s', duration: '13s', size: 18, opacity: 0.22 },
    { left: '14%', delay: '4s', duration: '17s', size: 24, opacity: 0.18 },
    { left: '26%', delay: '1s', duration: '15s', size: 16, opacity: 0.26 },
    { left: '38%', delay: '6s', duration: '19s', size: 28, opacity: 0.16 },
    { left: '50%', delay: '2s', duration: '14s', size: 20, opacity: 0.24 },
    { left: '62%', delay: '7s', duration: '18s', size: 26, opacity: 0.19 },
    { left: '74%', delay: '3s', duration: '16s', size: 17, opacity: 0.25 },
    { left: '86%', delay: '5s', duration: '14s', size: 22, opacity: 0.21 },
    { left: '95%', delay: '2.5s', duration: '16s', size: 19, opacity: 0.17 },
  ];

  // Device Mode Switcher & Window Resize Detection for 3 Responsive Modes
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

  const getContainerWrapper = () => {
    if (isHero) {
      return 'w-full min-h-screen';
    }
    if (deviceMode === 'mobile') {
      return windowWidth >= 480
        ? 'w-full max-w-[400px] min-h-[824px] mx-auto border-[10px] sm:border-[12px] border-[#1E2022] ring-4 ring-[#C29F68] rounded-[46px] sm:rounded-[52px] shadow-2xl overflow-hidden relative transition-all duration-500'
        : 'w-full min-h-screen relative transition-all duration-500';
    }
    if (deviceMode === 'tablet') {
      return windowWidth >= 800
        ? 'w-full max-w-[768px] min-h-[1024px] mx-auto border-[12px] sm:border-[14px] border-[#1E2022] rounded-[36px] sm:rounded-[42px] shadow-2xl overflow-hidden relative transition-all duration-500'
        : 'w-full max-w-[768px] min-h-screen mx-auto relative shadow-xl transition-all duration-500';
    }
    return 'w-full min-h-screen relative transition-all duration-500';
  };

  const isFramedSimulator =
    !isHero &&
    ((deviceMode === 'mobile' && windowWidth >= 480) ||
      (deviceMode === 'tablet' && windowWidth >= 800));

  return (
    <div
      className={`min-h-screen relative transition-colors duration-500 overflow-x-hidden ${isFramedSimulator ? 'pt-24 sm:pt-24 pb-12 px-2 sm:px-6' : ''
        }`}
      style={{
        backgroundColor: isFramedSimulator ? currentTheme.secondaryHex : currentTheme.bgHex,
        color: currentTheme.textHex,
      }}
    >
      {/* FLOATING RAIN OF ALMOST-TRANSPARENT HEARTS */}
      {rainEnabled && (
        <div
          className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
          aria-hidden="true"
        >
          {heartRainItems.map((item, idx) => (
            <div
              key={idx}
              className="absolute -top-10 animate-heart-rain"
              style={{
                left: item.left,
                animationDelay: item.delay,
                animationDuration: item.duration,
                opacity: item.opacity,
                color: currentTheme.heartColor,
              }}
            >
              <Heart
                style={{ width: `${item.size}px`, height: `${item.size}px` }}
                fill="currentColor"
              />
            </div>
          ))}
        </div>
      )}

      {/* FLOATING TOP TOOLBAR */}
      <div className="fixed top-3 inset-x-2 sm:inset-x-6 z-50 pointer-events-none">
        {isHero ? (
          /* HERO PREVIEW TOOLBAR: Palette swatches, re-close and sound controls */
          <div className="flex items-center justify-center gap-1.5 max-w-full mx-auto">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md pointer-events-auto backdrop-blur-md"
              style={{
                backgroundColor: currentTheme.cardHex,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
              title="Elige tu color preferido en vivo"
            >
              <Palette className="w-3.5 h-3.5 mr-0.5 opacity-70" style={{ color: currentTheme.primaryHex }} />
              {MINT_PALETTES.map((pal, idx) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => setSelectedPaletteIndex(idx)}
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${selectedPaletteIndex === idx
                      ? 'scale-125 ring-2 ring-charcoal shadow-sm'
                      : 'hover:scale-110 opacity-85'
                    }`}
                  style={{ backgroundColor: pal.swatchColor }}
                  title={pal.name}
                  aria-label={pal.name}
                />
              ))}
            </div>

            {opened && (
              <button
                type="button"
                onClick={() => setOpened(false)}
                className="px-2.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition shadow-md pointer-events-auto backdrop-blur-md flex items-center gap-1"
                style={{
                  backgroundColor: currentTheme.cardHex,
                  border: `1px solid ${currentTheme.borderHex}`,
                  color: currentTheme.primaryHex,
                }}
                title="Ver Sobre / Reiniciar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setAudioActive(!audioActive)}
              className="p-2 rounded-full text-ivory-50 transition shadow-md pointer-events-auto"
              style={{ backgroundColor: currentTheme.primaryHex }}
              title={audioActive ? 'Pausar música' : 'Activar música'}
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        ) : (
          /* STANDALONE INVITATION TOOLBAR: Return to catalog + Device Mode Switcher (Celular, Tablet, Computador) + Colors + Music */
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
            {/* Left: Return to catalog + Re-close envelope */}
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
              <a
                href="/#catalogo"
                className="px-3 sm:px-3.5 py-2 rounded-full text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm backdrop-blur-md"
                style={{
                  backgroundColor: currentTheme.cardHex,
                  border: `1px solid ${currentTheme.borderHex}`,
                  color: currentTheme.textHex,
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">Catálogo</span>
              </a>

              {opened && (
                <button
                  type="button"
                  onClick={() => {
                    setOpened(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 sm:px-3.5 py-2 rounded-full text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm backdrop-blur-md"
                  style={{
                    backgroundColor: currentTheme.cardHex,
                    border: `1px solid ${currentTheme.borderHex}`,
                    color: currentTheme.primaryHex,
                  }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ver Sobre</span>
                </button>
              )}
            </div>

            {/* Center: 3 Device Modes Switcher (Celular, Tablet, Computador) */}
            <div
              className="flex items-center p-1 rounded-full shadow-md pointer-events-auto backdrop-blur-md order-3 sm:order-2 mx-auto sm:mx-0"
              style={{
                backgroundColor: currentTheme.cardHex,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
              role="group"
              aria-label="Cambiar modo de visualización"
            >
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition flex items-center gap-1.5 ${deviceMode === 'mobile'
                    ? 'text-ivory-50 font-semibold shadow-xs'
                    : 'hover:opacity-80'
                  }`}
                style={{
                  backgroundColor: deviceMode === 'mobile' ? currentTheme.primaryHex : 'transparent',
                  color: deviceMode === 'mobile' ? '#FFFFFF' : currentTheme.textHex,
                }}
                title="Modo Celular"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Celular</span>
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode('tablet')}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition flex items-center gap-1.5 ${deviceMode === 'tablet'
                    ? 'text-ivory-50 font-semibold shadow-xs'
                    : 'hover:opacity-80'
                  }`}
                style={{
                  backgroundColor: deviceMode === 'tablet' ? currentTheme.primaryHex : 'transparent',
                  color: deviceMode === 'tablet' ? '#FFFFFF' : currentTheme.textHex,
                }}
                title="Modo Tablet"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition flex items-center gap-1.5 ${deviceMode === 'desktop'
                    ? 'text-ivory-50 font-semibold shadow-xs'
                    : 'hover:opacity-80'
                  }`}
                style={{
                  backgroundColor: deviceMode === 'desktop' ? currentTheme.primaryHex : 'transparent',
                  color: deviceMode === 'desktop' ? '#FFFFFF' : currentTheme.textHex,
                }}
                title="Modo Computador"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Computador</span>
              </button>
            </div>

            {/* Right: 5 Color Palettes + Music Player Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto order-2 sm:order-3">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-sm backdrop-blur-md"
                style={{
                  backgroundColor: currentTheme.cardHex,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
                title="Elige entre 5 paletas de color"
              >
                <Palette className="w-3.5 h-3.5 opacity-70 hidden md:inline" style={{ color: currentTheme.primaryHex }} />
                {MINT_PALETTES.map((pal, idx) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPaletteIndex(idx)}
                    className={`w-5 h-5 rounded-full transition-transform ${selectedPaletteIndex === idx
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
                onClick={() => setAudioActive(!audioActive)}
                className="px-3 sm:px-3.5 py-2 rounded-full text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm text-ivory-50 backdrop-blur-md"
                style={{ backgroundColor: currentTheme.primaryHex }}
                title={audioActive ? 'Pausar música' : 'Reproducir música'}
              >
                {audioActive ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span className="text-[11px] font-medium hidden lg:inline">River Flows in You</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 opacity-75" />
                    <span className="text-[11px] font-medium hidden lg:inline">Música</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* INNER WRAPPER (RESPONSIVE TO CELULAR, TABLET AND COMPUTADOR MODES) */}
      <div className={getContainerWrapper()} style={{ backgroundColor: currentTheme.bgHex }}>
        {/* Device Speaker Notch in Mobile & Tablet Simulator */}
        {!isHero && deviceMode === 'mobile' && windowWidth >= 480 && (
          <div className="w-32 h-5 bg-[#1E2022] rounded-b-2xl mx-auto z-40 relative flex items-center justify-center">
            <div className="w-10 h-1 bg-white/25 rounded-full" />
          </div>
        )}
        {!isHero && deviceMode === 'tablet' && windowWidth >= 800 && (
          <div className="w-24 h-4 bg-[#1E2022] rounded-b-xl mx-auto z-40 relative flex items-center justify-center">
            <div className="w-2 h-2 bg-white/25 rounded-full" />
          </div>
        )}

        {/* ====================================================================
            1. INITIAL VIEW: MINT & IVORY SEAL BEFORE OPENING
        ==================================================================== */}
        {!opened ? (
          <div
            className={`flex flex-col justify-between items-center text-center relative select-none ${isMobile
                ? 'p-5 min-h-[780px]'
                : isTablet
                  ? 'p-8 min-h-[960px]'
                  : 'p-10 min-h-screen'
              }`}
            style={{ backgroundColor: currentTheme.bgHex }}
          >
            <div className={`${isMobile ? 'pt-8' : isTablet ? 'pt-12' : 'pt-20'} space-y-2`}>
              <span
                className="text-[11px] uppercase tracking-[0.28em] font-medium block"
                style={{ color: currentTheme.primaryHex }}
              >
                Nuestra Boda
              </span>
              <h1
                className={`font-serif font-normal tracking-wide ${isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl lg:text-7xl'
                  }`}
              >
                Isabella <span className="italic font-light">&amp;</span> Tomás
              </h1>
              <p
                className={`${isMobile ? 'text-[11px]' : 'text-xs'} uppercase tracking-[0.22em]`}
                style={{ color: currentTheme.mutedHex }}
              >
                23 de Octubre de 2027 · Jardín de las Hortensias, Pirque
              </p>
            </div>

            {/* Animated Seal Card */}
            <div
              className={`my-auto rounded-[32px] w-full shadow-editorial transition-all duration-700 ${isMobile ? 'p-6 max-w-sm' : isTablet ? 'p-10 max-w-md' : 'p-12 max-w-lg'
                } ${openingAnim ? 'scale-105 opacity-0 -translate-y-6' : 'scale-100 opacity-100'
                }`}
              style={{
                backgroundColor: currentTheme.cardHex,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <p className="text-xs uppercase tracking-[0.26em] mb-2" style={{ color: currentTheme.mutedHex }}>
                Pase de Honor
              </p>
              <h3 className={`font-serif italic ${isMobile ? 'text-2xl mb-6' : 'text-3xl mb-8'}`}>
                Apreciable Familia &amp; Amigos
              </h3>

              <div className="relative inline-block">
                <span
                  className="animate-ping absolute inset-0 rounded-full opacity-35"
                  style={{ backgroundColor: currentTheme.primaryHex }}
                />
                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className={`relative ${isMobile ? 'w-28 h-28' : isTablet ? 'w-32 h-32' : 'w-36 h-36'
                    } rounded-full bg-gradient-to-br ${currentTheme.sealGradient} text-ivory-50 shadow-editorial-lg border-4 border-white/70 flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer`}
                  aria-label="Tocar para abrir invitación"
                >
                  <Heart className="w-5 h-5 fill-current opacity-85 mb-0.5" />
                  <span className={`font-serif ${isMobile ? 'text-2xl' : 'text-3xl'} tracking-widest font-semibold`}>
                    I&amp;T
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-ivory-100/90 mt-1">
                    Tocar para Abrir
                  </span>
                </button>
              </div>

              <div className={isMobile ? 'mt-6' : 'mt-8'}>
                <p className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: currentTheme.primaryHex }}>
                  Toca el sello para abrir la invitación
                </p>
              </div>
            </div>

            <div className="pb-4 text-xs font-serif italic" style={{ color: currentTheme.mutedHex }}>
              Con amor, Isabella &amp; Tomás
            </div>
          </div>
        ) : (
          /* ====================================================================
              2. OPENED EXTENSIVE INVITATION SECTIONS
          ==================================================================== */
          <div
            className={`${isMobile
                ? 'space-y-12 pb-14 pt-6'
                : isTablet
                  ? 'space-y-16 pb-16 pt-10'
                  : 'space-y-24 pb-24 pt-20'
              }`}
            style={{ backgroundColor: currentTheme.bgHex, color: currentTheme.textHex }}
          >
            {/* HERO SECTION: NAMES & COUPLE PORTRAIT */}
            <section
              className={`${isHero ? 'pt-14 px-4' : isMobile ? 'pt-6 px-4' : isTablet ? 'pt-8 px-6' : 'pt-10 px-8'
                } text-center space-y-6`}
            >
              <div className="space-y-3">
                <span
                  className="px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold inline-block"
                  style={{ backgroundColor: currentTheme.secondaryHex, color: currentTheme.primaryHex }}
                >
                  ¡Nuestra Boda! · 23 · Octubre · 2027
                </span>
                <h1
                  className={`font-serif font-normal leading-none ${isMobile
                      ? 'text-4xl'
                      : isTablet
                        ? 'text-6xl'
                        : 'text-7xl lg:text-8xl'
                    }`}
                >
                  Isabella <span className="italic font-light">&amp;</span> Tomás
                </h1>
                <p className="text-xs uppercase tracking-[0.22em]" style={{ color: currentTheme.mutedHex }}>
                  Jardín de las Hortensias · Pirque
                </p>
              </div>

              {/* Framed Photo with Soft Mint/Ivory Border */}
              <div
                className={`mx-auto rounded-[32px] shadow-editorial ${isMobile ? 'p-3 max-w-sm' : isTablet ? 'p-4 max-w-2xl' : 'p-5 max-w-4xl'
                  }`}
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <div
                  className={`relative ${isMobile ? 'h-[280px]' : isTablet ? 'h-[380px]' : 'h-[500px]'
                    } rounded-[24px] overflow-hidden`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=85"
                    alt="Isabella y Tomás - Sesión Preboda"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 text-center text-ivory-50">
                    <p
                      className={`font-serif italic drop-shadow ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'
                        }`}
                    >
                      «En tus ojos encontré mi lugar favorito en el mundo»
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CHARACTERISTIC LOVE QUOTE */}
            <section className={`${isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-8'} text-center`}>
              <div
                className={`mx-auto ${isMobile
                    ? 'p-6 rounded-[28px] max-w-sm'
                    : isTablet
                      ? 'p-9 rounded-[32px] max-w-2xl'
                      : 'p-12 rounded-[36px] max-w-4xl'
                  } shadow-sm space-y-4`}
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <Sparkles className="w-6 h-6 mx-auto" style={{ color: currentTheme.primaryHex }} />
                <blockquote
                  className={`font-serif italic leading-relaxed ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'
                    }`}
                >
                  «El amor verdadero no se trata de no tener diferencias, sino de saber caminar
                  juntos hacia el mismo horizonte. Hoy comenzamos nuestra mayor aventura.»
                </blockquote>
                <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: currentTheme.primaryHex }}>
                  — Isabella &amp; Tomás
                </p>
              </div>
            </section>

            {/* COUNTDOWN TIMER & CEREMONY/RECEPTION LOCATIONS */}
            <section className={isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-8'}>
              <div className={`${isMobile ? 'max-w-sm' : isTablet ? 'max-w-2xl' : 'max-w-5xl'} mx-auto space-y-8 text-center`}>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.26em] font-semibold" style={{ color: currentTheme.primaryHex }}>
                    Cuenta Regresiva
                  </span>
                  <h2
                    className={`font-serif font-normal ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'
                      }`}
                  >
                    Sábado, 23 de Octubre de 2027
                  </h2>
                </div>

                {/* 4 Countdown Blocks */}
                <div
                  className={`grid ${isMobile
                      ? 'grid-cols-2 gap-2.5 max-w-xs'
                      : isTablet
                        ? 'grid-cols-4 gap-3.5 max-w-xl'
                        : 'grid-cols-4 gap-5 max-w-3xl'
                    } mx-auto`}
                >
                  {[
                    { label: 'Días', val: countdown.days },
                    { label: 'Horas', val: String(countdown.hours).padStart(2, '0') },
                    { label: 'Minutos', val: String(countdown.minutes).padStart(2, '0') },
                    { label: 'Segundos', val: String(countdown.seconds).padStart(2, '0') },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`${isMobile
                          ? 'py-3.5 px-2 rounded-2xl'
                          : isTablet
                            ? 'py-5 px-3 rounded-2xl'
                            : 'py-6 px-4 rounded-[28px]'
                        } shadow-sm flex flex-col items-center justify-center text-center overflow-hidden min-w-0`}
                      style={{
                        backgroundColor: currentTheme.cardHex,
                        border: `1px solid ${currentTheme.borderHex}`,
                      }}
                    >
                      <span
                        className={`font-serif ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl lg:text-5xl'
                          } font-semibold leading-none tracking-tight block max-w-full tabular-nums`}
                        style={{ color: currentTheme.primaryHex }}
                      >
                        {item.val}
                      </span>
                      <span
                        className={`${isMobile ? 'text-[10px]' : 'text-xs'} uppercase tracking-wider block mt-1.5`}
                        style={{ color: currentTheme.mutedHex }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ceremony & Reception Cards */}
                <div
                  className={`grid ${isMobile ? 'grid-cols-1 gap-4' : isTablet ? 'grid-cols-2 gap-5' : 'grid-cols-2 gap-8'
                    } text-left`}
                >
                  <div
                    className={`${isMobile ? 'p-5 rounded-[26px]' : isTablet ? 'p-6 rounded-[28px]' : 'p-8 rounded-[32px]'
                      } shadow-sm space-y-3`}
                    style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                        17:00 Hrs · Ceremonia
                      </span>
                      <Church className="w-5 h-5" style={{ color: currentTheme.primaryHex }} />
                    </div>
                    <h3 className={`font-serif ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}`}>
                      Parroquia de Santa María de las Rosas
                    </h3>
                    <p className={isMobile ? 'text-xs' : 'text-sm'} style={{ color: currentTheme.mutedHex }}>
                      Av. Virginia Subercaseaux 450, Pirque, Región Metropolitana.
                    </p>
                    <a
                      href="https://maps.google.com/?q=Pirque+Chile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold hover:underline pt-1"
                      style={{ color: currentTheme.primaryHex }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Abrir Ubicación GPS</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div
                    className={`${isMobile ? 'p-5 rounded-[26px]' : isTablet ? 'p-6 rounded-[28px]' : 'p-8 rounded-[32px]'
                      } shadow-sm space-y-3`}
                    style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                        19:00 Hrs · Recepción
                      </span>
                      <GlassWater className="w-5 h-5" style={{ color: currentTheme.primaryHex }} />
                    </div>
                    <h3 className={`font-serif ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}`}>
                      Jardín de las Hortensias
                    </h3>
                    <p className={isMobile ? 'text-xs' : 'text-sm'} style={{ color: currentTheme.mutedHex }}>
                      Salón Cristal &amp; Terraza de los Lirios, Pirque.
                    </p>
                    <a
                      href="https://maps.google.com/?q=Pirque+Chile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold hover:underline pt-1"
                      style={{ color: currentTheme.primaryHex }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Abrir Ubicación GPS</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* UNIFIED DRESS CODE */}
            <section className={isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-8'}>
              <div
                className={`mx-auto ${isMobile
                    ? 'p-6 rounded-[28px] max-w-sm'
                    : isTablet
                      ? 'p-8 rounded-[32px] max-w-2xl'
                      : 'p-12 rounded-[36px] max-w-4xl'
                  } text-center space-y-5 shadow-sm`}
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <Shirt className="w-6 h-6 mx-auto" style={{ color: currentTheme.primaryHex }} />
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                    Protocolo de Vestimenta
                  </span>
                  <h3 className={`font-serif ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'}`}>
                    Formal Elegante · Jardín de Gala
                  </h3>
                </div>
                <div
                  className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-5'
                    } text-left ${isMobile ? 'text-xs' : 'text-sm'}`}
                >
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: currentTheme.secondaryHex }}>
                    <strong className="block mb-1 font-serif text-lg">Damas</strong>
                    <p style={{ color: currentTheme.textHex }}>
                      Vestido largo o midi en tejidos frescos y elegantes. Tacón ancho o cuña sugerido para jardín.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: currentTheme.secondaryHex }}>
                    <strong className="block mb-1 font-serif text-lg">Caballeros</strong>
                    <p style={{ color: currentTheme.textHex }}>
                      Traje formal completo en tonos azul marino, gris medio o lino sastre con corbata o pañuelo.
                    </p>
                  </div>
                </div>
                <p className="text-xs italic pt-1" style={{ color: currentTheme.mutedHex }}>
                  * El color blanco, marfil y tonos crudos están reservados con cariño para la novia.
                </p>
              </div>
            </section>

            {/* RSVP SECTION DIRECT TO WHATSAPP */}
            <section className={isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-8'}>
              <div
                className={`mx-auto ${isMobile
                    ? 'p-6 rounded-[28px] max-w-sm'
                    : isTablet
                      ? 'p-8 rounded-[32px] max-w-2xl'
                      : 'p-12 rounded-[36px] max-w-3xl'
                  } shadow-sm space-y-5`}
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <div className="text-center space-y-2">
                  <MessageSquareHeart className="w-6 h-6 mx-auto" style={{ color: currentTheme.primaryHex }} />

                  <h3 className={`font-serif ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'}`}>
                    Confirmación de Asistencia
                  </h3>
                  <p className={isMobile ? 'text-xs' : 'text-sm'} style={{ color: currentTheme.mutedHex }}>
                    Agradecemos confirmar antes del 23 de Septiembre de 2027 directamente a los novios:
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1">
                      Nombre completo o Familia *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Ej. Familia Santillán"
                      className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgHex,
                        border: `1px solid ${currentTheme.borderHex}`,
                      }}
                    />
                  </div>

                  <div
                    className={`grid ${isMobile ? 'grid-cols-1 gap-2.5' : 'grid-cols-2 gap-3.5'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setAttending('si')}
                      className={`w-full py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 text-center shadow-sm ${attending === 'si'
                          ? 'bg-charcoal text-ivory-50'
                          : 'border'
                        }`}
                      style={{
                        borderColor: attending === 'si' ? 'transparent' : currentTheme.borderHex,
                        backgroundColor: attending === 'si' ? '#2C221E' : currentTheme.bgHex,
                        color: attending === 'si' ? '#FFFFFF' : currentTheme.textHex,
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>¡Sí, Asistiremos!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`w-full py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 text-center shadow-sm ${attending === 'no'
                          ? 'bg-charcoal text-ivory-50'
                          : 'border'
                        }`}
                      style={{
                        borderColor: attending === 'no' ? 'transparent' : currentTheme.borderHex,
                        backgroundColor: attending === 'no' ? '#2C221E' : currentTheme.bgHex,
                        color: attending === 'no' ? '#FFFFFF' : currentTheme.textHex,
                      }}
                    >
                      <Heart className="w-4 h-4 shrink-0" />
                      <span>No Podremos Asistir</span>
                    </button>
                  </div>

                  {attending === 'si' && (
                    <div
                      className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-3.5'
                        }`}
                    >
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-1">
                          Pases a confirmar
                        </label>
                        <select
                          value={passes}
                          onChange={(e) => setPasses(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                          style={{
                            backgroundColor: currentTheme.bgHex,
                            border: `1px solid ${currentTheme.borderHex}`,
                          }}
                        >
                          <option value="1">1 Pase</option>
                          <option value="2">2 Pases</option>
                          <option value="3">3 Pases</option>
                          <option value="4">4 Pases</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-1">
                          Canción para la fiesta
                        </label>
                        <input
                          type="text"
                          value={song}
                          onChange={(e) => setSong(e.target.value)}
                          placeholder="Tu tema favorito..."
                          className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                          style={{
                            backgroundColor: currentTheme.bgHex,
                            border: `1px solid ${currentTheme.borderHex}`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1">
                      Dedicatoria para Isabella &amp; Tomás
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Escribe aquí tus buenos deseos..."
                      className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgHex,
                        border: `1px solid ${currentTheme.borderHex}`,
                      }}
                    />
                  </div>

                  {/* Dos Botones de Confirmación a WhatsApp (Novia y Novio) */}
                  <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-3.5'} pt-2`}>
                    <button
                      type="button"
                      onClick={() => window.open(buildWhatsAppRsvp('novia'), '_blank', 'noopener,noreferrer')}
                      className="w-full py-4 px-4 rounded-2xl text-ivory-50 text-xs uppercase tracking-[0.16em] font-semibold transition flex items-center justify-center gap-2 shadow-md hover:opacity-95"
                      style={{ backgroundColor: currentTheme.primaryHex }}
                    >
                      <FaWhatsapp className="w-4 h-4 text-[#A7D7B8] shrink-0" />
                      <span>Confirmar a la Novia</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.open(buildWhatsAppRsvp('novio'), '_blank', 'noopener,noreferrer')}
                      className="w-full py-4 px-4 rounded-2xl text-ivory-50 text-xs uppercase tracking-[0.16em] font-semibold transition flex items-center justify-center gap-2 shadow-md hover:opacity-95"
                      style={{ backgroundColor: '#2C221E' }}
                    >
                      <FaWhatsapp className="w-4 h-4 text-[#A7D7B8] shrink-0" />
                      <span>Confirmar al Novio</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* GRATITUDE / CLOSING */}
            <section className={`${isMobile ? 'px-4 pt-4 pb-8' : isTablet ? 'px-6 pt-6 pb-10' : 'px-8 pt-10 pb-16'} text-center`}>
              <div className="max-w-2xl mx-auto space-y-4">
                <Heart className="w-6 h-6 mx-auto fill-current" style={{ color: currentTheme.primaryHex }} />
                <h3 className={`font-serif ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'}`}>
                  ¡Gracias por Acompañarnos!
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: currentTheme.mutedHex }}>
                  A nuestras familias y amigos por llenar de luz este camino. Nos vemos el 23 de
                  Octubre para celebrar el amor.
                </p>
                <p className="font-serif italic text-2xl pt-2" style={{ color: currentTheme.primaryHex }}>
                  Isabella &amp; Tomás
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
