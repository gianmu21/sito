export type Cta = { label: string; href: string };
export type Stat = { value: string; label: string };
export type Logo = { name: string; src: string };

export interface SiteContent {
  name: string;
  wordmark: string;
  wordmarkFooter: string;
  role: string;
  description: string;
  email: string;
  linkedin: string;
}

export interface UiContent {
  nav: Cta[];
  legal: Cta[];
  menuOpen: string;
  menuClose: string;
  linkedin: string;
  caseStudy: string;
  form: {
    name: string;
    email: string;
    next: string;
    back: string;
    submit: string;
    step2Heading: string;
    company: string;
    url: string;
    topic: string;
    topicOptions: string[];
    budget: string;
    budgetOptions: string[];
    message: string;
    messageHint: string;
    required: string;
    sending: string;
    sent: string;
    error: string;
  };
  notFound: { title: string; back: string };
}

export interface ServiceCard {
  heading: string;
  paragraphs: string[];
}

export interface HomeContent {
  hero: { heading: string; subheading: string; paragraphs: string[]; cta: string };
  services: { strategy: ServiceCard; acquisition: ServiceCard; analysis: ServiceCard; ctas: Cta[] };
  about: { eyebrow: string; heading: string; paragraphs: string[] };
  channels: { heading: string; logos: Logo[] };
  whyMe: { heading: string; items: { title: string; text: string }[] };
  clients: { heading: string; logos: Logo[] };
  testimonial: { heading: string; quote: string; author: string; role: string; company: string };
  howItWorks: { heading: string; steps: { title: string; text: string }[]; getInTouch: string; cta: string };
}

export interface CvContent {
  heading: string;
  subheading: string;
  summary: string;
  sections: { experience: string; languages: string; sideProjects: string };
  experience: { company: string; period: string; title: string; text: string; caseStudy?: string }[];
  languages: { name: string; level: string }[];
  sideProjects: { name: string; text?: string; items?: string[] }[];
  plus: string;
}

export type CaseTone = "white" | "lime" | "blue";

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  tone: CaseTone;
  about: string;
  challenges: string[];
  actions: string[];
  results: string[];
  metrics: Stat[];
}

export interface CasesContent {
  heading: string;
  subheading: string;
  intro: string[];
  labels: { client: string; challenges: string; actions: string; results: string };
  cases: CaseStudy[];
}

export interface ContactContent {
  heading: string;
  intro: string;
}
