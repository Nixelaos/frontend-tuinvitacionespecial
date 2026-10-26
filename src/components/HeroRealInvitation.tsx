import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INVITATION_TEMPLATES } from '../data/weddingData';
import type { InvitationTemplate } from '../types/wedding';
import { ParchmentLogo } from './ParchmentLogo';

export const HeroRealInvitation: React.FC = () => {
  // Última invitación creada en el catálogo (Papel Artesanal & Bordes Deshilachados)
  const defaultTemplate: InvitationTemplate =
    INVITATION_TEMPLATES.find((t) => t.slug === 'papel-artesanal-deshilachado') ||
    INVITATION_TEMPLATES[0];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Limpiar cualquier plantilla previamente guardada en localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selected_wedding_hero_template');
    }
  }, []);

  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* Realistic Smartphone Mockup Frame (Default 400 x 824 proportion) */}
      <div className="relative w-full max-w-[420px] bg-[#1E2022] rounded-[52px] p-2.5 sm:p-3 shadow-editorial-lg border-4 border-[#3D3F43]">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A2E]" />
        </div>

        {/* Screen Display Container (400 x 824) */}
        <div className="relative rounded-[40px] overflow-hidden bg-ivory-100 w-full max-w-[400px] h-[680px] sm:h-[824px] border border-gold/20 shadow-inner">
          <iframe
            key={defaultTemplate.slug}
            src={`/disenos/${defaultTemplate.slug}?hero=true`}
            title={`Invitación Real de ${defaultTemplate.coupleDemo.bride} & ${defaultTemplate.coupleDemo.groom}`}
            className={`w-full h-full border-0 transition-opacity duration-300 ${
              isLoading ? 'opacity-40' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            loading="eager"
          />

          {/* Bottom subtle gradient hint */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-charcoal/30 to-transparent" />
        </div>
      </div>

      {/* Action Links Below Smartphone */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`/disenos/${defaultTemplate.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition shadow-sm group"
        >
          <ParchmentLogo className="w-4 h-4 text-gold-light group-hover:scale-110 transition-transform" />
          <span>Abrir a Pantalla Completa</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>
    </div>
  );
};
