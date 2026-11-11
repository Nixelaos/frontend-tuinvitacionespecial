import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { WHATSAPP_NUMBER, BRAND_NAME } from '../data/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola ${BRAND_NAME}! Estoy viendo su página web y me gustaría cotizar una invitación digital para mi boda.`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp (+56 9 5078 1737)"
      className="fixed bottom-6 right-6 z-40 group flex items-center justify-center w-14 h-14 bg-charcoal hover:bg-gold-dark text-ivory-50 rounded-full shadow-editorial-lg border border-gold/40 transition-all duration-300 hover:scale-110 focus:outline-none"
    >
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#34D399] border-2 border-charcoal" />
      </span>
      <FaWhatsapp className="w-6 h-6 text-[#A7D7B8] group-hover:text-ivory-50 transition-colors" />
    </a>
  );
};
