import { useEffect } from 'react';
import type { CodeBlock } from '../types/types';
import getCodeNavigationId from '@/shared/utils/getCodeNavigationId';

type CodeNavMenuPropsType = {
  code_blocks: CodeBlock[];
};

export default function CodeNavMenu({ code_blocks }: CodeNavMenuPropsType) {
  const hash = location.hash;

  useEffect(() => {
    if (!hash) {
      document
        .querySelector('.scroller-element')
        ?.scrollTo({ behavior: 'smooth', top: 0 });
      return;
    }

    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="sticky top-21.25 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-1">
      <div className="max-h-75 overflow-y-auto">
        {code_blocks?.map((p) => {
          const id = getCodeNavigationId(p.title, p._id);

          const link = '#' + id;
          return (
            <div
              key={`title-link-${p._id}`}
              className={`relative px-4 py-2.5 text-sm pointer-fine:cursor-pointer ${
                hash === link
                  ? 'bg-neutral-100 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span className="line-clamp-1">
                {p.title.trim() || 'Untitled'}
              </span>
              <a
                onClick={() => {
                  document
                    .getElementById(link)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="absolute inset-0 z-1"
                href={link}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
