import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { INVITATION_TEMPLATES } from '../data/weddingData';
import type { InvitationTemplate } from '../types/wedding';
import { ParchmentLogo } from './ParchmentLogo';

interface SlideItem {
  src: string;
  alt: string;
  title: string;
}

const SLIDES: SlideItem[] = [
  {
    src: '/images/hero-slide-1.jpg',
    alt: 'Invitación de boda de Valentina & Sebastián - Portada y Cuenta Regresiva',
    title: 'Portada & Cuenta Regresiva',
  },
  {
    src: '/images/hero-slide-2.jpg',
    alt: 'Invitación de boda de Valentina & Sebastián - Poema y Galería de Recuerdos',
    title: 'Poema & Galería',
  },
];

export const HeroRealInvitation: React.FC = () => {
  // Invitación destacada del hero (Playa & Efecto Supernova)
  const defaultTemplate: InvitationTemplate =
    INVITATION_TEMPLATES.find((t) => t.slug === 'invi-playa' || t.slug === 'invitacion-playa-supernova') ||
    INVITATION_TEMPLATES[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [targetHeight, setTargetHeight] = useState<number | null>(null);

  // Sincronizar altura del teléfono con el bloque editorial izquierdo en pantallas desktop (lg)
  useEffect(() => {
    const updateHeight = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        const leftEl = document.getElementById('hero-editorial-copy');
        if (leftEl) {
          const h = leftEl.offsetHeight;
          if (h > 200) {
            setTargetHeight(h);
          }
        }
      } else {
        setTargetHeight(null);
      }
    };

    updateHeight();

    const leftEl = document.getElementById('hero-editorial-copy');
    let ro: ResizeObserver | null = null;
    if (leftEl && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateHeight());
      ro.observe(leftEl);
    }

    window.addEventListener('resize', updateHeight);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateHeight);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      ro?.disconnect();
    };
  }, []);

  // Transición lenta automática entre las dos fotos (cada 5 segundos)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const toggleSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const phoneWidth = targetHeight ? Math.round(targetHeight * 0.51) : null;

  return (
    <div className="relative mx-auto flex flex-col items-center select-none">
      {/* Marco de Smartphone realista con borde Titanio Dorado */}
      <div
        className="group relative bg-[#1E2022] rounded-[38px] sm:rounded-[44px] p-2 sm:p-2.5 shadow-editorial-lg border-[3.5px] border-[#C29F68] ring-2 ring-[#8F7042]/50 transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_20px_50px_rgba(194,159,104,0.35)] flex flex-col justify-between h-[490px] sm:h-[540px] w-[255px] sm:w-[280px] lg:w-auto lg:h-auto cursor-pointer"
        style={
          targetHeight && phoneWidth
            ? {
                height: `${targetHeight}px`,
                width: `${phoneWidth}px`,
              }
            : undefined
        }
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={toggleSlide}
        role="region"
        aria-label="Carrusel de fotos de la invitación en celular"
        title="Haz clic para cambiar de foto"
      >
        {/* Dynamic Island / Cámara frontal realista */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3.5 sm:h-4 bg-black rounded-full z-30 flex items-center justify-center pointer-events-none shadow-xs">
          <div className="w-2 h-2 rounded-full bg-[#111] mr-2 ring-1 ring-white/10" />
          <div className="w-2 h-2 rounded-full bg-[#1A1A2E]" />
        </div>

        {/* Contenedor de Pantalla con efecto de transición lenta */}
        <div className="relative rounded-[28px] sm:rounded-[34px] overflow-hidden bg-[#FAF6F0] w-full h-full border border-gold/20 shadow-inner">
          {/* Capa Base: Foto 1 (Portada y Cuenta Regresiva) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={SLIDES[0].src}
              alt={SLIDES[0].alt}
              className="w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Capa Superior de Disolvencia: Foto 2 (Frase de Amor y Galería) */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out ${
              currentIndex === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={SLIDES[1].src}
              alt={SLIDES[1].alt}
              className="w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Brillo de Cristal Reflejado (Efecto Pantalla Premium) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 z-20" />

          {/* Botones sutiles de navegación lateral al hacer hover (Desktop) */}
          <div className="pointer-events-none absolute inset-y-0 inset-x-2 flex items-center justify-between z-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSlide();
              }}
              className="pointer-events-auto w-7 h-7 rounded-full bg-charcoal/60 backdrop-blur-md text-ivory-50 flex items-center justify-center hover:bg-gold-dark hover:scale-110 transition-all shadow-md"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSlide();
              }}
              className="pointer-events-auto w-7 h-7 rounded-full bg-charcoal/60 backdrop-blur-md text-ivory-50 flex items-center justify-center hover:bg-gold-dark hover:scale-110 transition-all shadow-md"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Barra indicadora inferior del sistema (Home indicator tipo iPhone) */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 bg-charcoal/30 backdrop-blur-xs rounded-full z-20" />
        </div>
      </div>

      {/* Indicadores de diapositiva (Pills interactivos) */}
      <div className="flex items-center justify-center gap-2 mt-3 mb-2">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-500 rounded-full h-1.5 focus:outline-none ${
              currentIndex === idx
                ? 'w-7 bg-gold-dark shadow-xs'
                : 'w-2 bg-charcoal/25 hover:bg-gold/60'
            }`}
            aria-label={`Ver ${slide.title}`}
            title={`Ver ${slide.title}`}
          />
        ))}
      </div>

      {/* Enlace para ver la invitación interactiva completa */}
      <div
        className="flex flex-wrap items-center justify-center w-full"
        style={phoneWidth ? { width: `${phoneWidth}px` } : undefined}
      >
        <a
          href={`/disenos/${defaultTemplate.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-charcoal hover:bg-gold-dark text-ivory-50 text-[10.5px] uppercase tracking-[0.16em] font-medium transition-all duration-300 shadow-sm group"
        >
          <ParchmentLogo className="w-3.5 h-3.5 text-gold-light group-hover:scale-110 transition-transform" />
          <span>Ver Invitación Completa</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};
