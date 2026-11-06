import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface GuestStepperProps {
  value: number;
  min?: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
  singularLabel?: string;
  pluralLabel?: string;
  containerClassName?: string;
  buttonClassName?: string;
  valueClassName?: string;
  valueStyle?: React.CSSProperties;
  sublabelClassName?: string;
}

/**
 * Control numérico accesible (+ / -) para selección de cantidad de asistentes.
 * Reutilizable en distintas plantillas de invitación mediante clases personalizables.
 */
export const GuestStepper: React.FC<GuestStepperProps> = ({
  value,
  min = 1,
  max,
  onDecrement,
  onIncrement,
  singularLabel = 'persona confirmada',
  pluralLabel = 'personas confirmadas',
  containerClassName = 'bg-white/80 border border-[#DFCBB5] rounded-xl p-2.5 flex items-center justify-between',
  buttonClassName = 'w-9 h-9 rounded-lg bg-[#F5ECE0] hover:bg-[#FAF3E8] disabled:opacity-30 disabled:cursor-not-allowed border border-[#DFCBB5] flex items-center justify-center text-[#2F2420] transition-colors cursor-pointer',
  valueClassName = 'font-serif text-xl sm:text-2xl text-[#2F2420] font-bold leading-none',
  valueStyle = { fontFamily: "'Cormorant Garamond', Georgia, serif" },
  sublabelClassName = 'text-[10px] text-[#8C6947] font-medium uppercase tracking-wider',
}) => {
  return (
    <div className={containerClassName}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Disminuir asistentes"
        className={buttonClassName}
      >
        <Minus className="w-4 h-4" />
      </button>

      <div className="flex flex-col items-center" aria-live="polite">
        <span className={valueClassName} style={valueStyle}>
          {value}
        </span>
        <span className={sublabelClassName}>
          {value === 1 ? singularLabel : pluralLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Aumentar asistentes"
        className={buttonClassName}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
