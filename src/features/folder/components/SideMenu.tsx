import { useEffect } from 'react';
import type { Block } from '../types/types';
import getCodeNavigationId from '@/shared/lib/getCodeNavigationId';
import { UNTITLED_BLOCK } from '@/shared/constants/fallbacks';

type SideMenuPropsType = {
  code_blocks: Block[];
};

export default function SideMenu({ code_blocks }: SideMenuPropsType) {
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
      <div className="max-h-72 overflow-y-auto px-1">
        {code_blocks?.map((p) => {
          const id = getCodeNavigationId(p.title, p._id);

          const link = '#' + id;
          return (
            <div
              key={`title-link-${p._id}`}
              className={`relative rounded-xl px-4 py-2 text-sm pointer-fine:cursor-pointer ${
                hash === link
                  ? 'bg-neutral-100'
                  : 'text-neutral-700 pointer-fine:hover:bg-neutral-100'
              }`}
            >
              <span className="line-clamp-1">
                {p.title.trim() || UNTITLED_BLOCK}
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
