import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Music,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  CheckCircle2,
  Heart,
  RotateCcw,
  Clock,
} from 'lucide-react';

export const HeroDemoPhone: React.FC = () => {
  const [envelopeOpened, setEnvelopeOpened] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [secondsLeft, setSecondsLeft] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto max-w-[360px] sm:max-w-[385px]">
      {/* Decorative Editorial Floating Badges */}
      <div className="hidden sm:flex absolute -left-14 top-12 z-20 bg-ivory-50/95 backdrop-blur-md border border-gold/30 shadow-editorial px-4 py-3 items-center gap-3 animate-float-slow">
        <div className="w-9 h-9 rounded-full bg-sage-light flex items-center justify-center text-sage-dark">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-charcoal-muted">Nuevo RSVP Recibido</p>
          <p className="font-serif text-base font-medium text-charcoal">
            Familia Montenegro · 4 Pases
          </p>
        </div>
      </div>

      <div className="hidden sm:flex absolute -right-10 bottom-20 z-20 bg-ivory-50/95 backdrop-blur-md border border-gold/30 shadow-editorial px-4 py-3 items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center text-gold-dark">
          <Music className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-charcoal-muted">
            Audio Integrado
          </p>
          <p className="font-serif text-sm font-medium text-charcoal">
            {musicPlaying ? 'Reproduciendo Cuerdas...' : 'Música en Pausa'}
          </p>
        </div>
      </div>

      {/* Smartphone Mockup Outer Frame */}
      <div className="relative rounded-[44px] bg-charcoal p-3 shadow-editorial-lg border-4 border-[#C29F68] ring-2 ring-[#8F7042]/50">
        {/* Top Speaker Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-charcoal rounded-full z-30 flex items-center justify-center">
          <div className="w-8 h-1 rounded-full bg-charcoal-light/70" />
        </div>

        {/* Phone Screen */}
        <div className="relative rounded-[34px] overflow-hidden bg-ivory-100 min-h-[610px] flex flex-col justify-between border border-gold/20">
          {!envelopeOpened ? (
            /* CLOSED WAX SEAL ENVELOPE VIEW */
            <div className="flex-1 flex flex-col items-center justify-between p-7 text-center bg-gradient-to-b from-champagne-light via-ivory-100 to-champagne relative">
              <div className="pt-8">
                <span className="text-[10px] uppercase tracking-[0.28em] text-charcoal-muted block mb-2">
                  Pase Personalizado Exclusivo
                </span>
                <p className="font-serif italic text-lg text-charcoal-light">
                  Para: Familia De la Mora
                </p>
                <span className="inline-block mt-1 px-3 py-0.5 bg-ivory-50/80 border border-gold/30 text-[10px] uppercase tracking-widest text-gold-dark">
                  4 Lugares Reservados
                </span>
              </div>

              {/* Envelope Flap & Wax Seal */}
              <div className="my-auto py-8 flex flex-col items-center">
                <div className="w-56 h-40 relative bg-ivory-50 border border-gold/30 shadow-editorial flex items-center justify-center">
                  <div className="absolute inset-2 border border-gold/15 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setEnvelopeOpened(true)}
                    className="group relative w-20 h-20 rounded-full bg-gradient-to-br from-[#C5A059] via-[#A37E3B] to-[#7D5D25] shadow-gold flex flex-col items-center justify-center text-ivory-50 border-2 border-[#E3C88E]/60 transition-transform duration-300 hover:scale-105 active:scale-95"
                    aria-label="Abrir sobre de invitación"
                  >
                    <span className="font-serif text-xl tracking-widest font-semibold">V&S</span>
                    <Sparkles className="w-3 h-3 mt-0.5 opacity-80" />
                  </button>
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gold-dark font-medium animate-pulse-subtle">
                  Toca el sello de lacre para abrir
                </p>
              </div>

              <div className="pb-2 text-[11px] text-charcoal-muted font-serif italic">
                Valentina & Sebastián · 24.04.2027
              </div>
            </div>
          ) : (
            /* OPENED LIVE INTERACTIVE INVITATION VIEW */
            <div className="flex-1 flex flex-col justify-between">
              {/* Hero Photo Header Inside Phone */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Valentina y Sebastián"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />

                {/* Top Floating Controls inside Phone */}
                <div className="absolute top-7 left-4 right-4 flex items-center justify-between z-20">
                  <button
                    type="button"
                    onClick={() => setEnvelopeOpened(false)}
                    className="px-2.5 py-1 rounded-full bg-ivory-50/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-charcoal flex items-center gap-1 hover:bg-ivory-50 transition"
                    title="Ver sobre cerrado"
                  >
                    <RotateCcw className="w-3 h-3 text-gold-dark" />
                    <span>Ver Sobre</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMusicPlaying(!musicPlaying)}
                    className="w-8 h-8 rounded-full bg-ivory-50/90 backdrop-blur-sm text-charcoal flex items-center justify-center hover:bg-gold hover:text-ivory-50 transition"
                    aria-label="Alternar música"
                  >
                    {musicPlaying ? (
                      <Volume2 className="w-3.5 h-3.5 text-gold-dark" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-charcoal-muted" />
                    )}
                  </button>
                </div>

                {/* Couple Names Overlay */}
                <div className="absolute bottom-3 left-4 right-4 text-center text-ivory-50">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-champagne mb-0.5">
                    ¡Nos Casamos!
                  </p>
                  <h3 className="font-serif text-3xl tracking-wide font-normal">
                    Valentina <span className="italic text-gold-light">&</span> Sebastián
                  </h3>
                </div>
              </div>

              {/* Invitation Body Inside Phone */}
              <div className="p-4 space-y-3.5 bg-ivory-100 flex-1 flex flex-col justify-between">
                {/* Date & Live Countdown */}
                <div className="text-center bg-ivory-50 border border-ivory-300 p-3">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-dark mb-2">
                    <Clock className="w-3 h-3" />
                    <span>24 de Abril · San Miguel de Allende</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    {[
                      { val: '185', label: 'Días' },
                      { val: '14', label: 'Hrs' },
                      { val: '28', label: 'Min' },
                      { val: String(secondsLeft).padStart(2, '0'), label: 'Seg' },
                    ].map((item) => (
                      <div key={item.label} className="bg-champagne/50 py-1.5 px-1">
                        <div className="font-serif text-lg font-semibold text-charcoal leading-none">
                          {item.val}
                        </div>
                        <div className="text-[9px] uppercase tracking-wider text-charcoal-muted mt-0.5">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Venue Card */}
                <div className="bg-ivory-50 border border-ivory-300 p-3 flex items-center justify-between">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-charcoal">
                        Hacienda San José Lavista
                      </p>
                      <p className="text-[11px] text-charcoal-muted">
                        Ceremonia 17:00 hrs · Recepción 19:30 hrs
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-sage-light text-sage-dark font-medium">
                    GPS
                  </span>
                </div>

                {/* Interactive Mini RSVP Inside Phone */}
                <div className="bg-champagne/60 border border-gold/30 p-3.5">
                  {!rsvpConfirmed ? (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal font-medium">
                          Confirmación RSVP
                        </span>
                        <span className="text-[10px] text-gold-dark font-medium">
                          Fam. De la Mora
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-charcoal-muted">Pases a confirmar:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setSelectedGuests(num)}
                              className={`w-6 h-6 text-xs font-medium transition ${
                                selectedGuests === num
                                  ? 'bg-charcoal text-ivory-50'
                                  : 'bg-ivory-50 text-charcoal border border-ivory-300'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRsvpConfirmed(true)}
                        className="w-full py-2 bg-charcoal hover:bg-gold-dark text-ivory-50 text-[11px] uppercase tracking-[0.18em] transition flex items-center justify-center gap-1.5"
                      >
                        <Heart className="w-3 h-3 text-gold-light" />
                        <span>Confirmar {selectedGuests} Asistentes</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2 space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 text-sage-dark text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>¡Asistencia Confirmada ({selectedGuests} pases)!</span>
                      </div>
                      <p className="text-[11px] text-charcoal-muted">
                        Notificación enviada a los novios en tiempo real.
                      </p>
                      <button
                        type="button"
                        onClick={() => setRsvpConfirmed(false)}
                        className="text-[10px] underline text-gold-dark uppercase tracking-wider"
                      >
                        Probar de nuevo
                      </button>
                    </div>
                  )}
                </div>

                {/* Interactive Helper Footer */}
                <div className="flex items-center justify-between text-[10px] text-charcoal-muted pt-0.5">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-dark" />
                    Demo interactiva real
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sage" />
                    Modelo: Villa Toscana
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
