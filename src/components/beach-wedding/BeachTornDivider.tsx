import React from 'react';
import {
  NEW_TORN_TOP_UPPER_PATH,
  NEW_TORN_BOT_LOWER_PATH,
} from './constants/tornPaperPaths';

interface BeachTornDividerProps {
  type?: 'top' | 'bottom';
  upperColor?: string;
  lowerColor?: string;
  className?: string;
}

/**
 * Separación artesanal con borde de papel roto, sin sombras ni borde blanco,
 * conectando de forma limpia y uniforme las secciones.
 */
export const BeachTornDivider: React.FC<BeachTornDividerProps> = ({
  type = 'top',
  upperColor = '#EBDDCE',
  lowerColor = '#FAF4EC',
  className = '',
}) => {
  if (type === 'top') {
    return (
      <div
        className={`w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-20 ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 110"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-12 block"
        >
          {/* Fondo inferior continuo con el color de la sección que inicia */}
          <rect x="0" y="0" width="1000" height="110" fill={lowerColor} />
          {/* Borde de papel rasgado limpio, sin sombras ni franja blanca */}
          <path d={NEW_TORN_TOP_UPPER_PATH} fill={upperColor} />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-20 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 110"
        preserveAspectRatio="none"
        className="w-full h-10 sm:h-12 block"
      >
        {/* Fondo superior continuo con el color de la sección previa */}
        <rect x="0" y="0" width="1000" height="110" fill={upperColor} />
        {/* Borde de papel rasgado limpio, sin sombras ni franja blanca */}
        <path d={NEW_TORN_BOT_LOWER_PATH} fill={lowerColor} />
      </svg>
    </div>
  );
};
