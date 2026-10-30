import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, RotateCcw, Calendar, Clock, MapPin } from 'lucide-react';

// Bespoke ragged torn paper polygon mask (irregular handmade deckled edges)
const TORN_PAPER_CLIP = `polygon(
  0% 4px, 2.5% 1px, 5.5% 5px, 8.5% 2px, 12% 6px, 15.5% 1px, 19% 5px, 23% 2px, 27% 6px, 31% 1px, 35.5% 5px, 40% 2px, 44.5% 6px, 49% 1px, 53.5% 5px, 58% 2px, 62.5% 6px, 67% 1px, 71.5% 5px, 76% 2px, 80.5% 6px, 85% 1px, 89.5% 5px, 94% 2px, 97.5% 5px, 100% 3px,
  99.2% 8%, 100% 15%, 98.8% 22%, 100% 30%, 99.1% 37%, 100% 45%, 98.8% 53%, 100% 61%, 99.1% 69%, 100% 77%, 98.9% 85%, 100% 93%, 99.3% 98%,
  97.5% 99.5%, 94% 97.5%, 89.5% 100%, 85% 98%, 80.5% 100%, 76% 97.5%, 71.5% 100%, 67% 98%, 62.5% 100%, 58% 97.5%, 53.5% 100%, 49% 98%, 44.5% 100%, 40% 97.5%, 35.5% 100%, 31% 98%, 27% 100%, 23% 97.5%, 19% 100%, 15.5% 98%, 12% 100%, 8.5% 97.5%, 5.5% 100%, 2.5% 98%, 0% 99.5%,
  0.8% 93%, 0% 85%, 1.1% 77%, 0% 69%, 0.9% 61%, 0% 53%, 1.2% 45%, 0% 37%, 0.9% 30%, 0% 22%, 1.2% 15%, 0% 8%
)`;

