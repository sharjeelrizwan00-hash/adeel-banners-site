export type BannerGenre =
  | 'All'
  | 'FPS & Tactical'
  | 'Battle Royale'
  | 'Sim Racing'
  | 'Fantasy RPG';

export interface BannerProduct {
  id: string;
  title: string;
  genre: Exclude<BannerGenre, 'All'>;
  resolution: string;
  turnaround: string;
  priceUsd: number;
  summary: string;
  image: string;
  imageAlt: string;
  platforms: string[];
  includes: string[];
}

export interface BannerAddon {
  id: string;
  label: string;
  priceUsd: number;
  summary: string;
}

export interface CustomerReview {
  id: string;
  quote: string;
  name: string;
  role: string;
  channel: string;
  packNote: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  gamerTag: string;
  email: string;
}

export interface BannerOrder {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  bannerId: string;
  bannerTitle: string;
  channelTitle: string;
  tagline: string;
  platform: string;
  accentColor: string;
  addonIds: string[];
  notes: string;
  totalUsd: number;
  status: string;
  createdAt: string;
}

export const GAMING_HERO_IMAGE = {
  src: '/src/assets/images/gaming_hero_banner_1795613049660.jpg',
  alt: 'Pro gaming setup displaying custom tactical esports banner artwork on ultrawide monitor',
};

export const STORE_METRICS = [
  {
    value: '1,200+ Banners',
    label: 'Custom headers delivered for creators & clans',
  },
  {
    value: '24h Turnaround',
    label: 'First custom proof ready within one day',
  },
  {
    value: '4K & Safe-Zone',
    label: 'Sized cleanly for TV, desktop, and mobile',
  },
  {
    value: '3 Revisions',
    label: 'Color, typography, and crest tweaks included',
  },
];

export const BANNER_CATALOG: BannerProduct[] = [
  {
    id: 'tactical-vanguard',
    title: 'Tactical Vanguard FPS Header',
    genre: 'FPS & Tactical',
    resolution: '2560 × 1440 px',
    turnaround: '24h Delivery',
    priceUsd: 25,
    summary:
      'Brutalist concrete depth with tactical operator silhouette and high-contrast custom gamer tag typography.',
    image: '/src/assets/images/banner_fps_tactical_1795613050574.jpg',
    imageAlt: 'Tactical shooter esports banner artwork with armored operator silhouette',
    platforms: ['YouTube', 'Twitch', 'Kick'],
    includes: [
      'Custom Channel Name & Tagline Typography',
      'Mobile & Desktop Safe-Zone Export',
      'Matching Social Handle Strip',
      '3 Rounds of Color & Font Revisions',
    ],
  },
  {
    id: 'apex-dropzone',
    title: 'Alpine Dropzone Battle Royale',
    genre: 'Battle Royale',
    resolution: '2560 × 1440 px',
    turnaround: '24h Delivery',
    priceUsd: 35,
    summary:
      'Metallic crest framing over twilight alpine combat artwork with custom clan badge and ember lighting.',
    image: '/src/assets/images/banner_battle_royale_1795613050294.jpg',
    imageAlt: 'Battle royale gaming banner with armored frame and twilight mountain battleground',
    platforms: ['YouTube', 'Discord', 'X / Twitter'],
    includes: [
      'Custom Clan Crest & Ember Typography',
      'YouTube + Discord Server Banner Exports',
      'Transparent PNG Watermark Overlay',
      '3 Rounds of Revisions',
    ],
  },
  {
    id: 'gt3-night-circuit',
    title: 'Night Circuit GT3 Motorsport',
    genre: 'Sim Racing',
    resolution: '2560 × 1440 px',
    turnaround: '24h Delivery',
    priceUsd: 30,
    summary:
      'Wet-track GT3 night race composition tailored for sim racing leagues, F1 creators, and motorsport streamers.',
    image: '/src/assets/images/banner_racing_sim_1795613051374.jpg',
    imageAlt: 'Carbon-fiber GT3 race car cornering under night stadium floodlights',
    platforms: ['YouTube', 'Twitch', 'X / Twitter'],
    includes: [
      'Driver Name & Car Number Customization',
      'Sponsor / Social Icon Bar',
      '4K Lossless PNG + JPEG Exports',
      '3 Rounds of Revisions',
    ],
  },
  {
    id: 'obsidian-citadel',
    title: 'Obsidian Citadel RPG Crest',
    genre: 'Fantasy RPG',
    resolution: '2560 × 1440 px',
    turnaround: '24h Delivery',
    priceUsd: 40,
    summary:
      'Atmospheric stone citadel key art with engraved metallic serif lettering built for RPG and MMO streamers.',
    image: '/src/assets/images/banner_fantasy_rpg_1795613051132.jpg',
    imageAlt: 'Dark fantasy RPG stone citadel gate with warm torchlight and silver mist',
    platforms: ['Twitch', 'YouTube', 'Kick'],
    includes: [
      'Custom Engraved RPG Title Lettering',
      'Stream Schedule & Offline Screen Adaptation',
      '4K Desktop & Mobile Crops',
      '3 Rounds of Revisions',
    ],
  },
];

export const PLATFORM_FORMATS = [
  { label: 'YouTube (2560x1440)', extraUsd: 0 },
  { label: 'Twitch (1200x480)', extraUsd: 0 },
  { label: 'Kick & Discord Kit', extraUsd: 0 },
  { label: 'Full Streamer Bundle', extraUsd: 20 },
];

export const BANNER_ADDONS: BannerAddon[] = [
  {
    id: 'matching-avatar',
    label: 'Matching 1:1 Channel Avatar Logo',
    priceUsd: 15,
    summary: 'Coordinated profile emblem sized for YouTube, Twitch, and Discord',
  },
  {
    id: 'source-psd',
    label: 'Layered Editable Source File (PSD)',
    priceUsd: 20,
    summary: 'Organized smart-object layers so you can update text anytime',
  },
  {
    id: 'express-12h',
    label: 'Priority 12-Hour Express Delivery',
    priceUsd: 15,
    summary: 'First custom proof delivered directly to your portal within 12 hours',
  },
];

export const ACCENT_COLORS = [
  'Cobalt Blue',
  'Amber Gold',
  'Crimson Red',
  'Arctic Silver',
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    quote:
      'Logged in, typed my clan tag, and got a clean YouTube + Discord banner proof the next morning. Safe-zone alignment on mobile looks razor sharp.',
    name: 'Hamza Raza',
    role: 'FPS Content Creator',
    channel: 'youtube.com/@HamzaPlays',
    packNote: 'Tactical Vanguard Pack · 2026',
  },
  {
    id: 'rev-2',
    quote:
      'Having a customer login portal made it effortless to track all three esports roster banners in one place instead of losing files in DMs.',
    name: 'Zainab Khalid',
    role: 'Team Manager',
    channel: 'Kestrel Five Esports',
    packNote: 'Full Streamer Bundle · 2026',
  },
  {
    id: 'rev-3',
    quote:
      'The GT3 night circuit header gave our sim-racing league instant credibility. Revisions on our car number and sponsor strip took less than an hour.',
    name: 'Bilal Ahmed',
    role: 'League Organizer',
    channel: 'Apex Sim Series PK',
    packNote: 'Night Circuit GT3 · 2025',
  },
];

export const CONTACT_INFO = {
  email: 'sharjeelrizwan00@gmail.com',
  phone: '03096800496',
  address: 'Pakistan',
};
