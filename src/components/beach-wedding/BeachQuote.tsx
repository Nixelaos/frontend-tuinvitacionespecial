import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const BeachQuote: React.FC = () => {
  return (
    <div
      className="w-full pl-12 pr-6 sm:px-10 py-8 sm:py-10 text-center relative z-10 overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <ScrollReveal className="relative z-10 w-full flex flex-col items-center">
        {/* Flor botánica de contraste que emerge desde el borde izquierdo centro con sutil transparencia */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-6 sm:-left-7 w-20 sm:w-24 md:w-26 z-10 pointer-events-none opacity-60 drop-shadow-[0_6px_14px_rgba(60,25,12,0.18)] animate-flower-sway-left">
          <img
            src="/images/flor-contraste.webp"
            alt="Flor de contraste"
            className="w-full h-auto object-contain select-none transform rotate-45"
            loading="lazy"
          />
        </div>

        <p
          className="font-script text-2xl sm:text-3xl text-[#2F2420] leading-relaxed max-w-sm mx-auto font-normal relative z-20"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          «A orillas del mar, decidimos dar el paso más importante de nuestras vidas.»
        </p>

        {/* Animación CSS integrada para movimiento suave de la flor desde la izquierda centro */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes flowerSwayLeftKeyframes {
            0%, 100% {
              transform: translateY(-50%) rotate(38deg) scale(1);
            }
            50% {
              transform: translateY(calc(-50% - 4px)) rotate(46deg) scale(1.04);
            }
          }
          .animate-flower-sway-left {
            animation: flowerSwayLeftKeyframes 4.5s ease-in-out infinite;
            transform-origin: center left;
          }
        ` }} />
      </ScrollReveal>
    </div>
  );
};
