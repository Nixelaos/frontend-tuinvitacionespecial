import React from 'react';
import { Heart, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaPinterestP, FaTiktok } from 'react-icons/fa6';
import { BRAND_NAME, WHATSAPP_NUMBER } from '../data/siteConfig';
import { INVITATION_TEMPLATES } from '../data/catalogData';
import { ParchmentLogo } from './ParchmentLogo';

export const Footer: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola ${BRAND_NAME}! Me gustaría recibir asesoría sobre sus invitaciones de boda digitales.`
  )}`;

  return (
    <footer className="bg-charcoal text-ivory-100 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-ivory-200/15">
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 bg-ivory-50/10 flex items-center justify-center overflow-hidden">
                <ParchmentLogo className="w-7 h-7" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-2xl tracking-normal text-ivory-50 block leading-snug font-medium whitespace-nowrap">
                  {BRAND_NAME}
                </span>
              </div>
            </div>

            <p className="text-sm text-ivory-100/90 leading-relaxed max-w-sm">
              Diseñamos invitaciones web interactivas para parejas que cuidan cada detalle.
              Estética editorial, confirmación directa y fácil a WhatsApp y atención artesanal
              para bodas a lo largo de todo Chile.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-ivory-200/30 flex items-center justify-center text-ivory-100 hover:border-gold-light hover:text-gold-light transition"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="#catalogo"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-ivory-200/30 flex items-center justify-center text-ivory-100 hover:border-gold-light hover:text-gold-light transition"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#catalogo"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full border border-ivory-200/30 flex items-center justify-center text-ivory-100 hover:border-gold-light hover:text-gold-light transition"
              >
                <FaPinterestP className="w-4 h-4" />
              </a>
              <a
                href="#catalogo"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-ivory-200/30 flex items-center justify-center text-ivory-100 hover:border-gold-light hover:text-gold-light transition"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Colecciones SSG */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-gold-light font-semibold">
              Diseños de Colección
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-100/90">
              {INVITATION_TEMPLATES.map((tpl) => (
                <li key={tpl.id}>
                  <a
                    href={`/disenos/${tpl.slug}`}
                    className="hover:text-gold-light transition flex items-center gap-1.5"
                  >
                    <span>Modelo {tpl.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-75" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-gold-light font-semibold">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-100/90">
              <li>
                <a href="/#catalogo" className="hover:text-gold-light transition">
                  Catálogo de Diseños
                </a>
              </li>
              <li>
                <a href="/#funciones" className="hover:text-gold-light transition">
                  Funciones Interactivas
                </a>
              </li>
              <li>
                <a href="/#preguntas" className="hover:text-gold-light transition">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Atención al Cliente */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-gold-light font-semibold">
              Atención &amp; Atelier
            </h4>
            <ul className="space-y-3 text-xs text-ivory-100/90">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
                <span>Lunes a Sábado · 9:00 a 20:00 hrs (Atención personalizada por WhatsApp)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
                <span>contacto@tuinvitacionespecial.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-light shrink-0 mt-0.5" />
                <span>Estudio Digital · Santiago, Chile · Atención a todo el país</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-200/80">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Creado con</span>
            <Heart className="w-3.5 h-3.5 text-gold-light" />
            <span>para historias de amor inolvidables.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
