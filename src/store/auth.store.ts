import type { Unsubscribe, User } from 'firebase/auth';
import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/configs/firebase.config';

//! type for context
type AuthStore = {
  user: User | null;
  userLoading: boolean;
  initializeAuth: () => Unsubscribe;
};

const store = create<AuthStore>((set) => ({
  user: null,
  userLoading: true,
  initializeAuth: () => {
    const unsub = onAuthStateChanged(auth, (user) => {
      set({ user });
      set({ userLoading: false });
    });

    return unsub;
  },
}));

export const authStore = store;
export const useAuthStore = store;
