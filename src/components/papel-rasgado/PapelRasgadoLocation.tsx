import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
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
  const venueAddress = 'José Julio Nieto s/n, Lote 4, Pirque';

  // Enlace directo a Google Maps al centro de eventos en Chile
  const googleMapsUrl = 'https://maps.app.goo.gl/UN6X8K2XGdvjNiSi6';

  return (
    <div
      className="w-full bg-[#FAF4EC] px-4 pt-6 pb-8 sm:pt-8 sm:pb-12 text-[#2F2420] relative z-30 transition-colors duration-500"
    >
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

            <p className="text-sm sm:text-base text-[#8A6749] font-medium mb-1">
              {venueArea}
            </p>

            <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B513E] mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#B87A4A] shrink-0" />
              <span>{venueAddress}</span>
            </div>

            {/* Separador ornamental delicado */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent my-1 mb-4" />

            {/* FOTO DEL SALÓN DE EVENTOS EN CHILE CON ACCESO DIRECTO A GOOGLE MAPS */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full aspect-[16/11] rounded-xl overflow-hidden border border-[#D9C4AD] shadow-sm group cursor-pointer mb-5 block bg-[#EAE0D2]"
              title="Ver Palacio Las Majadas de Pirque en Google Maps"
            >
              <img
                src="/images/casona-la-majada.jpg"
                alt="Palacio Las Majadas de Pirque — Centro de eventos de boda en Chile"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Degradado inferior para resaltar insignia y nombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/10 pointer-events-none" />

              {/* Chip flotante con nombre del lugar */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-start pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#3D2C22] shadow-xs border border-[#DFCBB5] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B87A4A]" />
                  Las Majadas · Pirque, Chile
                </span>
              </div>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export const BeachLocation = PapelRasgadoLocation;
