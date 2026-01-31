import type { User } from 'firebase/auth';
import { create } from 'zustand';

//! type for context
type AuthStore = {
  user: User | null;
  userLoading: boolean;
};

const store = create<AuthStore>(() => ({
  user: null,
  userLoading: true,
}));

export const authStore = store;
export const useAuthStore = store;
