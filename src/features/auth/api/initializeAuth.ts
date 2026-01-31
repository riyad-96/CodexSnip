import { auth } from '@/features/auth/lib/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { authStore } from '../store/auth.store';

export default function initializeAuth() {
  const unsub = onAuthStateChanged(auth, (user) => {
    authStore.setState({ user });
    authStore.setState({ userLoading: false });
  });

  return unsub;
}
