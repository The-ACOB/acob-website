'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  setMockSession: (userMetadata: { name: string; email: string }) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  signInWithGoogle: async () => {},
  setMockSession: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isSupabaseConfigured()) {
      // Mock session fallback for testing/dev if Supabase is not fully configured
      const localSession = localStorage.getItem('acob_mock_session');
      if (localSession) {
        try {
          const parsed = JSON.parse(localSession);
          setUser(parsed.user);
          setSession(parsed);
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      localStorage.removeItem('acob_mock_session');
      setUser(null);
      setSession(null);
      window.location.href = '/';
      return;
    }
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured()) {
      // Mock Google Sign-In
      setMockSession({
        name: 'Cognitive Champion',
        email: 'champion@acobd.org'
      });
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const setMockSession = (userMetadata: { name: string; email: string; phone?: string }) => {
    const mockSession = {
      access_token: 'mock-token',
      user: {
        id: 'mock-user-id',
        email: userMetadata.email,
        email_confirmed_at: new Date().toISOString(),
        user_metadata: {
          full_name: userMetadata.name,
          phone: userMetadata.phone || '',
          avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userMetadata.name)}`,
        },
      },
    };
    localStorage.setItem('acob_mock_session', JSON.stringify(mockSession));
    setUser(mockSession.user as any);
    setSession(mockSession as any);
    window.location.href = '/dashboard';
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, signInWithGoogle, setMockSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
