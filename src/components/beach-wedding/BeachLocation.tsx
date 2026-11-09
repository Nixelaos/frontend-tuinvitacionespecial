import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  ExternalLink,
  Clock,
  Sparkles,
  Copy,
  Check,
  Footprints,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { BEACH_WEDDING_RSVP_CONFIG } from '../../data/weddingData';

export const BeachLocation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const venueName = 'Explanada Frente al Mar';
  const venueArea = 'Playa Blanca, Bahía Serena';
  const venueAddress = 'Av. Costanera del Mar 1420';
  const fullAddress = `${venueName}, ${venueAddress}, ${venueArea}`;

  // Enlace directo a Google Maps con búsqueda exacta del lugar
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Explanada Frente al Mar, Playa Blanca, Bahía Serena'
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
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent my-1" />



            {/* VISTA PREVIA ESTILIZADA DEL MAPA */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#D9C4AD] shadow-xs group cursor-pointer mb-5 block"
              title="Abrir mapa en Google Maps"
            >
              {/* Fondo ilustrado de playa y mapa suave */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#EAE0D2] via-[#F4ECE1] to-[#D5C2AF] flex items-center justify-center">
                {/* Patrón estilizado de curvas costeras */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-35"
                  viewBox="0 0 300 170"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,80 C60,40 120,110 180,70 C240,30 280,90 300,60 L300,170 L0,170 Z"
                    fill="#D9C7B2"
                  />
                  <path
                    d="M0,110 C70,90 140,130 210,105 C260,85 290,120 300,110 L300,170 L0,170 Z"
                    fill="#C9B39A"
                  />
                </svg>

                {/* Marcador de mapa flotante con onda de pulso */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="absolute -inset-3 rounded-full bg-[#B87A4A]/25 animate-ping" />
                  <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#B87A4A] to-[#8C5A32] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 drop-shadow-xs" />
                  </div>
                  <span className="mt-1.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-[#3D2C22] shadow-xs border border-[#DFCBB5]">
                    Playa Blanca
                  </span>
                </div>

                {/* Coordenadas GPS decorativas */}

              </div>

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-[#3D2C22]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1 rounded-full bg-white/95 text-xs font-medium text-[#2F2420] shadow-md flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#B87A4A]" />
                  Ver mapa completo
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

            {/* RECOMENDACIÓN PARA LOS INVITADOS */}
            <div className="w-full mt-4 pt-3.5 border-t border-[#EADBCC] flex items-start gap-2.5 text-left text-xs text-[#7A604D]">
              <div className="w-5 h-5 rounded-full bg-[#F3E5D4] flex items-center justify-center text-[#B87A4A] shrink-0 mt-0.5">
                <Footprints className="w-3 h-3" />
              </div>
              <p className="leading-relaxed">
                <span className="font-semibold text-[#3D2C22]">Tip para invitados:</span> Te sugerimos calzado cómodo o sandalias para caminar cómodamente en la arena y disfrutar la brisa marina.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
