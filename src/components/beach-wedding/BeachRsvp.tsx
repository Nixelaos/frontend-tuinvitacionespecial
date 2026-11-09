import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { BeachRsvpForm } from './rsvp/BeachRsvpForm';
import { BeachRsvpSuccess } from './rsvp/BeachRsvpSuccess';
import { useInvitationParams } from '../../hooks/useInvitationParams';
import { useRsvpForm } from '../../hooks/useRsvpForm';
import { buildRsvpSalutation } from '../../utils/greetingUtils';
import {
  buildGoogleCalendarUrl,
  downloadIcsFile,
} from '../../utils/calendarUtils';
import { buildRsvpWhatsAppUrl } from '../../utils/whatsappUtils';
import {
  BEACH_WEDDING_RSVP_CONFIG,
  DEFAULT_MENU_OPTIONS,
} from '../../data/weddingData';

export const BeachRsvp: React.FC = () => {
  const { guestName, maxPasses } = useInvitationParams();

  const {
    formValues,
    isSubmitted,
    isSubmitting,
    setAttendance,
    decrementAttendees,
    incrementAttendees,
    toggleMenu,
    updateTextField,
    handleSubmit,
    resetSubmission,
  } = useRsvpForm({ maxPasses });

  const salutationText = buildRsvpSalutation(guestName, maxPasses);
  const googleCalendarUrl = buildGoogleCalendarUrl(BEACH_WEDDING_RSVP_CONFIG);
  const whatsAppUrl = buildRsvpWhatsAppUrl({
    guestName,
    maxPasses,
    formValues,
    config: BEACH_WEDDING_RSVP_CONFIG,
  });

  const handleDownloadIcs = () => {
    downloadIcsFile(BEACH_WEDDING_RSVP_CONFIG);
  };

  return (
    <div className="w-full bg-[#EBDDCE] px-4 py-10 sm:py-14 text-[#2F2420] relative z-10 transition-colors duration-500">
      <ScrollReveal className="w-full max-w-sm sm:max-w-md mx-auto">
        {/* TARJETA DE RESPUESTA ARTESANAL (RESPONSE CARD) */}
        <div className="relative bg-[#FCF9F3] border border-[#DFCBB5] rounded-xl p-5 sm:p-7 shadow-[0_8px_30px_rgba(70,45,25,0.08)]">
          {/* Filete interior sutil tipo papelería de alta gama */}
          <div className="absolute inset-2 sm:inset-2.5 border border-[#E8DCCF] rounded-lg pointer-events-none" />

          {!isSubmitted ? (
            <BeachRsvpForm
              salutationText={salutationText}
              maxPasses={maxPasses}
              menuOptions={DEFAULT_MENU_OPTIONS}
              rsvpDeadlineDisplay={BEACH_WEDDING_RSVP_CONFIG.rsvpDeadlineDisplay}
              formValues={formValues}
              isSubmitting={isSubmitting}
              onSetAttendance={setAttendance}
              onDecrementAttendees={decrementAttendees}
              onIncrementAttendees={incrementAttendees}
              onToggleMenu={toggleMenu}
              onUpdateTextField={updateTextField}
              onSubmit={handleSubmit}
            />
          ) : (
            <BeachRsvpSuccess
              guestName={guestName}
              formValues={formValues}
              eventConfig={BEACH_WEDDING_RSVP_CONFIG}
              googleCalendarUrl={googleCalendarUrl}
              whatsAppUrl={whatsAppUrl}
              onDownloadIcs={handleDownloadIcs}
              onReset={resetSubmission}
            />
          )}
        </div>
      </ScrollReveal>
    </div>
  );
};
