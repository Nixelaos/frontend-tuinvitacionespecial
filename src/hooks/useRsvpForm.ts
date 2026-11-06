import { useState, useEffect } from 'react';
import type { AttendanceStatus, RsvpFormValues } from '../types/rsvp';

interface UseRsvpFormOptions {
  maxPasses: number;
  defaultMenu?: string;
}

/**
 * Gestiona el estado, reglas de validación y envío del formulario RSVP.
 * Agnóstico al diseño visual para ser reutilizado en cualquier plantilla de invitación.
 */
export const useRsvpForm = ({
  maxPasses,
  defaultMenu = 'Estándar',
}: UseRsvpFormOptions) => {
  const [formValues, setFormValues] = useState<RsvpFormValues>({
    attendance: 'yes',
    attendeesCount: maxPasses,
    selectedMenus: [defaultMenu],
    allergies: '',
    song: '',
    dedication: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sincronizar cantidad de asistentes inicial cuando se resuelven los pases de la URL
  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      attendeesCount: maxPasses,
    }));
  }, [maxPasses]);

  const setAttendance = (attendance: AttendanceStatus) => {
    setFormValues((prev) => ({ ...prev, attendance }));
  };

  const decrementAttendees = () => {
    setFormValues((prev) => ({
      ...prev,
      attendeesCount: Math.max(1, prev.attendeesCount - 1),
    }));
  };

  const incrementAttendees = () => {
    setFormValues((prev) => ({
      ...prev,
      attendeesCount: Math.min(maxPasses, prev.attendeesCount + 1),
    }));
  };

  const toggleMenu = (label: string) => {
    setFormValues((prev) => {
      const exists = prev.selectedMenus.includes(label);
      if (exists) {
        if (prev.selectedMenus.length === 1) return prev; // Mantener al menos 1 seleccionado
        return {
          ...prev,
          selectedMenus: prev.selectedMenus.filter((m) => m !== label),
        };
      }
      return {
        ...prev,
        selectedMenus: [...prev.selectedMenus, label],
      };
    });
  };

  const updateTextField = (
    field: 'allergies' | 'song' | 'dedication',
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const resetSubmission = () => {
    setIsSubmitted(false);
  };

  return {
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
  };
};
