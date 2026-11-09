import React from 'react';
import {
  COUNTDOWN_TORN_PAPER_PATH,
  COUNTDOWN_TORN_FIBER_PATH,
} from './constants/tornPaperPaths';
import type { TimeLeft } from './hooks/useCountdown';
import { BeachFlower } from './BeachFlower';

interface BeachCountdownProps {
  timeLeft: TimeLeft;
}

export const BeachCountdown: React.FC<BeachCountdownProps> = ({ timeLeft }) => {
  return (
    <div className="relative z-40 w-full -mt-12 sm:-mt-14">
      {/* Flor botánica de contraste entre Hero y Countdown */}
      <BeachFlower
        variant="right"
        className="absolute -top-7 sm:-top-10 right-2 sm:right-4 w-20 sm:w-24 md:w-28 z-50 drop-shadow-[0_6px_12px_rgba(60,25,12,0.25)]"
        loading="eager"
      />

      {/* Encabezado vectorial de papel rasgado artesanal sobre la foto HERO:
          cuenta con franja de fibra crema de bajo contraste (#FCF8F2 a #F6EFE5) y sombra realista sobre la foto */}
      <svg
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        className="w-full h-11 sm:h-14 block -mb-[1px] relative z-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <filter id="countdownTornShadow" x="-5%" y="-15%" width="110%" height="150%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="4" floodColor="#2A1608" floodOpacity="0.25" />
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#180C04" floodOpacity="0.12" />
          </filter>
          <linearGradient id="countdownFiberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCF8F2" />
            <stop offset="100%" stopColor="#F6EFE5" />
          </linearGradient>
        </defs>
        {/* Franja de fibra crema de papel expuesta sobre la foto */}
        <path
          d={COUNTDOWN_TORN_FIBER_PATH}
          fill="url(#countdownFiberGrad)"
          filter="url(#countdownTornShadow)"
        />
        {/* Hoja de papel crema (#F5ECE0) que solapa la fibra y cubre hacia abajo */}
        <path d={COUNTDOWN_TORN_PAPER_PATH} fill="#F5ECE0" />
      </svg>

      {/* Main handmade paper sheet in warm cream (#F5ECE0) */}
      <div className="bg-[#F5ECE0] relative w-full px-4 pt-1 pb-7 sm:pb-8 text-center">
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
            className="font-script text-2xl sm:text-3xl md:text-4xl text-[#2F2420] font-normal tracking-wide mb-1 leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Sábado, 14 de Noviembre de 2026
          </h2>
          <span
            className="font-script text-xl sm:text-2xl md:text-3xl text-[#916E49] font-normal tracking-wide mb-6 block"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            a las 17:00 hrs
          </span>

          {/* Cuenta Regresiva con números manuscritos en tono crema */}
          <div className="w-full">
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {/* Días */}
              <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
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
              <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
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
              <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
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
              <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
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
    </div>
  );
};
