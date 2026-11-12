import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PapelRasgadoFlower } from './PapelRasgadoFlower';
import { PapelRasgadoRsvpForm } from './rsvp/PapelRasgadoRsvpForm';
import { PapelRasgadoRsvpSuccess } from './rsvp/PapelRasgadoRsvpSuccess';
import { useInvitationParams } from '../../hooks/useInvitationParams';
import { useRsvpForm } from '../../hooks/useRsvpForm';
import { buildRsvpSalutation } from '../../utils/greetingUtils';
import {
  buildGoogleCalendarUrl,
  downloadIcsFile,
} from '../../utils/calendarUtils';
import { buildRsvpWhatsAppUrl } from '../../utils/whatsappUtils';
import {
  PAPEL_RASGADO_RSVP_CONFIG,
  DEFAULT_MENU_OPTIONS,
} from '../../data/templates/papelRasgadoData';

export interface PapelRasgadoRsvpProps {
  className?: string;
  title?: string;
  subtitle?: string;
  message?: string;
  clickPhrase?: string;
  imageSrc?: string;
  imageAlt?: string;
  showFlower?: boolean;
  flowerVariant?: 'left' | 'right' | 'gentle';
}

export const PapelRasgadoRsvp: React.FC<PapelRasgadoRsvpProps> = ({
  className = '',
  title = 'Confirmación de Asistencia',
  subtitle = 'R. S. V. P.',
  message = 'Será un verdadero honor contar con tu presencia. Por favor, confírmanos tu asistencia antes del 25 de Octubre:',
  clickPhrase = 'Toca el sobre para confirmar tu asistencia',
  imageSrc = '/images/sobre.png',
  imageAlt = 'Sobre de confirmación de asistencia (R.S.V.P.)',
  showFlower = true,
  flowerVariant = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { guestName, maxPasses } = useInvitationParams();

  const {
    formValues,
    isSubmitted,
    isSubmitting,
    setAttendance,
    decrementAttendees,
    incrementAttendees,
    toggleMenu,
    updateTextField,
    handleSubmit,
    resetSubmission,
  } = useRsvpForm({ maxPasses });

  const salutationText = buildRsvpSalutation(guestName, maxPasses);
  const googleCalendarUrl = buildGoogleCalendarUrl(PAPEL_RASGADO_RSVP_CONFIG);
  const whatsAppUrl = buildRsvpWhatsAppUrl({
    guestName,
    maxPasses,
    formValues,
    config: PAPEL_RASGADO_RSVP_CONFIG,
  });

  const handleDownloadIcs = () => {
    downloadIcsFile(PAPEL_RASGADO_RSVP_CONFIG);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Cerrar con tecla Escape y bloquear el scroll del fondo mientras el modal está abierto
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

  return (
    <div
      className={`w-full bg-[#EBDDCE] px-4 py-8 sm:py-12 text-[#2F2420] relative z-30 transition-colors duration-500 ${className}`}
    >
      {/* Animación fluida lenta de flotación de arriba a abajo idéntica a la sección regalo */}
      <style>{`
        @keyframes floatRsvpSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float-slow-rsvp {
          animation: floatRsvpSlow 3.2s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* Flor botánica de contraste colocada sobre todo el divisor, subida para no tapar ninguna letra */}
      {showFlower && (
        <PapelRasgadoFlower
          variant={flowerVariant}
          className="absolute -top-14 sm:-top-18 left-1 sm:left-2 w-16 sm:w-20 md:w-22 z-40 drop-shadow-[0_8px_18px_rgba(60,25,12,0.25)]"
          delayMs={150}
        />
      )}

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

        {/* CONTENIDO DE LA SECCIÓN (DIRECTO SOBRE EL FONDO) */}
        <div className="relative w-full flex flex-col items-center text-center">
          {/* Mensaje breve */}
          <p className="text-xs sm:text-sm text-[#7D5F48] leading-relaxed max-w-xs sm:max-w-sm mb-5">
            {isSubmitted
              ? '¡Gracias por responder! Ya hemos registrado tu confirmación. Puedes tocar el sobre para revisar los detalles o realizar modificaciones:'
              : message}
          </p>

          {/* ZONA INTERACTIVA DEL SOBRE:
              Al clickear en el sobre o cerca de este, se abre el recuadro desplegable con los campos RSVP.
              El bloque entero (imagen y frase) flota lentamente de arriba a abajo directamente sobre el fondo. */}
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
            className="group cursor-pointer select-none w-full max-w-[280px] sm:max-w-[300px] flex flex-col items-center p-2 rounded-2xl transition-transform duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B87A4A]/40"
            title={isSubmitted ? 'Ver o modificar respuesta' : clickPhrase}
            aria-label={isSubmitted ? 'Ver o modificar confirmación de asistencia' : clickPhrase}
          >
            {/* Contenedor animado que se mueve lentamente de arriba a abajo */}
            <div className="animate-float-slow-rsvp flex flex-col items-center">
              {/* Imagen del sobre directamente sobre el fondo de la sección */}
              <div className="relative flex justify-center items-center">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="relative z-10 w-24 sm:w-28 md:w-32 h-auto object-contain drop-shadow-[0_6px_16px_rgba(70,45,25,0.18)] transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                  loading="lazy"
                />

                {/* Insignia visual cuando ya respondió */}
                {isSubmitted && (
                  <div
                    className="absolute -top-1.5 -right-1.5 z-20 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md animate-in zoom-in-75 duration-300"
                    title="Asistencia confirmada"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Frase animada para que clickeen, moviéndose junto al sobre */}
              <p className="mt-2.5 text-xs sm:text-[13px] font-medium text-[#8C5E35] group-hover:text-[#6D421F] transition-colors duration-300 tracking-wide text-center">
                {isSubmitted ? '¡Respuesta enviada! Toca para verla' : clickPhrase}
              </p>
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
              aria-labelledby="rsvp-modal-title"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[380px] sm:max-w-[430px] max-h-[90dvh] overflow-y-auto bg-[#FAF3EB] border-2 border-[#CDB8A3] rounded-2xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(30,15,5,0.45)] flex flex-col text-left animate-in fade-in zoom-in-95 duration-200"
              >
                {/* Filete interior sutil tipo papelería de alta gama con bordes definidos */}
                <div className="absolute inset-2 sm:inset-2.5 border-2 border-[#E0D2C2] rounded-xl pointer-events-none" />

                {/* Botón cerrar X en la esquina superior derecha */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white border-2 border-[#CDB8A3] flex items-center justify-center text-[#8C6947] hover:text-[#2F2420] transition-colors shadow-xs cursor-pointer"
                  aria-label="Cerrar confirmación de asistencia"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Formulario RSVP o Pantalla de Éxito */}
                <div className="relative z-10 w-full pt-1">
                  {!isSubmitted ? (
                    <PapelRasgadoRsvpForm
                      salutationText={salutationText}
                      maxPasses={maxPasses}
                      menuOptions={DEFAULT_MENU_OPTIONS}
                      rsvpDeadlineDisplay={PAPEL_RASGADO_RSVP_CONFIG.rsvpDeadlineDisplay}
                      formValues={formValues}
                      isSubmitting={isSubmitting}
                      onSetAttendance={setAttendance}
                      onDecrementAttendees={decrementAttendees}
                      onIncrementAttendees={incrementAttendees}
                      onToggleMenu={toggleMenu}
                      onUpdateTextField={updateTextField}
                      onSubmit={handleSubmit}
                    />
                  ) : (
                    <PapelRasgadoRsvpSuccess
                      guestName={guestName}
                      formValues={formValues}
                      eventConfig={PAPEL_RASGADO_RSVP_CONFIG}
                      googleCalendarUrl={googleCalendarUrl}
                      whatsAppUrl={whatsAppUrl}
                      onDownloadIcs={handleDownloadIcs}
                      onReset={resetSubmission}
                    />
                  )}
                </div>

                {/* Botón secundario para cerrar */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="relative z-10 mt-5 mx-auto text-xs font-bold text-[#8C6947] hover:text-[#2F2420] transition-colors cursor-pointer"
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

export const BeachRsvp = PapelRasgadoRsvp;
export type { PapelRasgadoRsvpProps as BeachRsvpProps };
