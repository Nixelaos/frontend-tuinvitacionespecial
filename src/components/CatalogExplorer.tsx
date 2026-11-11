import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { InvitationTemplate } from '../types/wedding';
import { INVITATION_TEMPLATES } from '../data/catalogData';
import { ParchmentLogo } from './ParchmentLogo';

export const CatalogExplorer: React.FC = () => {
  const getDisplayCouple = (tpl: InvitationTemplate) => {
    const bride = tpl.coupleDemo.bride;
    const groom = tpl.coupleDemo.groom;
    const initials = `${bride.charAt(0).toUpperCase()} & ${groom.charAt(0).toUpperCase()}`;
    return { bride, groom, initials };
  };

  return (
    <div className="flex justify-center">
      {/* Templates Container - Centrado */}
      <div className="flex flex-wrap justify-center gap-8 lg:gap-10 max-w-5xl w-full">
        {INVITATION_TEMPLATES.map((tpl, idx) => {
          const couple = getDisplayCouple(tpl);
          const staggerDelay = `${(idx * 0.1).toFixed(2)}s`;

          return (
            <a
              key={tpl.id}
              href={`/disenos/${tpl.slug}`}
              style={{ '--reveal-delay': staggerDelay } as React.CSSProperties}
              className="scroll-reveal group flex flex-col items-center w-full max-w-[215px] sm:max-w-[225px] cursor-pointer no-underline text-inherit"
              aria-label={`Ver invitación de ${tpl.name}`}
            >
              {/* Marco de Previsualización de la Invitación (La Invi) */}
              <div className="relative w-full h-[370px] sm:h-[390px] rounded-[26px] overflow-hidden shadow-editorial border-[2.5px] border-[#C29F68] ring-1 ring-[#8F7042]/40 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#D4AF37] group-hover:shadow-[0_14px_34px_rgba(194,159,104,0.35)]">
                {/* Foto Principal de Portada */}
                <img
                  src={tpl.coverImage}
                  alt={`Invitación de boda digital modelo ${tpl.name}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/10" />

                {/* Plaqueta Inferior Simulada sobre la Foto */}
                <div className="absolute bottom-3 left-2.5 right-2.5 text-center p-2.5 backdrop-blur-md shadow-editorial z-10 bg-ivory-50/95 rounded-lg border border-gold/35">
                  <span className="text-[9px] uppercase tracking-[0.22em] font-semibold block text-gold-dark">
                    {tpl.coupleDemo.displayDate}
                  </span>
                  <p className="font-serif text-base sm:text-lg text-charcoal mt-0.5 font-medium leading-snug">
                    {couple.bride}{' '}
                    <span className="italic font-serif text-gold-dark font-medium">
                      &amp;
                    </span>{' '}
                    {couple.groom}
                  </p>
                  <p className="text-[10px] text-charcoal truncate mt-0.5 font-normal">
                    {tpl.coupleDemo.city}
                  </p>
                </div>
              </div>

              {/* Título: Del mismo ancho que la invitación, altura fija para alineación perfecta */}
              <div className="w-full h-[52px] sm:h-[56px] mt-3.5 mb-2.5 flex items-center justify-center text-center px-0.5">
                <h3 className="font-serif text-lg sm:text-[19px] text-charcoal group-hover:text-gold-dark transition-colors font-medium leading-tight line-clamp-2">
                  {tpl.name}
                </h3>
              </div>

              {/* Botón Ver Invitación: Exactamente del mismo ancho que la invitación */}
              <div
                className="w-full py-2.5 bg-charcoal group-hover:bg-gold-dark text-ivory-50 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm rounded-lg group-hover:shadow-md"
              >
                <ParchmentLogo className="w-3.5 h-3.5" />
                <span>Ver Invitación</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
