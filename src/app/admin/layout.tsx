'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Film, Users, Settings, LayoutDashboard, LogOut, List } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/films', label: 'Films', icon: Film },
  { href: '/admin/collaborators', label: 'Collaborators', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-56 bg-[#111] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-4 border-b border-white/5">
        <Link href="/admin" className="text-elephant-ivory font-bold text-sm tracking-wider uppercase">
          Elephant Admin
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded text-xs tracking-wider uppercase transition-colors ${
                isActive
                  ? 'bg-white/10 text-elephant-ivory'
                  : 'text-white/40 hover:text-elephant-ivory hover:bg-white/5'
              }`}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5 space-y-2">
        <div className="text-[10px] text-white/30 px-3 truncate">{user?.email}</div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded text-xs tracking-wider uppercase text-white/40 hover:text-red-400 hover:bg-white/5 w-full transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (pathname === '/admin/login') return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-elephant-ivory/40 text-xs tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-elephant-ivory">
      <AdminSidebar />
      <div className="ml-56 p-8">{children}</div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
