import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

export default function ProtectedPageWrapper() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={location.pathname}
      />
    );
  }

  return <Outlet />;
}
