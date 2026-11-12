export interface InvitationTemplate {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  coupleDemo: {
    bride: string;
    groom: string;
    displayDate?: string;
    city?: string;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  linkText?: string;
  linkHref?: string;
}
