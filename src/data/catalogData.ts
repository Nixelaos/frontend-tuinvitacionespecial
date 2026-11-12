import type { InvitationTemplate } from '../types/wedding';

/**
 * Catálogo de plantillas y diseños de invitaciones interactivas.
 */
export const INVITATION_TEMPLATES: InvitationTemplate[] = [
  {
    id: 'papel-rasgado',
    slug: 'papel-rasgado',
    name: 'Papel Rasgado & Partículas de Luz',
    coverImage: '/images/comprometidos.jpg',
    coupleDemo: {
      bride: 'Valentina',
      groom: 'Sebastián',
    },
  },
];
