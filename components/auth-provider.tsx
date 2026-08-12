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

    const loadSession = async () => {
      try {
        if (!isSupabaseConfigured()) {
          if (!loadMockSession()) {
            setLoading(false);
          }
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          setSession(session);
          setUser(session.user);
          setLoading(false);
        } else {
          // If no Supabase session, check if there is a mock session we can use as fallback
          if (!loadMockSession()) {
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading Supabase session, falling back to mock:', err);
        if (!loadMockSession()) {
          setLoading(false);
        }
      }
    };

    const loadMockSession = () => {
      const localSession = localStorage.getItem('acob_mock_session');
      if (localSession) {
        try {
          const parsed = JSON.parse(localSession);
          setUser(parsed.user);
          setSession(parsed);
          setLoading(false);
          return true;
        } catch (e) {
          console.error('Failed to parse mock session:', e);
        }
      }
      return false;
    };

    loadSession();

    // Listen to changes if configured
    let subscription: any = null;
    if (isSupabaseConfigured()) {
      try {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            setSession(session);
            setUser(session.user);
            setLoading(false);
          } else {
            // Check if mock session exists
            if (!loadMockSession()) {
              setSession(null);
              setUser(null);
              setLoading(false);
            }
          }
        });
        subscription = data?.subscription;
      } catch (err) {
        console.error('Error subscribing to auth state change:', err);
      }
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
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
