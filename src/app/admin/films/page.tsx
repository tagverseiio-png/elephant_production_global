'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/admin-api';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Film {
  _id: string;
  id: string;
  title: string;
  category: string;
  year: string;
  director: string;
  published: boolean;
  order: number;
}

export default function AdminFilmsList() {
  const router = useRouter();
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');

  const loadFilms = async () => {
    setLoading(true);
    try {
      const data = await api.films.list(categoryFilter || undefined);
      setFilms(data as unknown as Film[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFilms(); }, [categoryFilter]);

  const handleToggle = async (id: string) => {
    await api.films.toggle(id);
    loadFilms();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this film?')) return;
    await api.films.delete(id);
    loadFilms();
  };

  const categories = [...new Set(films.map(f => f.category))];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight uppercase">Films</h1>
        <Link
          href="/admin/films/new"
          className="flex items-center gap-2 bg-elephant-ivory text-black px-4 py-2 rounded text-xs font-bold tracking-wider uppercase hover:bg-white/90 transition-colors"
        >
          <Plus size={14} />
          New Film
        </Link>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setCategoryFilter('')}
          className={`px-3 py-1.5 rounded text-[10px] tracking-wider uppercase font-bold transition-colors ${
            !categoryFilter ? 'bg-elephant-ivory text-black' : 'bg-white/5 text-white/40 hover:text-elephant-ivory'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded text-[10px] tracking-wider uppercase font-bold transition-colors ${
              categoryFilter === cat ? 'bg-elephant-ivory text-black' : 'bg-white/5 text-white/40 hover:text-elephant-ivory'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-white/40 text-xs tracking-widest uppercase">Loading...</div>
      ) : films.length === 0 ? (
        <div className="text-white/30 text-xs tracking-widest uppercase">No films found.</div>
      ) : (
        <div className="space-y-2">
          {films.map((film) => (
            <div
              key={film._id}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-5 py-4 group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-xs text-white/30 w-6 text-right">{film.order}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{film.title}</div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] tracking-wider uppercase text-white/30">{film.category}</span>
                    <span className="text-[10px] tracking-wider uppercase text-white/30">{film.year}</span>
                    <span className="text-[10px] tracking-wider uppercase text-white/30 truncate">{film.director}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggle(film.id)}
                  className="p-2 rounded text-white/30 hover:text-elephant-ivory transition-colors"
                  title={film.published ? 'Unpublish' : 'Publish'}
                >
                  {film.published ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => router.push(`/admin/films/${film.id}/edit`)}
                  className="p-2 rounded text-white/30 hover:text-elephant-ivory transition-colors"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(film.id)}
                  className="p-2 rounded text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
