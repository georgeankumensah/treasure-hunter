import {create} from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    login: (user: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: (user: string) => set({ isAuthenticated: true, user }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));

