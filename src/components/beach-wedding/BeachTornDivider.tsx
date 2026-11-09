import React from 'react';
import {
  BEACH_TORN_TOP_UPPER_PATH,
  BEACH_TORN_TOP_FIBER_PATH,
} from './constants/tornPaperPaths';

interface BeachTornDividerProps {
  type?: 'top' | 'bottom';
  upperColor?: string;
  lowerColor?: string;
  fiberColor?: string;
  heightClassName?: string;
  className?: string;
}

/**
 * Separación artesanal con borde de papel rasgado y franja de fibra crema expuesta,
 * conectando de forma orgánica y uniforme las secciones de Galería y Ubicación.
 */
export const BeachTornDivider: React.FC<BeachTornDividerProps> = ({
  upperColor = '#EBDDCE',
  lowerColor = '#FAF4EC',
  fiberColor = '#FCF8F2',
  heightClassName = '',
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-20 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className={`w-full block ${heightClassName || 'h-24 sm:h-32 md:h-36'}`}
      >
        <defs>
          {/* Sombra suave y realista del papel rasgado proyectada sobre la sección inferior */}
          <filter id="beachTornShadow" x="-5%" y="-10%" width="110%" height="150%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="4" floodColor="#462C16" floodOpacity="0.14" />
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#261408" floodOpacity="0.08" />
          </filter>
          {/* Sombra sutil del corte de la capa superior sobre la franja de fibra crema */}
          <filter id="beachSheetEdgeShadow" x="-5%" y="-10%" width="110%" height="150%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor="#462C16" floodOpacity="0.09" />
          </filter>
          {/* Degradado crema cálido de bajo contraste que armoniza con los fondos */}
          <linearGradient id="beachTornFiberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fiberColor} />
            <stop offset="100%" stopColor="#F6EFE5" />
          </linearGradient>
        </defs>

        {/* 1. Fondo inferior continuo con el color de la sección que inicia */}
        <rect x="0" y="0" width="1000" height="200" fill={lowerColor} />

        {/* 2. Capa de fibra crema de papel rasgado (núcleo expuesto armonizado) */}
        <path
          d={BEACH_TORN_TOP_FIBER_PATH}
          fill="url(#beachTornFiberGrad)"
          filter="url(#beachTornShadow)"
        />

        {/* 3. Hoja de papel superior que rasga sobre la franja crema */}
        <path
          d={BEACH_TORN_TOP_UPPER_PATH}
          fill={upperColor}
          filter="url(#beachSheetEdgeShadow)"
        />
      </svg>
    </div>
  );
};
