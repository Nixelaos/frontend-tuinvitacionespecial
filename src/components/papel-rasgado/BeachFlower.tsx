import React, { useState, useRef, useEffect } from 'react';

export interface BeachFlowerProps {
  /**
   * Clases adicionales para posicionamiento absoluto, tamaño, sombras, etc.
   * (ej. 'absolute top-[50%] -left-6 sm:-left-7 w-20 sm:w-24 md:w-28 z-30 drop-shadow-[0_6px_14px_rgba(60,25,12,0.18)]')
   */
  className?: string;
  /**
   * Variante de orientación:
   * - 'left': flor para el lateral izquierdo (/images/hibisco-izq.png).
   * - 'right' | 'gentle': flor para el lateral derecho (/images/hibisco-der.png).
   * Por defecto 'left'.
   */
  variant?: 'left' | 'right' | 'gentle';
  /**
   * Clase opcional para rotación personalizada si se necesita.
   * Vacío por defecto para respetar la rotación original de la imagen.
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
  /**
   * Retardo opcional en milisegundos para el efecto de crecimiento.
   */
  delayMs?: number;
}

/**
 * Componente modular con la flor de contraste botánica (/images/hibisco-izq.png y /images/hibisco-der.png).
 * Aparece con una suave transición de opacidad (0 a 100%) y crecimiento orgánico hasta su tamaño original en 2 segundos,
 * quedando totalmente estática y conservando su ángulo original sin movimiento flotante.
 */
export const BeachFlower: React.FC<BeachFlowerProps> = ({
  className = '',
  variant = 'left',
  imageRotateClass = '',
  loading = 'lazy',
  alt = 'Flor de hibisco',
  style,
  delayMs = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Hibisco orientado según el lado: izquierda -> hibisco-izq, derecha/gentle -> hibisco-der
  const flowerSrc = variant === 'left' ? '/images/hibisco-izq.png' : '/images/hibisco-der.png';

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Contenedor con efecto de crecimiento y transición de opacidad en 2 segundos hasta tamaño original (queda fijo/estático) */}
      <div
        className={`w-full h-full transform transition-all duration-[2000ms] ease-out origin-center ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.34, 1.45, 0.64, 1)',
          transitionDelay: `${delayMs}ms`,
        }}
      >
        <img
          src={flowerSrc}
          alt={alt}
          className={`w-full h-auto object-contain select-none pointer-events-none ${imageRotateClass}`}
          loading={loading}
        />
      </div>
    </div>
  );
};
