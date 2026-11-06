import type { RsvpEventConfig, RsvpFormValues } from '../types/rsvp';

interface BuildWhatsAppUrlParams {
  guestName: string;
  maxPasses: number;
  formValues: RsvpFormValues;
  config: RsvpEventConfig;
}

/**
 * Construye el enlace de WhatsApp con el resumen formateado de la respuesta RSVP.
 */
export const buildRsvpWhatsAppUrl = ({
  guestName,
  maxPasses,
  formValues,
  config,
}: BuildWhatsAppUrlParams): string => {
  const { attendance, attendeesCount, selectedMenus, allergies, song, dedication } =
    formValues;

  const statusText =
    attendance === 'yes' ? '✨ ¡Sí, ahí estaré!' : '💌 No podré asistir';

  let text = `*Confirmación de Asistencia — ${config.eventTitle}*\n\n`;
  text += `👤 *Invitado:* ${guestName}\n`;
  text += `💌 *Respuesta:* ${statusText}\n`;

  if (attendance === 'yes') {
    text += `👥 *Asistentes:* ${attendeesCount} de ${maxPasses} pases reservados\n`;
    text += `🍽️ *Preferencia de Menú:* ${selectedMenus.join(', ')}\n`;
    if (allergies.trim()) {
      text += `⚠️ *Alergias / Restricciones:* ${allergies.trim()}\n`;
    }
    if (song.trim()) {
      text += `🎵 *Canción para la fiesta:* ${song.trim()}\n`;
    }
  }

  if (dedication.trim()) {
    text += `✍️ *Dedicatoria:* «${dedication.trim()}»\n`;
  }

  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
};
