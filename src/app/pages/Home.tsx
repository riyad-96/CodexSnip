import { useAuthStore } from '@/features/auth/store/auth.store';
import HomeContent from '@/features/folder/components/HomeContent';
import Landing from '@/shared/components/Landing';

export default function Home() {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <HomeContent />;
  }

  return <Landing />;
}
