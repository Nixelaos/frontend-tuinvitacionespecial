import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Gift, Copy, Check, X, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { BeachFlower } from './BeachFlower';

export interface BeachGiftProps {
  className?: string;
  title?: string;
  message?: string;
  clickPhrase?: string;
  imageSrc?: string;
  imageAlt?: string;
  bankName?: string;
  accountType?: string;
  accountNumber?: string;
  accountHolder?: string;
  holderRut?: string;
  holderEmail?: string;
}

export const BeachGift: React.FC<BeachGiftProps> = ({
  className = '',
  title = 'Regalo para los Novios',
  message = 'Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, te dejamos nuestros datos bancarios:',
  clickPhrase = 'Toca el regalo para ver los datos bancarios',
  imageSrc = '/images/regalo.png',
  imageAlt = 'Regalo para los novios',
  bankName = 'Banco Santander',
  accountType = 'Cuenta Corriente',
  accountNumber = 'XXXX-XXXX-XXXX-XXXX',
  accountHolder = 'Valentina & Sebastián',
  holderRut = 'XX.XXX.XXX-X',
  holderEmail = 'regalos@valentinaysebastian.cl',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Cerrar con Escape y bloquear el scroll del fondo mientras el modal está abierto
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `Banco: ${bankName}\nTipo de Cuenta: ${accountType}\nN° de Cuenta: ${accountNumber}\nTitular: ${accountHolder}\nRUT: ${holderRut}\nEmail: ${holderEmail}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className={`w-full bg-[#F5ECE0] px-4 py-8 sm:py-12 text-[#2F2420] relative z-10 transition-colors duration-500 overflow-hidden ${className}`}
    >
      {/* Animación fluida lenta de flotación de arriba a abajo */}
      <style>{`
        @keyframes floatGiftSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float-slow-gift {
          animation: floatGiftSlow 3.2s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* Flor botánica de contraste en el lateral superior izquierdo */}
      <BeachFlower
        variant="left"
        className="absolute top-3 sm:top-5 -left-3 sm:-left-4 w-16 sm:w-20 md:w-24 z-20 drop-shadow-[0_6px_12px_rgba(60,25,12,0.22)]"
        delayMs={150}
      />

      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-6">
          <h2
            className="font-script text-4xl sm:text-5xl text-[#B87A4A] font-normal leading-tight tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {title}
          </h2>

          {/* Separador ornamental delicado */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent mt-2" />
        </div>

        {/* TARJETA ARTESANAL PRINCIPAL */}
        <div className="relative w-full bg-[#FAF3EB] border border-[#DFCBB5] rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(70,45,25,0.08)] flex flex-col items-center text-center">
          {/* Filete interior sutil tipo papelería de alta gama */}
          <div className="absolute inset-2 sm:inset-2.5 border border-[#E8DCCF] rounded-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Mensaje breve */}
            <p className="text-xs sm:text-sm text-[#7D5F48] leading-relaxed max-w-xs sm:max-w-sm mb-5">
              {message}
            </p>

            {/* ZONA INTERACTIVA DEL REGALO:
                Al clickear en el regalo o cerca de este, se abre el recuadro desplegable con los datos.
                El bloque entero (imagen y frase) flota lentamente de arriba a abajo. */}
            <div
              onClick={openModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal();
                }
              }}
              className="group cursor-pointer select-none w-full max-w-[280px] sm:max-w-[300px] flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:bg-[#F2E5D5]/60 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B87A4A]/40"
              title={clickPhrase}
            >
              {/* Contenedor animado que se mueve lentamente de arriba a abajo */}
              <div className="animate-float-slow-gift flex flex-col items-center">
                {/* Imagen del regalo */}
                <div className="relative flex justify-center items-center">
                  {/* Halo sutil iluminado detrás del regalo */}
                  <div className="absolute inset-0 bg-[#E8DACB]/50 rounded-full blur-md transform scale-90 group-hover:scale-110 transition-transform duration-300" />

                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="relative z-10 w-24 sm:w-28 md:w-32 h-auto object-contain drop-shadow-[0_6px_16px_rgba(70,45,25,0.18)] transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Frase animada para que clickeen, moviéndose junto al regalo */}
                <div className="mt-3 flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FCF9F3]/90 border border-[#DFCBB5] shadow-xs group-hover:border-[#B87A4A] group-hover:bg-white transition-colors duration-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#B87A4A] shrink-0 animate-pulse" />
                  <span className="text-xs sm:text-[13px] font-medium text-[#8C5E35] group-hover:text-[#6D421F]">
                    {clickPhrase}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* RECUADRO DESPLEGABLE CON PORTAL A DOCUMENT.BODY (FLOTANDO POR ENCIMA DE TODA LA PÁGINA Y DIVISORES) */}
      {isOpen && mounted && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gift-modal-title"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[350px] sm:max-w-[380px] max-h-[90dvh] overflow-y-auto bg-[#FAF3EB] border-2 border-[#CDB8A3] rounded-2xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(30,15,5,0.45)] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
              >
                {/* Filete interior sutil tipo papelería de alta gama con bordes definidos */}
                <div className="absolute inset-2 sm:inset-2.5 border-2 border-[#E0D2C2] rounded-xl pointer-events-none" />

                {/* Botón cerrar X en la esquina superior derecha */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white border-2 border-[#CDB8A3] flex items-center justify-center text-[#8C6947] hover:text-[#2F2420] transition-colors shadow-xs cursor-pointer"
                  aria-label="Cerrar recuadro"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Título del recuadro */}
                <div className="relative z-10 flex flex-col items-center w-full mb-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FCF9F3] border-2 border-[#CDB8A3] shadow-xs flex items-center justify-center text-[#B87A4A] mb-2">
                    <Gift className="w-5 h-5" />
                  </div>
                  <h3
                    id="gift-modal-title"
                    className="text-xl sm:text-2xl text-[#2F2420] font-bold leading-snug tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Datos de Transferencia
                  </h3>
                </div>

                {/* Recuadro interior con los datos bancarios y bordes en negrita */}
                <div className="relative z-10 w-full bg-[#FCF9F3] border-2 border-[#CDB8A3] rounded-xl p-3.5 sm:p-4 text-left shadow-xs">
                  <div className="flex flex-col space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-1.5 border-b-2 border-[#E5D7C7]">
                      <span className="text-[#4A3B32] font-bold">Banco:</span>
                      <span className="font-bold text-[#2F2420]">{bankName}</span>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b-2 border-[#E5D7C7]">
                      <span className="text-[#4A3B32] font-bold">Tipo de Cuenta:</span>
                      <span className="font-bold text-[#2F2420]">{accountType}</span>
                    </div>

                    {/* NÚMERO DE CUENTA CUBIERTO CON XXXX-XXXX-XXXX-XXXX */}
                    <div className="flex flex-col py-2 border-b-2 border-[#E5D7C7]">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[#4A3B32] font-bold">N° de Cuenta:</span>
                        <span className="text-[10px] tracking-wider uppercase text-[#7A4920] font-bold px-1.5 py-0.5 rounded bg-[#F0E4D5] border border-[#DFCBB5]">
                          Protegido
                        </span>
                      </div>
                      <div className="w-full bg-[#F5ECE0] border-2 border-[#CDB8A3] rounded-lg py-2 px-3 text-center tracking-[0.18em] font-mono font-bold text-sm sm:text-base text-[#7A4920] select-all shadow-inner">
                        {accountNumber}
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b-2 border-[#E5D7C7]">
                      <span className="text-[#4A3B32] font-bold">Titular:</span>
                      <span className="font-bold text-[#2F2420]">{accountHolder}</span>
                    </div>

                    <div className="flex justify-between items-center py-1.5 border-b-2 border-[#E5D7C7]">
                      <span className="text-[#4A3B32] font-bold">RUT:</span>
                      <span className="font-bold text-[#2F2420]">{holderRut}</span>
                    </div>

                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-[#4A3B32] font-bold">Email:</span>
                      <span className="font-bold text-[#2F2420] break-all text-[11px] sm:text-xs">
                        {holderEmail}
                      </span>
                    </div>
                  </div>

                  {/* Botón copiar datos */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full mt-3.5 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B87A4A] to-[#A06437] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                    title="Copiar datos bancarios"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-200 stroke-[2.5]" />
                        <span className="font-bold">¡Datos copiados con éxito!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-amber-100 stroke-[2.5]" />
                        <span className="font-bold">Copiar datos de cuenta</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Botón secundario para cerrar */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="relative z-10 mt-3.5 text-xs font-bold text-[#8C6947] hover:text-[#2F2420] transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};
