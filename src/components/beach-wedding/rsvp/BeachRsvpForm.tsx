import React from 'react';
import {
  Sparkles,
  Heart,
  Check,
  Utensils,
  Music,
  Clock,
  Users,
  Send,
} from 'lucide-react';
import { GuestStepper } from '../../common/GuestStepper';
import type {
  AttendanceStatus,
  MenuOption,
  RsvpFormValues,
} from '../../../types/rsvp';

interface BeachRsvpFormProps {
  salutationText: string;
  maxPasses: number;
  menuOptions: MenuOption[];
  rsvpDeadlineDisplay: string;
  formValues: RsvpFormValues;
  isSubmitting: boolean;
  onSetAttendance: (status: AttendanceStatus) => void;
  onDecrementAttendees: () => void;
  onIncrementAttendees: () => void;
  onToggleMenu: (label: string) => void;
  onUpdateTextField: (
    field: 'allergies' | 'song' | 'dedication',
    value: string
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BeachRsvpForm: React.FC<BeachRsvpFormProps> = ({
  salutationText,
  maxPasses,
  menuOptions,
  rsvpDeadlineDisplay,
  formValues,
  isSubmitting,
  onSetAttendance,
  onDecrementAttendees,
  onIncrementAttendees,
  onToggleMenu,
  onUpdateTextField,
  onSubmit,
}) => {
  const { attendance, attendeesCount, selectedMenus, allergies, song, dedication } =
    formValues;

  return (
    <form onSubmit={onSubmit} className="relative z-10 space-y-6">
      {/* MÓDULO 1: ENCABEZADO Y SALUDO PERSONALIZADO */}
      <div className="text-center space-y-2.5">
        <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-[#916E49] uppercase">
          R. S. V. P.
        </span>

        <h2
          id="rsvp-modal-title"
          className="font-serif text-2xl sm:text-3xl text-[#2F2420] font-normal tracking-wide leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Confirmación de Asistencia
        </h2>

        <p className="font-serif italic text-sm sm:text-base text-[#6E5542] leading-relaxed max-w-xs mx-auto">
          «{salutationText}»
        </p>

        {/* Insignia de pases asignados */}
        <div className="pt-1.5 flex justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5ECE0]/80 border border-[#DFCBB5] text-[10px] sm:text-xs font-medium text-[#7D5A38] tracking-wider uppercase">
            <Users className="w-3.5 h-3.5 text-[#B8864E]" />
            <span>
              Pases reservados en su honor:{' '}
              <strong className="text-[#2F2420] font-bold">
                {maxPasses} {maxPasses === 1 ? 'persona' : 'personas'}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* LÍNEA DIVISORIA ORGÁNICA */}
      <div className="flex items-center justify-center gap-2 py-1">
        <span className="w-8 h-[1px] bg-[#DFCBB5]" />
        <Sparkles className="w-3 h-3 text-[#B8864E]" />
        <span className="w-8 h-[1px] bg-[#DFCBB5]" />
      </div>

      {/* MÓDULO 2: DECISIÓN PRINCIPAL (BIFURCACIÓN SÍ / NO) */}
      <div className="space-y-2.5">
        <span
          id="rsvp-attendance-label"
          className="block text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase text-center sm:text-left"
        >
          1. ¿Nos acompañas?
        </span>

        <div
          role="radiogroup"
          aria-labelledby="rsvp-attendance-label"
          className="grid grid-cols-2 gap-2.5"
        >
          {/* Opción SÍ */}
          <button
            type="button"
            role="radio"
            aria-checked={attendance === 'yes'}
            onClick={() => onSetAttendance('yes')}
            className={`relative p-3.5 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
              attendance === 'yes'
                ? 'bg-[#FAF3E8] border-[#B8864E] shadow-[0_3px_12px_rgba(184,134,78,0.22)] ring-1 ring-[#B8864E]'
                : 'bg-white/70 border-[#DFCBB5] hover:bg-white hover:border-[#C8AD90] opacity-80'
            }`}
          >
            <span className="text-sm font-semibold text-[#2F2420]">
              ✨ ¡Sí, ahí estaré!
            </span>
            <span className="text-[10px] text-[#8C6947]">
              Celebraré con ustedes
            </span>
            {attendance === 'yes' && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#B8864E] text-white flex items-center justify-center text-[10px]">
                <Check className="w-2.5 h-2.5" />
              </span>
            )}
          </button>

          {/* Opción NO */}
          <button
            type="button"
            role="radio"
            aria-checked={attendance === 'no'}
            onClick={() => onSetAttendance('no')}
            className={`relative p-3.5 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
              attendance === 'no'
                ? 'bg-[#FAF3E8] border-[#B8864E] shadow-[0_3px_12px_rgba(184,134,78,0.22)] ring-1 ring-[#B8864E]'
                : 'bg-white/70 border-[#DFCBB5] hover:bg-white hover:border-[#C8AD90] opacity-80'
            }`}
          >
            <span className="text-sm font-semibold text-[#2F2420]">
              💌 No podré asistir
            </span>
            <span className="text-[10px] text-[#8C6947]">
              Los acompañaré de corazón
            </span>
            {attendance === 'no' && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#B8864E] text-white flex items-center justify-center text-[10px]">
                <Check className="w-2.5 h-2.5" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* RAMIFICACIÓN: SI CONFIRMA ASISTENCIA */}
      {attendance === 'yes' ? (
        <div className="space-y-6 animate-fadeIn transition-all duration-500">
          {/* MÓDULO 3: SELECTOR DE PASES CONFIRMADOS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase">
                2. Cantidad de Asistentes
              </span>
              <span className="text-[10px] text-[#916E49] italic">
                (Máximo {maxPasses})
              </span>
            </div>

            <GuestStepper
              value={attendeesCount}
              max={maxPasses}
              onDecrement={onDecrementAttendees}
              onIncrement={onIncrementAttendees}
            />
          </div>

          {/* MÓDULO 4: PREFERENCIAS DE MENÚ / RESTRICCIONES ALIMENTARIAS */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#B8864E]" />
              <label
                htmlFor="rsvp-allergies"
                className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase"
              >
                3. Menú y Restricciones Alimentarias
              </label>
            </div>

            {/* Pastillas interactivas (chips) */}
            <div
              role="group"
              aria-label="Opciones de menú"
              className="flex flex-wrap gap-1.5 sm:gap-2"
            >
              {menuOptions.map((menu) => {
                const isSelected = selectedMenus.includes(menu.label);
                return (
                  <button
                    key={menu.id}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => onToggleMenu(menu.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer flex items-center gap-1.5 select-none ${
                      isSelected
                        ? 'bg-[#FAF3E8] border-[#B8864E] text-[#2F2420] shadow-xs'
                        : 'bg-white/70 border-[#DFCBB5] text-[#6E5542] hover:bg-white hover:border-[#C8AD90]'
                    }`}
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-[#B8864E] stroke-[2.5]" />
                    )}
                    <span>{menu.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Campo de alergias severas */}
            <div className="pt-1">
              <input
                id="rsvp-allergies"
                type="text"
                value={allergies}
                onChange={(e) => onUpdateTextField('allergies', e.target.value)}
                placeholder="¿Alguna alergia severa o condición? (opcional)"
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-white/90 border border-[#DFCBB5] text-[#2F2420] placeholder:text-[#A8927E] focus:outline-none focus:border-[#B8864E] focus:ring-1 focus:ring-[#B8864E] transition-all"
              />
            </div>
          </div>

          {/* MÓDULO 5A: LA CHISPA FESTIVA (CANCIÓN) */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#B8864E]" />
              <label
                htmlFor="rsvp-song"
                className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase"
              >
                4. La Chispa Festiva
              </label>
            </div>

            <p className="text-xs text-[#6E5542] italic">
              «¿Qué canción te saca a bailar sí o sí?»
            </p>

            <input
              id="rsvp-song"
              type="text"
              value={song}
              onChange={(e) => onUpdateTextField('song', e.target.value)}
              placeholder="Nombre de canción y artista (ej. Danza Kuduro)"
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-white/90 border border-[#DFCBB5] text-[#2F2420] placeholder:text-[#A8927E] focus:outline-none focus:border-[#B8864E] focus:ring-1 focus:ring-[#B8864E] transition-all"
            />
          </div>
        </div>
      ) : (
        /* RAMIFICACIÓN: SI INDICA QUE NO PODRÁ ASISTIR */
        <div className="bg-[#FAF3E8] border border-[#DFCBB5] rounded-xl p-4 text-center space-y-2 animate-fadeIn transition-all duration-500">
          <Heart className="w-5 h-5 text-[#B8864E] mx-auto fill-[#B8864E]/20" />
          <p
            className="font-serif italic text-sm text-[#543F30] leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            «Lamentamos mucho que no puedas acompañarnos, ¡te tendremos presente en el corazón en todo momento!»
          </p>
        </div>
      )}

      {/* MÓDULO 5B: MENSAJE PARA LOS NOVIOS (DISPONIBLE PARA AMBOS) */}
      <div className="space-y-2 pt-1">
        <label
          htmlFor="rsvp-dedication"
          className="block text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase"
        >
          {attendance === 'yes'
            ? '5. Mensaje para los novios'
            : 'Mensaje o buenos deseos'}
        </label>

        <textarea
          id="rsvp-dedication"
          rows={3}
          value={dedication}
          onChange={(e) => onUpdateTextField('dedication', e.target.value)}
          placeholder="Escribe una dedicatoria o deseo para la pareja..."
          className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white/90 border border-[#DFCBB5] text-[#2F2420] placeholder:text-[#A8927E] focus:outline-none focus:border-[#B8864E] focus:ring-1 focus:ring-[#B8864E] transition-all resize-none"
        />
      </div>

      {/* MÓDULO 6: BOTÓN DE CONFIRMACIÓN */}
      <div className="pt-2 text-center space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C2925A] via-[#B8864E] to-[#A4743E] hover:from-[#B8864E] hover:to-[#966835] text-white font-medium text-xs sm:text-sm tracking-widest uppercase shadow-[0_4px_16px_rgba(184,134,78,0.32)] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          <span>
            {isSubmitting
              ? 'Registrando...'
              : attendance === 'yes'
              ? 'Confirmar Asistencia'
              : 'Enviar Respuesta'}
          </span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C6947]">
          <Clock className="w-3 h-3 text-[#B8864E]" />
          <span>
            Fecha límite para responder:{' '}
            <strong>{rsvpDeadlineDisplay}</strong>
          </span>
        </div>
      </div>
    </form>
  );
};
