import Logo from '../header/Logo';

export default function Footer() {
  return (
    <footer className="px-2 pt-20 pb-10 md:px-3">
      <div className="mx-auto max-w-325 space-y-8">
        <div className="space-y-3">
          <div className="w-fit">
            <Logo
              onClick={() => {
                document.querySelector('.scroller-element')?.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            />
          </div>
          <p className="max-w-100 leading-relaxed text-neutral-600">
            Save, edit, and organize your favorite snippets in any language —
            light or dark, your code, your rules.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <p className="text-sm text-neutral-600">
            Created by{' '}
            <a
              href="https://riyad-devfolio.vercel.app/"
              target="_self"
              className="text-neutral-900 underline transition-colors pointer-fine:hover:text-neutral-600"
            >
              Riyad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
