import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';
import Logo from '@/shared/components/header/Logo';
import Button from '@/shared/components/ui/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex h-screen items-center justify-center px-4">
      <div className="fixed top-4 left-4">
        <Logo onClick={() => navigate('/', { replace: true })} />
      </div>

      <section className="max-w-md">
        {/* Status */}
        <p className="text-sm font-medium text-neutral-500">404</p>

        {/* Title */}
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
          This page doesn’t exist
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm text-neutral-600">
          The link might be broken, or the page may have been removed. Nothing
          dangerous happened. You’re just a little off-path.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            onClick={() => navigate('/')}
            variant="default"
            className="flex items-center gap-2"
          >
            <HomeIcon size={16} />
            Go home
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon size={16} />
            Go back
          </Button>
        </div>
      </section>
    </main>
  );
}
