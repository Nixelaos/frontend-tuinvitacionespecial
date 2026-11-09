import React from 'react';
import {
  NEW_TORN_TOP_UPPER_PATH,
  NEW_TORN_TOP_FIBER_PATH,
  NEW_TORN_BOT_LOWER_PATH,
  NEW_TORN_BOT_FIBER_PATH,
} from './constants/tornPaperPaths';

interface BeachTornDividerProps {
  type?: 'top' | 'bottom';
  upperColor?: string;
  lowerColor?: string;
  fiberColor?: string;
  className?: string;
}

/**
 * Nueva separación artesanal que se parece a papel roto con fibras naturales visibles
 * y sombra de profundidad tridimensional.
 */
export const BeachTornDivider: React.FC<BeachTornDividerProps> = ({
  type = 'top',
  upperColor = '#EBDDCE',
  lowerColor = '#FAF4EC',
  fiberColor = '#FFFDF7',
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
          className="w-full h-11 sm:h-14 block"
        >
          {/* Fibras expuestas de papel de algodón (deckle edge) */}
          <path d={NEW_TORN_TOP_FIBER_PATH} fill={fiberColor} />
          {/* Capa de papel superior rasgada a mano con sombra suave proyectada */}
          <path
            d={NEW_TORN_TOP_UPPER_PATH}
            fill={upperColor}
            style={{ filter: 'drop-shadow(0px 4px 5px rgba(50, 30, 15, 0.20))' }}
          />
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
        className="w-full h-11 sm:h-14 block"
      >
        {/* Fibras rasgadas en borde inferior */}
        <path
          d={NEW_TORN_BOT_FIBER_PATH}
          fill={fiberColor}
          style={{ filter: 'drop-shadow(0px -3px 4px rgba(50, 30, 15, 0.15))' }}
        />
        {/* Hoja inferior rasgada */}
        <path d={NEW_TORN_BOT_LOWER_PATH} fill={lowerColor} />
      </svg>
    </div>
  );
};
