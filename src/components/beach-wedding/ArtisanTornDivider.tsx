import React from 'react';
import {
  ARTISAN_TORN_TOP_UPPER_PATH,
  ARTISAN_TORN_TOP_FIBER_PATH,
  ARTISAN_TORN_BOT_LOWER_PATH,
  ARTISAN_TORN_BOT_FIBER_PATH,
  PROMINENT_TORN_BOT_UPPER_PATH,
  PROMINENT_TORN_BOT_FIBER_PATH,
} from './constants/tornPaperPaths';

interface ArtisanTornDividerProps {
  type?: 'top' | 'bottom';
  upperColor?: string;
  lowerColor?: string;
  fiberColor?: string;
  prominent?: boolean;
  heightClassName?: string;
  className?: string;
}

/**
 * Divisor de papel rasgado artesanal con microfibras y profundidad 3D.
 * Cuenta con un modo 'prominent' inspirado en referencias de papel rasgado artesanal de alta gama:
 * - Mayor altura entre secciones (h-24 sm:h-32 md:h-36)
 * - Borde uniforme con suave ondulación natural (sin picos bruscos ni bajadas caóticas)
 * - Franja de fibra de papel expuesta en tonos crema/marfil suaves de bajo contraste que armonizan con la paleta cálida
 * - Doble sombra cálida y realista (profundidad 3D hacia la sección inferior)
 */
export const ArtisanTornDivider: React.FC<ArtisanTornDividerProps> = ({
  type = 'top',
  upperColor = '#FAF4EC',
  lowerColor = '#F5ECE0',
  fiberColor = '#FCF8F2',
  prominent = type === 'bottom',
  heightClassName = '',
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
          className={`w-full block ${heightClassName || 'h-11 sm:h-14'}`}
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

  // Divisor de papel rasgado uniforme y suave en tonos crema armonizados de bajo contraste
  if (prominent) {
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
            {/* Sombra suave y cálida proyectada sobre la sección inferior (RSVP #EBDDCE) */}
            <filter id="prominentTornShadow" x="-5%" y="-10%" width="110%" height="150%">
              <feDropShadow dx="0" dy="3.5" stdDeviation="4" floodColor="#462C16" floodOpacity="0.14" />
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#261408" floodOpacity="0.08" />
            </filter>
            {/* Sombra sutil del corte de la capa superior sobre la franja de fibra crema */}
            <filter id="prominentSheetEdgeShadow" x="-5%" y="-10%" width="110%" height="150%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor="#462C16" floodOpacity="0.09" />
            </filter>
            {/* Degradado crema cálido de bajo contraste que armoniza con los fondos crema */}
            <linearGradient id="prominentTornFiberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={fiberColor} />
              <stop offset="100%" stopColor="#F6EFE5" />
            </linearGradient>
          </defs>

          {/* 1. Fondo inferior continuo con el color de la sección que inicia (RSVP #EBDDCE) */}
          <rect x="0" y="0" width="1000" height="200" fill={lowerColor} />

          {/* 2. Capa de fibra crema de papel rasgado (núcleo expuesto armonizado) con sombra suave */}
          <path
            d={PROMINENT_TORN_BOT_FIBER_PATH}
            fill="url(#prominentTornFiberGrad)"
            filter="url(#prominentTornShadow)"
          />

          {/* 3. Hoja de papel superior (Itinerario #F5ECE0) que rasga sobre la franja crema */}
          <path
            d={PROMINENT_TORN_BOT_UPPER_PATH}
            fill={upperColor}
            filter="url(#prominentSheetEdgeShadow)"
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
        className={`w-full block ${heightClassName || 'h-11 sm:h-14'}`}
      >
        <rect x="0" y="0" width="1000" height="115" fill={upperColor} />
        <path
          d={ARTISAN_TORN_BOT_FIBER_PATH}
          fill={fiberColor}
          opacity={0.88}
          style={{ filter: 'drop-shadow(0px -2px 3px rgba(60, 35, 18, 0.12))' }}
        />
        <path
          d={ARTISAN_TORN_BOT_LOWER_PATH}
          fill={lowerColor}
          style={{ filter: 'drop-shadow(0px -3px 5px rgba(60, 35, 18, 0.15))' }}
        />
      </svg>
    </div>
  );
};
