import React from 'react';
import { Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface BeachDressCodeProps {
  className?: string;
  title?: string;
  reservedMessage?: string;
  reservedSubtext?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const BeachDressCode: React.FC<BeachDressCodeProps> = ({
  className = '',
  title = 'Dress Code',
  reservedMessage = 'El color blanco se reserva para la novia',
  reservedSubtext = 'Agradecemos con cariño reservar el blanco y sus tonalidades afines exclusivamente para la novia en este día tan especial.',
  imageSrc = '/images/dress-code.png',
  imageAlt = 'Dress Code',
}) => {
  return (
    <div
      className={`w-full bg-[#FAF4EC] px-4 py-8 sm:py-12 text-[#2F2420] relative z-10 transition-colors duration-500 overflow-hidden ${className}`}
    >
      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-6">
          <h2
            className="font-script text-4xl sm:text-5xl text-[#B87A4A] font-normal leading-tight tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {title}
          </h2>
        </div>

        {/* RECUADRO: DETALLE ESPECIAL */}
        <div className="relative w-full bg-[#FAF3EB] border border-[#DFCBB5] rounded-2xl pt-5 px-5 pb-5 sm:pt-6 sm:px-7 sm:pb-6 shadow-[0_10px_35px_rgba(70,45,25,0.08)] flex flex-col items-center text-center">
          {/* Filete interior sutil tipo papelería de alta gama */}
          <div className="absolute inset-2 sm:inset-2.5 border border-[#E8DCCF] rounded-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#A26D3E] mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#B87A4A] text-[#B87A4A]" />
              <span>Detalle Especial</span>
            </div>

            <h3
              className="text-xl sm:text-2xl text-[#2F2420] font-medium leading-snug mb-1.5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {reservedMessage}
            </h3>

            <p className="text-xs sm:text-sm text-[#7D5F48] leading-relaxed max-w-xs mb-2 sm:mb-2.5">
              {reservedSubtext}
            </p>

            {/* FOTO DE DRESS CODE DENTRO DEL RECUADRO */}
            {imageSrc && (
              <div className="flex justify-center items-center">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-28 sm:w-32 h-auto object-contain select-none pointer-events-none drop-shadow-xs transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
