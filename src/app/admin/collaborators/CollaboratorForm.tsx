'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/admin-api';

interface CollabData {
  name: string;
  type: string;
  logo: string;
  url: string;
  order: number;
}

const emptyData: CollabData = { name: '', type: '', logo: '', url: '', order: 0 };

export default function CollaboratorForm() {
  const params = useParams();
  const router = useRouter();
  const isEdit = !!params?.id;
  const [form, setForm] = useState(emptyData);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      api.collaborators.list()
        .then((list) => {
          const listWithId = list as unknown as Array<CollabData & { _id: string }>;
          const item = listWithId.find((_, i) => listWithId[i]._id === params!.id);
          if (item) setForm(item);
          else router.push('/admin/collaborators');
        })
        .catch(() => router.push('/admin/collaborators'))
        .finally(() => setLoading(false));
    }
  }, [isEdit, params?.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (isEdit) {
        await api.collaborators.update(params!.id as string, form as unknown as Record<string, unknown>);
      } else {
        await api.collaborators.create(form as unknown as Record<string, unknown>);
      }
      router.push('/admin/collaborators');
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
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold tracking-tight mb-8 uppercase">
        {isEdit ? 'Edit Collaborator' : 'New Collaborator'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-red-400 text-xs tracking-wider uppercase">{error}</p>}

        <Field label="Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} required />
        <Field label="Type" value={form.type} onChange={v => setForm(p => ({ ...p, type: v }))} required />
        <Field label="Logo URL" value={form.logo} onChange={v => setForm(p => ({ ...p, logo: v }))} />
        <Field label="Website URL" value={form.url} onChange={v => setForm(p => ({ ...p, url: v }))} />
        <Field label="Order" type="number" value={String(form.order)} onChange={v => setForm(p => ({ ...p, order: Number(v) }))} />

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-elephant-ivory text-black px-6 py-2.5 rounded text-xs font-bold tracking-wider uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/collaborators')}
            className="border border-white/10 text-white/60 px-6 py-2.5 rounded text-xs tracking-wider uppercase hover:text-elephant-ivory transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, required, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-white/60 mb-1">{label}{required && '*'}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-elephant-ivory outline-none focus:border-white/30 transition-colors"
      />
    </div>
  );
}
