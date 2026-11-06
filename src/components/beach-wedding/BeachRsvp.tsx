import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Check,
  Plus,
  Minus,
  Utensils,
  Music,
  Calendar,
  MessageCircle,
  ExternalLink,
  RotateCcw,
  Clock,
  Users,
  Send,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { WHATSAPP_NUMBER } from '../../data/weddingData';

const MENU_OPTIONS = [
  { id: 'standard', label: 'Estándar' },
  { id: 'vegetarian', label: 'Vegetariano' },
  { id: 'vegan', label: 'Vegano' },
  { id: 'celiac', label: 'Celíaco / Sin Gluten' },
  { id: 'kids', label: 'Menú Infantil' },
];

export const BeachRsvp: React.FC = () => {
  // Datos extraídos por URL o defaults
  const [guestName, setGuestName] = useState('Familia García');
  const [maxPasses, setMaxPasses] = useState(2);

  // Estados del formulario
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [attendeesCount, setAttendeesCount] = useState(2);
  const [selectedMenus, setSelectedMenus] = useState<string[]>(['Estándar']);
  const [allergies, setAllergies] = useState('');
  const [song, setSong] = useState('');
  const [dedication, setDedication] = useState('');

  // Estado de confirmación enviada (Pantalla de Éxito)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parsear URL parameters en cliente
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const nameParam =
      params.get('n') ||
      params.get('nombre') ||
      params.get('invitado') ||
      params.get('guest');

    if (nameParam && nameParam.trim()) {
      setGuestName(nameParam.trim());
    }

    const passesParam =
      params.get('pases') ||
      params.get('passes') ||
      params.get('cupos');

    if (passesParam) {
      const parsed = parseInt(passesParam, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 10) {
        setMaxPasses(parsed);
        setAttendeesCount(parsed);
      }
    }

    // Soporte para token codificado o simple
    const tokenParam = params.get('token') || params.get('t');
    if (tokenParam) {
      try {
        const decoded = atob(tokenParam);
        const parsed = JSON.parse(decoded);
        if (parsed.n || parsed.nombre || parsed.name) {
          setGuestName(parsed.n || parsed.nombre || parsed.name);
        }
        if (parsed.p || parsed.pases || parsed.passes) {
          const p = parseInt(parsed.p || parsed.pases || parsed.passes, 10);
          if (!isNaN(p) && p > 0 && p <= 10) {
            setMaxPasses(p);
            setAttendeesCount(p);
          }
        }
      } catch {
        if (!nameParam && tokenParam.length < 40) {
          const cleanToken = tokenParam.replace(/[-_]/g, ' ');
          setGuestName(cleanToken.replace(/\b\w/g, (c) => c.toUpperCase()));
        }
      }
    }
  }, []);

  // Determinar saludo cordial y refinado según el destinatario
  const lowerName = guestName.toLowerCase();
  const isFamily = lowerName.includes('familia');
  const isMultiple = isFamily || lowerName.includes(' y ') || guestName.includes('&') || maxPasses > 1;

  let greetingLead = 'Querida';
  if (isFamily) {
    greetingLead = 'Querida';
  } else if (isMultiple) {
    greetingLead = 'Queridos';
  } else if (lowerName.endsWith('o') || lowerName.endsWith('el') || lowerName.endsWith('or') || lowerName.endsWith('an')) {
    greetingLead = 'Estimado';
  } else {
    greetingLead = 'Estimada';
  }

  const salutationText = `${greetingLead} ${guestName}, queremos celebrar este momento tan especial junto a ${
    isMultiple ? 'ustedes' : 'ti'
  }`;

  // Manejo de chips de menú
  const toggleMenu = (label: string) => {
    setSelectedMenus((prev) => {
      if (prev.includes(label)) {
        if (prev.length === 1) return prev; // Mantener al menos 1 seleccionado
        return prev.filter((m) => m !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  // Manejador del stepper de asistentes
  const handleDecrement = () => {
    if (attendeesCount > 1) {
      setAttendeesCount((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    if (attendeesCount < maxPasses) {
      setAttendeesCount((prev) => prev + 1);
    }
  };

  // Envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  // Descarga de archivo .ics para Apple Calendar / Outlook
  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tu Invitacion Especial//Boda Valentina & Sebastian//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:Boda Valentina & Sebastián',
      'UID:boda-valentina-sebastian-20261114@tuinvitacionespecial.cl',
      'DTSTART:20261114T123000',
      'DTEND:20261114T230000',
      'DESCRIPTION:Celebración de Boda de Valentina & Sebastián frente al mar. ¡Nos vemos en la playa!',
      'LOCATION:Explanada Frente al Mar · Playa Blanca, Bahía Serena',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Boda-Valentina-y-Sebastian.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Enlace a Google Calendar
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Boda Valentina & Sebastián'
  )}&dates=20261114T123000/20261114T230000&details=${encodeURIComponent(
    'Celebración de Boda de Valentina & Sebastián frente al mar. ¡Nos vemos en la playa!'
  )}&location=${encodeURIComponent(
    'Explanada Frente al Mar · Playa Blanca, Bahía Serena'
  )}`;

  // Enlace a WhatsApp con respuesta formateada
  const buildWhatsAppUrl = () => {
    const statusText =
      attendance === 'yes' ? '✨ ¡Sí, ahí estaré!' : '💌 No podré asistir';
    let text = `*Confirmación de Asistencia — Boda Valentina & Sebastián*\n\n`;
    text += `👤 *Invitado:* ${guestName}\n`;
    text += `💌 *Respuesta:* ${statusText}\n`;

    if (attendance === 'yes') {
      text += `👥 *Asistentes:* ${attendeesCount} de ${maxPasses} pases reservados\n`;
      text += `🍽️ *Preferencia de Menú:* ${selectedMenus.join(', ')}\n`;
      if (allergies.trim()) {
        text += `⚠️ *Alergias / Restricciones:* ${allergies.trim()}\n`;
      }
      if (song.trim()) {
        text += `🎵 *Canción para la fiesta:* ${song.trim()}\n`;
      }
    }

    if (dedication.trim()) {
      text += `✍️ *Dedicatoria:* «${dedication.trim()}»\n`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full bg-[#FCF9F3] px-4 py-10 sm:py-14 text-[#2F2420] relative z-10 transition-colors duration-500">
      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto">
        {/* TARJETA DE RESPUESTA ARTESANAL (RESPONSE CARD) */}
        <div className="relative bg-[#FCF9F3] border border-[#DFCBB5] rounded-xl p-5 sm:p-7 shadow-[0_8px_30px_rgba(70,45,25,0.08)]">
          {/* Filete interior sutil tipo papelería de alta gama */}
          <div className="absolute inset-2 sm:inset-2.5 border border-[#E8DCCF] rounded-lg pointer-events-none" />

          {/* ESTADO 1: FORMULARIO ACTIVO DE RESPUESTA */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* MÓDULO 1: ENCABEZADO Y SALUDO PERSONALIZADO */}
              <div className="text-center space-y-2.5">
                <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-[#916E49] uppercase">
                  R. S. V. P.
                </span>

                <h2
                  className="font-serif text-2xl sm:text-3xl text-[#2F2420] font-normal tracking-wide leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Confirmación de Asistencia
                </h2>

                <p className="font-serif italic text-sm sm:text-base text-[#6E5542] leading-relaxed max-w-xs mx-auto">
                  «{salutationText}»
                </p>

                {/* Insignia de pases asignados */}
                <div className="pt-1.5 flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5ECE0]/80 border border-[#DFCBB5] text-[10px] sm:text-xs font-medium text-[#7D5A38] tracking-wider uppercase">
                    <Users className="w-3.5 h-3.5 text-[#B8864E]" />
                    <span>
                      Pases reservados en su honor:{' '}
                      <strong className="text-[#2F2420] font-bold">
                        {maxPasses} {maxPasses === 1 ? 'persona' : 'personas'}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* LÍNEA DIVISORIA ORGÁNICA */}
              <div className="flex items-center justify-center gap-2 py-1">
                <span className="w-8 h-[1px] bg-[#DFCBB5]" />
                <Sparkles className="w-3 h-3 text-[#B8864E]" />
                <span className="w-8 h-[1px] bg-[#DFCBB5]" />
              </div>

              {/* MÓDULO 2: DECISIÓN PRINCIPAL (BIFURCACIÓN SÍ / NO) */}
              <div className="space-y-2.5">
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase text-center sm:text-left">
                  1. ¿Nos acompañas?
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Opción SÍ */}
                  <button
                    type="button"
                    onClick={() => setAttendance('yes')}
                    className={`relative p-3.5 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                      attendance === 'yes'
                        ? 'bg-[#FAF3E8] border-[#B8864E] shadow-[0_3px_12px_rgba(184,134,78,0.22)] ring-1 ring-[#B8864E]'
                        : 'bg-white/70 border-[#DFCBB5] hover:bg-white hover:border-[#C8AD90] opacity-80'
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#2F2420]">
                      ✨ ¡Sí, ahí estaré!
                    </span>
                    <span className="text-[10px] text-[#8C6947]">
                      Celebraré con ustedes
                    </span>
                    {attendance === 'yes' && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#B8864E] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>

                  {/* Opción NO */}
                  <button
                    type="button"
                    onClick={() => setAttendance('no')}
                    className={`relative p-3.5 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                      attendance === 'no'
                        ? 'bg-[#FAF3E8] border-[#B8864E] shadow-[0_3px_12px_rgba(184,134,78,0.22)] ring-1 ring-[#B8864E]'
                        : 'bg-white/70 border-[#DFCBB5] hover:bg-white hover:border-[#C8AD90] opacity-80'
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#2F2420]">
                      💌 No podré asistir
                    </span>
                    <span className="text-[10px] text-[#8C6947]">
                      Los acompañaré de corazón
                    </span>
                    {attendance === 'no' && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#B8864E] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* RAMIFICACIÓN: SI CONFIRMA ASISTENCIA */}
              {attendance === 'yes' ? (
                <div className="space-y-6 animate-fadeIn transition-all duration-500">
                  {/* MÓDULO 3: SELECTOR DE PASES CONFIRMADOS */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase">
                        2. Cantidad de Asistentes
                      </label>
                      <span className="text-[10px] text-[#916E49] italic">
                        (Máximo {maxPasses})
                      </span>
                    </div>

                    <div className="bg-white/80 border border-[#DFCBB5] rounded-xl p-2.5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={attendeesCount <= 1}
                        aria-label="Disminuir asistentes"
                        className="w-9 h-9 rounded-lg bg-[#F5ECE0] hover:bg-[#FAF3E8] disabled:opacity-30 disabled:cursor-not-allowed border border-[#DFCBB5] flex items-center justify-center text-[#2F2420] transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="flex flex-col items-center">
                        <span
                          className="font-serif text-xl sm:text-2xl text-[#2F2420] font-bold leading-none"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {attendeesCount}
                        </span>
                        <span className="text-[10px] text-[#8C6947] font-medium uppercase tracking-wider">
                          {attendeesCount === 1 ? 'persona confirmada' : 'personas confirmadas'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={attendeesCount >= maxPasses}
                        aria-label="Aumentar asistentes"
                        className="w-9 h-9 rounded-lg bg-[#F5ECE0] hover:bg-[#FAF3E8] disabled:opacity-30 disabled:cursor-not-allowed border border-[#DFCBB5] flex items-center justify-center text-[#2F2420] transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* MÓDULO 4: PREFERENCIAS DE MENÚ / RESTRICCIONES ALIMENTARIAS */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[#B8864E]" />
                      <label className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase">
                        3. Menú y Restricciones Alimentarias
                      </label>
                    </div>

                    {/* Pastillas interactivas (chips) */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {MENU_OPTIONS.map((menu) => {
                        const isSelected = selectedMenus.includes(menu.label);
                        return (
                          <button
                            key={menu.id}
                            type="button"
                            onClick={() => toggleMenu(menu.label)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer flex items-center gap-1.5 select-none ${
                              isSelected
                                ? 'bg-[#FAF3E8] border-[#B8864E] text-[#2F2420] shadow-xs'
                                : 'bg-white/70 border-[#DFCBB5] text-[#6E5542] hover:bg-white hover:border-[#C8AD90]'
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3 h-3 text-[#B8864E] stroke-[2.5]" />
                            )}
                            <span>{menu.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Campo de alergias severas */}
                    <div className="pt-1">
                      <input
                        type="text"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        placeholder="¿Alguna alergia severa o condición? (opcional)"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-white/90 border border-[#DFCBB5] text-[#2F2420] placeholder:text-[#A8927E] focus:outline-none focus:border-[#B8864E] focus:ring-1 focus:ring-[#B8864E] transition-all"
                      />
                    </div>
                  </div>

                  {/* MÓDULO 5A: LA CHISPA FESTIVA (CANCIÓN) */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-[#B8864E]" />
                      <label className="text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase">
                        4. La Chispa Festiva
                      </label>
                    </div>

                    <p className="text-xs text-[#6E5542] italic">
                      «¿Qué canción te saca a bailar sí o sí?»
                    </p>

                    <input
                      type="text"
                      value={song}
                      onChange={(e) => setSong(e.target.value)}
                      placeholder="Nombre de canción y artista (ej. Danza Kuduro)"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-white/90 border border-[#DFCBB5] text-[#2F2420] placeholder:text-[#A8927E] focus:outline-none focus:border-[#B8864E] focus:ring-1 focus:ring-[#B8864E] transition-all"
                    />
                  </div>
                </div>
              ) : (
                /* RAMIFICACIÓN: SI INDICA QUE NO PODRÁ ASISTIR */
                <div className="bg-[#FAF3E8] border border-[#DFCBB5] rounded-xl p-4 text-center space-y-2 animate-fadeIn transition-all duration-500">
                  <Heart className="w-5 h-5 text-[#B8864E] mx-auto fill-[#B8864E]/20" />
                  <p
                    className="font-serif italic text-sm text-[#543F30] leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    «Lamentamos mucho que no puedas acompañarnos, ¡te tendremos presente en el corazón en todo momento!»
                  </p>
                </div>
              )}

              {/* MÓDULO 5B: MENSAJE PARA LOS NOVIOS (DISPONIBLE PARA AMBOS) */}
              <div className="space-y-2 pt-1">
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#8C6947] uppercase">
                  {attendance === 'yes' ? '5. Mensaje para los novios' : 'Mensaje o buenos deseos'}
                </label>

                <textarea
                  rows={3}
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  placeholder="Escribe una dedicatoria o deseo para la pareja..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white/90 border border-[#DFCBB5] text-[#2F2420] placeholder:text-[#A8927E] focus:outline-none focus:border-[#B8864E] focus:ring-1 focus:ring-[#B8864E] transition-all resize-none"
                />
              </div>

              {/* MÓDULO 6: BOTÓN DE CONFIRMACIÓN */}
              <div className="pt-2 text-center space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C2925A] via-[#B8864E] to-[#A4743E] hover:from-[#B8864E] hover:to-[#966835] text-white font-medium text-xs sm:text-sm tracking-widest uppercase shadow-[0_4px_16px_rgba(184,134,78,0.32)] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? 'Registrando...'
                      : attendance === 'yes'
                      ? 'Confirmar Asistencia'
                      : 'Enviar Respuesta'}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C6947]">
                  <Clock className="w-3 h-3 text-[#B8864E]" />
                  <span>Fecha límite para responder: <strong>25 de Octubre de 2026</strong></span>
                </div>
              </div>
            </form>
          ) : (
            /* ESTADO 2: PANTALLA DE ÉXITO (POST-CONFIRMACIÓN) */
            <div className="relative z-10 py-4 text-center space-y-5 animate-fadeIn">
              {/* Icono de Lacre o Corazón en agradecimiento */}
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF3E8] border border-[#DFCBB5] shadow-xs flex items-center justify-center text-[#B8864E]">
                <Heart className="w-7 h-7 fill-[#B8864E]" />
              </div>

              {/* Mensaje de Éxito Editorial */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#916E49] uppercase">
                  Respuesta Registrada
                </span>

                <h3
                  className="font-serif text-2xl sm:text-3xl text-[#2F2420] font-normal leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {attendance === 'yes' ? '¡Nos vemos muy pronto!' : '¡Muchísimas gracias!'}
                </h3>

                <p className="font-serif italic text-sm sm:text-base text-[#543F30] max-w-xs mx-auto leading-relaxed">
                  {attendance === 'yes'
                    ? `«¡Gracias ${guestName}! Tu confirmación ha quedado registrada con éxito. Nos vemos el 14 de Noviembre junto al mar.»`
                    : `«¡Gracias ${guestName}! Hemos recibido tu respuesta con mucho cariño. ¡Te tendremos presente en el corazón!»`}
                </p>
              </div>

              {/* Resumen de Confirmación */}
              {attendance === 'yes' && (
                <div className="bg-white/80 border border-[#DFCBB5] rounded-xl p-3.5 text-left text-xs text-[#543F30] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between pb-1 border-b border-[#F0E4D6]">
                    <span className="font-medium text-[#8C6947]">Pases confirmados:</span>
                    <span className="font-bold text-[#2F2420]">
                      {attendeesCount} {attendeesCount === 1 ? 'persona' : 'personas'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-[#F0E4D6]">
                    <span className="font-medium text-[#8C6947]">Menú seleccionado:</span>
                    <span className="font-bold text-[#2F2420] text-right">
                      {selectedMenus.join(', ')}
                    </span>
                  </div>
                  {song && (
                    <div className="flex items-center justify-between pb-1 border-b border-[#F0E4D6]">
                      <span className="font-medium text-[#8C6947]">Canción sugerida:</span>
                      <span className="font-semibold text-[#2F2420] truncate max-w-[170px] text-right">
                        {song}
                      </span>
                    </div>
                  )}
                  {dedication && (
                    <div className="pt-1 text-[11px] italic text-[#6E5542]">
                      «{dedication}»
                    </div>
                  )}
                </div>
              )}

              {/* ACCIÓN DE UTILIDAD: BOTÓN "GUARDAR EN CALENDARIO" */}
              {attendance === 'yes' && (
                <div className="space-y-2 pt-2">
                  <span className="block text-[10px] font-semibold tracking-wider text-[#8C6947] uppercase">
                    Guarda la fecha en tu agenda
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Google Calendar */}
                    <a
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg bg-white hover:bg-[#FAF3E8] border border-[#DFCBB5] text-stone-800 text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#B8864E]" />
                      <span>Google Cal</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                    </a>

                    {/* Apple / iCal (.ics) */}
                    <button
                      type="button"
                      onClick={handleDownloadIcs}
                      className="py-2.5 px-3 rounded-lg bg-white hover:bg-[#FAF3E8] border border-[#DFCBB5] text-stone-800 text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#B8864E]" />
                      <span>Apple / iCal</span>
                    </button>
                  </div>

                  {/* Notificar por WhatsApp */}
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Enviar copia por WhatsApp a los novios</span>
                  </a>
                </div>
              )}

              {/* MARGEN DE MODIFICACIÓN */}
              <div className="pt-4 border-t border-[#DFCBB5]/60">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#8C6947] hover:text-[#2F2420] underline underline-offset-4 decoration-[#B8864E]/50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-[#B8864E]" />
                  <span>¿Cambio de planes? Modifica tu respuesta hasta el 25 de Octubre</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
};
