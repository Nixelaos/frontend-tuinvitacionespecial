import React from 'react';

export interface BeachFlowerProps {
  /**
   * Clases adicionales para posicionamiento absoluto, tamaño, sombras, etc.
   * (ej. 'absolute top-[50%] -left-6 sm:-left-7 w-20 sm:w-24 md:w-28 z-30 opacity-70 drop-shadow-[0_6px_14px_rgba(60,25,12,0.18)]')
   */
  className?: string;
  /**
   * Variante de movimiento y vaivén.
   * - 'left': animación de vaivén para lateral izquierdo (como en la frase).
   * - 'right': animación de vaivén para lateral/esquina superior derecha (como en countdown).
   * - 'gentle': vaivén suave neutral.
   * Por defecto 'left'.
   */
  variant?: 'left' | 'right' | 'gentle';
  /**
   * Clase opcional para la rotación de la imagen (por defecto rotate-45 en 'left', rotate-12 en 'right').
   */
  imageRotateClass?: string;
  /**
   * Modo de carga de la imagen ('lazy' por defecto, 'eager' para secciones visibles al inicio).
   */
  loading?: 'lazy' | 'eager';
  /**
   * Texto alternativo para la imagen.
   */
  alt?: string;
  /**
   * Estilos CSS en línea adicionales.
   */
  style?: React.CSSProperties;
}

const FLOWER_SWAY_STYLES = `
@keyframes flowerSwayLeftKeyframes {
  0%, 100% {
    transform: translateY(-62%) rotate(38deg) scale(1);
  }
  50% {
    transform: translateY(calc(-62% - 4px)) rotate(46deg) scale(1.04);
  }
}

.animate-flower-sway-left {
  animation: flowerSwayLeftKeyframes 4.5s ease-in-out infinite;
  transform-origin: center left;
  will-change: transform;
}

@keyframes flowerSwayRightKeyframes {
  0%, 100% {
    transform: rotate(10deg) translateY(0) scale(1);
  }
  50% {
    transform: rotate(18deg) translateY(-4px) scale(1.03);
  }
}

.animate-flower-sway-right {
  animation: flowerSwayRightKeyframes 4.8s ease-in-out infinite;
  transform-origin: bottom right;
  will-change: transform;
}

@keyframes flowerSwayGentleKeyframes {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-5px) rotate(6deg) scale(1.03);
  }
}

.animate-flower-sway-gentle {
  animation: flowerSwayGentleKeyframes 4.8s ease-in-out infinite;
  transform-origin: center center;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .animate-flower-sway-left,
  .animate-flower-sway-right,
  .animate-flower-sway-gentle {
    animation: none !important;
  }
}
`;

/**
 * Componente modular con la flor de contraste botánica (/images/flor-contraste.webp)
 * que encapsula el efecto de movimiento suave y oscilación de brisa marina.
 */
export const BeachFlower: React.FC<BeachFlowerProps> = ({
  className = '',
  variant = 'left',
  imageRotateClass,
  loading = 'lazy',
  alt = 'Flor de contraste',
  style,
}) => {
  const animClass =
    variant === 'right'
      ? 'animate-flower-sway-right'
      : variant === 'gentle'
      ? 'animate-flower-sway-gentle'
      : 'animate-flower-sway-left';

  const defaultRotate = variant === 'left' ? 'transform rotate-45' : 'transform rotate-12';
  const finalRotate = imageRotateClass ?? defaultRotate;

  return (
    <div
      className={`pointer-events-none select-none ${animClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <img
        src="/images/flor-contraste.webp"
        alt={alt}
        className={`w-full h-auto object-contain select-none pointer-events-none ${finalRotate}`}
        loading={loading}
      />
      <style dangerouslySetInnerHTML={{ __html: FLOWER_SWAY_STYLES }} />
    </div>
  );
};
