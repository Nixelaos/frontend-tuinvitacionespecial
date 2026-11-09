import React from 'react';
import {
  Clock,
  Users,
  Heart,
  Camera,
  Wine,
  UtensilsCrossed,
  Music,
  PartyPopper,
  Moon,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  location?: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITINERARY_EVENTS: ItineraryItem[] = [
  {
    id: 'arrival',
    time: '5:00 PM',
    title: 'Llegada de invitados',
    subtitle: 'Bienvenida & Recepción',
    location: 'Acceso Principal & Jardines',
    description:
      'Recepción y bienvenida de nuestros queridos invitados para dar inicio a este día inolvidable.',
    icon: Users,
  },
  {
    id: 'ceremony',
    time: '5:30 PM',
    title: 'Ceremonia',
    subtitle: 'Nuestros Votos de Amor',
    location: 'Explanada del Parque · Los Álamos',
    description:
      'Nuestra promesa de amor eterno y el intercambio de alianzas frente a todos ustedes.',
    icon: Heart,
  },
  {
    id: 'cocktail',
    time: '6:15 PM',
    title: 'Cóctel y fotos con invitados',
    subtitle: 'Brindis al Atardecer & Recuerdos',
    location: 'Terraza del Parque',
    description:
      'Música acústica en vivo, espumantes, degustación de autor y sesión de fotos junto a quienes más amamos.',
    icon: Camera,
  },
  {
    id: 'toast',
    time: '7:15 PM',
    title: 'Entrada de novios y Brindis',
    subtitle: 'Brindis de Honor',
    location: 'Gran Salón',
    description:
      'Gran bienvenida a los recién casados y alzamos las copas por nuestro amor y esta nueva etapa juntos.',
    icon: Wine,
  },
  {
    id: 'dinner',
    time: '7:30 PM',
    title: 'Cena',
    subtitle: 'Banquete a la Mesa',
    location: 'Gran Salón Majadas',
    description:
      'Una exquisita experiencia gastronómica diseñada con amor para celebrar y compartir en familia.',
    icon: UtensilsCrossed,
  },
  {
    id: 'vals',
    time: '8:45 PM',
    title: 'Vals',
    subtitle: 'Primer Baile de Esposos',
    location: 'Pista Central',
    description:
      'Nuestro primer vals como matrimonio, seguido del emotivo baile tradicional con nuestros padres.',
    icon: Music,
  },
  {
    id: 'party',
    time: '9:00 PM',
    title: 'Fiesta',
    subtitle: '¡Pista Abierta & Celebración!',
    location: 'Pista Central & Cúpula',
    description:
      '¡Pista encendida, barra libre, sorpresas, cotillón especial y mucha fiesta para celebrar sin parar!',
    icon: PartyPopper,
  },
  {
    id: 'closing',
    time: '1:00 AM',
    title: 'Cierre y despedida',
    subtitle: 'El Broche de Oro',
    location: 'Jardines Iluminados',
    description:
      'Agradecimiento final bajo las estrellas y el abrazo cálido para despedir una noche mágica e inolvidable.',
    icon: Moon,
  },
];

export const BeachItinerary: React.FC = () => {
  return (
    <div className="w-full bg-[#F5ECE0] px-4 py-8 sm:py-12 text-[#2F2420] relative z-10 transition-colors duration-500 overflow-hidden">
      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Insignia dorada artesanal con ícono de reloj */}
          <div className="w-11 h-11 rounded-full bg-[#FCF9F3] border border-[#DFCBB5] shadow-xs flex items-center justify-center text-[#B87A4A] mb-3">
            <Clock className="w-5 h-5" />
          </div>

          <h2
            className="font-script text-4xl sm:text-5xl text-[#B87A4A] font-normal leading-tight tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Itinerario
          </h2>

          <p
            className="text-sm sm:text-base text-[#8A6749] font-medium mt-1 text-center max-w-xs"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Acompáñanos a vivir cada instante especial de nuestro gran día
          </p>

          {/* Separador ornamental delicado */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent my-2" />
        </div>

        {/* LÍNEA DE TIEMPO DEL ITINERARIO */}
        <div className="relative w-full flex flex-col space-y-4 sm:space-y-5">
          {/* Guía vertical dorada continua */}
          <div className="absolute left-[20px] sm:left-[22px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#DFCBB5] via-[#C29F68]/70 to-[#DFCBB5] pointer-events-none" />

          {ITINERARY_EVENTS.map((event, idx) => {
            const IconComponent = event.icon;
            return (
              <div
                key={event.id}
                className="relative pl-12 sm:pl-14 w-full flex flex-col"
              >
                {/* Marcador circular en la línea de tiempo */}
                <div className="absolute left-0 top-3 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#FCF9F3] border-2 border-[#C29F68] shadow-sm flex items-center justify-center text-[#B87A4A] z-10 transition-transform duration-300 hover:scale-110">
                  <IconComponent className="w-4 sm:w-5 h-4 sm:h-5 text-[#B87A4A]" />
                </div>

                {/* Tarjetón artesanal de cada hito */}
                <div className="relative bg-[#FCF9F3] border border-[#DFCBB5] rounded-2xl p-4 sm:p-5 shadow-[0_6px_22px_rgba(70,45,25,0.06)] text-left flex flex-col">
                  {/* Filete interior sutil de papelería artesanal */}
                  <div className="absolute inset-2 border border-[#E8DCCF] rounded-xl pointer-events-none" />

                  {/* Fila superior: Hora e Insignia */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5ECE0] text-[#B87A4A] border border-[#DFCBB5] text-xs font-semibold tracking-wider">
                      <Clock className="w-3 h-3 text-[#B87A4A]" />
                      <span>{event.time}</span>
                    </span>

                    <span className="text-[10px] uppercase tracking-widest text-[#916E49] font-medium opacity-80">
                      Paso {idx + 1}
                    </span>
                  </div>

                  {/* Título del Hito */}
                  <div className="relative z-10">
                    <h3
                      className="text-lg sm:text-xl text-[#2F2420] font-medium leading-snug tracking-tight"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {event.title}
                    </h3>

                    {event.subtitle && (
                      <span className="text-[11px] sm:text-xs text-[#8A6749] font-medium block mt-0.5 mb-2">
                        {event.subtitle}
                      </span>
                    )}

                    {/* Ubicación del Momento */}
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-[#6B513E] mb-2.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B87A4A] shrink-0" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                    )}

                    {/* Descripción con tipografía cuidada */}
                    {event.description && (
                      <p className="text-xs sm:text-[13px] text-[#6B513E] leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota final del itinerario */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8A6749] text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#B87A4A]" />
          <span>Los horarios son estimados para disfrutar cada momento</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B87A4A]" />
        </div>
      </ScrollReveal>
    </div>
  );
};
