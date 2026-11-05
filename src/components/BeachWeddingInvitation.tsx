import React, { useState, useRef, useEffect } from 'react';
import { Heart, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

// Torn paper double dividers extracted from user reference image (media_1793737101081_57c9fc1a.jpg)
const TORN_TOP_UPPER_PATH = 'M0,0 L1000,0 L1000,20 L990,23 L980,27 L970,33 L960,28 L950,40 L940,40 L930,44 L920,44 L910,51 L900,53 L890,55 L880,55 L870,57 L860,56 L850,56 L840,55 L830,54 L820,60 L810,64 L800,67 L790,67 L780,66 L770,68 L760,69 L750,64 L740,62 L730,65 L720,64 L710,61 L700,62 L690,65 L680,66 L670,72 L660,75 L650,75 L640,84 L630,85 L620,88 L610,92 L600,97 L590,101 L580,107 L570,110 L560,116 L550,121 L540,126 L530,129 L520,133 L510,131 L500,135 L490,139 L480,139 L470,143 L460,144 L450,146 L440,145 L430,147 L420,146 L410,151 L400,152 L390,153 L380,150 L370,148 L360,147 L350,148 L340,149 L330,148 L320,150 L310,152 L300,160 L290,161 L280,161 L270,162 L260,163 L250,163 L240,168 L230,171 L220,168 L210,169 L200,171 L190,173 L180,173 L170,176 L160,177 L150,177 L140,179 L130,181 L120,180 L110,178 L100,183 L90,193 L80,201 L70,207 L60,208 L50,208 L40,210 L30,213 L20,214 L10,217 L0,219 Z';
const TORN_TOP_FIBER_PATH = 'M0,219 L10,217 L20,214 L30,213 L40,210 L50,208 L60,208 L70,207 L80,201 L90,193 L100,183 L110,178 L120,180 L130,181 L140,179 L150,177 L160,177 L170,176 L180,173 L190,173 L200,171 L210,169 L220,168 L230,171 L240,168 L250,163 L260,163 L270,162 L280,161 L290,161 L300,160 L310,152 L320,150 L330,148 L340,149 L350,148 L360,147 L370,148 L380,150 L390,153 L400,152 L410,151 L420,146 L430,147 L440,145 L450,146 L460,144 L470,143 L480,139 L490,139 L500,135 L510,131 L520,133 L530,129 L540,126 L550,121 L560,116 L570,110 L580,107 L590,101 L600,97 L610,92 L620,88 L630,85 L640,84 L650,75 L660,75 L670,72 L680,66 L690,65 L700,62 L710,61 L720,64 L730,65 L740,62 L750,64 L760,69 L770,68 L780,66 L790,67 L800,67 L810,64 L820,60 L830,54 L840,55 L850,56 L860,56 L870,57 L880,55 L890,55 L900,53 L910,51 L920,44 L930,44 L940,40 L950,40 L960,28 L970,33 L980,27 L990,23 L1000,20 L1000,256 L990,256 L980,256 L970,256 L960,256 L950,256 L940,256 L930,256 L920,256 L910,256 L900,256 L890,256 L880,256 L870,256 L860,256 L850,256 L840,256 L830,256 L820,256 L810,256 L800,256 L790,256 L780,256 L770,256 L760,256 L750,256 L740,256 L730,256 L720,256 L710,256 L700,256 L690,256 L680,256 L670,256 L660,256 L650,256 L640,256 L630,256 L620,256 L610,256 L600,256 L590,256 L580,256 L570,256 L560,256 L550,256 L540,256 L530,256 L520,256 L510,256 L500,256 L490,256 L480,256 L470,256 L460,256 L450,256 L440,256 L430,256 L420,256 L410,256 L400,256 L390,256 L380,256 L370,256 L360,256 L350,256 L340,256 L330,256 L320,256 L310,256 L300,256 L290,256 L280,256 L270,256 L260,256 L250,256 L240,256 L230,256 L220,256 L210,256 L200,256 L190,256 L180,256 L170,256 L160,256 L150,256 L140,256 L130,256 L120,256 L110,256 L100,256 L90,256 L80,256 L70,256 L60,256 L50,256 L40,256 L30,256 L20,256 L10,256 L0,256 Z';
const TORN_TOP_LOWER_PATH = 'M0,256 L10,256 L20,256 L30,256 L40,256 L50,256 L60,256 L70,256 L80,256 L90,256 L100,256 L110,256 L120,256 L130,256 L140,256 L150,256 L160,256 L170,256 L180,256 L190,256 L200,256 L210,256 L220,256 L230,256 L240,256 L250,256 L260,256 L270,256 L280,256 L290,256 L300,256 L310,256 L320,256 L330,256 L340,256 L350,256 L360,256 L370,256 L380,256 L390,256 L400,256 L410,256 L420,256 L430,256 L440,256 L450,256 L460,256 L470,256 L480,256 L490,256 L500,256 L510,256 L520,256 L530,256 L540,256 L550,256 L560,256 L570,256 L580,256 L590,256 L600,256 L610,256 L620,256 L630,256 L640,256 L650,256 L660,256 L670,256 L680,256 L690,256 L700,256 L710,256 L720,256 L730,256 L740,256 L750,256 L760,256 L770,256 L780,256 L790,256 L800,256 L810,256 L820,256 L830,256 L840,256 L850,256 L860,256 L870,256 L880,256 L890,256 L900,256 L910,256 L920,256 L930,256 L940,256 L950,256 L960,256 L970,256 L980,256 L990,256 L1000,256 L1000,230 L0,230 Z';

const TORN_BOT_UPPER_PATH = 'M0,0 L1000,0 L1000,-126 L990,-126 L980,-126 L970,-126 L960,-126 L950,-126 L940,-126 L930,-126 L920,-126 L910,-126 L900,-126 L890,-126 L880,-126 L870,-126 L860,-126 L850,-126 L840,-126 L830,-126 L820,-126 L810,-126 L800,-126 L790,-126 L780,-126 L770,-126 L760,-126 L750,-126 L740,-126 L730,-126 L720,-126 L710,-126 L700,-126 L690,-126 L680,-126 L670,-126 L660,-126 L650,-126 L640,-126 L630,-126 L620,-126 L610,-126 L600,-126 L590,-126 L580,-126 L570,-126 L560,-126 L550,-126 L540,-126 L530,-126 L520,-126 L510,-126 L500,-126 L490,-126 L480,-126 L470,-126 L460,-126 L450,-126 L440,-126 L430,-126 L420,-126 L410,-126 L400,-126 L390,-126 L380,-126 L370,-126 L360,-126 L350,-126 L340,-126 L330,-126 L320,-126 L310,-125 L300,-120 L290,-119 L280,-119 L270,-118 L260,-117 L250,-117 L240,-111 L230,-109 L220,-111 L210,-111 L200,-109 L190,-107 L180,-107 L170,-104 L160,-103 L150,-102 L140,-101 L130,-99 L120,-100 L110,-102 L100,-97 L90,-87 L80,-79 L70,-73 L60,-72 L50,-72 L40,-71 L30,-67 L20,-65 L10,-63 L0,-60 Z';
const TORN_BOT_FIBER_PATH = 'M0,-60 L10,-63 L20,-65 L30,-67 L40,-71 L50,-72 L60,-72 L70,-73 L80,-79 L90,-87 L100,-97 L110,-102 L120,-100 L130,-99 L140,-101 L150,-102 L160,-103 L170,-104 L180,-107 L190,-107 L200,-109 L210,-111 L220,-111 L230,-109 L240,-111 L250,-117 L260,-117 L270,-118 L280,-119 L290,-119 L300,-120 L310,-125 L320,-126 L330,-126 L340,-126 L350,-126 L360,-126 L370,-126 L380,-126 L390,-126 L400,-126 L410,-126 L420,-126 L430,-126 L440,-126 L450,-126 L460,-126 L470,-126 L480,-126 L490,-126 L500,-126 L510,-126 L520,-126 L530,-126 L540,-126 L550,-126 L560,-126 L570,-126 L580,-126 L590,-126 L600,-126 L610,-126 L620,-126 L630,-126 L640,-126 L650,-126 L660,-126 L670,-126 L680,-126 L690,-126 L700,-126 L710,-126 L720,-126 L730,-126 L740,-126 L750,-126 L760,-126 L770,-126 L780,-126 L790,-126 L800,-126 L810,-126 L820,-126 L830,-126 L840,-126 L850,-126 L860,-126 L870,-126 L880,-126 L890,-126 L900,-126 L910,-126 L920,-126 L930,-126 L940,-126 L950,-126 L960,-126 L970,-126 L980,-126 L990,-126 L1000,-126 L1000,20 L990,23 L980,26 L970,27 L960,30 L950,31 L940,31 L930,32 L920,38 L910,46 L900,57 L890,60 L880,59 L870,59 L860,60 L850,63 L840,62 L830,66 L820,66 L810,65 L800,67 L790,70 L780,69 L770,68 L760,70 L750,76 L740,76 L730,77 L720,78 L710,78 L700,79 L690,87 L680,89 L670,90 L660,90 L650,90 L640,92 L630,91 L620,89 L610,86 L600,87 L590,88 L580,93 L570,92 L560,94 L550,94 L540,96 L530,96 L520,101 L510,101 L500,105 L490,108 L480,106 L470,111 L460,113 L450,119 L440,124 L430,129 L420,132 L410,139 L400,144 L390,148 L380,151 L370,154 L360,155 L350,165 L340,164 L330,168 L320,172 L310,175 L300,179 L290,177 L280,175 L270,174 L260,176 L250,174 L240,170 L230,172 L220,173 L210,170 L200,173 L190,176 L180,180 L170,185 L160,183 L150,183 L140,183 L130,182 L120,184 L110,184 L100,187 L90,189 L80,194 L70,194 L60,199 L50,210 L40,211 L30,207 L20,213 L10,216 L0,220 Z';
const TORN_BOT_LOWER_PATH = 'M0,220 L10,216 L20,213 L30,207 L40,211 L50,210 L60,199 L70,194 L80,194 L90,189 L100,187 L110,184 L120,184 L130,182 L140,183 L150,183 L160,183 L170,185 L180,180 L190,176 L200,173 L210,170 L220,173 L230,172 L240,170 L250,174 L260,176 L270,174 L280,175 L290,177 L300,179 L310,175 L320,172 L330,168 L340,164 L350,165 L360,155 L370,154 L380,151 L390,148 L400,144 L410,139 L420,132 L430,129 L440,124 L450,119 L460,113 L470,111 L480,106 L490,108 L500,105 L510,101 L520,101 L530,96 L540,96 L550,94 L560,94 L570,92 L580,93 L590,88 L600,87 L610,86 L620,89 L630,91 L640,92 L650,90 L660,90 L670,90 L680,89 L690,87 L700,79 L710,78 L720,78 L730,77 L740,76 L750,76 L760,70 L770,68 L780,69 L790,70 L800,67 L810,65 L820,66 L830,66 L840,62 L850,63 L860,60 L870,59 L880,59 L890,60 L900,57 L910,46 L920,38 L930,32 L940,31 L950,31 L960,30 L970,27 L980,26 L990,23 L1000,20 L1000,230 L0,230 Z';

// Two framed photos for the beach wedding gallery slider (ready for the 2 user photos)
const GALLERY_PHOTOS = [
  {
    src: '/images/recuerdo-1.webp',
    alt: 'Valentina & Sebastián — Pic-nic al atardecer',
  },
  {
    src: '/images/recuerdo-2.webp',
    alt: 'Valentina & Sebastián — Paseo en el bosque',
  },
];

// Bespoke ragged torn paper polygon mask (irregular handmade deckled edges)
const TORN_PAPER_CLIP = `polygon(
  0.0% 25.7px,
  1.56% 25.9px,
  3.11% 24.5px,
  4.56% 24.5px,
  6.12% 24.5px,
  7.68% 24.5px,
  9.23% 23.3px,
  10.79% 23.3px,
  12.35% 24.1px,
  13.79% 23.3px,
  15.35% 22.1px,
  16.91% 22.1px,
  18.46% 21.0px,
  20.02% 21.0px,
  21.58% 18.6px,
  23.03% 18.6px,
  24.58% 19.8px,
  26.14% 21.0px,
  27.7% 22.1px,
  29.25% 23.3px,
  30.81% 23.3px,
  32.26% 22.1px,
  33.82% 22.1px,
  35.37% 22.1px,
  36.93% 23.3px,
  38.49% 22.1px,
  40.04% 24.5px,
  41.49% 25.7px,
  43.05% 25.7px,
  44.61% 23.3px,
  46.16% 23.3px,
  47.72% 23.0px,
  49.28% 22.1px,
  50.72% 21.0px,
  52.28% 19.8px,
  53.84% 18.6px,
  55.39% 17.4px,
  56.95% 15.0px,
  58.51% 12.7px,
  59.96% 11.5px,
  61.51% 10.3px,
  63.07% 10.3px,
  64.63% 6.7px,
  66.18% 5.6px,
  67.74% 3.2px,
  69.19% 3.2px,
  70.75% 2.0px,
  72.3% 6.7px,
  73.86% 7.9px,
  75.42% 9.1px,
  76.97% 10.3px,
  78.42% 11.2px,
  79.98% 11.5px,
  81.54% 10.7px,
  83.09% 9.1px,
  84.65% 7.9px,
  86.21% 7.2px,
  87.65% 6.7px,
  89.21% 5.6px,
  90.77% 4.4px,
  92.32% 5.6px,
  93.88% 6.9px,
  95.44% 7.8px,
  96.89% 7.9px,
  98.44% 10.3px,
  100.0% 10.3px,
  100.0% calc(100% - 23.7px),
  98.44% calc(100% - 23.9px),
  96.89% calc(100% - 22.6px),
  95.44% calc(100% - 22.6px),
  93.88% calc(100% - 22.6px),
  92.32% calc(100% - 22.6px),
  90.77% calc(100% - 21.6px),
  89.21% calc(100% - 21.6px),
  87.65% calc(100% - 22.2px),
  86.21% calc(100% - 21.6px),
  84.65% calc(100% - 20.5px),
  83.09% calc(100% - 20.5px),
  81.54% calc(100% - 19.4px),
  79.98% calc(100% - 19.4px),
  78.42% calc(100% - 17.2px),
  76.97% calc(100% - 17.2px),
  75.42% calc(100% - 18.3px),
  73.86% calc(100% - 19.4px),
  72.3% calc(100% - 20.5px),
  70.75% calc(100% - 21.6px),
  69.19% calc(100% - 21.6px),
  67.74% calc(100% - 20.5px),
  66.18% calc(100% - 20.5px),
  64.63% calc(100% - 20.5px),
  63.07% calc(100% - 21.6px),
  61.51% calc(100% - 20.5px),
  59.96% calc(100% - 22.6px),
  58.51% calc(100% - 23.7px),
  56.95% calc(100% - 23.7px),
  55.39% calc(100% - 21.6px),
  53.84% calc(100% - 21.6px),
  52.28% calc(100% - 21.3px),
  50.72% calc(100% - 20.5px),
  49.28% calc(100% - 19.4px),
  47.72% calc(100% - 18.3px),
  46.16% calc(100% - 17.2px),
  44.61% calc(100% - 16.1px),
  43.05% calc(100% - 14.0px),
  41.49% calc(100% - 11.8px),
  40.04% calc(100% - 10.7px),
  38.49% calc(100% - 9.6px),
  36.93% calc(100% - 9.6px),
  35.37% calc(100% - 6.3px),
  33.82% calc(100% - 5.3px),
  32.26% calc(100% - 3.1px),
  30.81% calc(100% - 3.1px),
  29.25% calc(100% - 2.0px),
  27.7% calc(100% - 6.3px),
  26.14% calc(100% - 7.4px),
  24.58% calc(100% - 8.5px),
  23.03% calc(100% - 9.6px),
  21.58% calc(100% - 10.4px),
  20.02% calc(100% - 10.7px),
  18.46% calc(100% - 10.0px),
  16.91% calc(100% - 8.5px),
  15.35% calc(100% - 7.4px),
  13.79% calc(100% - 6.8px),
  12.35% calc(100% - 6.3px),
  10.79% calc(100% - 5.3px),
  9.23% calc(100% - 4.2px),
  7.68% calc(100% - 5.3px),
  6.12% calc(100% - 6.5px),
  4.56% calc(100% - 7.3px),
  3.11% calc(100% - 7.4px),
  1.56% calc(100% - 9.6px),
  0.0% calc(100% - 9.6px)
)`;

// Reusable scroll-reveal container: stays hidden until scrolled into view
const ScrollReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}> = ({ children, className = '', threshold = 0.12 }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-[0.98] pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const BeachWeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  const handlePrevPhoto = () => {
    setActivePhoto((prev) => (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhoto((prev) => (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  // Spray airbrush reveal state for hero photo
  const [isSprayed, setIsSprayed] = useState(false);

  // Video reference for ambient particles & light effect (single-play with slow fade-out)
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEffectFading, setIsEffectFading] = useState(false);
  const [isEffectEnded, setIsEffectEnded] = useState(false);

  // Trigger slow fade-out near the end of video duration (duration ~5.16s)
  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (video.duration - video.currentTime <= 1.8) {
      setIsEffectFading(true);
    }
  };

  const handleVideoEnded = () => {
    setIsEffectFading(true);
    setIsEffectEnded(true);
  };

  // Target wedding date: November 14, 2026 at 12:30
  const TARGET_DATE = new Date('2026-11-14T12:30:00').getTime();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Trigger envelope opening
  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setIsEffectFading(false);
      setIsEffectEnded(false);
      // Trigger spray airbrush photo reveal right upon landing
      setTimeout(() => {
        setIsSprayed(true);
      }, 150);
    }, 1600);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpening(false);
    setIsOpen(false);
    setIsSprayed(false);
    setIsEffectFading(false);
    setIsEffectEnded(false);
  };

  // Video playback control: single play upon opening, resetting on close
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      setIsEffectFading(false);
      setIsEffectEnded(false);
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      setIsEffectFading(false);
      setIsEffectEnded(false);
    }
  }, [isOpen]);

  return (
    // Outer Desktop/Tablet Backdrop with Side Bands ("Franjas a ambos lados")
    <div className="w-full min-h-screen bg-[#E5DDD2] flex justify-center items-start">
      {/* Mobile-Proportion Viewport Container (Fixed width 430px on PC/Tablet, Full Width on Mobile) */}
      <div
        onClick={!isOpen ? handleOpenEnvelope : undefined}
        className={`w-full max-w-[430px] min-h-screen relative overflow-x-hidden font-sans transition-colors duration-1000 shadow-[0_0_50px_rgba(70,50,30,0.18)] sm:border-x sm:border-[#D5C6B5] flex flex-col ${
          !isOpen
            ? 'cursor-pointer select-none bg-gradient-to-br from-[#FAF3EB] via-[#F4EAE0] to-[#E9D9CB] justify-center items-center h-[100dvh] p-4 overflow-hidden'
            : 'bg-gradient-to-b from-[#FAF4EC] via-[#F5ECE0] to-[#EBDDCE] text-stone-800'
        }`}
      >
        {/* ========================================================================= */}
        {/* 1. SOBRE CERRADO DECORADO (PAPEL PASTEL + SELLO DE LACRE EN RELIEVE)      */}
        {/* ========================================================================= */}
        {!isOpen && (
          <div className="relative w-full max-w-[390px] flex items-center justify-center my-auto px-1">
            {/* Subtle Instruction Badge */}
            <div
              className={`absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#CDB59E] shadow-md text-xs font-sans font-semibold text-[#2B190E] transition-all duration-300 whitespace-nowrap ${
                isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 animate-pulse'
              }`}
            >
              <span>Toca el sobre para abrir</span>
            </div>

            {/* Envelope Body Container */}
            <div
              className={`relative w-full aspect-[16/10.5] rounded-2xl transition-all duration-700 ${
                isOpening ? 'scale-105' : 'hover:scale-[1.015]'
              }`}
              style={{ perspective: '1600px' }}
            >
              {/* Ambient luxury drop shadow */}
              <div className="absolute inset-0 -bottom-6 bg-[#684832]/25 blur-2xl rounded-2xl transform scale-95" />

              {/* Back Plate / Base Paper Layer */}
              <div className="absolute inset-0 bg-[#F5ECE1] rounded-2xl border border-[#DFCDBC] overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 opacity-35 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#C9B098 0.75px, transparent 0.75px), radial-gradient(#C9B098 0.75px, #F5ECE1 0.75px)`,
                    backgroundSize: '14px 14px',
                    backgroundPosition: '0 0, 7px 7px',
                  }}
                />
                <div className="absolute inset-3 border border-[#D4AF37]/50 rounded-xl pointer-events-none" />
              </div>

              {/* INVITACIÓN DENTRO DEL SOBRE (DESLIZA HACIA ARRIBA) */}
              <div
                className={`absolute inset-x-4 top-3 bottom-3 bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F2] to-[#F8F2E8] rounded-xl shadow-lg border border-[#E5D5C3] p-4 flex flex-col items-center justify-between text-center transition-all duration-1000 ease-out ${
                  isOpening
                    ? '-translate-y-[64%] opacity-100 scale-100 shadow-2xl'
                    : 'translate-y-0 opacity-0 pointer-events-none'
                }`}
                style={{
                  zIndex: isOpening ? 15 : 5,
                }}
              >
                <div className="absolute inset-2 border border-[#D4AF37]/60 rounded-lg pointer-events-none" />
                <div className="absolute inset-3 border border-[#D4AF37]/35 rounded-md pointer-events-none" />

                {/* Top Monogram Crest */}
                <div className="relative pt-1 flex flex-col items-center">
                  <div className="px-3.5 py-0.5 rounded-full border border-[#B8864E] flex items-center justify-center bg-[#FBF4EC] text-[#5A3414] shadow-sm mb-1 whitespace-nowrap">
                    <span className="font-serif text-xs font-bold tracking-[0.25em] whitespace-nowrap">
                      V &amp; S
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#6E421A] font-bold">
                    <span>Nuestra Boda</span>
                  </div>
                </div>

                {/* Couple Names & Title */}
                <div className="my-auto py-1 flex flex-col items-center">
                  <h3 className="font-serif text-2xl text-[#1E130D] font-medium italic leading-tight">
                    Valentina &amp; Sebastián
                  </h3>
                  <div className="flex items-center justify-center gap-2 my-1">
                    <span className="w-6 h-[1.5px] bg-gradient-to-r from-transparent to-[#B8864E]" />
                    <Heart className="w-3 h-3 text-[#B8864E] fill-[#B8864E]" />
                    <span className="w-6 h-[1.5px] bg-gradient-to-l from-transparent to-[#B8864E]" />
                  </div>
                  <p className="font-serif text-xs text-[#382315] font-medium italic mb-1.5">
                    «Celebrando nuestro amor frente al mar»
                  </p>

                  <div className="mt-0.5 px-2.5 py-1 rounded-md bg-[#F7EFE4] border border-[#D9C1A9] shadow-xs flex flex-col items-center gap-0.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A2C12] font-bold">
                      Sábado, 14 de Noviembre · 12:30 hrs
                    </span>
                    <span className="text-[9px] tracking-wider text-[#351E0C] font-semibold">
                      Playa Blanca · Al Mediodía
                    </span>
                  </div>
                </div>

                <div className="relative pb-0.5 text-center">
                  <div className="w-10 h-[1px] bg-[#D4AF37]/60 mx-auto" />
                </div>
              </div>

              {/* FRONT POCKET & SIDE FLAPS */}
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
                <div
                  className="absolute top-0 bottom-0 left-0 w-[53%] bg-gradient-to-r from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-r border-[#DFCDBB]/80 shadow-[2px_0_8px_rgba(90,65,45,0.06)]"
                  style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}
                >
                  <div className="absolute top-3 left-3 w-12 h-12 border-t border-l border-[#D4AF37]/35 pointer-events-none" />
                </div>

                <div
                  className="absolute top-0 bottom-0 right-0 w-[53%] bg-gradient-to-l from-[#F4E8DB] via-[#ECE0D0] to-[#E3D3C1] border-l border-[#DFCDBB]/80 shadow-[-2px_0_8px_rgba(90,65,45,0.06)]"
                  style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)' }}
                >
                  <div className="absolute top-3 right-3 w-12 h-12 border-t border-r border-[#D4AF37]/35 pointer-events-none" />
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-[68%] bg-gradient-to-t from-[#E8D8C7] via-[#EFE2D3] to-[#F7ECE0] border-t border-[#DBC7B4] shadow-[0_-6px_16px_rgba(90,65,45,0.08)] pointer-events-none"
                  style={{ clipPath: 'polygon(0% 100%, 50% 18%, 100% 100%)' }}
                >
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="100"
                      x2="50"
                      y2="18"
                      stroke="#D4AF37"
                      strokeWidth="0.75"
                      strokeOpacity="0.55"
                    />
                    <line
                      x1="100"
                      y1="100"
                      x2="50"
                      y2="18"
                      stroke="#D4AF37"
                      strokeWidth="0.75"
                      strokeOpacity="0.55"
                    />
                  </svg>
                </div>
              </div>

              {/* STICKER / SELLO POSTAL INFERIOR DERECHO */}
              <div className="absolute bottom-3 right-3 pointer-events-none z-30 flex items-center gap-1.5">
                <div className="w-10 h-12 border-2 border-dashed border-[#8E5A2B] bg-[#FFFBF7] rounded p-1 flex flex-col items-center justify-between text-center shadow-xs">
                  <Heart className="w-3 h-3 text-[#8E5A2B] fill-[#8E5A2B]" />
                  <span className="text-[8px] uppercase tracking-wider font-serif font-extrabold text-[#321B0B]">
                    Amor
                  </span>
                  <span className="text-[7px] tracking-widest font-mono font-bold text-[#4E2E16]">
                    2026
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-[#8E5A2B] bg-[#FFFBF7]/95 flex flex-col items-center justify-center text-[7px] text-[#321B0B] font-mono font-bold rotate-12 shadow-xs leading-tight">
                  <span>PLAYA</span>
                  <span>14.NOV</span>
                </div>
              </div>

              {/* TOP TRIANGULAR FLAP */}
              <div
                className="absolute top-0 left-0 right-0 h-[64%] pointer-events-none origin-top transition-all duration-800 ease-in-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'top center',
                  transform: isOpening
                    ? 'rotateX(180deg) translateZ(-8px)'
                    : 'rotateX(0deg) translateZ(0px)',
                  zIndex: isOpening ? 2 : 40,
                  filter: isOpening ? 'none' : 'drop-shadow(0 10px 16px rgba(65, 38, 20, 0.2))',
                }}
              >
                <div
                  className="w-full h-full bg-gradient-to-b from-[#F5EADB] via-[#EEDECF] to-[#E3D1BF] shadow-[0_8px_18px_rgba(80,55,35,0.14)] border-b border-[#D8C4B0] relative"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
                >
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="50"
                      y2="100"
                      stroke="#D4AF37"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                    />
                    <line
                      x1="100"
                      y1="0"
                      x2="50"
                      y2="100"
                      stroke="#D4AF37"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                    />
                  </svg>

                  {/* Valentina & Sebastián escrito directamente en el sobre */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none select-none z-10 w-full px-3">
                    <span
                      className="font-script text-2xl sm:text-3xl text-[#2A1204] leading-tight font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]"
                      style={{
                        fontFamily: "'Great Vibes', cursive",
                      }}
                    >
                      Valentina <span className="text-[#8E5A2B]">&amp;</span> Sebastián
                    </span>
                  </div>
                </div>
              </div>

              {/* SELLO DE CERA REALISTA */}
              <div
                className={`absolute left-1/2 top-[58%] w-[22%] max-w-[96px] -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 pointer-events-none select-none ${
                  isOpening ? 'scale-125 opacity-0 -translate-y-10' : 'scale-100 opacity-100'
                }`}
              >
                <div
                  className="relative w-full aspect-square flex items-center justify-center"
                >
                  <img
                    src="/images/sello-cera.webp"
                    alt="Sello de cera V & S"
                    className="w-full h-full object-contain"
                    style={{
                      filter:
                        'drop-shadow(0px 3px 5px rgba(40, 16, 6, 0.45)) drop-shadow(0px 10px 18px rgba(45, 18, 8, 0.4))',
                    }}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. LANDING PAGE INVITACIÓN ABIERTA (SOLO EN PROPORCIÓN CELULAR)           */}
        {/* ========================================================================= */}
        {isOpen && (
          <div className="w-full animate-fadeIn transition-opacity duration-1000 pb-20 flex flex-col">
            {/* Top Floating Control Bar (permanece dentro de la vista de celular) */}
            <div className="absolute top-3 right-3 z-30 pointer-events-auto">
              <button
                onClick={handleReset}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-[#E2D2C2] shadow-sm text-stone-700 text-xs font-medium transition-all hover:scale-105 active:scale-95"
                title="Volver a cerrar el sobre"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B88960] group-hover:-rotate-90 transition-transform duration-300" />
                <span>Ver sobre</span>
              </button>
            </div>

            {/* SECCIÓN HERO: FOTO VERTICAL (COMPROMETIDOS) CALZADA A BORDES DE ARRIBA Y LADOS */}
            <section className="relative w-full overflow-hidden">
              {/* Photo & Video Container - Full Bleed to Top and Lateral Edges */}
              <div className="relative w-full aspect-[9/13.5] overflow-hidden bg-[#F4E9DC]">
                {/* Foto de Pareja de Novios Comprometidos */}
                <img
                  src="/images/comprometidos.webp"
                  alt="Valentina & Sebastián — Pareja de novios comprometidos"
                  className={`w-full h-full object-cover object-center transition-all duration-[1400ms] ease-out ${
                    isSprayed
                      ? 'opacity-100 scale-100 blur-0 contrast-100'
                      : 'opacity-0 scale-95 blur-md contrast-150'
                  }`}
                  style={{
                    clipPath: isSprayed ? 'circle(100% at 50% 50%)' : 'circle(8% at 50% 50%)',
                    transition:
                      'clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s ease-out, opacity 1s ease-out, transform 1.4s ease-out',
                  }}
                />

                {/* Video Overlay: Miles de Partículas Doradas (Reproducción única con desvanecimiento lento) */}
                <video
                  ref={videoRef}
                  src="/effects/miles_de_particulas_doradas.webm"
                  autoPlay
                  muted
                  playsInline
                  onTimeUpdate={handleVideoTimeUpdate}
                  onEnded={handleVideoEnded}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-[2000ms] ease-out ${
                    isSprayed && !isEffectFading && !isEffectEnded ? 'opacity-90' : 'opacity-0'
                  }`}
                  style={{
                    mixBlendMode: 'screen',
                    filter: 'contrast(125%) brightness(105%)',
                  }}
                >
                  <source src="/effects/miles_de_particulas_doradas.webm" type="video/webm" />
                  <source src="/effects/particulas_y_luz.webm" type="video/webm" />
                  <source src="/effects/supernova.webm" type="video/webm" />
                </video>

                {/* Gentle Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 pointer-events-none z-15" />

                {/* Names Overlay over Photo: ONLY 'Valentina & Sebastián' in cursive */}
                <div
                  className={`absolute inset-0 z-20 flex flex-col items-center justify-end px-5 pb-16 sm:pb-20 text-center text-white transition-all duration-1000 delay-300 pointer-events-none ${
                    isSprayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h1
                    className="font-script text-4xl sm:text-5xl md:text-6xl tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] font-normal py-1"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Valentina <span className="font-light text-amber-100">&amp;</span> Sebastián
                  </h1>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1: PAPEL ROTO CON FLOR DE CONTRASTE — ¡NOS CASAMOS!, FECHA Y COUNTDOWN MANUSCRITO */}
            <div className="relative z-20 w-full -mt-12 sm:-mt-14">
              {/* Main handmade torn paper sheet in warm cream (Edge-to-Edge) */}
              <div
                className="bg-[#F5ECE0] relative w-full px-4 pt-12 pb-11 text-center"
                style={{
                  clipPath: TORN_PAPER_CLIP,
                }}
              >
                {/* Flor botánica de contraste en el borde de papel rasgado */}
                <div className="absolute -top-8 sm:-top-11 right-2 sm:right-4 w-20 sm:w-24 md:w-28 z-30 pointer-events-none transform rotate-12 drop-shadow-[0_6px_12px_rgba(60,25,12,0.25)]">
                  <img
                    src="/images/flor-contraste.webp"
                    alt="Flor de contraste"
                    className="w-full h-auto object-contain select-none"
                    loading="eager"
                  />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* ¡Nos casamos! en letra manuscrita */}
                  <span
                    className="font-script text-3xl sm:text-4xl text-[#B87A4A] font-normal tracking-wide leading-none mb-2"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    ¡Nos casamos!
                  </span>

                  {/* Fecha en Letras Manuscritas (Great Vibes) */}
                  <h2
                    className="font-script text-2xl sm:text-3xl md:text-4xl text-[#2F2420] font-normal tracking-wide mb-6 leading-tight"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Sábado, 14 de Noviembre de 2026
                  </h2>

                  {/* Cuenta Regresiva con números manuscritos en tono crema */}
                  <div className="w-full">
                    <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                      {/* Días */}
                      <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#2F2420] font-normal leading-none mb-0.5"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {timeLeft.days}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Días
                        </span>
                      </div>

                      {/* Horas */}
                      <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#2F2420] font-normal leading-none mb-0.5"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {String(timeLeft.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Horas
                        </span>
                      </div>

                      {/* Minutos */}
                      <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#2F2420] font-normal leading-none mb-0.5"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Min
                        </span>
                      </div>

                      {/* Segundos */}
                      <div className="bg-[#FAF3E8] rounded-xl border border-[#DFCBB5] p-2 sm:p-2.5 shadow-xs flex flex-col items-center justify-center">
                        <span
                          className="font-script text-3xl sm:text-4xl text-[#B87A4A] font-normal leading-none mb-0.5 animate-pulse"
                          style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#916E49] uppercase font-semibold">
                          Seg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DIVISOR SUPERIOR DE PAPEL RASGADO (DIVIDE COUNTDOWN DE LA FRASE) */}
            <div className="w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-10">
              <svg
                viewBox="0 0 1000 230"
                preserveAspectRatio="none"
                className="w-full h-12 sm:h-16 block"
              >
                <path d={TORN_TOP_FIBER_PATH} fill="#FFFFFF" />
                <path
                  d={TORN_TOP_UPPER_PATH}
                  fill="#F5ECE0"
                  style={{ filter: 'drop-shadow(0px 3px 4px rgba(60, 35, 18, 0.18))' }}
                />
              </svg>
            </div>

            {/* SECCIÓN 2: FRASE ROMÁNTICA SOLA EN SU PROPIA SECCIÓN (COLOR BLANCO PURO #FFFFFF DE BANDA-PAPEL-BLANCO.WEBP) */}
            <div
              className="w-full pl-12 pr-6 sm:px-10 py-8 sm:py-10 text-center relative z-10 overflow-hidden"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <ScrollReveal className="relative z-10 w-full flex flex-col items-center">
                {/* Flor botánica de contraste que emerge desde el borde izquierdo centro con sutil transparencia */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-6 sm:-left-7 w-20 sm:w-24 md:w-26 z-10 pointer-events-none opacity-60 drop-shadow-[0_6px_14px_rgba(60,25,12,0.18)] animate-flower-sway-left">
                  <img
                    src="/images/flor-contraste.webp"
                    alt="Flor de contraste"
                    className="w-full h-auto object-contain select-none transform rotate-45"
                    loading="lazy"
                  />
                </div>

                <p
                  className="font-script text-2xl sm:text-3xl text-[#2F2420] leading-relaxed max-w-sm mx-auto font-normal relative z-20"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  «A orillas del mar, donde cada ola nos recuerda la inmensidad del camino que elegimos recorrer juntos, decidimos dar el paso más importante de nuestras vidas.»
                </p>

                {/* Animación CSS integrada para movimiento suave de la flor desde la izquierda centro */}
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes flowerSwayLeftKeyframes {
                    0%, 100% {
                      transform: translateY(-50%) rotate(38deg) scale(1);
                    }
                    50% {
                      transform: translateY(calc(-50% - 4px)) rotate(46deg) scale(1.04);
                    }
                  }
                  .animate-flower-sway-left {
                    animation: flowerSwayLeftKeyframes 4.5s ease-in-out infinite;
                    transform-origin: center left;
                  }
                ` }} />
              </ScrollReveal>
            </div>

            {/* DIVISOR INFERIOR DE PAPEL RASGADO (DIVIDE LA FRASE DE LAS FOTOS) */}
            <div className="w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-10">
              <svg
                viewBox="0 0 1000 230"
                preserveAspectRatio="none"
                className="w-full h-12 sm:h-16 block"
              >
                <path d={TORN_BOT_LOWER_PATH} fill="#EBDDCE" />
                <path
                  d={TORN_BOT_FIBER_PATH}
                  fill="#FFFFFF"
                  style={{ filter: 'drop-shadow(0px 3px 4px rgba(60, 35, 18, 0.18))' }}
                />
              </svg>
            </div>

            {/* SECCIÓN 3: GALERÍA DE MARCOS DE FOTOS DESLIZABLES CON FLECHA (SIN RECUADRO EXTERIOR, EN CREMA) */}
            <ScrollReveal className="w-full bg-[#EBDDCE] px-4 pt-6 pb-8 flex flex-col items-center">
              <div className="relative w-full max-w-[350px] flex items-center justify-center">
                {/* Botón Flecha Izquierda */}
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label="Foto anterior"
                  className="absolute -left-2 sm:-left-3 z-30 w-10 h-10 rounded-full bg-[#F5ECE0]/95 hover:bg-[#FAF3E8] border border-[#C8AD90] shadow-md flex items-center justify-center text-[#5A3E28] transition-all hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Ventana de Marco Artesanal Único (Solo 1 marco visible sin fracciones del otro) */}
                <div className="w-full px-4 py-2 flex justify-center">
                  <div className="relative w-full max-w-[285px] aspect-[4/5.3]">
                    {GALLERY_PHOTOS.map((photo, index) => {
                      const isActive = index === activePhoto;
                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-600 ease-out ${
                            isActive
                              ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto z-10'
                              : index < activePhoto
                              ? 'opacity-0 scale-95 -translate-x-10 pointer-events-none z-0'
                              : 'opacity-0 scale-95 translate-x-10 pointer-events-none z-0'
                          }`}
                        >
                          {/* Marco de Foto Artesanal Acorde a Boda en la Playa */}
                          <div
                            className={`relative w-full h-full bg-[#F7EFE4] p-3.5 pb-5 rounded-sm shadow-[0_10px_28px_rgba(65,42,24,0.18)] border border-[#DFCBB5] flex flex-col justify-between ${
                              index % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'
                            }`}
                          >
                            {/* Cinta adhesiva artesanal tipo washi-tape en la parte superior */}
                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#EEDCC9]/85 border border-[#D9C3AC]/60 shadow-2xs rotate-[-2deg] pointer-events-none z-20" />

                            {/* Borde interior dorado fino con foto */}
                            <div className="relative w-full flex-1 overflow-hidden border border-[#C8A97E]/60 bg-[#EADBC8] rounded-2xs">
                              <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                loading="lazy"
                              />
                              {/* Sutil marco interno en filigrana */}
                              <div className="absolute inset-2 border border-[#FAF3E8]/45 pointer-events-none" />
                            </div>

                            {/* Detalle inferior del marco */}
                            <div className="mt-2.5 flex items-center justify-center gap-2">
                              <span className="w-6 h-[1px] bg-[#C8A97E]/60" />
                              <Heart className="w-2.5 h-2.5 text-[#B8864E] fill-[#B8864E]/80" />
                              <span className="w-6 h-[1px] bg-[#C8A97E]/60" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Botón Flecha Derecha */}
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label="Foto siguiente"
                  className="absolute -right-2 sm:-right-3 z-30 w-10 h-10 rounded-full bg-[#F5ECE0]/95 hover:bg-[#FAF3E8] border border-[#C8AD90] shadow-md flex items-center justify-center text-[#5A3E28] transition-all hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicadores de posición del carrusel */}
              <div className="flex items-center justify-center gap-2 mt-2">
                {GALLERY_PHOTOS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhoto(idx)}
                    aria-label={`Ir a la foto ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activePhoto === idx
                        ? 'w-6 bg-[#B8864E]'
                        : 'w-2 bg-[#C8B098] hover:bg-[#B89B7E]'
                    }`}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* FIRMA FINAL DE LA INVITACIÓN: VALENTINA & SEBASTIÁN CON CORAZÓN */}
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
          </div>
        )}
      </div>
    </div>
  );
};
