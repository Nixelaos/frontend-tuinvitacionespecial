import React, { useState, useRef, useEffect } from 'react';
import { Heart, RotateCcw, Sparkles, Sun, Mail } from 'lucide-react';

// Bespoke ragged torn paper polygon mask (irregular handmade deckled edges)
const TORN_PAPER_CLIP = `polygon(
  0.0% 25.7px,
  1.56% 25.9px,
  3.11% 24.5px,
  4.56% 24.5px,
  6.12% 24.5px,
  7.68% 24.5px,
  9.23% 23.3px,
  10.79% 23.3px,
  12.35% 24.1px,
  13.79% 23.3px,
  15.35% 22.1px,
  16.91% 22.1px,
  18.46% 21.0px,
  20.02% 21.0px,
  21.58% 18.6px,
  23.03% 18.6px,
  24.58% 19.8px,
  26.14% 21.0px,
  27.7% 22.1px,
  29.25% 23.3px,
  30.81% 23.3px,
  32.26% 22.1px,
  33.82% 22.1px,
  35.37% 22.1px,
  36.93% 23.3px,
  38.49% 22.1px,
  40.04% 24.5px,
  41.49% 25.7px,
  43.05% 25.7px,
  44.61% 23.3px,
  46.16% 23.3px,
  47.72% 23.0px,
  49.28% 22.1px,
  50.72% 21.0px,
  52.28% 19.8px,
  53.84% 18.6px,
  55.39% 17.4px,
  56.95% 15.0px,
  58.51% 12.7px,
  59.96% 11.5px,
  61.51% 10.3px,
  63.07% 10.3px,
  64.63% 6.7px,
  66.18% 5.6px,
  67.74% 3.2px,
  69.19% 3.2px,
  70.75% 2.0px,
  72.3% 6.7px,
  73.86% 7.9px,
  75.42% 9.1px,
  76.97% 10.3px,
  78.42% 11.2px,
  79.98% 11.5px,
  81.54% 10.7px,
  83.09% 9.1px,
  84.65% 7.9px,
  86.21% 7.2px,
  87.65% 6.7px,
  89.21% 5.6px,
  90.77% 4.4px,
  92.32% 5.6px,
  93.88% 6.9px,
  95.44% 7.8px,
  96.89% 7.9px,
  98.44% 10.3px,
  100.0% 10.3px,
  100.0% calc(100% - 23.7px),
  98.44% calc(100% - 23.9px),
  96.89% calc(100% - 22.6px),
  95.44% calc(100% - 22.6px),
  93.88% calc(100% - 22.6px),
  92.32% calc(100% - 22.6px),
  90.77% calc(100% - 21.6px),
  89.21% calc(100% - 21.6px),
  87.65% calc(100% - 22.2px),
  86.21% calc(100% - 21.6px),
  84.65% calc(100% - 20.5px),
  83.09% calc(100% - 20.5px),
  81.54% calc(100% - 19.4px),
  79.98% calc(100% - 19.4px),
  78.42% calc(100% - 17.2px),
  76.97% calc(100% - 17.2px),
  75.42% calc(100% - 18.3px),
  73.86% calc(100% - 19.4px),
  72.3% calc(100% - 20.5px),
  70.75% calc(100% - 21.6px),
  69.19% calc(100% - 21.6px),
  67.74% calc(100% - 20.5px),
  66.18% calc(100% - 20.5px),
  64.63% calc(100% - 20.5px),
  63.07% calc(100% - 21.6px),
  61.51% calc(100% - 20.5px),
  59.96% calc(100% - 22.6px),
  58.51% calc(100% - 23.7px),
  56.95% calc(100% - 23.7px),
  55.39% calc(100% - 21.6px),
  53.84% calc(100% - 21.6px),
  52.28% calc(100% - 21.3px),
  50.72% calc(100% - 20.5px),
  49.28% calc(100% - 19.4px),
  47.72% calc(100% - 18.3px),
  46.16% calc(100% - 17.2px),
  44.61% calc(100% - 16.1px),
  43.05% calc(100% - 14.0px),
  41.49% calc(100% - 11.8px),
  40.04% calc(100% - 10.7px),
  38.49% calc(100% - 9.6px),
  36.93% calc(100% - 9.6px),
  35.37% calc(100% - 6.3px),
  33.82% calc(100% - 5.3px),
  32.26% calc(100% - 3.1px),
  30.81% calc(100% - 3.1px),
  29.25% calc(100% - 2.0px),
  27.7% calc(100% - 6.3px),
  26.14% calc(100% - 7.4px),
  24.58% calc(100% - 8.5px),
  23.03% calc(100% - 9.6px),
  21.58% calc(100% - 10.4px),
  20.02% calc(100% - 10.7px),
  18.46% calc(100% - 10.0px),
  16.91% calc(100% - 8.5px),
  15.35% calc(100% - 7.4px),
  13.79% calc(100% - 6.8px),
  12.35% calc(100% - 6.3px),
  10.79% calc(100% - 5.3px),
  9.23% calc(100% - 4.2px),
  7.68% calc(100% - 5.3px),
  6.12% calc(100% - 6.5px),
  4.56% calc(100% - 7.3px),
  3.11% calc(100% - 7.4px),
  1.56% calc(100% - 9.6px),
  0.0% calc(100% - 9.6px)
)`;

