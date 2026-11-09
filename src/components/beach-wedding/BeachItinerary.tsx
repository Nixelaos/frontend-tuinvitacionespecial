import React from 'react';
import {
  Clock,
  Users,
  Heart,
  Camera,
  UtensilsCrossed,
  PartyPopper,
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
    id: 'dinner',
    time: '7:30 PM',
    title: 'Cena',
    icon: UtensilsCrossed,
  },
  {
    id: 'party',
    time: '9:00 PM',
    title: 'Fiesta',
    icon: PartyPopper,
  },
];

export const BeachItinerary: React.FC = () => {
  return (
    <div className="w-full bg-[#F5ECE0] px-4 py-8 sm:py-12 text-[#2F2420] relative z-10 transition-colors duration-500 overflow-hidden">
      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-7">
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

          {/* Separador ornamental delicado */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent mt-2" />
        </div>

        {/* LÍNEA DE TIEMPO DEL ITINERARIO (Íconos a la izquierda, recuadro y títulos a la derecha) */}
        <div className="relative w-full max-w-[330px] sm:max-w-[350px] mx-auto flex flex-col space-y-4">
          {/* Guía vertical dorada continua a la izquierda */}
          <div className="absolute left-[19px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#DFCBB5] via-[#C29F68]/70 to-[#DFCBB5] pointer-events-none" />

          {ITINERARY_EVENTS.map((event) => {
            const IconComponent = event.icon;
            return (
              <div
                key={event.id}
                className="relative pl-12 sm:pl-14 w-full flex items-center"
              >
                {/* Marcador circular con ícono a la izquierda */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#FCF9F3] border-2 border-[#C29F68] shadow-sm flex items-center justify-center text-[#B87A4A] z-10 transition-transform duration-300 hover:scale-110">
                  <IconComponent className="w-4 sm:w-5 h-4 sm:h-5 text-[#B87A4A]" />
                </div>

                {/* Recuadro artesanal con hora y título a la derecha */}
                <div className="relative bg-[#FCF9F3] border border-[#DFCBB5] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_4px_18px_rgba(70,45,25,0.06)] text-left flex flex-col w-full max-w-[260px] sm:max-w-[280px]">
                  {/* Filete interior sutil de papelería artesanal */}
                  <div className="absolute inset-1.5 border border-[#E8DCCF] rounded-xl pointer-events-none" />

                  {/* Fila superior: Hora */}
                  <div className="relative z-10 flex items-center mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5ECE0] text-[#B87A4A] border border-[#DFCBB5] text-[11px] sm:text-xs font-semibold tracking-wider">
                      <Clock className="w-3 h-3 text-[#B87A4A]" />
                      <span>{event.time}</span>
                    </span>
                  </div>

                  {/* Título del Hito */}
                  <div className="relative z-10">
                    <h3
                      className="text-base sm:text-lg text-[#2F2420] font-medium leading-snug tracking-tight"
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
