import { useAuthStore } from '@/features/auth/store/auth.store';
import HomeContent from '@/features/folder/components/HomeContent';
import DeleteFolderModal from '@/features/folder/components/modals/DeleteFolderModal';
import CreateNewFolderModal from '@/features/folder/components/modals/CreateNewFolderModal';

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="pt-12">
      <div className="space-y-3">
        <h1 className="text-center text-[clamp(1.125rem,0.6302rem+1.0309vw,1.5rem)] tracking-tight">
          {user ? `Welcome Back` : 'Organize and Highlight Your Code'}
        </h1>
        <p className="mx-auto max-w-90 text-center text-[clamp(0.875rem,0.8271rem+0.2128vw,1rem)] leading-relaxed text-neutral-600">
          {user
            ? 'Continue organizing your code snippets and explore your saved folders'
            : 'Sign up to create folders and save your favorite snippets with syntax highlighting for multiple languages and themes.'}
        </p>
      </div>

      <HomeContent />

      <CreateNewFolderModal />
      <DeleteFolderModal />
    </div>
  );
}
