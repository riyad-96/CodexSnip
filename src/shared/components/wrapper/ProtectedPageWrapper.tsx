import { useAuthStore } from '@/features/auth/store/auth.store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedPageWrapper() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    console.log('user to nai --->', user);
    return (
      <Navigate
        to="/auth/login"
        state={location.pathname}
      />
    );
  }

  return <Outlet />;
}
