import React, { useState, useRef, useEffect } from 'react';
import { ScrollReveal } from './ScrollReveal';

export const PapelRasgadoLocation: React.FC = () => {
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

  const venueName = 'Palacio Las Majadas de Pirque';
  const venueArea = 'Pirque, Región Metropolitana, Chile';

  // Enlace directo a Google Maps al centro de eventos en Chile
  const googleMapsUrl = 'https://maps.app.goo.gl/UN6X8K2XGdvjNiSi6';

  return (
    <div
      className="w-full bg-[#FAF4EC] px-4 pt-6 pb-8 sm:pt-8 sm:pb-12 text-[#2F2420] relative z-30 transition-colors duration-500"
    >
      {/* Animación fluida lenta para la frase indicativa */}
      <style>{`
        @keyframes floatLocationSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float-slow-location {
          animation: floatLocationSlow 3s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Flor de peonía botánica colocada arriba de la palabra Ubicación sin taparla */}
          <div
            ref={flowerRef}
            className={`w-20 sm:w-24 md:w-28 mb-1 pointer-events-none select-none drop-shadow-[0_6px_14px_rgba(60,25,12,0.22)] transition-all duration-1000 ease-out transform ${
              flowerVisible
                ? 'opacity-100 scale-100 rotate-12'
                : 'opacity-0 scale-75 rotate-0'
            }`}
            aria-hidden="true"
          >
            <img
              src="/images/peonia.png"
              alt="Flor de peonía decorativa"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <h2
            className="font-script text-4xl sm:text-5xl text-[#B87A4A] font-normal leading-tight tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Ubicación
          </h2>
        </div>

        {/* CONTENIDO DE LA UBICACIÓN (DIRECTO SOBRE EL FONDO) */}
        <div className="relative w-full flex flex-col items-center text-center">
          {/* Nombre del Lugar y Destino */}
          <div className="relative z-10 flex flex-col items-center w-full">
            <h3
              className="text-2xl sm:text-3xl text-[#2F2420] font-medium leading-snug tracking-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {venueName}
            </h3>

            <p className="text-sm sm:text-base text-[#8A6749] font-medium mb-3">
              {venueArea}
            </p>

            {/* Separador ornamental delicado */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent my-1 mb-4" />

            {/* FOTO DEL SALÓN DE EVENTOS EN CHILE CON ACCESO DIRECTO A GOOGLE MAPS (SIN HOVER ZOOM) */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full aspect-[16/11] rounded-xl overflow-hidden border border-[#D9C4AD] shadow-sm block bg-[#EAE0D2] cursor-pointer"
              title="Ver Palacio Las Majadas de Pirque en Google Maps"
            >
              <img
                src="/images/casona-la-majada.jpg"
                alt="Palacio Las Majadas de Pirque — Centro de eventos de boda en Chile"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </a>

            {/* FRASE INDICATIVA FLOTANTE CON ESPACIO CÓMODO RESPECTO A LA FOTO */}
            <p className="mt-5 sm:mt-6 text-xs sm:text-[13px] font-medium text-[#8C5E35] tracking-wide text-center animate-float-slow-location">
              Haz clic en la foto para ver en Google Maps
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export const BeachLocation = PapelRasgadoLocation;
