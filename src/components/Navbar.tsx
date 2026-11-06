import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { BRAND_NAME, WHATSAPP_NUMBER } from '../data/weddingData';
import { ParchmentLogo } from './ParchmentLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Catálogo', href: '/#catalogo' },
    { label: 'Funciones', href: '/#funciones' },
    { label: 'Preguntas Frecuentes', href: '/#preguntas' },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola! Me gustaría recibir información sobre las invitaciones digitales de boda de ${BRAND_NAME}.`
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 reveal-navbar transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory-50/95 backdrop-blur-md border-b border-ivory-300/80 py-3.5 shadow-sm'
          : 'bg-ivory-100/70 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="/"
            className="group flex items-center gap-3 shrink-0 focus:outline-none"
            aria-label={BRAND_NAME}
          >
            <div className="w-10 h-10 rounded-full border border-gold/40 bg-champagne/60 flex items-center justify-center group-hover:border-gold group-hover:bg-champagne/80 transition-colors duration-300 shrink-0 overflow-hidden">
              <ParchmentLogo className="w-7 h-7 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-xl sm:text-[23px] tracking-normal text-charcoal leading-snug font-medium whitespace-nowrap">
                {BRAND_NAME}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7 2xl:gap-8 shrink-0" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal-light hover:text-gold-dark transition-colors tracking-wide font-normal whitespace-nowrap py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <a
              href="/#catalogo"
              className="hidden 2xl:flex text-xs uppercase tracking-[0.16em] text-charcoal px-3.5 py-2.5 border border-charcoal/20 hover:border-gold hover:bg-champagne/40 transition-all items-center gap-1.5 whitespace-nowrap"
            >
              <ParchmentLogo className="w-3.5 h-3.5" />
              <span>Ver Diseños</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.16em] px-4 sm:px-5 py-2.5 transition-all duration-300 flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
              <span>Asesoría en WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 text-charcoal hover:text-gold-dark border border-ivory-300 bg-ivory-50/80 focus:outline-none shrink-0"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-ivory-50 border-b border-ivory-300 px-6 pt-4 pb-6 space-y-4 shadow-editorial">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-xl text-charcoal hover:text-gold-dark py-1.5 border-b border-ivory-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href="/#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center py-3 border border-charcoal/25 text-center text-xs uppercase tracking-[0.18em] text-charcoal flex items-center gap-2"
            >
              <ParchmentLogo className="w-4 h-4" />
              <span>Explorar Catálogo</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center py-3 bg-charcoal text-ivory-50 text-center text-xs uppercase tracking-[0.18em] flex items-center gap-2"
            >
              <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
