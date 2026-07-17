'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/admin-api';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Collaborator {
  _id: string;
  name: string;
  type: string;
  logo?: string;
  url?: string;
  order: number;
}

export default function AdminCollaboratorsList() {
  const [items, setItems] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await api.collaborators.list() as unknown as Collaborator[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this collaborator?')) return;
    await api.collaborators.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight uppercase">Collaborators</h1>
        <Link
          href="/admin/collaborators/new"
          className="flex items-center gap-2 bg-elephant-ivory text-black px-4 py-2 rounded text-xs font-bold tracking-wider uppercase hover:bg-white/90 transition-colors"
        >
          <Plus size={14} />
          New
        </Link>
      </div>

      {loading ? (
        <div className="text-white/40 text-xs tracking-widest uppercase">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-white/30 text-xs tracking-widest uppercase">No collaborators found.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-5 py-4 group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-xs text-white/30 w-6 text-right">{item.order}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{item.name}</div>
                  <div className="text-[10px] tracking-wider uppercase text-white/30 mt-1">{item.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/collaborators/${item._id}/edit`}
                  className="p-2 rounded text-white/30 hover:text-elephant-ivory transition-colors"
                >
                  <Edit size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
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
