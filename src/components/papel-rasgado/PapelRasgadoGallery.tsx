import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { GALLERY_PHOTOS } from './constants/tornPaperPaths';

export const PapelRasgadoGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);

  const handlePrevPhoto = () => {
    setActivePhoto((prev) => (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhoto((prev) => (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  // Gallery video reveal state for the first photo
  const galleryVideoRef = useRef<HTMLVideoElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const [isGalleryInView, setIsGalleryInView] = useState(false);
  const [isGalleryEffectEnded, setIsGalleryEffectEnded] = useState(false);

  // Observer for Gallery: triggers ink/liquid reveal on the first photo
  useEffect(() => {
    const el = galleryContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGalleryInView(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Trigger smooth fade-out near end of gallery video
  const handleGalleryVideoTimeUpdate = () => {
    const video = galleryVideoRef.current;
    if (!video || !video.duration) return;
    if (video.duration - video.currentTime <= 1.8) {
      setIsGalleryEffectEnded(true);
    }
  };

  // Play gallery video when scrolled into view and photo 0 is active
  useEffect(() => {
    const video = galleryVideoRef.current;
    if (!video) return;

    if (isGalleryInView && activePhoto === 0 && !isGalleryEffectEnded) {
      video.playbackRate = 1.8;
      video.play().catch(() => {});
    }
  }, [isGalleryInView, activePhoto, isGalleryEffectEnded]);

  return (
    <div className="w-full bg-[#EBDDCE] px-4 pt-6 pb-8 flex flex-col items-center">
      <div ref={galleryContainerRef} className="relative w-full max-w-[350px] flex items-center justify-center">
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
                    <div className="relative w-full flex-1 overflow-hidden border border-[#C8A97E]/60 bg-white rounded-2xs isolate">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                      {index === 0 && (
                        <video
                          ref={galleryVideoRef}
                          src="/effects/black-liquid-reveal.webm"
                          autoPlay
                          playsInline
                          muted
                          onTimeUpdate={handleGalleryVideoTimeUpdate}
                          onEnded={() => setIsGalleryEffectEnded(true)}
                          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ease-out ${
                            isGalleryEffectEnded ? 'opacity-0' : 'opacity-100'
                          }`}
                          style={{
                            mixBlendMode: 'screen',
                            filter: 'contrast(220%) brightness(115%)',
                          }}
                        />
                      )}
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
    </div>
  );
};

export const BeachGallery = PapelRasgadoGallery;
