import Logo from '@/components/header/Logo';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="fixed top-4 left-4">
        <Logo onClick={() => navigate('/', { replace: true })} />
      </div>

      <div className="grid h-dvh place-items-center">
        <h1 className="text-2xl md:text-4xl">Page not found</h1>
      </div>
    </div>
  );
}
