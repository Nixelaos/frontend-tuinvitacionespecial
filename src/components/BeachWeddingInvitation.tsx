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
  const [isSprayed, setIsSprayed] = useState(false);

  const timeLeft = useCountdown(TARGET_WEDDING_DATE);

  // Trigger envelope opening
  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
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
        {/* 1. SOBRE CERRADO INTERACTIVO (PAPEL PASTEL + SELLO DE LACRE EN RELIEVE) */}
        {!isOpen && (
          <BeachEnvelope isOpening={isOpening} onOpen={handleOpenEnvelope} />
        )}

        {/* 2. LANDING PAGE INVITACIÓN ABIERTA */}
        {isOpen && (
          <div className="w-full animate-fadeIn transition-opacity duration-1000 pb-20 flex flex-col">
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
