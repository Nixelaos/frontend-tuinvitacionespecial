import React from 'react';
import { TORN_PAPER_CLIP } from './constants/tornPaperPaths';
import type { TimeLeft } from './hooks/useCountdown';
import { BeachFlower } from './BeachFlower';

interface BeachCountdownProps {
  timeLeft: TimeLeft;
}

export const BeachCountdown: React.FC<BeachCountdownProps> = ({ timeLeft }) => {
  return (
    <div className="relative z-40 w-full -mt-12 sm:-mt-14">
      {/* Flor botánica de contraste entre Hero y Countdown, fuera del clipPath para que
          no se recorte y quede por encima de todo (hero, papel y secciones siguientes) */}
      <BeachFlower
        variant="right"
        className="absolute -top-8 sm:-top-11 right-2 sm:right-4 w-20 sm:w-24 md:w-28 z-50 drop-shadow-[0_6px_12px_rgba(60,25,12,0.25)]"
        loading="eager"
      />

      {/* Main handmade torn paper sheet in warm cream (Edge-to-Edge) */}
      <div
        className="bg-[#F5ECE0] relative w-full px-4 pt-12 pb-7 sm:pb-8 text-center"
        style={{
          clipPath: TORN_PAPER_CLIP,
        }}
      >
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
