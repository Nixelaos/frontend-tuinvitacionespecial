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
      className={`min-h-screen w-full relative overflow-x-hidden font-sans transition-colors duration-1000 ${
        !isOpen
          ? 'cursor-pointer select-none bg-gradient-to-br from-[#FAF3EB] via-[#F4EAE0] to-[#E9D9CB] flex items-center justify-center p-4 sm:p-6 md:p-10'
          : 'bg-gradient-to-b from-[#FBF6EE] via-[#F6ECE0] to-[#EFE1D0] text-stone-800'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. SOBRE CERRADO DECORADO (PAPEL PASTEL + SELLO DE LACRE EN RELIEVE)      */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center">
          {/* Subtle Instruction Badge */}
          <div
            className={`mb-6 sm:mb-8 flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#E4D1BF] shadow-sm text-xs sm:text-sm font-serif italic text-stone-700 transition-all duration-300 ${
              isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 animate-pulse'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C59B6D]" />
            <span>Haz clic en cualquier parte para abrir el sobre</span>
            <Sparkles className="w-4 h-4 text-[#C59B6D]" />
          </div>

          {/* Envelope Body Container */}
          <div
            className={`relative w-full aspect-[16/10.5] sm:aspect-[16/10] rounded-2xl transition-all duration-700 ${
              isOpening ? 'scale-105' : 'hover:scale-[1.015]'
            }`}
            style={{ perspective: '1600px' }}
          >
            {/* Ambient luxury drop shadow */}
            <div className="absolute inset-0 -bottom-6 bg-[#684832]/20 blur-2xl rounded-2xl transform scale-95" />

            {/* Back Plate / Base Paper Layer */}
            <div className="absolute inset-0 bg-[#F5ECE1] rounded-2xl border border-[#DFCDBC] overflow-hidden shadow-2xl">
              {/* Paper Grain Gradient */}
              <div
                className="absolute inset-0 opacity-35 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#C9B098 0.75px, transparent 0.75px), radial-gradient(#C9B098 0.75px, #F5ECE1 0.75px)`,
                  backgroundSize: '14px 14px',
                  backgroundPosition: '0 0, 7px 7px',
                }}
              />
              {/* Gold foil interior border */}
              <div className="absolute inset-3 border border-[#D4AF37]/40 rounded-xl pointer-events-none" />
            </div>

            {/* ===================================================================== */}
            {/* INVITACIÓN DENTRO DEL SOBRE (DECORADA CON DETALLES DE ORO & BOTÁNICA) */}
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
              {/* Double Gold Editorial Border */}
              <div className="absolute inset-2 border border-[#D4AF37]/50 rounded-lg pointer-events-none" />
              <div className="absolute inset-3 border border-[#D4AF37]/25 rounded-md pointer-events-none" />

              {/* Top Monogram Crest - Aligned Horizontally */}
              <div className="relative pt-1 flex flex-col items-center">
                <div className="px-4 py-1 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#FDF9F3] text-[#B8864E] shadow-sm mb-1 whitespace-nowrap">
                  <span className="font-serif text-xs sm:text-sm font-semibold tracking-[0.25em] whitespace-nowrap">
                    V &amp; S
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#B8864E] font-medium">
                  <span>Nuestra Boda</span>
                </div>
              </div>

              {/* Couple Names & Title */}
              <div className="my-auto py-1 flex flex-col items-center">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#3A2E2B] italic leading-tight">
                  Valentina &amp; Sebastián
                </h3>
                <div className="flex items-center justify-center gap-2 my-1.5">
                  <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
                <p className="font-serif text-xs sm:text-sm text-stone-600 italic mb-2">
                  «Celebrando nuestro amor frente al mar»
                </p>

                {/* Visible Date & Venue badge */}
                <div className="mt-1 px-3 py-1 rounded-md bg-[#FAF4EC] border border-[#E8D5C2] shadow-sm flex flex-col items-center gap-0.5">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#916E49] font-medium">
                    Sábado, 14 de Noviembre · 12:30 hrs
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-wider text-stone-500 font-light">
                    Playa Blanca · Al Mediodía
                  </span>
                </div>
              </div>

              {/* Bottom Decorative Gold Flourish */}
              <div className="relative pb-1 text-center">
                <div className="w-12 h-[1px] bg-[#D4AF37]/50 mx-auto" />
              </div>
            </div>

            {/* ===================================================================== */}
            {/* FRONT POCKET & SIDE FLAPS (DECORADOS, CUBREN TOTALMENTE EL SOBRE)     */}
            {/* ===================================================================== */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
              {/* Left Flap */}
              <div
                className="absolute top-0 bottom-0 left-0 w-[53%] bg-gradient-to-r from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-r border-[#DFCDBB]/80 shadow-[2px_0_8px_rgba(90,65,45,0.06)]"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                }}
              >
                <div className="absolute top-3 left-3 w-16 h-16 border-t border-l border-[#D4AF37]/35 pointer-events-none" />
              </div>

              {/* Right Flap */}
              <div
                className="absolute top-0 bottom-0 right-0 w-[53%] bg-gradient-to-l from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-l border-[#DFCDBB]/80 shadow-[-2px_0_8px_rgba(90,65,45,0.06)]"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
                }}
              >
                <div className="absolute top-3 right-3 w-16 h-16 border-t border-r border-[#D4AF37]/35 pointer-events-none" />
              </div>

              {/* Bottom Pocket Flap */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[68%] bg-gradient-to-t from-[#E8D8C7] via-[#EFE2D3] to-[#F7ECE0] border-t border-[#DBC7B4] shadow-[0_-6px_16px_rgba(90,65,45,0.08)]"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 18%, 100% 100%)',
                }}
              >
                {/* Gold Foil Border along bottom flap diagonal */}
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
                    strokeOpacity="0.45"
                  />
                  <line
                    x1="100"
                    y1="100"
                    x2="50"
                    y2="18"
                    stroke="#D4AF37"
                    strokeWidth="0.75"
                    strokeOpacity="0.45"
                  />
                </svg>

                {/* Postal Stamp & Postmark Ornament */}
                <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 flex items-center gap-2 opacity-70">
                  <div className="w-10 h-12 sm:w-12 sm:h-14 border border-dashed border-[#B88E62] bg-[#FAF3EC]/80 rounded p-1 flex flex-col items-center justify-between text-center shadow-sm">
                    <Heart className="w-3 h-3 text-[#B88E62]" />
                    <span className="text-[7px] sm:text-[8px] uppercase tracking-tighter font-serif text-[#785938]">
                      Amor
                    </span>
                    <span className="text-[6px] tracking-widest text-[#967451]">2026</span>
                  </div>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#B88E62]/60 flex flex-col items-center justify-center text-[6px] sm:text-[7px] text-[#825F3C] font-mono rotate-12">
                    <span>PLAYA</span>
                    <span>14.NOV</span>
                  </div>
                </div>

                {/* Decorative Botanical Branch Emblem */}
                <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 opacity-60">
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-serif italic text-[#8B6B4A]">
                    <Sparkles className="w-3 h-3 text-[#C59B6D]" />
                    <span>Invitación Especial</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* TOP TRIANGULAR FLAP (DOBLADA CERRANDO COMPLETAMENTE EL SOBRE)         */}
            {/* ===================================================================== */}
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
                className="w-full h-full bg-gradient-to-b from-[#F5EADB] via-[#EEDECF] to-[#E3D1BF] shadow-[0_8px_18px_rgba(80,55,35,0.14)] border-b border-[#D8C4B0]"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
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
                    strokeOpacity="0.55"
                  />
                  <line
                    x1="100"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    strokeOpacity="0.55"
                  />
                </svg>

                <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-50 flex items-center gap-1">
                  <span className="w-6 h-[1px] bg-[#C59B6D]" />
                  <Heart className="w-2.5 h-2.5 text-[#C59B6D]" />
                  <span className="w-6 h-[1px] bg-[#C59B6D]" />
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* SELLO DE LACRE EN RELIEVE 3D                                          */}
            {/* ===================================================================== */}
            <div
              className={`absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 pointer-events-none ${
                isOpening ? 'scale-135 opacity-0 -translate-y-10' : 'scale-100 opacity-100'
              }`}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full flex items-center justify-center shadow-[0_12px_28px_rgba(140,85,45,0.45)] bg-gradient-to-br from-[#E2A676] via-[#C9804D] to-[#925026] border-2 border-[#FBD6B5]/60">
                <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-[#D5915E]/60 animate-[spin_50s_linear_infinite]" />
                <div className="absolute -top-1 right-2 w-3 h-3 rounded-full bg-[#D88D56] shadow-sm" />
                <div className="absolute -bottom-1 left-2 w-3.5 h-3 rounded-full bg-[#B66E3A] shadow-sm" />

                <div className="w-[82%] h-[82%] rounded-full bg-gradient-to-tl from-[#B36934] via-[#D08B55] to-[#EAA879] border border-[#FFE3CA]/50 flex flex-col items-center justify-center shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)] text-white">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFF3E5] fill-[#FFF3E5]/95 drop-shadow mb-0.5" />
                  <span className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#FFF7EF] whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                    V &amp; S
                  </span>
                  <span className="text-[7px] uppercase tracking-widest text-[#FFE9D4] font-medium drop-shadow">
                    Para Siempre
                  </span>
                </div>
                <div className="absolute top-1.5 left-2.5 w-4 h-2 rounded-full bg-white/45 blur-[1px] transform -rotate-45" />
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