export const BeachWeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Spray airbrush reveal state for hero photo
  const [isSprayed, setIsSprayed] = useState(false);

  // Video & Canvas references for single-play supernova effect
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [effectEnded, setEffectEnded] = useState(false);

  // Scroll reveal trigger
  const [hasScrolled, setHasScrolled] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Target wedding date: November 14, 2026 at 12:30
  const TARGET_DATE = new Date('2026-11-14T12:30:00').getTime();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen to first user scroll movement to trigger progressive reveal
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setHasScrolled(true);
      }
    };

    // IntersectionObserver for elements entering viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasScrolled(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isOpen]);

  // Trigger envelope opening
  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setEffectEnded(false);
      // Trigger spray airbrush photo reveal right upon landing
      setTimeout(() => {
        setIsSprayed(true);
      }, 150);
    }, 1600);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpening(false);
    setIsOpen(false);
    setIsSprayed(false);
    setEffectEnded(false);
    setHasScrolled(false);
  };

  // Real-time Chroma Key processor: renders supernova.webm ONLY ONCE
  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;

    // Reset video to start for 1-time playback
    video.currentTime = 0;
    video.play().catch(() => { });

    const render = () => {
      if (video.ended) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setEffectEnded(true);
        return;
      }

      if (video.readyState >= 2 && !video.paused) {
        const w = canvas.width;
        const h = canvas.height;
        ctx.drawImage(video, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data32 = new Uint32Array(imgData.data.buffer);
        const len = data32.length;

        for (let i = 0; i < len; i++) {
          const px = data32[i];
          const r = px & 0xff;
          const g = (px >> 8) & 0xff;
          const b = (px >> 16) & 0xff;
          if (r < 40 && g < 40 && b < 40) {
            data32[i] = 0;
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onEnded = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setEffectEnded(true);
      cancelAnimationFrame(animId);
    };

    video.addEventListener('ended', onEnded);

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener('ended', onEnded);
    };
  }, [isOpen]);

  return (
    <div
      onClick={!isOpen ? handleOpenEnvelope : undefined}
      className={`w-full relative overflow-x-hidden font-sans transition-colors duration-1000 ${!isOpen
        ? 'cursor-pointer select-none bg-gradient-to-br from-[#FAF3EB] via-[#F4EAE0] to-[#E9D9CB] flex items-center justify-center min-h-[100dvh] h-[100dvh] p-4 sm:p-6 md:p-10 overflow-hidden'
        : 'min-h-screen bg-gradient-to-b from-[#FAF4EC] via-[#F5ECE0] to-[#EBDDCE] text-stone-800'
        }`}
    >
      {/* ========================================================================= */}
      {/* 1. SOBRE CERRADO DECORADO (PAPEL PASTEL + SELLO DE LACRE EN RELIEVE)      */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center my-auto">
          {/* Subtle Instruction Badge - Positioned cleanly above the envelope without shifting its vertical center */}
          <div
            className={`absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-5 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#CDB59E] shadow-md text-xs sm:text-sm font-sans font-semibold text-[#2B190E] transition-all duration-300 max-w-[92vw] sm:max-w-none text-center ${isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 animate-pulse'
              }`}
          >
            <Sparkles className="w-4 h-4 text-[#A86F32] shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Haz clic en cualquier parte para abrir el sobre</span>
            <span className="sm:hidden whitespace-nowrap">Toca el sobre para abrir</span>
            <Sparkles className="w-4 h-4 text-[#A86F32] shrink-0" />
          </div>

          {/* Envelope Body Container - Dead Center */}
          <div
            className={`relative w-full aspect-[16/10.5] sm:aspect-[16/10] rounded-2xl transition-all duration-700 ${isOpening ? 'scale-105' : 'hover:scale-[1.015]'
              }`}
            style={{ perspective: '1600px' }}
          >
            {/* Ambient luxury drop shadow */}
            <div className="absolute inset-0 -bottom-6 bg-[#684832]/25 blur-2xl rounded-2xl transform scale-95" />

            {/* Back Plate / Base Paper Layer */}
            <div className="absolute inset-0 bg-[#F5ECE1] rounded-2xl border border-[#DFCDBC] overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 opacity-35 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#C9B098 0.75px, transparent 0.75px), radial-gradient(#C9B098 0.75px, #F5ECE1 0.75px)`,
                  backgroundSize: '14px 14px',
                  backgroundPosition: '0 0, 7px 7px',
                }}
              />
              <div className="absolute inset-3 border border-[#D4AF37]/50 rounded-xl pointer-events-none" />
            </div>

            {/* ===================================================================== */}
            {/* INVITACIÓN DENTRO DEL SOBRE                                           */}
            {/* ===================================================================== */}
            <div
              className={`absolute inset-x-4 sm:inset-x-6 top-3 bottom-3 bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F2] to-[#F8F2E8] rounded-xl shadow-lg border border-[#E5D5C3] p-4 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-1000 ease-out ${isOpening
                ? '-translate-y-[64%] sm:-translate-y-[70%] opacity-100 scale-100 shadow-2xl'
                : 'translate-y-0 opacity-0 pointer-events-none'
                }`}
              style={{
                zIndex: isOpening ? 15 : 5,
              }}
            >
              <div className="absolute inset-2 border border-[#D4AF37]/60 rounded-lg pointer-events-none" />
              <div className="absolute inset-3 border border-[#D4AF37]/35 rounded-md pointer-events-none" />

              {/* Top Monogram Crest */}
              <div className="relative pt-1 flex flex-col items-center">
                <div className="px-4 py-1 rounded-full border border-[#B8864E] flex items-center justify-center bg-[#FBF4EC] text-[#5A3414] shadow-sm mb-1 whitespace-nowrap">
                  <span className="font-serif text-xs sm:text-sm font-bold tracking-[0.25em] whitespace-nowrap">
                    V &amp; S
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#6E421A] font-bold">
                  <span>Nuestra Boda</span>
                </div>
              </div>

              {/* Couple Names & Title */}
              <div className="my-auto py-1 flex flex-col items-center">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1E130D] font-medium italic leading-tight">
                  Valentina &amp; Sebastián
                </h3>
                <div className="flex items-center justify-center gap-2 my-1.5">
                  <span className="w-8 h-[1.5px] bg-gradient-to-r from-transparent to-[#B8864E]" />
                  <Heart className="w-3.5 h-3.5 text-[#B8864E] fill-[#B8864E]" />
                  <span className="w-8 h-[1.5px] bg-gradient-to-l from-transparent to-[#B8864E]" />
                </div>
                <p className="font-serif text-xs sm:text-sm text-[#382315] font-medium italic mb-2">
                  «Celebrando nuestro amor frente al mar»
                </p>

                <div className="mt-1 px-3 py-1.5 rounded-md bg-[#F7EFE4] border border-[#D9C1A9] shadow-sm flex flex-col items-center gap-0.5">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4A2C12] font-bold">
                    Sábado, 14 de Noviembre · 12:30 hrs
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-wider text-[#351E0C] font-semibold">
                    Playa Blanca · Al Mediodía
                  </span>
                </div>
              </div>

              <div className="relative pb-1 text-center">
                <div className="w-12 h-[1px] bg-[#D4AF37]/60 mx-auto" />
              </div>
            </div>

            {/* ===================================================================== */}
            {/* FRONT POCKET & SIDE FLAPS                                             */}
            {/* ===================================================================== */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
              <div
                className="absolute top-0 bottom-0 left-0 w-[53%] bg-gradient-to-r from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-r border-[#DFCDBB]/80 shadow-[2px_0_8px_rgba(90,65,45,0.06)]"
                style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}
              >
                <div className="absolute top-3 left-3 w-16 h-16 border-t border-l border-[#D4AF37]/35 pointer-events-none" />
              </div>

              <div
                className="absolute top-0 bottom-0 right-0 w-[53%] bg-gradient-to-l from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-l border-[#DFCDBB]/80 shadow-[-2px_0_8px_rgba(90,65,45,0.06)]"
                style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)' }}
              >
                <div className="absolute top-3 right-3 w-16 h-16 border-t border-r border-[#D4AF37]/35 pointer-events-none" />
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-[68%] bg-gradient-to-t from-[#E8D8C7] via-[#EFE2D3] to-[#F7ECE0] border-t border-[#DBC7B4] shadow-[0_-6px_16px_rgba(90,65,45,0.08)] pointer-events-none"
                style={{ clipPath: 'polygon(0% 100%, 50% 18%, 100% 100%)' }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="100" x2="50" y2="18" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.55" />
                  <line x1="100" y1="100" x2="50" y2="18" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.55" />
                </svg>
              </div>
            </div>

            {/* DECORACIONES FRONTALES INFERIORES - FUERA DE CUALQUIER CLIP-PATH PARA VISIBILIDAD TOTAL */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none z-30 p-3 sm:p-5 flex items-end justify-between">
              {/* Sello postal y matasellos inferior derecho */}
              <div className="flex items-center gap-2">
                <div className="w-11 h-13 sm:w-12 sm:h-14 border-2 border-dashed border-[#8E5A2B] bg-[#FFFBF7] rounded p-1 flex flex-col items-center justify-between text-center shadow-md">
                  <Heart className="w-3.5 h-3.5 text-[#8E5A2B] fill-[#8E5A2B]" />
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-serif font-extrabold text-[#321B0B]">
                    Amor
                  </span>
                  <span className="text-[7px] sm:text-[8px] tracking-widest font-mono font-bold text-[#4E2E16]">
                    2026
                  </span>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#8E5A2B] bg-[#FFFBF7]/95 flex flex-col items-center justify-center text-[7px] sm:text-[8px] text-[#321B0B] font-mono font-bold rotate-12 shadow-md leading-tight">
                  <span>PLAYA</span>
                  <span>14.NOV</span>
                </div>
              </div>
            </div>

            {/* TOP TRIANGULAR FLAP */}
            <div
              className="absolute top-0 left-0 right-0 h-[64%] pointer-events-none origin-top transition-all duration-800 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'top center',
                transform: isOpening ? 'rotateX(180deg) translateZ(-8px)' : 'rotateX(0deg) translateZ(0px)',
                zIndex: isOpening ? 2 : 40,
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-b from-[#F5EADB] via-[#EEDECF] to-[#E3D1BF] shadow-[0_8px_18px_rgba(80,55,35,0.14)] border-b border-[#D8C4B0] relative"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="50" y2="100" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" />
                  <line x1="100" y1="0" x2="50" y2="100" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" />
                </svg>

                {/* V & S y "Para siempre" en letra manuscrita escrito directamente en el sobre */}
                <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none select-none z-10 w-full px-2">
                  <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.25em] text-[#3D2210] drop-shadow-sm">
                    V &amp; S
                  </span>
                  <span
                    className="text-2xl sm:text-3xl md:text-4xl text-[#5A3316] leading-none mt-1 drop-shadow-sm font-normal"
                    style={{
                      fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', 'Segoe Script', 'Brush Script MT', cursive",
                    }}
                  >
                    Para siempre
                  </span>
                </div>
              </div>
            </div>

            {/* SELLO DE CERA REALISTA (FORMA ORGÁNICA E IMPERFECTA CON V & S) */}
            <div
              className={`absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 pointer-events-none select-none ${
                isOpening ? 'scale-125 opacity-0 -translate-y-10' : 'scale-100 opacity-100'
              }`}
            >
              <div className="relative w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full drop-shadow-[0_12px_26px_rgba(65,18,6,0.6)]"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    {/* Gradiente de cera de lacre artesanal */}
                    <linearGradient id="waxGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                      <stop offset="0%" stopColor="#C44A24" />
                      <stop offset="35%" stopColor="#A33516" />
                      <stop offset="70%" stopColor="#7E240B" />
                      <stop offset="100%" stopColor="#521303" />
                    </linearGradient>

                    {/* Cama interior grabada (sello de bronce hundido) */}
                    <radialGradient id="dieBedGrad" cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#8C2C10" />
                      <stop offset="65%" stopColor="#6E1F09" />
                      <stop offset="100%" stopColor="#451002" />
                    </radialGradient>

                    {/* Filtro de relieve 3D para V & S grabado en cera */}
                    <filter id="debossFilter" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="1.5" stdDeviation="0.75" floodColor="#220702" floodOpacity="0.95" />
                      <feDropShadow dx="0" dy="-0.75" stdDeviation="0.5" floodColor="#FFAF8A" floodOpacity="0.4" />
                    </filter>
                  </defs>

                  {/* 1. Lóbulo base de cera derretida con bordes orgánicos e imperfectos */}
                  <path
                    d="M 50,4
                       C 64,3 77,8 85,17
                       C 93,25 99,35 99,47
                       C 99,57 95,68 93,76
                       C 89,86 81,94 70,97
                       C 60,100 48,98 38,96
                       C 27,93 17,88 12,79
                       C 6,70 5,58 6,47
                       C 7,35 13,24 22,16
                       C 31,8 41,5 50,4 Z"
                    fill="url(#waxGrad)"
                  />

                  {/* 2. Capa secundaria de desborde de cera para máxima imperfección realista */}
                  <path
                    d="M 48,6
                       C 62,5 74,9 82,19
                       C 89,28 96,39 96,50
                       C 96,60 92,71 86,79
                       C 78,87 68,93 57,94
                       C 46,95 35,91 26,84
                       C 17,76 11,65 10,53
                       C 9,42 15,30 23,21
                       C 31,12 40,7 48,6 Z"
                    fill="url(#waxGrad)"
                    opacity="0.85"
                  />

                  {/* 3. Bisel superior con brillo de cera caliente */}
                  <path
                    d="M 50,8
                       C 61,7 72,11 78,20
                       C 84,28 90,38 91,48
                       C 91,56 87,65 83,72
                       C 77,80 67,86 56,87
                       C 46,88 36,84 28,78
                       C 21,72 16,62 15,52
                       C 14,42 19,32 26,24
                       C 33,16 42,9 50,8 Z"
                    fill="none"
                    stroke="#FFAC87"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                  />

                  {/* 4. Depresión circular central (impresión del cuño de metal en la cera) */}
                  <circle
                    cx="50"
                    cy="51"
                    r="27"
                    fill="url(#dieBedGrad)"
                    stroke="#2B0902"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                  />

                  {/* Ranura concéntrica de precisión artesanal */}
                  <circle
                    cx="50"
                    cy="51"
                    r="24"
                    fill="none"
                    stroke="#E27E50"
                    strokeWidth="0.75"
                    strokeOpacity="0.35"
                    strokeDasharray="90 2"
                  />

                  {/* 5. Monograma "V & S" grabado en la cera */}
                  <text
                    x="50"
                    y="59"
                    textAnchor="middle"
                    fontFamily="'Cormorant Garamond', Georgia, serif"
                    fontSize="22"
                    fontWeight="bold"
                    letterSpacing="2.5"
                    fill="#FFF4E8"
                    filter="url(#debossFilter)"
                  >
                    V &amp; S
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LANDING PAGE INVITACIÓN PRINCIPAL                                      */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="w-full animate-fadeIn transition-opacity duration-1000 pb-28">
          {/* Top Floating Control Bar */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={handleReset}
              className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#E2D2C2] shadow-md text-stone-700 text-xs font-medium transition-all hover:scale-105 active:scale-95"
              title="Volver a cerrar el sobre"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B88960] group-hover:-rotate-90 transition-transform duration-300" />
              <span>Ver sobre de nuevo</span>
            </button>
          </div>

          {/* ===================================================================== */}
          {/* SECCIÓN HERO: FOTO 1264x848 CON EFECTO SPRAY + SUPERNOVA (1 SOLA VEZ) */}
          {/* ===================================================================== */}
          <section className="relative w-full pt-6 sm:pt-10 pb-8 sm:pb-12 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
            {/* Framed Photo & Supernova Container (Exact 1264x848 on PC, Centered) */}
            <div className="relative w-full max-w-[1264px] aspect-[1264/848] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(110,80,60,0.25)] border-2 border-white/80 my-auto bg-[#F4E9DC]">
              {/* Couple Photo (Revealed with Spray / Airbrush Effect) */}
              <img
                src="/images/pareja-playa.jpg"
                alt="Pareja de novios en la playa a plena luz del sol de mediodía con ropa casual formal"
                className={`w-full h-full object-cover object-center transition-all duration-[1400ms] ease-out ${isSprayed
                  ? 'opacity-100 scale-100 blur-0 contrast-100'
                  : 'opacity-0 scale-95 blur-md contrast-150'
                  }`}
                style={{
                  clipPath: isSprayed ? 'circle(100% at 50% 50%)' : 'circle(8% at 50% 50%)',
                  transition: 'clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s ease-out, opacity 1s ease-out, transform 1.4s ease-out',
                }}
              />

              {/* Real-time Chroma-Key Canvas: Exactly 1264x848 (Plays Only Once) */}
              <canvas
                ref={canvasRef}
                width={1264}
                height={848}
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-1000 ${effectEnded ? 'opacity-0' : 'opacity-100'
                  }`}
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Hidden Source Video for Frame Extraction (No loop) */}
              <video
                ref={videoRef}
                src="/effects/supernova.webm"
                autoPlay
                muted
                playsInline
                className="hidden"
              />

              {/* Gentle Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none z-15" />

              {/* Names Overlay over Photo */}
              <div
                className={`absolute inset-0 z-20 flex flex-col items-center justify-end p-6 sm:p-10 md:p-14 text-center text-white transition-all duration-1000 delay-300 ${isSprayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] shadow-sm mb-2 sm:mb-3">
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  <span>Nuestra Boda</span>
                  <Sparkles className="w-3 h-3 text-amber-200" />
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)] font-normal mb-1">
                  Valentina <span className="italic font-light text-amber-100">&amp;</span> Sebastián
                </h1>

                <p className="font-serif italic text-sm sm:text-lg md:text-xl text-amber-50 drop-shadow max-w-lg">
                  «Junto al mar y bajo el sol radiante de mediodía»
                </p>

                {/* Subtle Scroll Hint */}
                <div className="mt-4 flex items-center gap-2 text-white/70 text-[11px] uppercase tracking-widest font-light animate-bounce">
                  <span>Desliza hacia abajo</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SECCIÓN ARTÍSTICA DE PAPEL ROTO: FECHA, CITA + COUNTDOWN INMEDIATO    */}
          {/* (APARICIÓN PROGRESIVA AL PRIMER MOVIMIENTO DE SCROLL)                  */}
          {/* ===================================================================== */}
          <div ref={detailsRef} className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 my-6 sm:my-10">
            {/* Outer Drop Shadow Wrapper for Torn Paper */}
            <div className="relative filter drop-shadow-[0_20px_45px_rgba(110,80,55,0.18)]">
              {/* Torn Paper Container with Ragged Deckle Edge */}
              <div
                className="bg-[#FCF9F3] relative p-8 sm:p-12 md:p-14 text-center border-t border-b border-[#E8DACB]"
                style={{
                  clipPath: TORN_PAPER_CLIP,
                }}
              >
                {/* Subtle Paper Fiber Grain Texture */}
                <div
                  className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#D2BAA2 0.75px, transparent 0.75px), radial-gradient(#D2BAA2 0.75px, #FCF9F3 0.75px)`,
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 8px 8px',
                  }}
                />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Element 1: "Estás cordialmente invitado" (Appears on scroll) */}
                  <div
                    className={`transition-all duration-700 ease-out transform ${hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0E4] border border-[#D8BEA3] text-[#5A3312] text-xs uppercase tracking-[0.28em] font-bold mb-4 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#A06930]" />
                      <span>Estás cordialmente invitado</span>
                    </div>
                  </div>

                  {/* Element 2: Wedding Date, Time & Venue (Appears with delay) */}
                  <div
                    className={`transition-all duration-700 delay-150 ease-out transform ${hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                  >
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E130D] font-medium tracking-tight mb-3">
                      Sábado, 14 de Noviembre de 2026
                    </h2>

                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#4E2F16] tracking-wider uppercase font-semibold mb-6">
                      <span className="flex items-center gap-1.5 font-bold text-[#3B1F0A]">
                        <Clock className="w-4 h-4 text-[#A86F32]" />
                        12:30 hrs
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5 font-bold text-[#3B1F0A]">
                        <MapPin className="w-4 h-4 text-[#A86F32]" />
                        Playa Blanca, Bahía Serena
                      </span>
                    </div>
                  </div>

                  {/* Element 3: Romantic Quote Phrase (Appears with delay) */}
                  <div
                    className={`transition-all duration-700 delay-300 ease-out transform max-w-xl mx-auto mb-8 pb-6 border-b border-[#E8DACB]/80 ${hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                  >
                    <p className="font-serif italic text-lg sm:text-xl text-[#261810] font-medium leading-relaxed">
                      «Hay momentos en la vida que son inolvidables, y compartirlos con las personas que más amamos los hace eternos.»
                    </p>
                  </div>

                  {/* Element 4: Immediate Countdown Timer (Appears with delay) */}
                  <div
                    className={`w-full transition-all duration-700 delay-450 ease-out transform ${hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                  >
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#5A3312] font-bold block mb-4">
                      Cuenta Regresiva
                    </span>

                    {/* Countdown 4-Card Grid on Torn Paper Sheet */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
                      {/* Días */}
                      <div className="bg-[#FFFDF9] rounded-xl border border-[#DFCDBC] p-3 sm:p-5 shadow-sm flex flex-col items-center justify-center">
                        <span className="font-serif text-3xl sm:text-4xl text-[#1E130D] font-bold leading-none mb-1.5">
                          {timeLeft.days}
                        </span>
                        <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#5A3312] uppercase font-bold">
                          Días
                        </span>
                      </div>

                      {/* Horas */}
                      <div className="bg-[#FFFDF9] rounded-xl border border-[#DFCDBC] p-3 sm:p-5 shadow-sm flex flex-col items-center justify-center">
                        <span className="font-serif text-3xl sm:text-4xl text-[#1E130D] font-bold leading-none mb-1.5">
                          {String(timeLeft.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#5A3312] uppercase font-bold">
                          Horas
                        </span>
                      </div>

                      {/* Minutos */}
                      <div className="bg-[#FFFDF9] rounded-xl border border-[#DFCDBC] p-3 sm:p-5 shadow-sm flex flex-col items-center justify-center">
                        <span className="font-serif text-3xl sm:text-4xl text-[#1E130D] font-bold leading-none mb-1.5">
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#5A3312] uppercase font-bold">
                          Minutos
                        </span>
                      </div>

                      {/* Segundos */}
                      <div className="bg-[#FFFDF9] rounded-xl border border-[#DFCDBC] p-3 sm:p-5 shadow-sm flex flex-col items-center justify-center">
                        <span className="font-serif text-3xl sm:text-4xl text-[#8E4D12] font-bold leading-none mb-1.5 animate-pulse">
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[#5A3312] uppercase font-bold">
                          Segundos
                        </span>
                      </div>
                    </div>

                    {/* Subtle heart footer divider */}
                    <div className="flex items-center justify-center gap-2.5 mt-7">
                      <span className="w-10 h-[1px] bg-[#D4AF37]/45" />
                      <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="w-10 h-[1px] bg-[#D4AF37]/45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
