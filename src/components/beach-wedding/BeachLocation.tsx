import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const BeachLocation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const venueName = 'Palacio Las Majadas de Pirque';
  const venueArea = 'Pirque, Región Metropolitana, Chile';
  const venueAddress = 'José Julio Nieto s/n, Lote 4, Pirque';
  const fullAddress = `${venueName}, ${venueAddress}, ${venueArea}`;

  // Enlace directo a Google Maps al centro de eventos en Chile
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Las Majadas de Pirque, Pirque, Región Metropolitana, Chile'
  )}`;

  const handleCopyAddress = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      // Fallback silencioso si el navegador bloquea clipboard
    }
  };

  return (
    <div
      className="w-full bg-[#FAF4EC] px-4 py-8 sm:py-12 text-[#2F2420] relative z-10 transition-colors duration-500 overflow-hidden"
    >
      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Insignia dorada artesanal con ícono de brújula/ubicación */}
          <div className="w-11 h-11 rounded-full bg-[#F5ECE0] border border-[#DFCBB5] shadow-xs flex items-center justify-center text-[#B87A4A] mb-3">
            <Compass className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
          </div>

          <h2
            className="font-script text-4xl sm:text-5xl text-[#B87A4A] font-normal leading-tight tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Ubicación
          </h2>
        </div>

        {/* TARJETÓN ARTESANAL DE LA UBICACIÓN */}
        <div className="relative w-full bg-[#FCF9F3] border border-[#DFCBB5] rounded-2xl p-5 sm:p-7 shadow-[0_10px_35px_rgba(70,45,25,0.08)] flex flex-col items-center text-center">
          {/* Filete interior sutil tipo papelería de alta gama */}
          <div className="absolute inset-2 sm:inset-2.5 border border-[#E8DCCF] rounded-xl pointer-events-none" />

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
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#3D2C22] shadow-xs border border-[#DFCBB5] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B87A4A]" />
                  Las Majadas · Pirque, Chile
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900/70 backdrop-blur-xs text-[10px] text-white/90 font-medium group-hover:bg-[#B87A4A] transition-colors flex items-center gap-1">
                  <span>Ver mapa</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* BOTÓN PRINCIPAL A GOOGLE MAPS */}
            <div className="w-full flex flex-col gap-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#B87A4A] via-[#A86A3A] to-[#965A2E] text-white font-medium text-sm sm:text-base shadow-[0_6px_22px_rgba(184,122,74,0.35)] hover:shadow-[0_8px_28px_rgba(184,122,74,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-[#DFCBB5]/30 group cursor-pointer"
                title="Abrir ubicación en Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#FFF2E2] group-hover:animate-bounce" />
                <span>Cómo llegar con Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Botón secundario para copiar la dirección */}
              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF3E8] hover:bg-[#F3E8DA] text-[#6E5544] hover:text-[#3D2C22] text-xs sm:text-sm font-medium border border-[#DFCBB5] transition-all active:scale-95 cursor-pointer"
                title="Copiar dirección al portapapeles"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">¡Dirección copiada al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#916E49]" />
                    <span>Copiar dirección</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
