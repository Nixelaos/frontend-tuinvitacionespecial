import React from 'react';
import {
  ARTISAN_TORN_TOP_UPPER_PATH,
  ARTISAN_TORN_TOP_FIBER_PATH,
  ARTISAN_TORN_BOT_LOWER_PATH,
  ARTISAN_TORN_BOT_FIBER_PATH,
} from './constants/tornPaperPaths';

interface ArtisanTornDividerProps {
  type?: 'top' | 'bottom';
  upperColor?: string;
  lowerColor?: string;
  fiberColor?: string;
  className?: string;
}

/**
 * Nuevo diseño de divisor de papel rasgado artesanal con microfibras y profundidad 3D,
 * diseñado especialmente para enmarcar con elegancia la sección del itinerario.
 */
export const ArtisanTornDivider: React.FC<ArtisanTornDividerProps> = ({
  type = 'top',
  upperColor = '#FAF4EC',
  lowerColor = '#F5ECE0',
  fiberColor = '#FFFDF9',
  className = '',
}) => {
  if (type === 'top') {
    return (
      <div
        className={`w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-20 ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 115"
          preserveAspectRatio="none"
          className="w-full h-11 sm:h-14 block"
        >
          {/* Fondo inferior continuo con el color de la sección que inicia */}
          <rect x="0" y="0" width="1000" height="115" fill={lowerColor} />
          {/* Capa de fibras de papel artesanal expuestas con suave relieve */}
          <path
            d={ARTISAN_TORN_TOP_FIBER_PATH}
            fill={fiberColor}
            opacity={0.88}
            style={{ filter: 'drop-shadow(0px 2px 3px rgba(60, 35, 18, 0.12))' }}
          />
          {/* Hoja superior de papel rasgado con sutil sombra orgánica */}
          <path
            d={ARTISAN_TORN_TOP_UPPER_PATH}
            fill={upperColor}
            style={{ filter: 'drop-shadow(0px 3px 5px rgba(60, 35, 18, 0.15))' }}
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
        viewBox="0 0 1000 115"
        preserveAspectRatio="none"
        className="w-full h-11 sm:h-14 block"
      >
        {/* Fondo superior continuo con el color de la sección previa */}
        <rect x="0" y="0" width="1000" height="115" fill={upperColor} />
        {/* Capa de fibras de papel artesanal expuestas hacia abajo */}
        <path
          d={ARTISAN_TORN_BOT_FIBER_PATH}
          fill={fiberColor}
          opacity={0.88}
          style={{ filter: 'drop-shadow(0px -2px 3px rgba(60, 35, 18, 0.12))' }}
        />
        {/* Hoja inferior de papel rasgado que solapa hacia arriba */}
        <path
          d={ARTISAN_TORN_BOT_LOWER_PATH}
          fill={lowerColor}
          style={{ filter: 'drop-shadow(0px -3px 5px rgba(60, 35, 18, 0.15))' }}
        />
      </svg>
    </div>
  );
};
