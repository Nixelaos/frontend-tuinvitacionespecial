import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-ivory-300 border-t border-b border-ivory-300">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-5">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-start justify-between gap-4 text-left focus:outline-none group"
              aria-expanded={isOpen}
            >
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-semibold block mb-1">
                  {item.category}
                </span>
                <span className="font-serif text-xl sm:text-2xl text-charcoal font-semibold group-hover:text-gold-dark transition-colors tracking-tight">
                  {item.question}
                </span>
              </div>
              <span className="w-8 h-8 rounded-full border border-ivory-300 bg-white flex items-center justify-center text-charcoal shrink-0 mt-1 group-hover:border-gold transition shadow-2xs">
                {isOpen ? (
                  <Minus className="w-4 h-4 text-gold-dark" />
                ) : (
                  <Plus className="w-4 h-4 text-charcoal" />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="mt-3.5 pr-10 text-sm sm:text-base text-charcoal-light leading-relaxed font-normal space-y-3">
                <p>{item.answer}</p>
                {item.linkHref && (
                  <div className="pt-1">
                    <a
                      href={item.linkHref}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.16em] font-semibold transition shadow-xs"
                    >
                      <span>{item.linkText || 'Ver más información'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
