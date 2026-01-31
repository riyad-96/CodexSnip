import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

export default function AuthProtectedWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (user) {
    return (
      <Navigate
        to={location.state ? location.state : '/'}
        replace
      />
    );
  }
  return children;
}
