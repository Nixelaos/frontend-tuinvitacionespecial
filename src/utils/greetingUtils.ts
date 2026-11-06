const FEMALE_NAMES_ENDING_IN_O = new Set([
  'rocío',
  'rocio',
  'consuelo',
  'amparo',
  'rosario',
  'lucero',
  'charo',
  'sagrario',
  'socorro',
]);

/**
 * Determina el saludo cordial y refinado según el nombre del destinatario y sus pases.
 */
export const buildRsvpSalutation = (guestName: string, maxPasses: number): string => {
  const lowerName = guestName.trim().toLowerCase();
  const firstWord = lowerName.split(/\s+/)[0] || '';
  const isFamily = lowerName.includes('familia');
  const isMultiple =
    isFamily ||
    lowerName.includes(' y ') ||
    guestName.includes('&') ||
    maxPasses > 1;

  let greetingLead = 'Querida';

  if (isFamily) {
    greetingLead = 'Querida';
  } else if (isMultiple) {
    greetingLead = 'Queridos';
  } else if (FEMALE_NAMES_ENDING_IN_O.has(firstWord)) {
    greetingLead = 'Estimada';
  } else if (
    lowerName.endsWith('o') ||
    lowerName.endsWith('el') ||
    lowerName.endsWith('or') ||
    lowerName.endsWith('an') ||
    lowerName.endsWith('án')
  ) {
    greetingLead = 'Estimado';
  } else {
    greetingLead = 'Estimada';
  }

  return `${greetingLead} ${guestName}, queremos celebrar este momento tan especial junto a ${
    isMultiple ? 'ustedes' : 'ti'
  }`;
};
