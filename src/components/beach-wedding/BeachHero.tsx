import React, { useRef, useState, useEffect } from 'react';

interface BeachHeroProps {
  isSprayed: boolean;
}

export const BeachHero: React.FC<BeachHeroProps> = ({ isSprayed }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEffectFading, setIsEffectFading] = useState(false);
  const [isEffectEnded, setIsEffectEnded] = useState(false);

  // Trigger slow fade-out near the end of video duration (~5.16s)
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

  // Video playback control: single play upon spray reveal
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSprayed) {
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
  }, [isSprayed]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Photo & Video Container - Full Bleed to Top and Lateral Edges */}
      <div className="relative w-full aspect-[9/13.5] overflow-hidden bg-[#F4E9DC]">
        {/* Foto de Pareja de Novios Comprometidos */}
        <img
          src="/images/comprometidos.webp"
          alt="Valentina & Sebastián — Pareja de novios comprometidos"
          className={`w-full h-full object-cover object-center transition-[filter,opacity] duration-[1400ms] ease-out ${
            isSprayed
              ? 'blur-0 opacity-100 contrast-100'
              : 'blur-md opacity-100 contrast-105'
          }`}
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
          className={`absolute inset-0 z-20 flex flex-col items-center justify-end px-5 pb-16 sm:pb-20 text-center text-white transition-opacity duration-1000 delay-200 pointer-events-none ${
            isSprayed ? 'opacity-100' : 'opacity-0'
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
  );
};
