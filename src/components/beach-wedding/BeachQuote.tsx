import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { TORN_QUOTE_PAPER_BAND } from './constants/tornPaperPaths';
import { BeachFlower } from './BeachFlower';

interface BeachQuoteProps {
  upperColor?: string;
  lowerColor?: string;
  className?: string;
}

/**
 * Sección de Mensaje / Frase Romántica:
 * Replica los bordes y el cuerpo del papel rasgado artesanal de forma 100% visual y vectorial con React y tornPaperPaths.ts.
 * Ambos bordes (superior e inferior) ascienden en diagonal con textura deshilachada orgánica uniforme,
 * eliminando cualquier corte horizontal o recto.
 * Utiliza el componente BeachFlower para el vaivén botánico.
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
        <div className="h-[48%] w-full" style={{ backgroundColor: upperColor }} />
        <div className="h-[52%] w-full" style={{ backgroundColor: lowerColor }} />
      </div>

      <ScrollReveal className="relative z-10 w-full flex flex-col items-center">
        {/* Contenedor de la banda de papel rasgado artesanal */}
        <div className="relative w-full">
          {/* Gráfico vectorial SVG de la tira de papel rasgado continuo con ambos bordes ascendiendo */}
          <svg
            viewBox="0 -120 1000 540"
            preserveAspectRatio="none"
            className="w-full h-80 sm:h-96 md:h-[390px] block relative z-10"
            style={{
              filter: 'drop-shadow(0px 8px 20px rgba(60, 35, 18, 0.18))',
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

            {/* Hoja de papel rasgado continuo con ambos bordes diagonales deshilachados */}
            <path
              d={TORN_QUOTE_PAPER_BAND}
              fill="url(#quotePaperGrad)"
              filter="url(#deckleFiberGlow)"
            />
          </svg>

          {/* Flor botánica de contraste en el lateral izquierdo con animación de vaivén */}
          <BeachFlower
            variant="left"
            className="absolute top-[50%] -left-6 sm:-left-7 w-20 sm:w-24 md:w-28 z-30 opacity-70 drop-shadow-[0_6px_14px_rgba(60,25,12,0.18)]"
          />

          {/* Flor botánica de contraste en la esquina superior derecha */}
          <BeachFlower
            variant="right"
            className="absolute top-6 sm:top-8 right-2 sm:right-4 w-16 sm:w-20 md:w-24 z-30 drop-shadow-[0_6px_12px_rgba(60,25,12,0.22)]"
          />

          {/* Texto del mensaje / frase romántica perfectamente centrado de manera equidistante arriba y abajo */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 sm:px-12 pl-12 sm:pl-16 text-center pointer-events-none">
            <div className="translate-y-4 sm:translate-y-[18px] w-full">
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
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
