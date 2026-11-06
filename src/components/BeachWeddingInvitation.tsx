import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  BeachEnvelope,
  BeachHero,
  BeachCountdown,
  TornPaperDivider,
  BeachQuote,
  BeachGallery,
  BeachSignature,
  useCountdown,
} from './beach-wedding';

const TARGET_WEDDING_DATE = '2026-11-14T12:30:00';

export const BeachWeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
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

  // Secuencia de apertura del sobre:
  // 1. Abre el sobre completo en 3D (0 - 950ms)
  // 2. Recién allí empieza a subir el papel interior y a mostrarse (950ms - 2150ms)
  // 3. Pausa para apreciar la invitación dentro del sobre (2150ms - 3600ms)
  // 4. Disolución suave y transición a la invitación completa (3600ms - 4300ms)
  const handleOpenEnvelope = () => {
    if (isOpen || isOpening || isPaperRising) return;
    clearAllTimeouts();
    setIsOpening(true);

    // Momento 1: A los 950ms el sobre terminó de abrirse -> El papel interior empieza a subir y mostrarse
    const t1 = setTimeout(() => {
      setIsPaperRising(true);
    }, 950);

    // Momento 2: A los 3600ms -> El sobre empieza a disolverse suavemente
    const t2 = setTimeout(() => {
      setIsFadingOut(true);
    }, 3600);

    // Momento 3: A los 4300ms -> Transición a la página completa
    const t3 = setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setIsPaperRising(false);
      setIsFadingOut(false);
      // Spray airbrush reveal right upon landing
      const t4 = setTimeout(() => {
        setIsSprayed(true);
      }, 250);
      timeoutsRef.current.push(t4);
    }, 4300);

    timeoutsRef.current.push(t1, t2, t3);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearAllTimeouts();
    setIsOpening(false);
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
              isPaperRising={isPaperRising}
              isFadingOut={isFadingOut}
              onOpen={handleOpenEnvelope}
            />
          </div>
        )}

        {/* 2. LANDING PAGE INVITACIÓN ABIERTA */}
        {isOpen && (
          <div className="w-full animate-watercolor-envelope transition-opacity duration-1000 pb-20 flex flex-col">
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

            {/* FIRMA FINAL DE LOS NOVIOS */}
            <BeachSignature />
          </div>
        )}
      </div>
    </div>
  );
};
