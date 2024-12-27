import {create} from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    loggedIn: (user: string) => void;
    loggedOut: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    loggedIn: (user: string) => set({ isAuthenticated: true, user }),
    loggedOut: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;