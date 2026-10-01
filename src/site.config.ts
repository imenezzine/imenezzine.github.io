// 👋 Toutes tes infos perso sont ici : modifie ce fichier et tout le site suit.
export const SITE = {
  url: 'https://imenezzine.github.io',
  name: 'Imen Ezzine',
  handle: '@imenezzine',
  role: 'Développeuse PHP & Symfony chez SensioLabs',
  tagline:
    "J'écris, je parle en conf, je fais un podcast et je bricole des projets. Bienvenue dans mon coin du web !",
  location: 'France',
  lang: 'fr',
  avatar: '/avatar.png',
};

export const PODCAST = {
  name: 'Café Tech avec Imen',
  description: 'Le podcast où on parle de tech autour d’un café. À retrouver sur YouTube.',
  cover: '/podcast-cover.jpg',
  // Liens vers les plateformes (laisse vide pour masquer)
  platforms: {
    spotify: '',
    apple: '',
    deezer: '',
    youtube: 'https://www.youtube.com/@Caf%C3%A9TechavecImen',
  },
};

export const NEWSLETTER = {
  // URL d'action du formulaire (Buttondown, Brevo, Substack, Mailchimp…).
  // Laisse vide pour masquer le formulaire.
  action: '',
  description: 'Un e-mail par mois avec mes nouveaux articles, talks et épisodes. Zéro spam.',
};

// Laisse une valeur vide pour masquer le lien.
export const SOCIALS = {
  github: 'https://github.com/imenezzine',
  linkedin: 'https://www.linkedin.com/in/imen-ezzine-09938a45',
  bluesky: '',
  mastodon: '',
  youtube: 'https://www.youtube.com/@Caf%C3%A9TechavecImen',
  x: '',
};

export const NAV = [
  { href: '/articles', label: 'Articles', color: 'pink' },
  { href: '/talks', label: 'Talks', color: 'violet' },
  { href: '/podcast', label: 'Podcast', color: 'orange' },
  { href: '/projets', label: 'Projets', color: 'teal' },
  { href: '/idees', label: 'Idées', color: 'yellow' },
  { href: '/til', label: 'TIL', color: 'blue' },
] as const;

export const NAV_MORE = [
  { href: '/retours', label: 'Retours d’écoute' },
  { href: '/tags', label: 'Tags' },
  { href: '/uses', label: 'Uses' },
  { href: '/now', label: 'Now' },
  { href: '/a-propos', label: 'À propos' },
] as const;
