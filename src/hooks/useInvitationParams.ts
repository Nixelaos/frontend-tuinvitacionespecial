import { useState, useEffect } from 'react';
import type { InvitationGuestData } from '../types/rsvp';

interface UseInvitationParamsOptions {
  defaultGuestName?: string;
  defaultMaxPasses?: number;
}

interface DecodedTokenPayload {
  n?: string;
  nombre?: string;
  name?: string;
  p?: number | string;
  pases?: number | string;
  passes?: number | string;
}

/**
 * Extrae y resuelve los datos del invitado desde la URL (query params o token).
 * Preparado para operar en Modo Demo local y conectarse al Backend mediante el token.
 */
export const useInvitationParams = (
  options: UseInvitationParamsOptions = {}
): InvitationGuestData => {
  const { defaultGuestName = 'Familia García', defaultMaxPasses = 2 } = options;

  const [guestData, setGuestData] = useState<InvitationGuestData>({
    guestName: defaultGuestName,
    maxPasses: defaultMaxPasses,
    token: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    let resolvedName = defaultGuestName;
    let resolvedPasses = defaultMaxPasses;

    const nameParam =
      params.get('n') ||
      params.get('nombre') ||
      params.get('invitado') ||
      params.get('guest');

    if (nameParam && nameParam.trim()) {
      resolvedName = nameParam.trim();
    }

    const passesParam =
      params.get('pases') || params.get('passes') || params.get('cupos');

    if (passesParam) {
      const parsed = parseInt(passesParam, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 10) {
        resolvedPasses = parsed;
      }
    }

    const tokenParam = params.get('token') || params.get('t');
    if (tokenParam) {
      try {
        const binary = atob(tokenParam);
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        const parsed = JSON.parse(decoded) as DecodedTokenPayload;

        const tokenName = parsed.n || parsed.nombre || parsed.name;
        if (tokenName && typeof tokenName === 'string' && tokenName.trim()) {
          resolvedName = tokenName.trim();
        }

        const rawPasses = parsed.p ?? parsed.pases ?? parsed.passes;
        if (rawPasses !== undefined) {
          const p = parseInt(String(rawPasses), 10);
          if (!isNaN(p) && p > 0 && p <= 10) {
            resolvedPasses = p;
          }
        }
      } catch {
        if (!nameParam && tokenParam.length < 40) {
          const cleanToken = tokenParam.replace(/[-_]/g, ' ');
          resolvedName = cleanToken.replace(/\b\w/g, (c) => c.toUpperCase());
        }
      }
    }

    setGuestData({
      guestName: resolvedName,
      maxPasses: resolvedPasses,
      token: tokenParam,
    });
  }, [defaultGuestName, defaultMaxPasses]);

  return guestData;
};
