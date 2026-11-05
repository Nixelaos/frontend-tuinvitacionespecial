import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { InvitationTemplate, StyleCategory } from '../types/wedding';
import { INVITATION_TEMPLATES } from '../data/weddingData';
import { ParchmentLogo } from './ParchmentLogo';

const CATEGORIES: StyleCategory[] = [
  'Todos',
  'Editorial Clásico',
  'Botánico & Salvia',
  'Minimalista Lujo',
  'Hacienda & Romántico',
];

export const CatalogExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<StyleCategory>('Todos');
  const [hasSwitchedCategory, setHasSwitchedCategory] = useState(false);

  const handleSelectCategory = (category: StyleCategory) => {
    if (category === selectedCategory) return;
    setHasSwitchedCategory(true);
    setSelectedCategory(category);
  };

  const filteredTemplates =
    selectedCategory === 'Todos'
      ? INVITATION_TEMPLATES
      : INVITATION_TEMPLATES.filter((t) => t.category === selectedCategory);

  const getDisplayCouple = (tpl: InvitationTemplate) => {
    const bride = tpl.coupleDemo.bride;
    const groom = tpl.coupleDemo.groom;
    const initials = `${bride.charAt(0).toUpperCase()} & ${groom.charAt(0).toUpperCase()}`;
    return { bride, groom, initials };
  };

  return (
    <div>
      {/* Category Filter Tabs */}
      <div
        className="scroll-reveal flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
        style={{ '--reveal-delay': '0.12s' } as React.CSSProperties}
      >
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleSelectCategory(category)}
              className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                active
                  ? 'bg-charcoal text-ivory-50 shadow-sm'
                  : 'bg-ivory-50 text-charcoal-light border border-ivory-300 hover:border-gold/60'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Templates Grid - Sin contenedor crema, flotando directamente en la página */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center max-w-5xl mx-auto">
        {filteredTemplates.map((tpl, idx) => {
          const couple = getDisplayCouple(tpl);
          const staggerDelay = `${(idx * 0.1).toFixed(2)}s`;

          return (
            <a
              key={hasSwitchedCategory ? `${selectedCategory}-${tpl.id}` : tpl.id}
              href={`/disenos/${tpl.slug}`}
              style={{ '--reveal-delay': staggerDelay } as React.CSSProperties}
              className={`${
                hasSwitchedCategory ? 'reveal-delicate' : 'scroll-reveal'
              } group flex flex-col items-center w-full max-w-[215px] sm:max-w-[225px] cursor-pointer block no-underline text-inherit`}
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
                  <span className="text-[8px] uppercase tracking-[0.22em] font-medium block text-gold-dark">
                    {tpl.coupleDemo.displayDate}
                  </span>
                  <p className="font-serif text-base sm:text-lg text-charcoal mt-0.5 font-normal leading-snug">
                    {couple.bride}{' '}
                    <span className="italic font-serif text-gold-dark">
                      &amp;
                    </span>{' '}
                    {couple.groom}
                  </p>
                  <p className="text-[9px] text-charcoal-muted truncate mt-0.5 font-light">
                    {tpl.coupleDemo.city}
                  </p>
                </div>
              </div>

              {/* Título: Del mismo ancho que la invitación, altura fija para alineación perfecta */}
              <div className="w-full h-[52px] sm:h-[56px] mt-3.5 mb-2.5 flex items-center justify-center text-center px-0.5">
                <h3 className="font-serif text-lg sm:text-[19px] text-charcoal group-hover:text-gold-dark transition-colors font-normal leading-tight line-clamp-2">
                  {tpl.name}
                </h3>
              </div>

              {/* Botón Ver Invitación: Exactamente del mismo ancho que la invitación */}
              <div
                className="w-full py-2.5 bg-charcoal group-hover:bg-gold-dark text-ivory-50 text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm rounded-lg group-hover:shadow-md"
              >
                <ParchmentLogo className="w-3.5 h-3.5 text-gold-light" />
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
