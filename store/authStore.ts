import { supabase } from "@/utils/lib/supabase";
import { create } from "zustand";

interface AuthState {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  country: string | null;
  location: any;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (session: any | null) => void;
  setCountry: (country: string) => void;
  setLocation: (location: any) => void;
  cities: any[];
  setCities: (cities: any[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  country: null,
  location: null,
  cities: [],
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user, session: data.session });
    } catch (error) {
      console.error(error);
      // Handle login error
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null, session: null });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  setSession: (session) => set({ session, user: session?.user || null }),
  setCountry: (country) => set({ country }),
  setLocation: (location) => set({ location }),
  setCities: (cities) => set({ cities }),
}));
