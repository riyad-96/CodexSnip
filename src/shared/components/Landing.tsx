import { useNavigate } from 'react-router-dom';
import { PlusIcon, FolderIcon, CodeIcon } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="pt-20 pb-32">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          A calm place for your code snippets
        </h1>

        <p className="mt-4 text-neutral-600 max-sm:text-sm">
          CodexSnip helps you organize, revisit, and reuse your code without
          friction. Simple folders. Clean focus. No noise.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate('/auth/login')}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-900 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Get started
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<FolderIcon size={20} />}
          title="Folder-based organization"
          description="Group your snippets logically. One folder per idea, feature, or project."
        />

        <FeatureCard
          icon={<CodeIcon size={20} />}
          title="Built for developers"
          description="No distractions. Just your code, structured and easy to revisit."
        />

        <FeatureCard
          icon={<PlusIcon size={20} />}
          title="Fast to add, easy to grow"
          description="Create folders instantly and scale your collection over time."
        />
      </section>

      {/* Bottom CTA */}
      <section className="mt-28 rounded-2xl border bg-white border-neutral-200 p-6">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
          Start building your personal code library
        </h2>

        <p className="mt-2 text-sm text-neutral-600">
          Your future self will thank you for saving that snippet today.
        </p>

        <button
          onClick={() => navigate('/auth/signup')}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-neutral-900 bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Create free account
        </button>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mb-3 inline-flex rounded-lg border border-neutral-200 p-2 text-neutral-700">
        {icon}
      </div>

      <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
      <p className="mt-1 text-sm text-neutral-600">{description}</p>
    </div>
  );
}
