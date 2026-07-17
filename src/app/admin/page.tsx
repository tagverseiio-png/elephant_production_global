'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/admin-api';
import { Film, Users, Settings, ArrowRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  href: string;
}

function StatCard({ label, value, icon, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-white/40">{icon}</div>
        <ArrowRight size={16} className="text-white/20 group-hover:text-elephant-ivory transition-colors" />
      </div>
      <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
      <div className="text-[10px] tracking-widest uppercase text-white/40">{label}</div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ films: 0, collaborators: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.films.list(),
      api.collaborators.list(),
    ])
      .then(([films, collaborators]) => {
        setStats({ films: films.length, collaborators: collaborators.length });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-8 uppercase">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Total Films"
          value={loading ? '...' : stats.films}
          icon={<Film size={24} />}
          href="/admin/films"
        />
        <StatCard
          label="Collaborators"
          value={loading ? '...' : stats.collaborators}
          icon={<Users size={24} />}
          href="/admin/collaborators"
        />
        <StatCard
          label="Site Settings"
          value="Edit"
          icon={<Settings size={24} />}
          href="/admin/settings"
        />
      </div>

      <div className="mt-12">
        <h2 className="text-xs tracking-widest uppercase text-white/40 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/films/new"
            className="bg-elephant-ivory text-black px-4 py-2 rounded text-xs font-bold tracking-wider uppercase hover:bg-white/90 transition-colors"
          >
            Add New Film
          </Link>
          <Link
            href="/admin/collaborators/new"
            className="bg-elephant-ivory text-black px-4 py-2 rounded text-xs font-bold tracking-wider uppercase hover:bg-white/90 transition-colors"
          >
            Add Collaborator
          </Link>
        </div>
      </div>
    </div>
  );
}
