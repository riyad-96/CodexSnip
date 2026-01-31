import LoadingScreen from '@/layouts/LoadingScreen';
import { useAuthStore } from '@/store/auth.store';
import { Toaster } from 'kitzo';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  const { initializeAuth, userLoading } = useAuthStore();

  useEffect(() => {
    const unsub = initializeAuth();
    return unsub;
  }, [initializeAuth]);

  if (userLoading) return <LoadingScreen />;

  return (
    <>
      <Outlet />
      
      <Toaster />
    </>
  );
}
