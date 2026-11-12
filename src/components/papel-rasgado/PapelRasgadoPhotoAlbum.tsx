import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode';
import {
  Camera,
  Download,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { PapelRasgadoFlower } from './PapelRasgadoFlower';
import { PAPEL_RASGADO_ALBUM_CONFIG } from '../../data/templates/papelRasgadoData';

export interface PapelRasgadoPhotoAlbumProps {
  className?: string;
  title?: string;
  badgeText?: string;
  subtitle?: string;
  description?: string;
  albumUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
  showFlower?: boolean;
  flowerVariant?: 'left' | 'right' | 'gentle';
}

export const PapelRasgadoPhotoAlbum: React.FC<PapelRasgadoPhotoAlbumProps> = ({
  className = '',
  title = PAPEL_RASGADO_ALBUM_CONFIG.title,
  badgeText = PAPEL_RASGADO_ALBUM_CONFIG.badge,
  subtitle = PAPEL_RASGADO_ALBUM_CONFIG.subtitle,
  description = PAPEL_RASGADO_ALBUM_CONFIG.description,
  albumUrl = PAPEL_RASGADO_ALBUM_CONFIG.albumUrl,
  imageSrc = PAPEL_RASGADO_ALBUM_CONFIG.imageSrc,
  imageAlt = PAPEL_RASGADO_ALBUM_CONFIG.imageAlt,
  showFlower = true,
  flowerVariant = 'right',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generar el código QR dinámicamente con alta nitidez y contraste adaptado a la estética
  useEffect(() => {
    let isCancelled = false;

    QRCode.toDataURL(albumUrl, {
      width: 400,
      margin: 1,
      color: {
        dark: '#2F2420', // Tono café oscuro de la paleta general
        light: '#FFFFFF', // Fondo blanco nítido para máxima compatibilidad con escáneres
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (!isCancelled) {
          setQrDataUrl(url);
        }
      })
      .catch((err) => {
        console.error('Error al generar código QR para el álbum:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [albumUrl]);

  // Manejo de modal de ampliación (bloqueo de scroll y tecla Escape)
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div
      className={`w-full bg-[#FAF4EC] px-4 py-8 sm:py-12 text-[#2F2420] relative z-30 transition-colors duration-500 ${className}`}
    >
      {/* Animación fluida lenta para la frase ¡Scanéame! */}
      <style>{`
        @keyframes floatAlbumSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float-slow-album {
          animation: floatAlbumSlow 3s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* Flor botánica de contraste en el lateral derecho superior colocada sobre todo */}
      {showFlower && (
        <PapelRasgadoFlower
          variant={flowerVariant}
          className="absolute -top-5 sm:-top-7 right-1 sm:right-2 w-16 sm:w-20 md:w-24 z-40 drop-shadow-[0_6px_14px_rgba(60,25,12,0.25)]"
          delayMs={150}
        />
      )}

      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-6">
          <h2
            className="font-script text-4xl sm:text-5xl text-[#B87A4A] font-normal leading-tight tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {title}
          </h2>

          {/* Separador ornamental delicado */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFCBB5] to-transparent mt-2" />
        </div>

        {/* CONTENIDO DEL ÁLBUM (DIRECTO SOBRE EL FONDO) */}
        <div className="relative w-full flex flex-col items-center text-center">
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Subtítulo emotivo */}
            <h3
              className="text-xl sm:text-2xl text-[#2F2420] font-medium leading-snug mb-1.5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {subtitle}
            </h3>

            {/* Mensaje explicativo */}
            <p className="text-xs sm:text-sm text-[#7D5F48] leading-relaxed max-w-xs sm:max-w-sm mb-4">
              {description}
            </p>

            {/* FOTO DE ALBUM.PNG EN SU TAMAÑO REAL DE 150PX (SIN HOVER ZOOM) */}
            <div className="relative flex justify-center items-center mb-4">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-[150px] h-[150px] object-contain drop-shadow-[0_8px_20px_rgba(70,45,25,0.18)] select-none pointer-events-none"
                loading="lazy"
              />
            </div>

            {/* CÓDIGO QR DIRECTO SOBRE EL FONDO (SIN HOVER ZOOM) */}
            <div
              onClick={() => setIsModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              className="cursor-pointer bg-white p-2 rounded-xl border border-[#DFCBB5] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#B87A4A]/40"
              title="Toca para ampliar el código QR"
            >
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Código QR para subir fotos del matrimonio"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center bg-stone-100 rounded-lg text-stone-400 gap-1">
                  <Sparkles className="w-5 h-5 text-[#B87A4A] animate-pulse" />
                  <span className="text-[9px]">Generando QR...</span>
                </div>
              )}
            </div>

            {/* FRASE INDICATIVA FLOTANTE CON ESPACIO CÓMODO RESPECTO AL QR */}
            <p className="mt-5 sm:mt-6 text-xs sm:text-[13px] font-medium text-[#8C5E35] tracking-wide text-center animate-float-slow-album">
              (¡Scanéame!)
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* MODAL DESPLEGABLE EN PORTAL PARA VER O PROYECTAR EL CÓDIGO QR EN GRANDE */}
      {isModalOpen && mounted && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsModalOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="qr-modal-title"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[340px] sm:max-w-[380px] max-h-[90dvh] overflow-y-auto bg-[#FAF3EB] border-2 border-[#CDB8A3] rounded-2xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(30,15,5,0.45)] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
              >
                {/* Filete interior sutil */}
                <div className="absolute inset-2 sm:inset-2.5 border-2 border-[#E0D2C2] rounded-xl pointer-events-none" />

                {/* Botón cerrar X */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white border-2 border-[#CDB8A3] flex items-center justify-center text-[#8C6947] hover:text-[#2F2420] transition-colors shadow-xs cursor-pointer"
                  aria-label="Cerrar ventana"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Encabezado del modal */}
                <div className="relative z-10 flex flex-col items-center w-full mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#FCF9F3] border-2 border-[#CDB8A3] shadow-xs flex items-center justify-center text-[#B87A4A] mb-2">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h3
                    id="qr-modal-title"
                    className="text-xl sm:text-2xl text-[#2F2420] font-bold leading-snug tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Fotos del Matrimonio
                  </h3>
                  <p className="text-xs text-[#7D5F48] mt-1 max-w-xs">
                    Escanea este código con cualquier teléfono celular para compartir tus recuerdos.
                  </p>
                </div>

                {/* Código QR ampliado con marco */}
                <div className="relative z-10 bg-white p-3.5 rounded-2xl border-2 border-[#CDB8A3] shadow-sm mb-4">
                  {qrDataUrl && (
                    <img
                      src={qrDataUrl}
                      alt="Código QR del álbum en tamaño ampliado"
                      className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Botones de acción en modal */}
                <div className="relative z-10 flex flex-col gap-2 w-full">
                  {/* Descargar QR */}
                  {qrDataUrl && (
                    <a
                      href={qrDataUrl}
                      download="qr-fotos-matrimonio.png"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B87A4A] to-[#A06437] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 stroke-[2.5]" />
                      <span>Descargar Imagen QR</span>
                    </a>
                  )}

                  {/* Ir al álbum */}
                  <a
                    href={albumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#FCF9F3] hover:bg-[#F2E5D5] border-2 border-[#DFCBB5] text-[#7D5F48] hover:text-[#2F2420] text-xs font-bold transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Abrir Enlace del Álbum</span>
                  </a>
                </div>

                {/* Botón inferior para cerrar */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="relative z-10 mt-3 text-xs font-bold text-[#8C6947] hover:text-[#2F2420] transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

export const PapelRasgadoPhotoQr = PapelRasgadoPhotoAlbum;
export const BeachPhotoAlbum = PapelRasgadoPhotoAlbum;
export const BeachPhotoQr = PapelRasgadoPhotoAlbum;
export type { PapelRasgadoPhotoAlbumProps as BeachPhotoAlbumProps };
