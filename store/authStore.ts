import { create } from 'zustand';

import { Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/lib/supabase';

type AuthState = {
  session: Session | null;
  isAuthenticated: boolean;
  isReady: boolean;
  initializeAuth: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isAuthenticated: false,
  isReady: false,
  initializeAuth: async () => {
    const { data } = await supabase.auth.getSession();
    set({
      session: data.session,
      isAuthenticated: !!data.session?.user,
      isReady: true,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        isAuthenticated: !!session?.user,
      });
    });
  },
}));

export default useAuthStore;
