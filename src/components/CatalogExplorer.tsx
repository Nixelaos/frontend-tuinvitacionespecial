import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Music,
  MapPin,
  Clock,
  Check,
  CheckCircle2,
  CalendarHeart,
  Utensils,
  GlassWater,
  PartyPopper,
  Church,
  ArrowUpRight,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import type { InvitationTemplate, StyleCategory } from '../types/wedding';
import { INVITATION_TEMPLATES, WHATSAPP_NUMBER, BRAND_NAME } from '../data/weddingData';
import { ParchmentLogo } from './ParchmentLogo';

const CATEGORIES: StyleCategory[] = [
  'Todos',
  'Botánico & Salvia',
  'Minimalista Lujo',
  'Hacienda & Romántico',
];

export const CatalogExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<StyleCategory>('Todos');
  const [activeDemo, setActiveDemo] = useState<InvitationTemplate | null>(null);
  const [demoTab, setDemoTab] = useState<'invitacion' | 'itinerario' | 'rsvp'>('invitacion');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpGuestName, setRsvpGuestName] = useState('');
  const [rsvpPasses, setRsvpPasses] = useState('2');
  const [rsvpAllergies, setRsvpAllergies] = useState('');

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

  const getItineraryIcon = (type: 'ceremony' | 'cocktail' | 'dinner' | 'party') => {
    switch (type) {
      case 'ceremony':
        return <Church className="w-4 h-4" />;
      case 'cocktail':
        return <GlassWater className="w-4 h-4" />;
      case 'dinner':
        return <Utensils className="w-4 h-4" />;
      case 'party':
        return <PartyPopper className="w-4 h-4" />;
    }
  };

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
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

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((tpl) => {
          const couple = getDisplayCouple(tpl);
          const isFrayedArtisanal = tpl.id === 'papel-artesanal-deshilachado';

          return (
            <article
              key={tpl.id}
              className={`group relative bg-[#FCFAF7] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl border border-gold/30 p-3.5 sm:p-5 shadow-editorial hover:shadow-editorial-lg transition-all duration-500 flex flex-col justify-between ${
                isFrayedArtisanal ? 'ring-1 ring-[#5C6B47]/30' : ''
              }`}
            >
              <div>
                {/* Arch Visual Preview Header */}
                <div className="relative h-80 sm:h-96 rounded-t-[125px] sm:rounded-t-[160px] rounded-b-2xl overflow-hidden bg-champagne border border-gold/25 shadow-inner">
                  <img
                    src={tpl.coverImage}
                    alt={`Invitación de boda digital modelo ${tpl.name}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-7 left-0 right-0 flex justify-center">
                    <span className="px-3.5 py-1 bg-ivory-50/95 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.22em] text-charcoal font-semibold border border-gold/30 shadow-xs">
                      {tpl.badge || tpl.category}
                    </span>
                  </div>

                  {/* Simulated Invitation Plaque on Image */}
                  <div
                    className={`absolute bottom-4 left-4 right-4 text-center p-3.5 sm:p-4 backdrop-blur-md shadow-editorial ${
                      isFrayedArtisanal
                        ? 'deckle-card bg-[#FAF6EE]/95 border border-[#CFC2AA]'
                        : 'bg-ivory-50/95 rounded-xl border border-gold/35'
                    }`}
                  >
                    <span
                      className="text-[9px] uppercase tracking-[0.28em] font-medium block"
                      style={{ color: isFrayedArtisanal ? '#5C6B47' : '#96763E' }}
                    >
                      {tpl.coupleDemo.displayDate}
                    </span>
                    <p className="font-serif text-2xl sm:text-[26px] text-charcoal mt-0.5 font-normal">
                      {couple.bride}{' '}
                      <span
                        className="italic font-serif"
                        style={{ color: isFrayedArtisanal ? '#5C6B47' : '#96763E' }}
                      >
                        &amp;
                      </span>{' '}
                      {couple.groom}
                    </p>
                    <p className="text-[11px] text-charcoal-muted truncate mt-0.5 font-light">
                      {tpl.coupleDemo.city}
                    </p>
                  </div>
                </div>

                {/* Concise Card Content */}
                <div className="pt-5 pb-2 px-1 text-center sm:text-left">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium block">
                      {tpl.collection}
                    </span>
                    {/* Palette Swatches Preview */}
                    <div className="flex items-center gap-1" title={tpl.palette.name}>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-charcoal/20"
                        style={{ backgroundColor: tpl.palette.cardHex }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-charcoal/20"
                        style={{ backgroundColor: tpl.palette.bgHex }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-charcoal/20"
                        style={{ backgroundColor: tpl.palette.accentHex }}
                      />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-[26px] text-charcoal font-normal mt-0.5">
                    {tpl.name}
                  </h3>

                  <p className="text-sm text-charcoal-muted leading-relaxed font-light mt-2">
                    {tpl.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions: Conciso y Directo */}
              <div className="pt-4 pb-1">
                <a
                  href={`/disenos/${tpl.slug}`}
                  className="w-full py-3.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-sm rounded-lg"
                >
                  <ParchmentLogo className="w-4 h-4 text-gold-light" />
                  <span>Abrir Invitación Completa</span>
                  <ArrowUpRight className="w-4 h-4 opacity-75" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* LIVE INTERACTIVE DEMO MODAL */}
      {activeDemo && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista previa interactiva de ${activeDemo.name}`}
        >
          <div className="relative w-full max-w-4xl bg-ivory-50 border border-gold/40 shadow-editorial-lg overflow-hidden my-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-charcoal text-ivory-50">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-gold text-ivory-50 text-[10px] uppercase tracking-widest">
                  Simulador Interactivo
                </span>
                <h4 className="font-serif text-xl">
                  Modelo: {activeDemo.name} ({activeDemo.collection})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveDemo(null)}
                className="p-1.5 text-ivory-200 hover:text-white transition"
                aria-label="Cerrar vista previa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Simulated Mobile Invitation Screen */}
              <div
                className="lg:col-span-7 p-5 sm:p-7 max-h-[78vh] overflow-y-auto"
                style={{ backgroundColor: activeDemo.palette.bgHex }}
              >
                {/* Internal Demo Navigation Tabs */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[
                    { id: 'invitacion', label: '1. Portada y Música' },
                    { id: 'itinerario', label: '2. Itinerario y Dress Code' },
                    { id: 'rsvp', label: '3. Confirmar RSVP' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDemoTab(tab.id as 'invitacion' | 'itinerario' | 'rsvp')}
                      className={`px-3.5 py-2 text-[11px] uppercase tracking-wider transition ${
                        demoTab === tab.id
                          ? 'bg-charcoal text-ivory-50 font-medium'
                          : 'bg-ivory-50 text-charcoal border border-ivory-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {demoTab === 'invitacion' && (
                  <div className="space-y-5 text-center">
                    <div className="relative h-64 overflow-hidden border border-gold/30">
                      <img
                        src={activeDemo.coverImage}
                        alt={activeDemo.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                      <div className="absolute bottom-4 inset-x-4 text-ivory-50">
                        <span className="text-[10px] uppercase tracking-[0.3em] block text-champagne">
                          Nuestra Boda
                        </span>
                        <h3 className="font-serif text-4xl mt-1">
                          {getDisplayCouple(activeDemo).bride}{' '}
                          <span className="italic text-gold-light">&amp;</span>{' '}
                          {getDisplayCouple(activeDemo).groom}
                        </h3>
                        <p className="text-xs tracking-widest uppercase mt-1 text-ivory-200">
                          {activeDemo.coupleDemo.displayDate}
                        </p>
                      </div>
                    </div>

                    {/* Quote & Music Bar */}
                    <div
                      className="p-4 border border-gold/25"
                      style={{ backgroundColor: activeDemo.palette.cardHex }}
                    >
                      <p className="font-serif italic text-lg text-charcoal">
                        {activeDemo.coupleDemo.quote}
                      </p>
                      <div className="mt-3 pt-3 border-t border-charcoal/10 flex items-center justify-center gap-2 text-xs text-charcoal-muted">
                        <Music className="w-3.5 h-3.5 text-gold-dark animate-bounce" />
                        <span>
                          Canción de fondo: <strong>{activeDemo.coupleDemo.songTitle}</strong> —{' '}
                          {activeDemo.coupleDemo.songArtist}
                        </span>
                      </div>
                    </div>

                    {/* Locations Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <div className="p-4 bg-ivory-50 border border-ivory-300">
                        <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                          Ceremonia · {activeDemo.coupleDemo.ceremonyTime}
                        </span>
                        <p className="font-serif text-lg font-medium text-charcoal mt-0.5">
                          {activeDemo.coupleDemo.ceremonyVenue}
                        </p>
                        <p className="text-xs text-charcoal-muted mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sage" />
                          {activeDemo.coupleDemo.city}
                        </p>
                      </div>
                      <div className="p-4 bg-ivory-50 border border-ivory-300">
                        <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                          Recepción · {activeDemo.coupleDemo.receptionTime}
                        </span>
                        <p className="font-serif text-lg font-medium text-charcoal mt-0.5">
                          {activeDemo.coupleDemo.receptionVenue}
                        </p>
                        <p className="text-xs text-charcoal-muted mt-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-sage" />
                          Dress Code: {activeDemo.coupleDemo.dressCode.split('·')[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {demoTab === 'itinerario' && (
                  <div className="space-y-5">
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark">
                        Cronograma del Gran Día
                      </span>
                      <h4 className="font-serif text-2xl text-charcoal mt-1">
                        Itinerario de Celebración
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {activeDemo.itinerary.map((item) => (
                        <div
                          key={item.time}
                          className="flex items-center gap-4 p-3.5 bg-ivory-50 border border-ivory-300"
                        >
                          <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-gold-dark shrink-0">
                            {getItineraryIcon(item.iconType)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-serif text-lg font-medium text-charcoal">
                                {item.title}
                              </p>
                              <span className="text-xs font-medium text-gold-dark">
                                {item.time}
                              </span>
                            </div>
                            <p className="text-xs text-charcoal-muted">{item.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dress Code & Recomendaciones */}
                    <div className="p-4 bg-ivory-50 border border-gold/30 text-center space-y-2">
                      <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-dark font-medium">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Código de Vestimenta · Rigurosa Etiqueta</span>
                      </div>
                      <p className="text-xs text-charcoal-muted leading-relaxed">
                        Mujeres: Vestido largo de gala. Varones: Traje formal oscuro o esmoquin.
                        Reserva exclusiva del blanco y marfil para la novia.
                      </p>
                    </div>
                  </div>
                )}

                {demoTab === 'rsvp' && (
                  <div className="p-5 bg-ivory-50 border border-gold/30 space-y-4">
                    <div className="text-center">
                      <CalendarHeart className="w-7 h-7 text-gold-dark mx-auto mb-1" />
                      <h4 className="font-serif text-2xl text-charcoal">
                        Confirmación de Asistencia
                      </h4>
                      <p className="text-xs text-charcoal-muted">
                        Prueba cómo confirmarán tus invitados en segundos:
                      </p>
                    </div>

                    {!rsvpSubmitted ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setRsvpSubmitted(true);
                        }}
                        className="space-y-3"
                      >
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1">
                            Nombre completo o Familia
                          </label>
                          <input
                            type="text"
                            required
                            value={rsvpGuestName}
                            onChange={(e) => setRsvpGuestName(e.target.value)}
                            placeholder="Ej. Familia Hernández Torres"
                            className="w-full px-3.5 py-2 bg-ivory-100 border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1">
                              Personas confirmadas
                            </label>
                            <select
                              value={rsvpPasses}
                              onChange={(e) => setRsvpPasses(e.target.value)}
                              className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                            >
                              <option value="1">1 Adulto</option>
                              <option value="2">2 Adultos</option>
                              <option value="3">3 Adultos</option>
                              <option value="4">4 Adultos</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1">
                              Restricción alimentaria
                            </label>
                            <input
                              type="text"
                              value={rsvpAllergies}
                              onChange={(e) => setRsvpAllergies(e.target.value)}
                              placeholder="Ej. Menú vegetariano / Ninguna"
                              className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.2em] transition"
                        >
                          Confirmar Asistencia (Simulación)
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-6 space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-sage mx-auto" />
                        <h5 className="font-serif text-2xl text-charcoal">
                          ¡Gracias por confirmar, {rsvpGuestName || 'Familia Invitada'}!
                        </h5>
                        <p className="text-xs text-charcoal-muted max-w-md mx-auto">
                          Se han registrado <strong>{rsvpPasses} pases</strong> para la boda de{' '}
                          {getDisplayCouple(activeDemo).bride} &amp;{' '}
                          {getDisplayCouple(activeDemo).groom}.
                        </p>
                        <button
                          type="button"
                          onClick={() => setRsvpSubmitted(false)}
                          className="text-xs underline text-gold-dark uppercase tracking-widest pt-2"
                        >
                          Realizar otra prueba
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Template Specs & Direct Order */}
              <div className="lg:col-span-5 p-6 sm:p-7 bg-ivory-100 border-t lg:border-t-0 lg:border-l border-ivory-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-semibold">
                      {activeDemo.collection}
                    </span>
                    <h3 className="font-serif text-3xl text-charcoal mt-0.5">
                      Diseño «{activeDemo.name}»
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-champagne border border-gold/40 text-xs font-medium text-gold-dark">
                        <ParchmentLogo className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Próximamente en CLP ($)</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal-muted leading-relaxed">
                    {activeDemo.description}
                  </p>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-charcoal font-semibold mb-2.5">
                      Qué incluye esta plantilla:
                    </p>
                    <ul className="space-y-2">
                      {activeDemo.includedFeatures.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-charcoal-light flex items-start gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 space-y-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `¡Hola! Acabo de probar la demo interactiva del diseño "${activeDemo.name}" y quiero reservarlo para nuestra boda.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
                    <span>Apartar este Diseño por WhatsApp</span>
                  </a>
                  <a
                    href={`/disenos/${activeDemo.slug}`}
                    className="w-full py-2.5 border border-charcoal/25 hover:border-charcoal text-charcoal text-xs uppercase tracking-[0.16em] text-center flex items-center justify-center gap-2 transition"
                  >
                    <ParchmentLogo className="w-3.5 h-3.5 text-gold-dark" />
                    <span>Abrir Página Completa del Diseño</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
