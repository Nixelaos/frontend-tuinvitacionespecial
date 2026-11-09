import React from 'react';
import {
  Clock,
  Heart,
  Wine,
  UtensilsCrossed,
  Music,
  Moon,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITINERARY_EVENTS: ItineraryItem[] = [
  {
    id: 'ceremony',
    time: '17:00 hrs',
    title: 'Matrimonio Religioso',
    subtitle: 'El Inicio de Nuestra Historia',
    location: 'Explanada de los Álamos · Jardín Central',
    description:
      '',
    icon: Heart,
  },
  {
    id: 'cocktail',
    time: '17:45 hrs',
    title: 'Cóctel & Brindis',
    subtitle: 'Brindis de Bienvenida',
    location: 'Terraza del Parque',
    description:
      '',
    icon: Wine,
  },
  {
    id: 'vals',
    time: '19:00 hrs',
    title: 'Banquete & Cena de Gala',
    subtitle: 'Celebración a la Mesa',
    location: 'Gran Salón Majadas',
    description:
      'Una cena gastronómica diseñada con dedicación, brindis de honor de la familia y hermosas sorpresas preparadas para ustedes.',
    icon: UtensilsCrossed,
  },
  {
    id: 'dinner',
    time: '20:00 hrs',
    title: 'Banquete & Cena de Gala',
    subtitle: 'Celebración a la Mesa',
    location: 'Gran Salón Majadas',
    description:
      'Una cena gastronómica diseñada con dedicación, brindis de honor de la familia y hermosas sorpresas preparadas para ustedes.',
    icon: UtensilsCrossed,
  },
  {
    id: 'party',
    time: '22:00 hrs',
    title: 'El Gran Baile & Apertura de Fiesta',
    subtitle: '¡A Celebrar Sin Parar!',
    location: 'Pista Central & Cúpula',
    description:
      'Primer vals de los recién casados, barra libre, pista encendida, cotillón especial y baile sin descanso hasta la madrugada.',
    icon: Music,
  },
  {
    id: 'closing',
    time: '03:00 hrs',
    title: 'Cierre Mágico & Despedida',
    subtitle: 'El Broche de Oro',
    location: 'Jardines Iluminados',
    description:
      'Agradecimiento final bajo las estrellas y el abrazo cálido para despedir una noche que vivirá por siempre en nuestra memoria.',
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


          {/* Separador ornamental delicado */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent my-2" />
        </div>

        {/* LÍNEA DE TIEMPO DEL ITINERARIO */}
        <div className="relative w-full flex flex-col space-y-5">
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

                    <span className="text-[11px] sm:text-xs text-[#8A6749] font-medium block mt-0.5 mb-2">
                      {event.subtitle}
                    </span>

                    {/* Ubicación del Momento */}
                    <div className="flex items-center gap-1.5 text-xs text-[#6B513E] mb-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B87A4A] shrink-0" />
                      <span className="font-medium">{event.location}</span>
                    </div>

                    {/* Descripción con tipografía cuidada */}
                    <p className="text-xs sm:text-[13px] text-[#6B513E] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota final del itinerario */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8A6749] text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#B87A4A]" />
          <span>Los horarios son aproximados para disfrutar cada instante</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B87A4A]" />
        </div>
      </ScrollReveal>
    </div>
  );
};
