import React from 'react';
import { Heart } from 'lucide-react';
import { PAPEL_RASGADO_DATE_FORMATS } from '../../data/templates/papelRasgadoData';

interface PapelRasgadoEnvelopeProps {
  isOpening: boolean;
  isFlapOpen?: boolean;
  isPaperRising?: boolean;
  onOpen: () => void;
  isFadingOut?: boolean;
  stampYear?: string;
  stampDate?: string;
}

export const PapelRasgadoEnvelope: React.FC<PapelRasgadoEnvelopeProps> = ({
  isOpening,
  isFlapOpen = false,
  isPaperRising = false,
  onOpen,
  isFadingOut = false,
  stampYear = PAPEL_RASGADO_DATE_FORMATS.stampYear,
  stampDate = PAPEL_RASGADO_DATE_FORMATS.stampDate,
}) => {
  return (
    <div
      onClick={onOpen}
      className={`relative w-full max-w-[390px] flex items-center justify-center my-auto px-1 cursor-pointer select-none transition-all duration-[800ms] ease-out ${isFadingOut
        ? 'opacity-0 -translate-y-10 blur-md pointer-events-none'
        : 'opacity-100'
        }`}
    >
      {/* Subtle Instruction Text: Sin fondo blanco rectangular, Blur-to-Focus al cargar y disolución suave al abrir */}
      <div
        className={`absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center whitespace-nowrap transition-all duration-[1200ms] ease-out pointer-events-none ${isOpening
          ? 'opacity-0 -translate-y-3 blur-md scale-95'
          : 'animate-watercolor-badge'
          }`}
      >
        <span className="text-xs sm:text-sm font-sans font-medium tracking-wider text-[#5A3825] drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] animate-watercolor-breathe">
          Toca el sobre para abrir
        </span>
      </div>

      {/* Envelope Body Container: Emerges with Blur-to-Focus watercolor bloom */}
      <div
        className={`relative w-full aspect-[16/10.5] rounded-b-2xl rounded-t-sm transition-all duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) animate-watercolor-envelope ${isOpening ? 'scale-[1.03]' : 'hover:scale-[1.015]'
          }`}
        style={{ perspective: '1600px' }}
      >
        {/* Ambient luxury drop shadow with watercolor diffusion */}
        <div className="absolute inset-0 -bottom-6 bg-[#684832]/25 blur-2xl rounded-b-2xl rounded-t-sm transform scale-95 transition-opacity duration-1000" />

        {/* Back Plate / Base Paper Layer */}
        <div className="absolute inset-0 bg-[#F5ECE1] rounded-b-2xl rounded-t-sm border border-[#DFCDBC] overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 opacity-35 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#C9B098 0.75px, transparent 0.75px), radial-gradient(#C9B098 0.75px, #F5ECE1 0.75px)`,
              backgroundSize: '14px 14px',
              backgroundPosition: '0 0, 7px 7px',
            }}
          />
          <div className="absolute inset-3 border border-[#D4AF37]/50 rounded-b-xl rounded-t-xs pointer-events-none" />
        </div>

        {/* INVITACIÓN DENTRO DEL SOBRE: Siempre presente (overlap), se ve apenas abre el sobre y sube al terminar de abrir */}
        <div
          className={`absolute inset-x-4 top-4 bottom-3 bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F2] to-[#F8F2E8] rounded-xl shadow-lg border border-[#E5D5C3] p-4 flex flex-col items-center justify-between text-center pointer-events-none transition-all duration-[1000ms] ${isPaperRising
            ? '-translate-y-[66%] scale-100 shadow-2xl rotate-[-0.8deg]'
            : 'translate-y-0 scale-[0.98] rotate-0 shadow-md'
            }`}
          style={{
            zIndex: 15,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="absolute inset-2 border border-[#D4AF37]/60 rounded-lg pointer-events-none" />
          <div className="absolute inset-3 border border-[#D4AF37]/35 rounded-md pointer-events-none" />

          {/* Top Monogram Crest */}
          <div className="relative pt-1 flex flex-col items-center">
            <div className="px-3.5 py-0.5 rounded-full border border-[#B8864E] flex items-center justify-center bg-[#FBF4EC] text-[#5A3414] shadow-sm mb-1 whitespace-nowrap">
              <span className="font-serif text-xs font-bold tracking-[0.25em] whitespace-nowrap">
                V &amp; S
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#6E421A] font-bold">
              <span>Nuestra Boda</span>
            </div>
          </div>

          {/* Couple Names & Title */}
          <div className="my-auto py-1 flex flex-col items-center">
            <h3 className="font-serif text-2xl text-[#1E130D] font-medium italic leading-tight">
              Valentina &amp; Sebastián
            </h3>
            <div className="flex items-center justify-center gap-2 my-1">
              <span className="w-6 h-[1.5px] bg-gradient-to-r from-transparent to-[#B8864E]" />
              <Heart className="w-3 h-3 text-[#B8864E] fill-[#B8864E]" />
              <span className="w-6 h-[1.5px] bg-gradient-to-l from-transparent to-[#B8864E]" />
            </div>
            <p className="font-serif text-xs text-[#382315] font-medium italic mb-1.5">
              «Celebrando nuestro amor frente al mar»
            </p>

          </div>

          <div className="relative pb-0.5 text-center">
            <div className="w-10 h-[1px] bg-[#D4AF37]/60 mx-auto" />
          </div>
        </div>

        {/* FRONT POCKET & SIDE FLAPS */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-b-2xl rounded-t-sm">
          <div
            className="absolute top-0 bottom-0 left-0 w-[53%] bg-gradient-to-r from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-r border-[#DFCDBB]/80 shadow-[2px_0_8px_rgba(90,65,45,0.06)]"
            style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}
          >
            <div className="absolute top-3 left-3 w-12 h-12 border-t border-l border-[#D4AF37]/35 pointer-events-none" />
          </div>

          <div
            className="absolute top-0 bottom-0 right-0 w-[53%] bg-gradient-to-l from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-l border-[#DFCDBB]/80 shadow-[-2px_0_8px_rgba(90,65,45,0.06)]"
            style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)' }}
          >
            <div className="absolute top-3 right-3 w-12 h-12 border-t border-r border-[#D4AF37]/35 pointer-events-none" />
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-[68%] bg-gradient-to-t from-[#E8D8C7] via-[#EFE2D3] to-[#F7ECE0] border-t border-[#DBC7B4] shadow-[0_-6px_16px_rgba(90,65,45,0.08)] pointer-events-none"
            style={{ clipPath: 'polygon(0% 100%, 50% 18%, 100% 100%)' }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="100"
                x2="50"
                y2="18"
                stroke="#D4AF37"
                strokeWidth="0.75"
                strokeOpacity="0.55"
              />
              <line
                x1="100"
                y1="100"
                x2="50"
                y2="18"
                stroke="#D4AF37"
                strokeWidth="0.75"
                strokeOpacity="0.55"
              />
            </svg>
          </div>
        </div>

        {/* STICKER / SELLO POSTAL INFERIOR DERECHO (Blur-to-Focus con micro-rotación) */}
        <div className="absolute bottom-3 right-3 pointer-events-none z-30 flex items-center gap-1.5 animate-watercolor-stamps">
          <div className="w-10 h-12 border-2 border-dashed border-[#8E5A2B] bg-[#FFFBF7] rounded p-1 flex flex-col items-center justify-between text-center shadow-xs">
            <Heart className="w-3 h-3 text-[#8E5A2B] fill-[#8E5A2B]" />
            <span className="text-[8px] uppercase tracking-wider font-serif font-extrabold text-[#321B0B]">
              Amor
            </span>
            <span className="text-[7px] tracking-widest font-mono font-bold text-[#4E2E16]">
              {stampYear}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full border-2 border-[#8E5A2B] bg-[#FFFBF7]/95 flex flex-col items-center justify-center text-[7px] text-[#321B0B] font-mono font-bold rotate-12 shadow-xs leading-tight">
            <span>PLAYA</span>
            <span>{stampDate}</span>
          </div>
        </div>

        {/* TOP TRIANGULAR FLAP (Conectada estructuralmente al sobre, manteniendo el color original) */}
        <div
          className="absolute -top-[1px] left-0 right-0 h-[64%] pointer-events-none origin-top transition-all duration-1000"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'top center',
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            transform: isOpening
              ? 'rotateX(180deg)'
              : 'rotateX(0deg)',
            zIndex: isFlapOpen ? 2 : 40,
            filter: isOpening ? 'none' : 'drop-shadow(0 10px 16px rgba(65, 38, 20, 0.2))',
          }}
        >
          <div
            className="w-full h-full relative bg-gradient-to-b from-[#F5EADB] via-[#EEDECF] to-[#E3D1BF] border-b border-[#D8C4B0]"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
          >
            {/* Filetes dorados de la solapa */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="100"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="100"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
            </svg>

            {/* Valentina & Sebastián escrito directamente en el sobre: Se desvanece suavemente al abrir */}
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none select-none z-10 w-full px-3 transition-opacity duration-300 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
              <h2
                className="font-script text-2xl sm:text-3xl text-[#2A1204] leading-tight font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)] flex items-center justify-center gap-1.5 flex-wrap"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                }}
              >
                <span
                  className="inline-block animate-watercolor-text"
                  style={
                    {
                      '--watercolor-duration': '2.2s',
                      '--watercolor-delay': '0.35s',
                      '--rot-start': '-2deg',
                    } as React.CSSProperties
                  }
                >
                  Valentina
                </span>
                <span
                  className="inline-block text-[#8E5A2B] animate-watercolor-text"
                  style={
                    {
                      '--watercolor-duration': '2.0s',
                      '--watercolor-delay': '0.52s',
                      '--rot-start': '0deg',
                      '--scale-start': '0.85',
                    } as React.CSSProperties
                  }
                >
                  &amp;
                </span>
                <span
                  className="inline-block animate-watercolor-text"
                  style={
                    {
                      '--watercolor-duration': '2.2s',
                      '--watercolor-delay': '0.70s',
                      '--rot-start': '1.8deg',
                    } as React.CSSProperties
                  }
                >
                  Sebastián
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* SELLO DE CERA REALISTA (Blur-to-focus en carga, disolución acuarela cinematográfica en apertura) */}
        <div
          className={`absolute left-1/2 top-[58%] w-[22%] max-w-[96px] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none ${isOpening
            ? 'animate-watercolor-seal-out'
            : 'animate-watercolor-seal'
            }`}
        >
          <div className="relative w-full aspect-square flex items-center justify-center">
            <img
              src="/images/sello-cera.png"
              alt="Sello de cera V & S"
              className="w-full h-full object-contain"
              style={{
                filter:
                  'drop-shadow(0px 3px 5px rgba(40, 16, 6, 0.45)) drop-shadow(0px 10px 18px rgba(45, 18, 8, 0.4))',
              }}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BeachEnvelope = PapelRasgadoEnvelope;
export type { PapelRasgadoEnvelopeProps as BeachEnvelopeProps };
