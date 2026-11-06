import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  BeachEnvelope,
  BeachHero,
  BeachCountdown,
  TornPaperDivider,
  BeachQuote,
  BeachGallery,
  BeachRsvp,
  BeachSignature,
  useCountdown,
} from './beach-wedding';

const TARGET_WEDDING_DATE = '2026-11-14T12:30:00';

export const BeachWeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isPaperRising, setIsPaperRising] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isSprayed, setIsSprayed] = useState(false);

  const timeLeft = useCountdown(TARGET_WEDDING_DATE);
  const timeoutsRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  React.useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // Secuencia de apertura del sobre con overlap natural:
  // 1. Abre la solapa (0 - 950ms): el papel interior ya está dentro y se ve apenas abre
  // 2. A los 450ms: la solapa pasa los 90° y se pliega detrás (z-index: 2)
  // 3. A los 950ms: el sobre termina de abrirse completamente -> el papel sube (950ms - 2150ms)
  // 4. Pausa para apreciar la tarjeta abierta (2150ms - 3700ms)
  // 5. Disolución suave y transición a la invitación completa (3700ms - 4400ms)
  const handleOpenEnvelope = () => {
    if (isOpen || isOpening || isPaperRising) return;
    clearAllTimeouts();
    setIsOpening(true);

    // Momento 1 (450ms): La solapa supera los 90° y pasa detrás del bolsillo y tarjeta
    const t1 = setTimeout(() => {
      setIsFlapOpen(true);
    }, 320);

    // Momento 2 (950ms): El sobre terminó de abrirse completamente -> El papel interior sube
    const t2 = setTimeout(() => {
      setIsPaperRising(true);
    }, 700);

    // Momento 3 (3700ms): Tras apreciarse la tarjeta abierta, comienza el desvanecimiento del sobre
    const t3 = setTimeout(() => {
      setIsFadingOut(true);
    }, 3200);

    // Momento 4 (4400ms): Transición continua hacia la invitación completa
    const t4 = setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setIsFlapOpen(false);
      setIsPaperRising(false);
      setIsFadingOut(false);
      // Spray airbrush reveal right upon landing
      const t5 = setTimeout(() => {
        setIsSprayed(true);
      }, 150);
      timeoutsRef.current.push(t5);
    }, 3800);

    timeoutsRef.current.push(t1, t2, t3, t4);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearAllTimeouts();
    setIsOpening(false);
    setIsFlapOpen(false);
    setIsPaperRising(false);
    setIsFadingOut(false);
    setIsOpen(false);
    setIsSprayed(false);
  };

  return (
    // Outer Desktop/Tablet Backdrop with Side Bands
    <div className="w-full min-h-screen bg-[#E5DDD2] flex justify-center items-start">
      {/* Mobile-Proportion Viewport Container */}
      <div
        className={`w-full max-w-[430px] min-h-screen relative overflow-x-hidden font-sans transition-colors duration-1000 shadow-[0_0_50px_rgba(70,50,30,0.18)] sm:border-x sm:border-[#D5C6B5] flex flex-col ${
          !isOpen
            ? 'bg-gradient-to-br from-[#FAF3EB] via-[#F4EAE0] to-[#E9D9CB] justify-center items-center h-[100dvh] p-4 overflow-hidden'
            : 'bg-gradient-to-b from-[#FAF4EC] via-[#F5ECE0] to-[#EBDDCE] text-stone-800'
        }`}
      >
        {/* 1. SOBRE CERRADO INTERACTIVO (PAPEL PASTEL + SELLO DE LACRE EN RELIEVE + EFECTO ACUARELA BLUR-TO-FOCUS) */}
        {!isOpen && (
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* Ambient artisanal paper glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_45%,rgba(212,175,55,0.12),transparent_70%)]" />

            <BeachEnvelope
              isOpening={isOpening}
              isFlapOpen={isFlapOpen}
              isPaperRising={isPaperRising}
              isFadingOut={isFadingOut}
              onOpen={handleOpenEnvelope}
            />
          </div>
        )}

        {/* 2. LANDING PAGE INVITACIÓN ABIERTA */}
        {isOpen && (
          <div className="w-full transition-opacity duration-700 pb-20 flex flex-col">
            {/* Top Floating Control Bar */}
            <div className="absolute top-3 right-3 z-30 pointer-events-auto">
              <button
                onClick={handleReset}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-[#E2D2C2] shadow-sm text-stone-700 text-xs font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Volver a cerrar el sobre"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B88960] group-hover:-rotate-90 transition-transform duration-300" />
                <span>Ver sobre</span>
              </button>
            </div>

            {/* SECCIÓN HERO: FOTO A SANGRE + EFECTO SPRAY + PARTÍCULAS DORADAS */}
            <BeachHero isSprayed={isSprayed} />

            {/* SECCIÓN 1: PAPEL ROTO CON FLOR DE CONTRASTE Y COUNTDOWN */}
            <BeachCountdown timeLeft={timeLeft} />

            {/* DIVISOR SUPERIOR DE PAPEL RASGADO */}
            <TornPaperDivider type="top" />

            {/* SECCIÓN 2: FRASE ROMÁNTICA CON FLOR LATERAL EN VAIVÉN */}
            <BeachQuote />

            {/* DIVISOR INFERIOR DE PAPEL RASGADO */}
            <TornPaperDivider type="bottom" />

            {/* SECCIÓN 3: GALERÍA DE FOTOS EN MARCO ARTESANAL CON TINTA LÍQUIDA */}
            <BeachGallery />

            {/* DIVISOR SUPERIOR DE PAPEL RASGADO PARA SECCIÓN RSVP */}
            <TornPaperDivider type="top" upperColor="#EBDDCE" fiberColor="#FCF9F3" />

            {/* SECCIÓN 4: CONFIRMACIÓN DE ASISTENCIA (R.S.V.P.) */}
            <BeachRsvp />

            {/* DIVISOR INFERIOR DE PAPEL RASGADO PARA SECCIÓN RSVP */}
            <TornPaperDivider type="bottom" lowerColor="#EBDDCE" fiberColor="#FCF9F3" />

            {/* FIRMA FINAL DE LOS NOVIOS */}
            <BeachSignature />
          </div>
        )}
      </div>
    </div>
  );
};
