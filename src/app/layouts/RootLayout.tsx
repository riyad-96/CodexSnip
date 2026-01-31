import initializeAuth from '@/features/auth/api/initializeAuth';
import { useAuthStore } from '@/features/auth/store/auth.store';
import LoadingScreen from '@/shared/components/ui/LoadingScreen';
import { Toaster } from 'kitzo';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  const { userLoading } = useAuthStore();

  useEffect(() => {
    const unsub = initializeAuth();
    return unsub;
  }, []);

  if (userLoading) return <LoadingScreen />;

  return (
    <>
      <Outlet />

      <Toaster />
    </>
  );
}
