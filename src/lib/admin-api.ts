const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; admin: { id: string; email: string; name: string } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    ),
  me: () => request<{ id: string; email: string; name: string }>('/auth/me'),
  films: {
    list: (category?: string) =>
      request<Array<Record<string, unknown>>>(`/films/admin/all${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    get: (id: string) => request<Record<string, unknown>>(`/films/${id}`),
    create: (data: Record<string, unknown>) =>
      request<Record<string, unknown>>('/films', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Record<string, unknown>) =>
      request<Record<string, unknown>>(`/films/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ message: string }>(`/films/${id}`, { method: 'DELETE' }),
    toggle: (id: string) => request<{ id: string; published: boolean }>(`/films/${id}/toggle`, { method: 'PATCH' }),
  },
  collaborators: {
    list: () => request<Array<Record<string, unknown>>>('/collaborators'),
    create: (data: Record<string, unknown>) =>
      request<Record<string, unknown>>('/collaborators', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Record<string, unknown>) =>
      request<Record<string, unknown>>(`/collaborators/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ message: string }>(`/collaborators/${id}`, { method: 'DELETE' }),
  },
  settings: {
    get: () => request<Record<string, unknown>>('/settings'),
    update: (data: Record<string, unknown>) =>
      request<Record<string, unknown>>('/settings', { method: 'PUT', body: JSON.stringify(data) }),
  },
};
