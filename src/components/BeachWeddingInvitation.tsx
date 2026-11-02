import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, RotateCcw, Clock, MapPin } from 'lucide-react';

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
    video.play().catch(() => {});

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

                  {/* V & S y "Para siempre" escrito directamente en el sobre */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none select-none z-10 w-full px-2">
                    <span
                      className="text-2xl text-[#1E0D03] leading-none font-bold tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                      style={{
                        fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                      }}
                    >
                      V &amp; S
                    </span>
                    <span
                      className="text-2xl text-[#2A1204] leading-none mt-1 font-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                      style={{
                        fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                      }}
                    >
                      Para siempre
                    </span>
                  </div>
                </div>
              </div>

              {/* SELLO DE CERA REALISTA */}
              <div
                className={`absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 pointer-events-none select-none ${
                  isOpening ? 'scale-125 opacity-0 -translate-y-10' : 'scale-100 opacity-100'
                }`}
              >
                <div className="relative w-22 h-22 sm:w-24 sm:h-24 flex items-center justify-center">
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
            <div className="sticky top-3 self-end z-50 mr-3 pointer-events-auto">
              <button
                onClick={handleReset}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-[#E2D2C2] shadow-sm text-stone-700 text-xs font-medium transition-all hover:scale-105 active:scale-95"
                title="Volver a cerrar el sobre"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B88960] group-hover:-rotate-90 transition-transform duration-300" />
                <span>Ver sobre</span>
              </button>
            </div>

            {/* SECCIÓN HERO: FOTO VERTICAL (COMPROMETIDOS) CON EFECTO SPRAY + SUPERNOVA */}
            <section className="relative w-full pt-2 pb-5 flex flex-col items-center justify-center px-3.5">
              {/* Framed Photo & Supernova Container - Vertical Mobile Proportion (Aspect 9:13.5) */}
              <div className="relative w-full aspect-[9/13.5] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(110,80,60,0.22)] border-2 border-white/85 bg-[#F4E9DC]">
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

                {/* Real-time Chroma-Key Canvas: Vertical Mobile (Plays Only Once) */}
                <canvas
                  ref={canvasRef}
                  width={540}
                  height={810}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-1000 ${
                    effectEnded ? 'opacity-0' : 'opacity-100'
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 pointer-events-none z-15" />

                {/* Names Overlay over Photo */}
                <div
                  className={`absolute inset-0 z-20 flex flex-col items-center justify-end p-5 text-center text-white transition-all duration-1000 delay-300 ${
                    isSprayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-medium uppercase tracking-[0.25em] shadow-sm mb-2">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>Nuestra Boda</span>
                    <Sparkles className="w-3 h-3 text-amber-200" />
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] font-normal mb-1">
                    Valentina <span className="italic font-light text-amber-100">&amp;</span> Sebastián
                  </h1>

                  <p className="font-serif italic text-sm text-amber-50 drop-shadow max-w-xs">
                    «Junto al mar y bajo el sol radiante de mediodía»
                  </p>

                  {/* Subtle Scroll Hint */}
                  <div className="mt-3 flex items-center gap-1.5 text-white/75 text-[10px] uppercase tracking-widest font-light animate-bounce">
                    <span>Desliza hacia abajo</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN ARTÍSTICA DE PAPEL ROTO: FECHA, CITA + COUNTDOWN EN PROPORCIÓN CELULAR */}
            <div ref={detailsRef} className="relative w-full px-3.5 my-3">
              <div className="relative filter drop-shadow-[0_16px_36px_rgba(110,80,55,0.18)]">
                <div
                  className="bg-[#FCF9F3] relative px-4 py-8 text-center border-t border-b border-[#E8DACB]"
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
                    {/* Element 1: "Estás cordialmente invitado" */}
                    <div
                      className={`transition-all duration-700 ease-out transform ${
                        hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E4] border border-[#E5D2BE] text-[#9A6F45] text-[10px] uppercase tracking-[0.24em] font-semibold mb-3 shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#C59B6D]" />
                        <span>Estás cordialmente invitado</span>
                      </div>
                    </div>

                    {/* Element 2: Wedding Date, Time & Venue */}
                    <div
                      className={`transition-all duration-700 delay-150 ease-out transform ${
                        hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                    >
                      <h2 className="font-serif text-2xl text-[#2F2420] font-normal tracking-tight mb-2">
                        Sábado, 14 de Noviembre de 2026
                      </h2>

                      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#8C6947] tracking-wider uppercase font-medium mb-5">
                        <span className="flex items-center gap-1 font-semibold text-[#664627]">
                          <Clock className="w-3.5 h-3.5 text-[#B8864E]" />
                          12:30 hrs
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[#664627]">
                          <MapPin className="w-3.5 h-3.5 text-[#B8864E]" />
                          Playa Blanca, Bahía Serena
                        </span>
                      </div>
                    </div>

                    {/* Element 3: Romantic Quote Phrase */}
                    <div
                      className={`transition-all duration-700 delay-300 ease-out transform max-w-xs mx-auto mb-6 pb-4 border-b border-[#E8DACB]/80 ${
                        hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                    >
                      <p className="font-serif italic text-base text-[#3E312C] leading-relaxed">
                        «Hay momentos en la vida que son inolvidables, y compartirlos con las personas que más amamos los hace eternos.»
                      </p>
                    </div>

                    {/* Element 4: Immediate Countdown Timer */}
                    <div
                      className={`w-full transition-all duration-700 delay-450 ease-out transform ${
                        hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#A67C52] font-semibold block mb-3">
                        Cuenta Regresiva
                      </span>

                      {/* Countdown 4-Card Grid on Torn Paper Sheet */}
                      <div className="grid grid-cols-4 gap-1.5 max-w-xs mx-auto">
                        {/* Días */}
                        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8DACB] p-2 shadow-xs flex flex-col items-center justify-center">
                          <span className="font-serif text-2xl text-[#3A2E2B] font-normal leading-none mb-1">
                            {timeLeft.days}
                          </span>
                          <span className="text-[8px] tracking-[0.2em] text-[#916E49] uppercase font-medium">
                            Días
                          </span>
                        </div>

                        {/* Horas */}
                        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8DACB] p-2 shadow-xs flex flex-col items-center justify-center">
                          <span className="font-serif text-2xl text-[#3A2E2B] font-normal leading-none mb-1">
                            {String(timeLeft.hours).padStart(2, '0')}
                          </span>
                          <span className="text-[8px] tracking-[0.2em] text-[#916E49] uppercase font-medium">
                            Horas
                          </span>
                        </div>

                        {/* Minutos */}
                        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8DACB] p-2 shadow-xs flex flex-col items-center justify-center">
                          <span className="font-serif text-2xl text-[#3A2E2B] font-normal leading-none mb-1">
                            {String(timeLeft.minutes).padStart(2, '0')}
                          </span>
                          <span className="text-[8px] tracking-[0.2em] text-[#916E49] uppercase font-medium">
                            Min
                          </span>
                        </div>

                        {/* Segundos */}
                        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8DACB] p-2 shadow-xs flex flex-col items-center justify-center">
                          <span className="font-serif text-2xl text-[#B8864E] font-normal leading-none mb-1 animate-pulse">
                            {String(timeLeft.seconds).padStart(2, '0')}
                          </span>
                          <span className="text-[8px] tracking-[0.2em] text-[#916E49] uppercase font-medium">
                            Seg
                          </span>
                        </div>
                      </div>

                      {/* Subtle heart footer divider */}
                      <div className="flex items-center justify-center gap-2 mt-5">
                        <span className="w-8 h-[1px] bg-[#D4AF37]/45" />
                        <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                        <span className="w-8 h-[1px] bg-[#D4AF37]/45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
