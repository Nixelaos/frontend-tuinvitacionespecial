import React, { useState } from 'react';
import { Heart, Copy, Check, Mail, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { BeachFlower } from './BeachFlower';

export interface BeachGiftProps {
  className?: string;
  title?: string;
  subtitle?: string;
  message?: string;
  clickPhrase?: string;
  clickPhraseOpen?: string;
  imageSrc?: string;
  imageAlt?: string;
  bankName?: string;
  accountType?: string;
  accountNumber?: string;
  accountHolder?: string;
  holderRut?: string;
  holderEmail?: string;
  envelopeNote?: string;
}

export const BeachGift: React.FC<BeachGiftProps> = ({
  className = '',
  title = 'Regalo para los Novios',
  subtitle = 'Muestra de Cariño',
  message = 'El mejor regalo para nosotros es contar con tu presencia y cariño en nuestro gran día. Si además deseas hacernos un presente y colaborar con el inicio de nuestra nueva vida juntos y luna de miel, puedes ver nuestros datos a continuación:',
  clickPhrase = 'Toca el regalo para ver los datos bancarios',
  clickPhraseOpen = 'Toca el regalo para ocultar los datos',
  imageSrc = '/images/regalo.png',
  imageAlt = 'Regalo para los novios',
  bankName = 'Banco Santander',
  accountType = 'Cuenta Corriente',
  accountNumber = 'XXXX-XXXX-XXXX-XXXX',
  accountHolder = 'Valentina & Sebastián',
  holderRut = 'XX.XXX.XXX-X',
  holderEmail = 'regalos@valentinaysebastian.cl',
  envelopeNote = 'También dispondremos de un buzón de sobres y buenos deseos el día de la boda.',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
      {/* Animación fluida lenta de flotación arriba y abajo */}
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
            {/* Tag superior */}
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#A26D3E] mb-2.5">
              <Heart className="w-3.5 h-3.5 fill-[#B87A4A] text-[#B87A4A]" />
              <span>{subtitle}</span>
            </div>

            {/* Mensaje bonito */}
            <p className="text-xs sm:text-sm text-[#7D5F48] leading-relaxed max-w-xs sm:max-w-sm mb-6">
              {message}
            </p>

            {/* ZONA INTERACTIVA DEL REGALO:
                Al clickear en el regalo o cerca de este, se abre/cierra el recuadro con los datos.
                El bloque entero (imagen y frase) flota lentamente de arriba a abajo. */}
            <div
              onClick={toggleOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleOpen();
                }
              }}
              className="group cursor-pointer select-none w-full max-w-[280px] sm:max-w-[300px] flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:bg-[#F2E5D5]/60 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B87A4A]/40"
              title={isOpen ? clickPhraseOpen : clickPhrase}
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
                    {isOpen ? clickPhraseOpen : clickPhrase}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#B87A4A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#B87A4A] shrink-0" />
                  )}
                </div>
              </div>
            </div>

            {/* RECUADRO CON LOS DATOS BANCARIOS (SE ABRE AL CLICKEAR EN EL REGALO O CERCA DE ÉL) */}
            <div
              className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen
                  ? 'max-h-[600px] opacity-100 mt-6'
                  : 'max-h-0 opacity-0 mt-0 pointer-events-none'
              }`}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-[#FCF9F3] border border-[#DFCBB5] rounded-xl p-4 sm:p-5 shadow-sm text-left transform transition-transform duration-500"
              >
                {/* Encabezado del recuadro */}
                <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-[#EFE5D8]">
                  <span
                    className="text-base sm:text-lg text-[#2F2420] font-semibold tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Datos de Transferencia
                  </span>
                  <button
                    type="button"
                    onClick={toggleOpen}
                    className="text-xs text-[#A26D3E] hover:text-[#7A4920] underline cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="flex flex-col space-y-2 text-xs sm:text-sm text-[#4A3B32]">
                  <div className="flex justify-between items-center py-1 border-b border-[#EFE5D8]">
                    <span className="text-[#8C6947] font-medium">Banco:</span>
                    <span className="font-semibold text-[#2F2420]">{bankName}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#EFE5D8]">
                    <span className="text-[#8C6947] font-medium">Tipo de Cuenta:</span>
                    <span className="font-semibold text-[#2F2420]">{accountType}</span>
                  </div>

                  {/* NÚMERO DE CUENTA CUBIERTO CON XXXX-XXXX-XXXX-XXXX */}
                  <div className="flex flex-col py-2 border-b border-[#EFE5D8]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#8C6947] font-medium">N° de Cuenta:</span>
                      <span className="text-[10px] tracking-wider uppercase text-[#A26D3E] font-semibold">
                        Protegido
                      </span>
                    </div>
                    <div className="w-full bg-[#F5ECE0] border border-[#DFCBB5] rounded-lg py-2 px-3 text-center tracking-[0.18em] font-mono font-bold text-sm sm:text-base text-[#8C5E35] select-all shadow-inner">
                      {accountNumber}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#EFE5D8]">
                    <span className="text-[#8C6947] font-medium">Titular:</span>
                    <span className="font-semibold text-[#2F2420]">{accountHolder}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-[#EFE5D8]">
                    <span className="text-[#8C6947] font-medium">RUT:</span>
                    <span className="font-semibold text-[#2F2420]">{holderRut}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#8C6947] font-medium">Email:</span>
                    <span className="font-semibold text-[#2F2420] break-all text-[11px] sm:text-xs">
                      {holderEmail}
                    </span>
                  </div>
                </div>

                {/* BOTÓN COPIAR DATOS */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B87A4A] to-[#A06437] text-white text-xs sm:text-sm font-medium shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                  title="Copiar datos bancarios"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span className="font-medium">¡Datos copiados con éxito!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-100" />
                      <span>Copiar datos de cuenta</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* NOTA ADICIONAL: BUZÓN DE SOBRES */}
            {envelopeNote && (
              <div className="mt-6 pt-3 border-t border-[#E8DCCF] flex items-center justify-center gap-2 text-center text-xs text-[#7D5F48]">
                <Mail className="w-3.5 h-3.5 text-[#B87A4A] shrink-0" />
                <span>{envelopeNote}</span>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