// Reusable scroll-reveal container: stays hidden until scrolled into view
const ScrollReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}> = ({ children, className = '', threshold = 0.12 }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-[0.98] pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const BeachWeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Spray airbrush reveal state for hero photo
  const [isSprayed, setIsSprayed] = useState(false);

  // Video reference for ambient particles & light effect (single-play with slow fade-out)
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEffectFading, setIsEffectFading] = useState(false);
  const [isEffectEnded, setIsEffectEnded] = useState(false);

  // Trigger slow fade-out near the end of video duration (duration ~5.16s)
  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (video.duration - video.currentTime <= 1.8) {
      setIsEffectFading(true);
    }
  };

  const handleVideoEnded = () => {
    setIsEffectFading(true);
    setIsEffectEnded(true);
  };

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

  // Trigger envelope opening
  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setIsEffectFading(false);
      setIsEffectEnded(false);
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
    setIsEffectFading(false);
    setIsEffectEnded(false);
  };

  // Video playback control: single play upon opening, resetting on close
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      setIsEffectFading(false);
      setIsEffectEnded(false);
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      setIsEffectFading(false);
      setIsEffectEnded(false);
    }
  }, [isOpen]);

  return (
    // Outer Desktop/Tablet Backdrop with Side Bands ("Franjas a ambos lados")
    <div className="w-full min-h-screen bg-[#E5DDD2] flex justify-center items-start">
      {/* Mobile-Proportion Viewport Container (Fixed width 430px on PC/Tablet, Full Width on Mobile) */}
      <div
        onClick={!isOpen ? handleOpenEnvelope : undefined}
        className={`w-full max-w-[430px] min-h-screen relative overflow-x-hidden font-sans transition-colors duration-1000 shadow-[0_0_50px_rgba(70,50,30,0.18)] sm:border-x sm:border-[#D5C6B5] flex flex-col ${
          !isOpen
            ? 'cursor-pointer select-none bg-gradient-to-br from-[#FAF3EB] via-[#F4EAE0] to-[#E9D9CB] justify-center items-center h-[100dvh] p-4 overflow-hidden'
            : 'bg-gradient-to-b from-[#FAF4EC] via-[#F5ECE0] to-[#EBDDCE] text-stone-800'
        }`}
      >
        {/* ========================================================================= */}
        {/* 1. SOBRE CERRADO DECORADO (PAPEL PASTEL + SELLO DE LACRE EN RELIEVE)      */}
        {/* ========================================================================= */}
        {!isOpen && (
          <div className="relative w-full max-w-[390px] flex items-center justify-center my-auto px-1">
            {/* Subtle Instruction Badge */}
            <div
              className={`absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#CDB59E] shadow-md text-xs font-sans font-semibold text-[#2B190E] transition-all duration-300 whitespace-nowrap ${
                isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 animate-pulse'
              }`}
            >
              <span>Toca el sobre para abrir</span>
            </div>

            {/* Envelope Body Container */}
            <div
              className={`relative w-full aspect-[16/10.5] rounded-2xl transition-all duration-700 ${
                isOpening ? 'scale-105' : 'hover:scale-[1.015]'
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

              {/* INVITACIÓN DENTRO DEL SOBRE (DESLIZA HACIA ARRIBA) */}
              <div
                className={`absolute inset-x-4 top-3 bottom-3 bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F2] to-[#F8F2E8] rounded-xl shadow-lg border border-[#E5D5C3] p-4 flex flex-col items-center justify-between text-center transition-all duration-1000 ease-out ${
                  isOpening
                    ? '-translate-y-[64%] opacity-100 scale-100 shadow-2xl'
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
                  <div className="px-3.5 py-0.5 rounded-full border border-[#B8864E] flex items-center justify-center bg-[#FBF4EC] text-[#5A3414] shadow-sm mb-1 whitespace-nowrap">
                    <span className="font-serif text-xs font-bold tracking-[0.25em] whitespace-nowrap">
                      V &amp; S
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#6E421A] font-bold">
                    <span>Nuestra Boda</span>
                  </div>
                </div>

                {/* Couple Names & Title */}
                <div className="my-auto py-1 flex flex-col items-center">
                  <h3 className="font-serif text-2xl text-[#1E130D] font-medium italic leading-tight">
                    Valentina &amp; Sebastián
                  </h3>
                  <div className="flex items-center justify-center gap-2 my-1">
                    <span className="w-6 h-[1.5px] bg-gradient-to-r from-transparent to-[#B8864E]" />
                    <Heart className="w-3 h-3 text-[#B8864E] fill-[#B8864E]" />
                    <span className="w-6 h-[1.5px] bg-gradient-to-l from-transparent to-[#B8864E]" />
                  </div>
                  <p className="font-serif text-xs text-[#382315] font-medium italic mb-1.5">
                    «Celebrando nuestro amor frente al mar»
                  </p>

                  <div className="mt-0.5 px-2.5 py-1 rounded-md bg-[#F7EFE4] border border-[#D9C1A9] shadow-xs flex flex-col items-center gap-0.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A2C12] font-bold">
                      Sábado, 14 de Noviembre · 12:30 hrs
                    </span>
                    <span className="text-[9px] tracking-wider text-[#351E0C] font-semibold">
                      Playa Blanca · Al Mediodía
                    </span>
                  </div>
                </div>

                <div className="relative pb-0.5 text-center">
                  <div className="w-10 h-[1px] bg-[#D4AF37]/60 mx-auto" />
                </div>
              </div>

              {/* FRONT POCKET & SIDE FLAPS */}
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
                <div
                  className="absolute top-0 bottom-0 left-0 w-[53%] bg-gradient-to-r from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-r border-[#DFCDBB]/80 shadow-[2px_0_8px_rgba(90,65,45,0.06)]"
                  style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}
                >
                  <div className="absolute top-3 left-3 w-12 h-12 border-t border-l border-[#D4AF37]/35 pointer-events-none" />
                </div>

                <div
                  className="absolute top-0 bottom-0 right-0 w-[53%] bg-gradient-to-l from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-l border-[#DFCDBB]/80 shadow-[-2px_0_8px_rgba(90,65,45,0.06)]"
                  style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)' }}
                >
                  <div className="absolute top-3 right-3 w-12 h-12 border-t border-r border-[#D4AF37]/35 pointer-events-none" />
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-[68%] bg-gradient-to-t from-[#E8D8C7] via-[#EFE2D3] to-[#F7ECE0] border-t border-[#DBC7B4] shadow-[0_-6px_16px_rgba(90,65,45,0.08)] pointer-events-none"
                  style={{ clipPath: 'polygon(0% 100%, 50% 18%, 100% 100%)' }}
                >
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="100"
                      x2="50"
                      y2="18"
                      stroke="#D4AF37"
                      strokeWidth="0.75"
                      strokeOpacity="0.55"
                    />
                    <line
                      x1="100"
                      y1="100"
                      x2="50"
                      y2="18"
                      stroke="#D4AF37"
                      strokeWidth="0.75"
                      strokeOpacity="0.55"
                    />
                  </svg>
                </div>
              </div>

              {/* STICKER / SELLO POSTAL INFERIOR DERECHO */}
              <div className="absolute bottom-3 right-3 pointer-events-none z-30 flex items-center gap-1.5">
                <div className="w-10 h-12 border-2 border-dashed border-[#8E5A2B] bg-[#FFFBF7] rounded p-1 flex flex-col items-center justify-between text-center shadow-xs">
                  <Heart className="w-3 h-3 text-[#8E5A2B] fill-[#8E5A2B]" />
                  <span className="text-[8px] uppercase tracking-wider font-serif font-extrabold text-[#321B0B]">
                    Amor
                  </span>
                  <span className="text-[7px] tracking-widest font-mono font-bold text-[#4E2E16]">
                    2026
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-[#8E5A2B] bg-[#FFFBF7]/95 flex flex-col items-center justify-center text-[7px] text-[#321B0B] font-mono font-bold rotate-12 shadow-xs leading-tight">
                  <span>PLAYA</span>
                  <span>14.NOV</span>
                </div>
              </div>

              {/* TOP TRIANGULAR FLAP */}
              <div
                className="absolute top-0 left-0 right-0 h-[64%] pointer-events-none origin-top transition-all duration-800 ease-in-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'top center',
                  transform: isOpening
                    ? 'rotateX(180deg) translateZ(-8px)'
                    : 'rotateX(0deg) translateZ(0px)',
                  zIndex: isOpening ? 2 : 40,
                  filter: isOpening ? 'none' : 'drop-shadow(0 10px 16px rgba(65, 38, 20, 0.2))',
                }}
              >
                <div
                  className="w-full h-full bg-gradient-to-b from-[#F5EADB] via-[#EEDECF] to-[#E3D1BF] shadow-[0_8px_18px_rgba(80,55,35,0.14)] border-b border-[#D8C4B0] relative"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
                >
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="50"
                      y2="100"
                      stroke="#D4AF37"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                    />
                    <line
                      x1="100"
                      y1="0"
                      x2="50"
                      y2="100"
                      stroke="#D4AF37"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                    />
                  </svg>

                  {/* Valentina & Sebastián escrito directamente en el sobre */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none select-none z-10 w-full px-3">
                    <span
                      className="font-script text-2xl sm:text-3xl text-[#2A1204] leading-tight font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]"
                      style={{
                        fontFamily: "'Great Vibes', cursive",
                      }}
                    >
                      Valentina <span className="text-[#8E5A2B]">&amp;</span> Sebastián
                    </span>
                  </div>
                </div>
              </div>

              {/* SELLO DE CERA REALISTA */}
              <div
                className={`absolute left-1/2 top-[58%] w-[22%] max-w-[96px] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 pointer-events-none select-none ${
                  isOpening ? 'scale-125 opacity-0 -translate-y-10' : 'scale-100 opacity-100'
                }`}
              >
                <div
                  className="relative w-full aspect-square flex items-center justify-center"
                >
                  <img
                    src="/images/sello-cera.webp"
                    alt="Sello de cera V & S"
                    className="w-full h-full object-contain"
                    style={{
                      filter:
                        'drop-shadow(0px 3px 5px rgba(40, 16, 6, 0.45)) drop-shadow(0px 10px 18px rgba(45, 18, 8, 0.4))',
                    }}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. LANDING PAGE INVITACIÓN ABIERTA (SOLO EN PROPORCIÓN CELULAR)           */}
        {/* ========================================================================= */}
        {isOpen && (
          <div className="w-full animate-fadeIn transition-opacity duration-1000 pb-20 flex flex-col">
            {/* Top Floating Control Bar (permanece dentro de la vista de celular) */}
            <div className="absolute top-3 right-3 z-30 pointer-events-auto">
              <button
                onClick={handleReset}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-[#E2D2C2] shadow-sm text-stone-700 text-xs font-medium transition-all hover:scale-105 active:scale-95"
                title="Volver a cerrar el sobre"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B88960] group-hover:-rotate-90 transition-transform duration-300" />
                <span>Ver sobre</span>
              </button>
            </div>

            {/* SECCIÓN HERO: FOTO VERTICAL (COMPROMETIDOS) CALZADA A BORDES DE ARRIBA Y LADOS */}
            <section className="relative w-full overflow-hidden">
              {/* Photo & Video Container - Full Bleed to Top and Lateral Edges */}
              <div className="relative w-full aspect-[9/13.5] overflow-hidden bg-[#F4E9DC]">
                {/* Foto de Pareja de Novios Comprometidos */}
                <img
                  src="/images/comprometidos.webp"
                  alt="Valentina & Sebastián — Pareja de novios comprometidos"
                  className={`w-full h-full object-cover object-center transition-all duration-[1400ms] ease-out ${
                    isSprayed
                      ? 'opacity-100 scale-100 blur-0 contrast-100'
                      : 'opacity-0 scale-95 blur-md contrast-150'
                  }`}
                  style={{
                    clipPath: isSprayed ? 'circle(100% at 50% 50%)' : 'circle(8% at 50% 50%)',
                    transition:
                      'clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s ease-out, opacity 1s ease-out, transform 1.4s ease-out',
                  }}
                />

                {/* Video Overlay: Miles de Partículas Doradas (Reproducción única con desvanecimiento lento) */}
                <video
                  ref={videoRef}
                  src="/effects/miles_de_particulas_doradas.webm"
                  autoPlay
                  muted
                  playsInline
                  onTimeUpdate={handleVideoTimeUpdate}
                  onEnded={handleVideoEnded}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-[2000ms] ease-out ${
                    isSprayed && !isEffectFading && !isEffectEnded ? 'opacity-90' : 'opacity-0'
                  }`}
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'contrast(125%) brightness(105%)',
                  }}
                >
                  <source src="/effects/miles_de_particulas_doradas.webm" type="video/webm" />
                  <source src="/effects/particulas_y_luz.webm" type="video/webm" />
                  <source src="/effects/supernova.webm" type="video/webm" />
                </video>

                {/* Gentle Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 pointer-events-none z-15" />

                {/* Names Overlay over Photo: ONLY 'Valentina & Sebastián' in cursive */}
                <div
                  className={`absolute inset-0 z-20 flex flex-col items-center justify-end px-5 pb-16 sm:pb-20 text-center text-white transition-all duration-1000 delay-300 pointer-events-none ${
                    isSprayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h1
                    className="font-script text-4xl sm:text-5xl md:text-6xl tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] font-normal py-1"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Valentina <span className="font-light text-amber-100">&amp;</span> Sebastián
                  </h1>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1: PAPEL ROTO CON FLOR DE CONTRASTE — ¡NOS CASAMOS!, FECHA Y COUNTDOWN MANUSCRITO */}
            <ScrollReveal className="relative z-20 w-full -mt-12 sm:-mt-14 mb-8">
              {/* Main handmade torn paper sheet with authentic deep ragged edge (Edge-to-Edge) */}
              <div
                className="bg-[#FCF9F3] relative w-full px-4 pt-12 pb-10 text-center shadow-xs"
                style={{
                  clipPath: TORN_PAPER_CLIP,
                }}
              >
                {/* Flor botánica de contraste en el borde de papel rasgado */}
                <div className="absolute -top-8 sm:-top-11 right-2 sm:right-4 w-20 sm:w-24 md:w-28 z-30 pointer-events-none transform rotate-12 drop-shadow-[0_6px_12px_rgba(60,25,12,0.25)]">
                  <img
                    src="/images/flor-contraste.webp"
                    alt="Flor de contraste"
                    className="w-full h-auto object-contain select-none"
                    loading="eager"
                  />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* ¡Nos casamos! en letra manuscrita */}
                  <span
                    className="font-script text-3xl sm:text-4xl text-[#B87A4A] font-normal tracking-wide leading-none mb-2"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    ¡Nos casamos!
                  </span>

                  {/* Fecha en Letras Manuscritas (Great Vibes) */}
                  <h2
                    className="font-script text-2xl sm:text-3xl md:text-4xl text-[#2F2420] font-normal tracking-wide mb-6 leading-tight"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Sábado, 14 de Noviembre de 2026
                  </h2>

                  {/* Cuenta Regresiva con números manuscritos */}
                  <div className="w-full">
                    {/* Countdown 4-Card Grid on Torn Paper Sheet */}
                    <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                      {/* Días */}
                      <div className="bg-[#FFFDF9]/95 backdrop-blur-xs rounded-xl border border-[#E8DACB] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#2F2420] font-normal leading-none mb-0.5"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {timeLeft.days}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Días
                        </span>
                      </div>

                      {/* Horas */}
                      <div className="bg-[#FFFDF9]/95 backdrop-blur-xs rounded-xl border border-[#E8DACB] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#2F2420] font-normal leading-none mb-0.5"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {String(timeLeft.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Horas
                        </span>
                      </div>

                      {/* Minutos */}
                      <div className="bg-[#FFFDF9]/95 backdrop-blur-xs rounded-xl border border-[#E8DACB] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#2F2420] font-normal leading-none mb-0.5"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Min
                        </span>
                      </div>

                      {/* Segundos */}
                      <div className="bg-[#FFFDF9]/95 backdrop-blur-xs rounded-xl border border-[#E8DACB] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#B87A4A] font-normal leading-none mb-0.5 animate-pulse"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Seg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* SECCIÓN 2: PRIMER MENSAJE ESPECIAL — PALABRAS DEL CORAZÓN */}
            <ScrollReveal className="w-full px-4 mb-6">
              <div className="bg-[#FCF9F3] rounded-2xl border border-[#E9DDD0] shadow-sm p-6 sm:p-7 relative overflow-hidden text-center">
                {/* Subtle top badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#E5D2BE] text-[#9A6F45] text-[10px] uppercase tracking-[0.24em] font-semibold mb-3 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#C59B6D]" />
                  <span>Un Mensaje Especial</span>
                </div>

                <h3
                  className="font-script text-3xl sm:text-4xl text-[#2F2420] mb-4 font-normal"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  Palabras del Corazón
                </h3>

                <p className="font-serif italic text-base sm:text-lg text-[#3E3029] leading-relaxed mb-4 max-w-sm mx-auto">
                  «A orillas del mar, donde cada ola nos recuerda la inmensidad del camino que elegimos recorrer juntos, decidimos dar el paso más importante de nuestras vidas.»
                </p>

                <p className="font-serif text-xs sm:text-sm text-[#5B473E] leading-relaxed mb-6 max-w-xs mx-auto">
                  Queremos agradecerte de corazón por ser parte de nuestra historia, por cada abrazo y por acompañarnos en este hermoso comienzo. Nuestro día no sería lo mismo sin ti.
                </p>

                {/* Couple signature */}
                <div className="flex flex-col items-center">
                  <span
                    className="font-script text-2xl sm:text-3xl text-[#9A6F45]"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Valentina &amp; Sebastián
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="w-10 h-[1px] bg-[#D4AF37]/45" />
                    <Heart className="w-3 h-3 text-[#B8864E] fill-[#B8864E]" />
                    <span className="w-10 h-[1px] bg-[#D4AF37]/45" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* SECCIÓN 3: SEGUNDO MENSAJE ESPECIAL — DETALLES DE LA CELEBRACIÓN */}
            <ScrollReveal className="w-full px-4 mb-8">
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DACB] shadow-sm p-6 sm:p-7 relative overflow-hidden text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#E5D2BE] text-[#9A6F45] text-[10px] uppercase tracking-[0.24em] font-semibold mb-3 shadow-xs">
                  <Heart className="w-3 h-3 text-[#C59B6D] fill-[#C59B6D]" />
                  <span>Pensado para ti</span>
                </div>

                <h3
                  className="font-script text-3xl sm:text-4xl text-[#2F2420] mb-5 font-normal"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  Momentos Inolvidables
                </h3>

                <div className="grid grid-cols-1 gap-3.5 max-w-sm mx-auto text-left">
                  {/* Card 1: Dress Code */}
                  <div className="bg-[#FCF9F3] rounded-xl border border-[#ECE0D3] p-4 flex items-start gap-3.5 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-[#FAF0E4] border border-[#E5D2BE] flex items-center justify-center shrink-0 mt-0.5">
                      <Sun className="w-4 h-4 text-[#B8864E]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#2F2420] tracking-wide mb-1">
                        Código de Vestimenta: Playa Elegante
                      </h4>
                      <p className="text-xs text-[#6B5548] leading-relaxed">
                        Lino, guayaberas y vestidos frescos en tonos arena, cálidos o pasteles. Sugerimos calzado cómodo para disfrutar libremente de la brisa y la arena.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Lluvia de Sobres */}
                  <div className="bg-[#FCF9F3] rounded-xl border border-[#ECE0D3] p-4 flex items-start gap-3.5 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-[#FAF0E4] border border-[#E5D2BE] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-[#B8864E]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#2F2420] tracking-wide mb-1">
                        Lluvia de Sobres
                      </h4>
                      <p className="text-xs text-[#6B5548] leading-relaxed">
                        Tu compañía es nuestro mejor regalo. Si deseas hacernos un presente para nuestro nuevo hogar, dispondremos de un buzón de sobres durante la velada.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DACB]/60">
                  <p
                    className="font-script text-2xl text-[#8E5A2B]"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    ¡Nos vemos junto al mar para celebrar!
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
};
