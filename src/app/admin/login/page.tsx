'use client';

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-elephant-ivory text-2xl font-bold tracking-tight mb-8 text-center uppercase">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-400 text-xs tracking-wider uppercase text-center">{error}</p>
          )}
          <div>
            <label className="block text-elephant-ivory/60 text-[10px] tracking-widest uppercase mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-elephant-ivory text-sm outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-elephant-ivory/60 text-[10px] tracking-widest uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-elephant-ivory text-sm outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-elephant-ivory text-black py-2.5 rounded text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
