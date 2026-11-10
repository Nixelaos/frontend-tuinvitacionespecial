import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode';
import {
  Camera,
  Copy,
  Check,
  Maximize2,
  UploadCloud,
  Download,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { BeachFlower } from './BeachFlower';

export interface BeachPhotoAlbumProps {
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

export const BeachPhotoAlbum: React.FC<BeachPhotoAlbumProps> = ({
  className = '',
  title = 'Álbum de Fotos',
  badgeText = 'Comparte tus Recuerdos',
  subtitle = '¡Queremos ver la boda con tus ojos!',
  description = 'Los momentos más especiales se viven desde muchos ángulos. Ayúdanos a capturar cada instante compartiendo las fotos y videos que tomes durante nuestro gran día.',
  albumUrl = 'https://photos.app.goo.gl/valentina-y-sebastian-2026',
  imageSrc = '/images/album.png',
  imageAlt = 'Álbum de fotos del matrimonio',
  showFlower = true,
  flowerVariant = 'right',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(albumUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = albumUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className={`w-full bg-[#FAF4EC] px-4 py-8 sm:py-12 text-[#2F2420] relative z-10 transition-colors duration-500 overflow-hidden ${className}`}
    >
      {/* Flor botánica de contraste en el lateral derecho superior para balancear el diseño */}
      {showFlower && (
        <BeachFlower
          variant={flowerVariant}
          className="absolute -top-5 sm:-top-7 -right-3 sm:-right-4 w-16 sm:w-20 md:w-24 z-20 drop-shadow-[0_6px_12px_rgba(60,25,12,0.22)]"
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
            {/* Badge con ícono */}
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#A26D3E] mb-2">
              <Camera className="w-3.5 h-3.5 text-[#B87A4A]" />
              <span>{badgeText}</span>
            </div>

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

            {/* FOTO DE ALBUM.PNG (desde images public) */}
            <div className="relative flex justify-center items-center mb-5 group">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-24 sm:w-28 md:w-32 h-auto object-contain drop-shadow-[0_8px_20px_rgba(70,45,25,0.18)] select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* RECUADRO CON EL CÓDIGO QR ESCANEABLE */}
            <div className="relative w-full max-w-[270px] bg-[#FCF9F3] border-2 border-[#DFCBB5] rounded-2xl p-4 shadow-sm flex flex-col items-center">
              {/* Esquinas decorativas de escaneo estilo visor de cámara */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#B87A4A] rounded-tl-xs pointer-events-none" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#B87A4A] rounded-tr-xs pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#B87A4A] rounded-bl-xs pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#B87A4A] rounded-br-xs pointer-events-none" />

              {/* Botón táctil para ampliar el código QR */}
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
                className="group relative cursor-pointer bg-white p-2.5 rounded-xl border border-[#E5D7C7] shadow-inner transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#B87A4A]/40"
                title="Toca para ampliar el código QR"
              >
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Código QR para subir fotos del matrimonio"
                    className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-40 h-40 sm:w-44 sm:h-44 flex flex-col items-center justify-center bg-stone-100 rounded-lg text-stone-400 gap-2">
                    <Sparkles className="w-8 h-8 text-[#B87A4A] animate-pulse" />
                    <span className="text-[11px]">Generando QR...</span>
                  </div>
                )}

                {/* Overlay hover con indicación visual */}
                <div className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <span className="bg-white/95 text-[#7A4920] text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Ampliar QR
                  </span>
                </div>
              </div>

              {/* Instrucción visual */}
              <p className="mt-2.5 text-xs font-medium text-[#8C5E35] tracking-wide text-center">
                Escanea con la cámara de tu celular
              </p>
            </div>

            {/* BOTÓN PRINCIPAL DE LLAMADO A LA ACCIÓN (SUBIR FOTOS AL ÁLBUM) */}
            <a
              href={albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[270px] mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B87A4A] to-[#A06437] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              title="Abrir álbum para subir fotos"
            >
              <UploadCloud className="w-4 h-4 stroke-[2.5]" />
              <span>Subir Fotos al Álbum</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2] opacity-80" />
            </a>

            {/* ACCIONES SECUNDARIAS (COPIAR ENLACE Y AMPLIAR QR) */}
            <div className="flex items-center gap-2 mt-2 w-full max-w-[270px]">
              {/* Botón copiar enlace */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#FCF9F3] hover:bg-[#F2E5D5] border border-[#DFCBB5] text-[#7D5F48] hover:text-[#2F2420] text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
                title="Copiar enlace del álbum compartido"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="text-emerald-700">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar enlace</span>
                  </>
                )}
              </button>

              {/* Botón ampliar */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#FCF9F3] hover:bg-[#F2E5D5] border border-[#DFCBB5] text-[#7D5F48] hover:text-[#2F2420] text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
                title="Ver código QR en pantalla completa"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Ampliar QR</span>
              </button>
            </div>

            {/* Tip amigable para móviles */}
            <p className="mt-3 text-[11px] text-[#A0816C] italic leading-tight max-w-[260px]">
              Tip: Si estás leyendo esta invitación desde tu celular, pulsa «Subir Fotos al Álbum» para ingresar directamente.
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

export const BeachPhotoQr = BeachPhotoAlbum;
