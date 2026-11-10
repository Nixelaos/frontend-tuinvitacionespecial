import React, { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface BeachDressCodeProps {
  className?: string;
  title?: string;
  reservedMessage?: string;
  reservedSubtext?: string;
  imageSrc?: string;
  imageAlt?: string;
  peoniaSrc?: string;
}

export const BeachDressCode: React.FC<BeachDressCodeProps> = ({
  className = '',
  title = 'Dress Code',
  reservedMessage = 'El color blanco se reserva para la novia',
  reservedSubtext = 'Agradecemos con cariño reservar el blanco y sus tonalidades afines exclusivamente para la novia en este día tan especial.',
  imageSrc = '/images/dress-code.png',
  imageAlt = 'Dress Code',
  peoniaSrc = '/images/peonia.png',
}) => {
  const [flowerVisible, setFlowerVisible] = useState(false);
  const flowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = flowerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlowerVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

        {/* DETALLE ESPECIAL (DIRECTO SOBRE EL FONDO) */}
        <div className="relative w-full flex flex-col items-center text-center">
          {/* Flor de peonía botánica en la esquina superior subida para no tapar texto */}
          {peoniaSrc && (
            <div
              ref={flowerRef}
              className={`absolute -top-14 sm:-top-16 -right-2 sm:-right-4 w-20 sm:w-24 md:w-28 z-20 pointer-events-none select-none drop-shadow-[0_6px_14px_rgba(60,25,12,0.22)] transition-all duration-1000 ease-out transform ${flowerVisible
                  ? 'opacity-100 scale-100 rotate-12'
                  : 'opacity-0 scale-75 rotate-0'
                }`}
              aria-hidden="true"
            >
              <img
                src={peoniaSrc}
                alt="Flor de peonía decorativa"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center w-full">


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
