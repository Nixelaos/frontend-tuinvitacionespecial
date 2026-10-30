import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, RotateCcw, Calendar, Clock } from 'lucide-react';

export const BeachWeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Video & Canvas references for single-play supernova effect
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [effectEnded, setEffectEnded] = useState(false);

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

  // Trigger envelope opening on click anywhere
  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setEffectEnded(false);
    }, 1600);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpening(false);
    setIsOpen(false);
    setEffectEnded(false);
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
      // If video has finished its single play, clear canvas and stop
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

        // Eliminate black background by setting alpha = 0 for dark pixels
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
      className={`w-full relative overflow-x-hidden font-sans transition-colors duration-1000 ${
        !isOpen
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
            className={`absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-5 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#CDB59E] shadow-md text-xs sm:text-sm font-sans font-semibold text-[#2B190E] transition-all duration-300 max-w-[92vw] sm:max-w-none text-center ${
              isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 animate-pulse'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#A86F32] shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Haz clic en cualquier parte para abrir el sobre</span>
            <span className="sm:hidden whitespace-nowrap">Toca el sobre para abrir</span>
            <Sparkles className="w-4 h-4 text-[#A86F32] shrink-0" />
          </div>

          {/* Envelope Body Container - Dead Center */}
          <div
            className={`relative w-full aspect-[16/10.5] sm:aspect-[16/10] rounded-2xl transition-all duration-700 ${
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

            {/* ===================================================================== */}
            {/* INVITACIÓN DENTRO DEL SOBRE                                           */}
            {/* ===================================================================== */}
            <div
              className={`absolute inset-x-4 sm:inset-x-6 top-3 bottom-3 bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F2] to-[#F8F2E8] rounded-xl shadow-lg border border-[#E5D5C3] p-4 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-1000 ease-out ${
                isOpening
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

            {/* STICKER / SELLO POSTAL INFERIOR DERECHO (VISIBLE 100% POR ENCIMA DEL SOBRE) */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 pointer-events-none z-30 flex items-center gap-2">
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

            {/* TOP TRIANGULAR FLAP */}
            <div
              className="absolute top-0 left-0 right-0 h-[64%] pointer-events-none origin-top transition-all duration-800 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'top center',
                transform: isOpening ? 'rotateX(180deg) translateZ(-8px)' : 'rotateX(0deg) translateZ(0px)',
                zIndex: isOpening ? 2 : 40,
                filter: isOpening ? 'none' : 'drop-shadow(0 12px 18px rgba(65, 38, 20, 0.22))',
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

                {/* V & S y "Para siempre" en letra manuscrita escrito directamente en el sobre con alto contraste */}
                <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none select-none z-10 w-full px-2">
                  <span
                    className="text-2xl sm:text-3xl md:text-4xl text-[#1E0D03] leading-none font-bold tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                    style={{
                      fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                    }}
                  >
                    V &amp; S
                  </span>
                  <span
                    className="text-2xl sm:text-3xl md:text-4xl text-[#2A1204] leading-none mt-1 sm:mt-1.5 font-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                    style={{
                      fontFamily: "'Great Vibes', 'Dancing Script', 'Alex Brush', cursive",
                    }}
                  >
                    Para siempre
                  </span>
                </div>
              </div>
            </div>

            {/* SELLO DE CERA REALISTA (FOTO DE LACRE REAL CON SOMBRAS PROFUNDAS) */}
            <div
              className={`absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 pointer-events-none select-none ${
                isOpening ? 'scale-125 opacity-0 -translate-y-10' : 'scale-100 opacity-100'
              }`}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                <img
                  src="/images/sello-cera.webp"
                  alt="Sello de cera V & S"
                  className="w-full h-full object-contain"
                  style={{
                    filter:
                      'drop-shadow(0px 3px 5px rgba(40, 16, 6, 0.45)) drop-shadow(0px 12px 20px rgba(45, 18, 8, 0.42)) drop-shadow(0px 22px 28px rgba(55, 22, 10, 0.2))',
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
      {/* 2. LANDING PAGE INVITACIÓN PRINCIPAL (FONDO PASTEL ARMONIZADO)             */}
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
          {/* SECCIÓN HERO: FOTO 1264x848 CENTRADA + EFECTO SUPERNOVA (1 SOLA VEZ) */}
          {/* ===================================================================== */}
          <section className="relative w-full pt-8 sm:pt-12 pb-10 sm:pb-16 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
            {/* Framed Photo & Supernova Container (Exact 1264x848 on PC, Centered) */}
            <div className="relative w-full max-w-[1264px] aspect-[1264/848] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(110,80,60,0.22)] border-2 border-white/80 my-auto">
              {/* Couple Photo (Casual Formal Resort Attire at Midday Beach) */}
              <img
                src="/images/pareja-playa.jpg"
                alt="Pareja de novios en la playa a plena luz del sol de mediodía con ropa casual formal"
                className="w-full h-full object-cover object-center"
              />

              {/* Real-time Chroma-Key Canvas: Exactly 1264x848 (Plays Only Once) */}
              <canvas
                ref={canvasRef}
                width={1264}
                height={848}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none z-15" />

              {/* Names Overlay over Photo */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-6 sm:p-10 md:p-14 text-center text-white">
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
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SECCIÓN 1: FECHA & MENSAJE DE INVITACIÓN (DIRECTO DEBAJO DE LA FOTO)   */}
          {/* ===================================================================== */}
          <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-4 sm:my-8 text-center">
            {/* Elegant Luxury Stationery Card */}
            <div className="relative bg-[#FFFDF9]/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E8DACB] shadow-[0_15px_40px_-15px_rgba(140,105,75,0.12)] p-7 sm:p-12 md:p-16">
              {/* Subtle Corner Accents in Warm Gold */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-sm pointer-events-none" />

              {/* Header Icon & Small Tag */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FAF3EC] border border-[#E5D2C0] flex items-center justify-center text-[#B8864E] shadow-sm mb-3">
                  <Calendar className="w-5 h-5 text-[#B8864E]" />
                </div>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#A67C52] font-semibold">
                  Estás Cordialmente Invitado
                </span>
              </div>

              {/* Prominent Wedding Date */}
              <div className="mb-6 pb-6 border-b border-[#EEDFCE] max-w-xl mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2F2420] font-normal tracking-tight mb-2">
                  Sábado, 14 de Noviembre de 2026
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#8C6947] tracking-wider uppercase font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#B8864E]" />
                    12:30 hrs
                  </span>
                  <span>·</span>
                  <span>Al mediodía</span>
                  <span>·</span>
                  <span>Playa Blanca, Bahía Serena</span>
                </div>
              </div>

              {/* Heartfelt Invitation Message */}
              <div className="space-y-4 max-w-2xl mx-auto text-stone-700 leading-relaxed font-light text-base sm:text-lg">
                <p className="font-serif italic text-lg sm:text-xl text-[#3E312C]">
                  «Hay momentos en la vida que son inolvidables, y compartirlos con las personas que más amamos los hace eternos.»
                </p>
                <p className="text-sm sm:text-base text-stone-600 font-light">
                  Bajo la calidez del sol de mediodía y el murmullo de las olas, hemos decidido unir nuestras vidas y comenzar esta nueva etapa. Tu compañía y bendición harán que este día sea verdaderamente inolvidable.
                </p>
                <div className="pt-3">
                  <p className="font-serif text-base sm:text-lg text-[#996F43] font-medium tracking-wide">
                    ¡Esperamos celebrar juntos nuestro gran día!
                  </p>
                </div>
              </div>

              {/* Signature Divider */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <span className="w-12 h-[1px] bg-[#D4AF37]/50" />
                <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="w-12 h-[1px] bg-[#D4AF37]/50" />
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SECCIÓN 2: CUENTA REGRESIVA / COUNTDOWN                               */}
          {/* ===================================================================== */}
          <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 sm:my-12 text-center">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#A67C52] font-semibold block mb-1">
                Cuenta Regresiva
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2F2420] italic">
                Cada segundo nos acerca a nuestro día
              </h3>
            </div>

            {/* Countdown Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 max-w-2xl mx-auto">
              {/* Días */}
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DACB] p-4 sm:p-6 shadow-[0_10px_25px_-10px_rgba(130,95,65,0.1)] flex flex-col items-center justify-center group hover:border-[#D4AF37]/60 transition-all hover:-translate-y-1">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2E2B] font-normal leading-none mb-2">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.24em] text-[#916E49] uppercase font-medium">
                  Días
                </span>
              </div>

              {/* Horas */}
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DACB] p-4 sm:p-6 shadow-[0_10px_25px_-10px_rgba(130,95,65,0.1)] flex flex-col items-center justify-center group hover:border-[#D4AF37]/60 transition-all hover:-translate-y-1">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2E2B] font-normal leading-none mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.24em] text-[#916E49] uppercase font-medium">
                  Horas
                </span>
              </div>

              {/* Minutos */}
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DACB] p-4 sm:p-6 shadow-[0_10px_25px_-10px_rgba(130,95,65,0.1)] flex flex-col items-center justify-center group hover:border-[#D4AF37]/60 transition-all hover:-translate-y-1">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A2E2B] font-normal leading-none mb-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.24em] text-[#916E49] uppercase font-medium">
                  Minutos
                </span>
              </div>

              {/* Segundos */}
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DACB] p-4 sm:p-6 shadow-[0_10px_25px_-10px_rgba(130,95,65,0.1)] flex flex-col items-center justify-center group hover:border-[#D4AF37]/60 transition-all hover:-translate-y-1">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#B8864E] font-normal leading-none mb-2 animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.24em] text-[#916E49] uppercase font-medium">
                  Segundos
                </span>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
