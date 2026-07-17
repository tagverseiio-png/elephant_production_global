'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import { api } from '@/lib/admin-api';

interface SettingsData {
  email: string;
  phone: string;
  address: string;
  emailSubject: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  siteTitle: string;
  siteDescription: string;
}

const emptySettings: SettingsData = {
  email: '', phone: '', address: '', emailSubject: '',
  instagram: '', facebook: '', linkedin: '',
  siteTitle: '', siteDescription: '',
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.settings.get()
      .then((data) => setForm(data as unknown as SettingsData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      await api.settings.update(form as unknown as Record<string, unknown>);
      setSuccess('Settings saved successfully');
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
      <h1 className="text-2xl font-bold tracking-tight mb-8 uppercase">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-red-400 text-xs tracking-wider uppercase">{error}</p>}
        {success && <p className="text-green-400 text-xs tracking-wider uppercase">{success}</p>}

        <div className="bg-white/5 border border-white/10 rounded-lg p-5 space-y-4">
          <h2 className="text-[10px] tracking-widest uppercase text-white/40 font-bold">Contact</h2>
          <Field label="Email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} required />
          <Field label="Phone" value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} required />
          <Field label="Address" value={form.address} onChange={v => setForm(p => ({ ...p, address: v }))} required />
          <Field label="Email Subject" value={form.emailSubject} onChange={v => setForm(p => ({ ...p, emailSubject: v }))} required />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-5 space-y-4">
          <h2 className="text-[10px] tracking-widest uppercase text-white/40 font-bold">Social Media</h2>
          <Field label="Instagram URL" value={form.instagram} onChange={v => setForm(p => ({ ...p, instagram: v }))} />
          <Field label="Facebook URL" value={form.facebook} onChange={v => setForm(p => ({ ...p, facebook: v }))} />
          <Field label="LinkedIn URL" value={form.linkedin} onChange={v => setForm(p => ({ ...p, linkedin: v }))} />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-5 space-y-4">
          <h2 className="text-[10px] tracking-widest uppercase text-white/40 font-bold">SEO</h2>
          <Field label="Site Title" value={form.siteTitle} onChange={v => setForm(p => ({ ...p, siteTitle: v }))} required />
          <div>
            <label className="block text-[10px] tracking-widest uppercase text-white/60 mb-1">Site Description</label>
            <textarea
              value={form.siteDescription}
              onChange={e => setForm(p => ({ ...p, siteDescription: e.target.value }))}
              rows={3}
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-elephant-ivory outline-none focus:border-white/30 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-elephant-ivory text-black px-6 py-2.5 rounded text-xs font-bold tracking-wider uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, required }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-white/60 mb-1">{label}{required && '*'}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-elephant-ivory outline-none focus:border-white/30 transition-colors"
      />
    </div>
  );
}
