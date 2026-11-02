import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INVITATION_TEMPLATES } from '../data/weddingData';
import type { InvitationTemplate } from '../types/wedding';
import { ParchmentLogo } from './ParchmentLogo';

export const HeroRealInvitation: React.FC = () => {
  // Invitación destacada del hero (Playa & Efecto Supernova)
  const defaultTemplate: InvitationTemplate =
    INVITATION_TEMPLATES.find((t) => t.slug === 'invitacion-playa-supernova') ||
    INVITATION_TEMPLATES[0];

  const [isLoading, setIsLoading] = useState(false);
  const [targetHeight, setTargetHeight] = useState<number | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [screenDim, setScreenDim] = useState<{ w: number; h: number }>({ w: 200, h: 360 });

  useEffect(() => {
    // Limpiar cualquier plantilla previamente guardada en localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selected_wedding_hero_template');
    }

    const updateHeight = () => {
      // Match Tailwind lg breakpoint (1024px)
      if (window.matchMedia('(min-width: 1024px)').matches) {
        const leftEl = document.getElementById('hero-editorial-copy');
        if (leftEl) {
          const h = leftEl.offsetHeight;
          if (h > 150) {
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

  // Update screen container dimensions for crisp iframe scaling
  useEffect(() => {
    if (!screenRef.current) return;
    const updateDim = () => {
      if (screenRef.current) {
        const rect = screenRef.current.getBoundingClientRect();
        if (rect.width > 50 && rect.height > 50) {
          setScreenDim({ w: Math.round(rect.width), h: Math.round(rect.height) });
        }
      }
    };
    updateDim();
    const ro = new ResizeObserver(updateDim);
    ro.observe(screenRef.current);
    return () => ro.disconnect();
  }, [targetHeight]);

  // Target base mobile viewport width for the invitation
  const baseViewportWidth = 360;
  const scale = screenDim.w / baseViewportWidth;
  const iframeHeight = Math.round(screenDim.h / scale);
  const phoneWidth = targetHeight ? Math.round(targetHeight * 0.485) : null;

  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* Realistic Smartphone Mockup Frame with High-Contrast Titanium Gold Rim */}
      <div
        className="relative bg-[#1E2022] rounded-[38px] sm:rounded-[44px] p-2 sm:p-2.5 shadow-editorial-lg border-[3.5px] border-[#C29F68] ring-2 ring-[#8F7042]/50 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_16px_40px_rgba(194,159,104,0.3)] flex flex-col justify-between h-[480px] sm:h-[520px] max-w-[250px] sm:max-w-[270px] lg:max-w-none"
        style={
          targetHeight && phoneWidth
            ? {
                height: `${targetHeight}px`,
                width: `${phoneWidth}px`,
              }
            : undefined
        }
      >
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-18 sm:w-20 h-3.5 sm:h-4 bg-black rounded-full z-30 flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#111] mr-2" />
          <div className="w-2 h-2 rounded-full bg-[#1A1A2E]" />
        </div>

        {/* Screen Display Container */}
        <div
          ref={screenRef}
          className="relative rounded-[28px] sm:rounded-[34px] overflow-hidden bg-ivory-100 w-full h-full border border-gold/20 shadow-inner"
        >
          <iframe
            key={defaultTemplate.slug}
            src={`/disenos/${defaultTemplate.slug}?hero=true`}
            title={`Invitación Real de ${defaultTemplate.coupleDemo.bride} & ${defaultTemplate.coupleDemo.groom}`}
            style={{
              width: `${baseViewportWidth}px`,
              height: `${iframeHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            className={`border-0 transition-opacity duration-300 ${
              isLoading ? 'opacity-40' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            loading="eager"
          />

          {/* Bottom subtle gradient hint */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-charcoal/30 to-transparent" />
        </div>
      </div>

      {/* Action Links Below Smartphone */}
      <div
        className="mt-3 flex flex-wrap items-center justify-center"
        style={phoneWidth ? { width: `${phoneWidth}px` } : undefined}
      >
        <a
          href={`/disenos/${defaultTemplate.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-charcoal hover:bg-gold-dark text-ivory-50 text-[10.5px] uppercase tracking-[0.14em] font-medium transition shadow-sm group"
        >
          <ParchmentLogo className="w-3.5 h-3.5 text-gold-light group-hover:scale-110 transition-transform" />
          <span>Ver Pantalla Completa</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>
    </div>
  );
};
