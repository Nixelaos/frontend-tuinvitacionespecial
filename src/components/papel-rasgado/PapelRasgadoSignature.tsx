import React from 'react';
import { Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const PapelRasgadoSignature: React.FC = () => {
  return (
    <ScrollReveal className="w-full bg-[#EBDDCE] pt-4 pb-12 text-center flex flex-col items-center">
      <span
        className="font-script text-3xl sm:text-4xl text-[#9A6F45]"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        Valentina &amp; Sebastián
      </span>
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="w-10 h-[1px] bg-[#D4AF37]/45" />
        <Heart className="w-3 h-3 text-[#B8864E] fill-[#B8864E]" />
        <span className="w-10 h-[1px] bg-[#D4AF37]/45" />
      </div>
    </ScrollReveal>
  );
};

export const BeachSignature = PapelRasgadoSignature;
