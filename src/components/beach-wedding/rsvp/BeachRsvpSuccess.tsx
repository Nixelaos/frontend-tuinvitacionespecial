import React from 'react';
import {
  Heart,
  Calendar,
  MessageCircle,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import type { RsvpEventConfig, RsvpFormValues } from '../../../types/rsvp';

interface BeachRsvpSuccessProps {
  guestName: string;
  formValues: RsvpFormValues;
  eventConfig: RsvpEventConfig;
  googleCalendarUrl: string;
  whatsAppUrl: string;
  onDownloadIcs: () => void;
  onReset: () => void;
}

export const BeachRsvpSuccess: React.FC<BeachRsvpSuccessProps> = ({
  guestName,
  formValues,
  eventConfig,
  googleCalendarUrl,
  whatsAppUrl,
  onDownloadIcs,
  onReset,
}) => {
  const { attendance, attendeesCount, selectedMenus, song, dedication } =
    formValues;

  return (
    <div className="relative z-10 py-4 text-center space-y-5 animate-fadeIn">
      {/* Icono de Lacre o Corazón en agradecimiento */}
      <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF3E8] border border-[#DFCBB5] shadow-xs flex items-center justify-center text-[#B8864E]">
        <Heart className="w-7 h-7 fill-[#B8864E]" />
      </div>

      {/* Mensaje de Éxito Editorial */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-[#916E49] uppercase">
          Respuesta Registrada
        </span>

        <h3
          className="font-serif text-2xl sm:text-3xl text-[#2F2420] font-normal leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {attendance === 'yes'
            ? '¡Nos vemos muy pronto!'
            : '¡Muchísimas gracias!'}
        </h3>

        <p className="font-serif italic text-sm sm:text-base text-[#543F30] max-w-xs mx-auto leading-relaxed">
          {attendance === 'yes'
            ? `«¡Gracias ${guestName}! Tu confirmación ha quedado registrada con éxito. Nos vemos el ${eventConfig.eventDateShort} junto al mar.»`
            : `«¡Gracias ${guestName}! Hemos recibido tu respuesta con mucho cariño. ¡Te tendremos presente en el corazón!»`}
        </p>
      </div>

      {/* Resumen de Confirmación */}
      {attendance === 'yes' && (
        <div className="bg-white/80 border border-[#DFCBB5] rounded-xl p-3.5 text-left text-xs text-[#543F30] space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between pb-1 border-b border-[#F0E4D6]">
            <span className="font-medium text-[#8C6947]">
              Pases confirmados:
            </span>
            <span className="font-bold text-[#2F2420]">
              {attendeesCount} {attendeesCount === 1 ? 'persona' : 'personas'}
            </span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-[#F0E4D6]">
            <span className="font-medium text-[#8C6947]">
              Menú seleccionado:
            </span>
            <span className="font-bold text-[#2F2420] text-right">
              {selectedMenus.join(', ')}
            </span>
          </div>
          {song && (
            <div className="flex items-center justify-between pb-1 border-b border-[#F0E4D6]">
              <span className="font-medium text-[#8C6947]">
                Canción sugerida:
              </span>
              <span className="font-semibold text-[#2F2420] truncate max-w-[170px] text-right">
                {song}
              </span>
            </div>
          )}
          {dedication && (
            <div className="pt-1 text-[11px] italic text-[#6E5542]">
              «{dedication}»
            </div>
          )}
        </div>
      )}

      {/* ACCIÓN DE UTILIDAD: BOTÓN "GUARDAR EN CALENDARIO" */}
      {attendance === 'yes' && (
        <div className="space-y-2 pt-2">
          <span className="block text-[10px] font-semibold tracking-wider text-[#8C6947] uppercase">
            Guarda la fecha en tu agenda
          </span>

          <div className="grid grid-cols-2 gap-2">
            {/* Google Calendar */}
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-lg bg-white hover:bg-[#FAF3E8] border border-[#DFCBB5] text-stone-800 text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B8864E]" />
              <span>Google Cal</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>

            {/* Apple / iCal (.ics) */}
            <button
              type="button"
              onClick={onDownloadIcs}
              className="py-2.5 px-3 rounded-lg bg-white hover:bg-[#FAF3E8] border border-[#DFCBB5] text-stone-800 text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B8864E]" />
              <span>Apple / iCal</span>
            </button>
          </div>

          {/* Notificar por WhatsApp */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Enviar copia por WhatsApp a los novios</span>
          </a>
        </div>
      )}

      {/* MARGEN DE MODIFICACIÓN */}
      <div className="pt-4 border-t border-[#DFCBB5]/60">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[11px] text-[#8C6947] hover:text-[#2F2420] underline underline-offset-4 decoration-[#B8864E]/50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-[#B8864E]" />
          <span>
            ¿Cambio de planes? Modifica tu respuesta hasta el{' '}
            {eventConfig.rsvpDeadlineShort}
          </span>
        </button>
      </div>
    </div>
  );
};
