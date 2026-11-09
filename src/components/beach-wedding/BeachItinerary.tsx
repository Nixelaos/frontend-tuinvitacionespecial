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
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITINERARY_EVENTS: ItineraryItem[] = [
  {
    id: 'arrival',
    time: '5:00 PM',
    title: 'Llegada de invitados',
    icon: Users,
  },
  {
    id: 'ceremony',
    time: '5:30 PM',
    title: 'Ceremonia',
    icon: Heart,
  },
  {
    id: 'cocktail',
    time: '6:15 PM',
    title: 'Cóctel y fotos con invitados',
    icon: Camera,
  },
  {
    id: 'toast',
    time: '7:15 PM',
    title: 'Entrada de novios y Brindis',
    icon: Wine,
  },
  {
    id: 'dinner',
    time: '7:30 PM',
    title: 'Cena',
    icon: UtensilsCrossed,
  },
  {
    id: 'vals',
    time: '8:45 PM',
    title: 'Vals',
    icon: Music,
  },
  {
    id: 'party',
    time: '9:00 PM',
    title: 'Fiesta',
    icon: PartyPopper,
  },
  {
    id: 'closing',
    time: '1:00 AM',
    title: 'Cierre y despedida',
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
        <div className="relative w-full flex flex-col space-y-6 sm:space-y-7 items-center">
          {/* Guía vertical dorada continua central */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-[#DFCBB5] via-[#C29F68]/60 to-[#DFCBB5] pointer-events-none" />

          {ITINERARY_EVENTS.map((event) => {
            const IconComponent = event.icon;
            return (
              <div
                key={event.id}
                className="relative w-full flex flex-col items-center"
              >
                {/* Tarjetón artesanal de cada hito: menos ancho y centrado */}
                <div className="relative bg-[#FCF9F3] border border-[#DFCBB5] rounded-2xl pt-6 pb-3.5 px-4 sm:px-5 shadow-[0_4px_18px_rgba(70,45,25,0.06)] text-center flex flex-col items-center w-full max-w-[270px] sm:max-w-[290px] z-10 transition-transform duration-300 hover:scale-[1.02]">
                  {/* Filete interior sutil de papelería artesanal */}
                  <div className="absolute inset-1.5 sm:inset-2 border border-[#E8DCCF] rounded-xl pointer-events-none" />

                  {/* Medallón circular del hito en el borde superior centrado */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FCF9F3] border-2 border-[#C29F68] shadow-sm flex items-center justify-center text-[#B87A4A] z-20">
                    <IconComponent className="w-4 h-4 text-[#B87A4A]" />
                  </div>

                  {/* Fila superior: Hora centrada */}
                  <div className="relative z-10 flex items-center justify-center mb-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F5ECE0] text-[#B87A4A] border border-[#DFCBB5] text-[11px] sm:text-xs font-semibold tracking-wider shadow-2xs">
                      <Clock className="w-3 h-3 text-[#B87A4A]" />
                      <span>{event.time}</span>
                    </span>
                  </div>

                  {/* Título del Hito centrado */}
                  <div className="relative z-10">
                    <h3
                      className="text-lg sm:text-xl text-[#2F2420] font-medium leading-snug tracking-tight"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  );
};
