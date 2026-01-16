import type { ReactNode } from 'react';

type GlossyButtonProps = {
  content: string | ReactNode;
  onClick?: () => void;
  primary?: boolean;
};

export default function GlossyButton({
  content,
  onClick,
  primary,
}: GlossyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`grid origin-center overflow-hidden rounded-xl border text-sm transition-colors active:scale-98 pointer-fine:cursor-pointer ${
        primary
          ? 'border-neutral-900 bg-neutral-900 text-neutral-100 tracking-wide'
          : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400'
      }`}
    >
      {content}
    </button>
  );
}
