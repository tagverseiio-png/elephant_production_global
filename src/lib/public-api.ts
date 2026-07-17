const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export interface Film {
  _id: string;
  id: string;
  title: string;
  category: string;
  year: string;
  director: string;
  stillImage: string;
  trailerVideo?: string;
  hero_image?: string;
  director_image?: string;
  gallery_images?: string[];
  awardYear?: string;
  awardLaurel?: string;
  awardLogo?: string;
  reviews: { text: string; source: string }[];
  awards: { logo?: string; category?: string; title?: string }[];
  credits: { role: string; name: string }[];
  investors?: string;
  order: number;
  published: boolean;
}

export interface Collaborator {
  _id: string;
  name: string;
  type: string;
  logo?: string;
  url?: string;
  order: number;
}

export interface SiteSettings {
  _id: string;
  email: string;
  phone: string;
  address: string;
  emailSubject: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  siteTitle: string;
  siteDescription?: string;
}

export const publicApi = {
  films: {
    list: () => request<Film[]>('/films'),
    get: (id: string) => request<Film>(`/films/${id}`),
  },
  collaborators: {
    list: () => request<Collaborator[]>('/collaborators'),
  },
  settings: {
    get: () => request<SiteSettings>('/settings'),
  },
};
