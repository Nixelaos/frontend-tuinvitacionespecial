import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { TORN_BOT_FIBER_PATH } from './constants/tornPaperPaths';

interface BeachQuoteProps {
  upperColor?: string;
  lowerColor?: string;
  className?: string;
}

/**
 * Sección de Mensaje / Frase Romántica:
 * Replica los bordes y el cuerpo del papel rasgado de forma 100% visual y vectorial con React y tornPaperPaths.ts,
 * eliminando por completo la necesidad de imágenes de fondo estáticas.
 */
export const BeachQuote: React.FC<BeachQuoteProps> = ({
  upperColor = '#F5ECE0',
  lowerColor = '#EBDDCE',
  className = '',
}) => {
  return (
    <div className={`relative w-full overflow-hidden select-none -my-1 z-20 ${className}`}>
      {/* Fondo de continuidad natural: une Countdown (arriba) con Galería (abajo) */}
      <div className="absolute inset-0 flex flex-col pointer-events-none" aria-hidden="true">
        <div className="h-1/2 w-full" style={{ backgroundColor: upperColor }} />
        <div className="h-1/2 w-full" style={{ backgroundColor: lowerColor }} />
      </div>

      <ScrollReveal className="relative z-10 w-full flex flex-col items-center">
        {/* Contenedor de la banda de papel rasgado artesanal */}
        <div className="relative w-full">
          {/* Gráfico vectorial SVG de la tira de papel rasgado continuo */}
          <svg
            viewBox="0 -130 1000 360"
            preserveAspectRatio="none"
            className="w-full h-56 sm:h-64 block relative z-10"
            style={{
              filter: 'drop-shadow(0px 8px 18px rgba(60, 35, 18, 0.16))',
            }}
            aria-hidden="true"
          >
            <defs>
              {/* Degradado cálido suave de papel artesanal */}
              <linearGradient id="quotePaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#FFFDF9" />
                <stop offset="100%" stopColor="#FAF5EE" />
              </linearGradient>
              {/* Relieve sutil para las microfibras del borde desgarrado */}
              <filter id="deckleFiberGlow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#5A3A1A" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Hoja de papel rasgado continuo de algodón */}
            <path
              d={TORN_BOT_FIBER_PATH}
              fill="url(#quotePaperGrad)"
              filter="url(#deckleFiberGlow)"
            />
          </svg>

          {/* Flor botánica de contraste en el lateral izquierdo con animación de vaivén */}
          <div className="absolute top-1/2 -left-6 sm:-left-7 w-20 sm:w-24 md:w-26 z-30 pointer-events-none opacity-70 drop-shadow-[0_6px_14px_rgba(60,25,12,0.18)] animate-flower-sway-left">
            <img
              src="/images/flor-contraste.webp"
              alt="Flor de contraste"
              className="w-full h-auto object-contain select-none transform rotate-45"
              loading="lazy"
            />
          </div>

          {/* Texto del mensaje / frase romántica centrado con Great Vibes */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 sm:px-12 pl-12 sm:pl-16 text-center pointer-events-none">
            <p
              className="font-script text-2xl sm:text-3xl text-[#2F2420] leading-relaxed max-w-sm mx-auto font-normal"
              style={{
                fontFamily: "'Great Vibes', cursive",
                textShadow: '0 1px 1px rgba(255, 255, 255, 0.8)',
              }}
            >
              «A orillas del mar, decidimos dar el paso más importante de nuestras vidas.»
            </p>
          </div>

          {/* Animación CSS integrada para movimiento suave de la flor */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes flowerSwayLeftKeyframes {
              0%, 100% {
                transform: translateY(-62%) rotate(38deg) scale(1);
              }
              50% {
                transform: translateY(calc(-62% - 4px)) rotate(46deg) scale(1.04);
              }
            }
            .animate-flower-sway-left {
              animation: flowerSwayLeftKeyframes 4.5s ease-in-out infinite;
              transform-origin: center left;
            }
          ` }} />
        </div>
      </ScrollReveal>
    </div>
  );
};
