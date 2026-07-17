'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/admin-api';

const CATEGORIES = ['Documentary', 'Feature Film', 'Short Film', 'Wedding', 'Home'];

interface FilmData {
  id: string;
  title: string;
  category: string;
  year: string;
  director: string;
  stillImage: string;
  hero_image: string;
  director_image: string;
  trailerVideo: string;
  awardYear: string;
  awardLaurel: string;
  awardLogo: string;
  reviews: { text: string; source: string }[];
  awards: { logo: string; category: string; title: string }[];
  credits: { role: string; name: string }[];
  investors: string;
  gallery_images: string[];
  order: number;
  published: boolean;
}

const emptyData: FilmData = {
  id: '', title: '', category: 'Documentary', year: '', director: '',
  stillImage: '', hero_image: '', director_image: '', trailerVideo: '',
  awardYear: '', awardLaurel: '', awardLogo: '',
  reviews: [], awards: [], credits: [],
  investors: '', gallery_images: [], order: 0, published: true,
};

export default function FilmForm() {
  const params = useParams();
  const router = useRouter();
  const isEdit = !!params?.id;
  const [form, setForm] = useState<FilmData>(emptyData);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.films.get(params!.id as string)
        .then((data) => {
          const f = data as unknown as FilmData;
          setForm({
            ...emptyData,
            ...f,
            reviews: f.reviews || [],
            awards: f.awards || [],
            credits: f.credits || [],
            gallery_images: f.gallery_images || [],
          });
        })
        .catch(() => router.push('/admin/films'))
        .finally(() => setLoading(false));
    }
  }, [isEdit, params?.id]);

  const update = <K extends keyof FilmData>(key: K, value: FilmData[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (isEdit) {
        await api.films.update(params!.id as string, form as unknown as Record<string, unknown>);
      } else {
        await api.films.create(form as unknown as Record<string, unknown>);
      }
      router.push('/admin/films');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white/40 text-xs tracking-widest uppercase">Loading...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight mb-8 uppercase">
        {isEdit ? 'Edit Film' : 'New Film'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-400 text-xs tracking-wider uppercase">{error}</p>}

        <Section label="Basic Info">
          <Field label="ID (slug)" value={form.id} onChange={v => update('id', v)} disabled={isEdit} />
          <Field label="Title" value={form.title} onChange={v => update('title', v)} required />
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Category" value={form.category} onChange={v => update('category', v)} options={CATEGORIES} />
            <Field label="Year" value={form.year} onChange={v => update('year', v)} required />
          </div>
          <Field label="Director" value={form.director} onChange={v => update('director', v)} required />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Order" type="number" value={String(form.order)} onChange={v => update('order', Number(v))} />
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={e => update('published', e.target.checked)}
                  className="accent-elephant-ivory"
                />
                <span className="text-[10px] tracking-wider uppercase text-white/60">Published</span>
              </label>
            </div>
          </div>
        </Section>

        <Section label="Media">
          <Field label="Still Image URL" value={form.stillImage} onChange={v => update('stillImage', v)} required />
          <Field label="Hero Image URL" value={form.hero_image} onChange={v => update('hero_image', v)} />
          <Field label="Director Image URL" value={form.director_image} onChange={v => update('director_image', v)} />
          <Field label="Trailer Video URL" value={form.trailerVideo} onChange={v => update('trailerVideo', v)} />
          <ArrayField
            label="Gallery Images"
            items={form.gallery_images}
            onChange={v => update('gallery_images', v)}
            placeholder="Image URL"
          />
        </Section>

        <Section label="Awards">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Award Year" value={form.awardYear} onChange={v => update('awardYear', v)} />
            <Field label="Award Laurel" value={form.awardLaurel} onChange={v => update('awardLaurel', v)} />
            <Field label="Award Logo URL" value={form.awardLogo} onChange={v => update('awardLogo', v)} />
          </div>
          <SubArrayField
            label="Award List"
            items={form.awards as unknown as Record<string, string>[]}
            onChange={v => update('awards', v as typeof form.awards)}
            fields={[
              { key: 'logo', label: 'Logo URL' },
              { key: 'category', label: 'Category' },
              { key: 'title', label: 'Title' },
            ]}
          />
        </Section>

        <Section label="Reviews">
          <SubArrayField
            label="Reviews"
            items={form.reviews as unknown as Record<string, string>[]}
            onChange={v => update('reviews', v as unknown as typeof form.reviews)}
            fields={[
              { key: 'text', label: 'Review Text' },
              { key: 'source', label: 'Source' },
            ]}
          />
        </Section>

        <Section label="Credits">
          <SubArrayField
            label="Credits"
            items={form.credits as unknown as Record<string, string>[]}
            onChange={v => update('credits', v as unknown as typeof form.credits)}
            fields={[
              { key: 'role', label: 'Role' },
              { key: 'name', label: 'Name' },
            ]}
          />
        </Section>

        <Section label="Additional">
          <Field label="Investors" value={form.investors || ''} onChange={v => update('investors', v)} />
        </Section>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-elephant-ivory text-black px-6 py-2.5 rounded text-xs font-bold tracking-wider uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update Film' : 'Create Film'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/films')}
            className="border border-white/10 text-white/60 px-6 py-2.5 rounded text-xs tracking-wider uppercase hover:text-elephant-ivory transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-5 space-y-4">
      <h2 className="text-[10px] tracking-widest uppercase text-white/40 font-bold">{label}</h2>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, required, disabled, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; disabled?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-white/60 mb-1">{label}{required && '*'}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-elephant-ivory outline-none focus:border-white/30 transition-colors disabled:opacity-40"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-white/60 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-elephant-ivory outline-none focus:border-white/30 transition-colors"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function ArrayField({ label, items, onChange, placeholder }: {
  label: string; items: string[]; onChange: (v: string[]) => void; placeholder: string;
}) {
  const add = () => onChange([...items, '']);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] tracking-widest uppercase text-white/60">{label}</label>
        <button type="button" onClick={add} className="text-[10px] text-white/40 hover:text-elephant-ivory uppercase tracking-wider">+ Add</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-elephant-ivory outline-none focus:border-white/30 transition-colors"
          />
          <button type="button" onClick={() => remove(i)} className="text-red-400/60 hover:text-red-400 text-xs px-2">✕</button>
        </div>
      ))}
    </div>
  );
}

function SubArrayField({ label, items, onChange, fields }: {
  label: string; items: Record<string, string>[]; onChange: (v: Record<string, string>[]) => void; fields: { key: string; label: string }[];
}) {
  const add = () => {
    const obj: Record<string, string> = {};
    fields.forEach(f => obj[f.key] = '');
    onChange([...items, obj]);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, key: string, v: string) => {
    const next = items.map(item => ({ ...item }));
    next[i][key] = v;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] tracking-widest uppercase text-white/60">{label}</label>
        <button type="button" onClick={add} className="text-[10px] text-white/40 hover:text-elephant-ivory uppercase tracking-wider">+ Add</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${fields.length}, 1fr)` }}>
            {fields.map(f => (
              <input
                key={f.key}
                value={item[f.key] || ''}
                onChange={e => update(i, f.key, e.target.value)}
                placeholder={f.label}
                className="bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-elephant-ivory outline-none focus:border-white/30 transition-colors"
              />
            ))}
          </div>
          <button type="button" onClick={() => remove(i)} className="text-red-400/60 hover:text-red-400 text-xs px-2 pt-2">✕</button>
        </div>
      ))}
    </div>
  );
}
