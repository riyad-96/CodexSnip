import { useEffect, useState } from 'react';
import useDropdownClose from '@/shared/hooks/useDropdownClose';
import { Check, ChevronDownIcon } from 'lucide-react';
import type { SupportedThemesType } from '@/features/folder/lib/editorStyle';
import type { SupportedLanguagesType } from '@/features/folder/lib/editorLanguage';

type Options = SupportedThemesType | SupportedLanguagesType;

type SelectPropsType<T> = {
  options: T[];
  value: string;
  onChange: (value: T) => void;
  className?: string;
};

export default function Select<T extends Options>({
  options,
  value,
  onChange,
  className,
}: SelectPropsType<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const option = value ? options?.find((v) => v.value === value) : options?.[0];

  const defaultOption = option ? option : { name: 'Select', value: '' };

  const randomClass = `close_select_${crypto.randomUUID().slice(0, 8)}`;

  const closeOptionRef = useDropdownClose({
    isOpen,
    onClose: () => {
      setIsOpen(false);
    },
    ignoredSelectors: [`.${randomClass}`],
  });

  useEffect(() => {
    if (!isOpen) return;
    const selectedOptions = document.querySelector(
      '.selected-option',
    ) as HTMLDivElement;
    selectedOptions.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [isOpen]);

  return (
    <div
      style={{ position: 'relative', zIndex: isOpen ? 2 : 1 }}
      className={className}
    >
      <div className="size-full">
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className={`${randomClass} flex size-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 transition-colors pointer-fine:cursor-pointer pointer-fine:hover:bg-neutral-50`}
        >
          <span className="line-clamp-1 text-sm text-nowrap text-neutral-900">
            {defaultOption?.name}
          </span>
          <ChevronDownIcon
            size={16}
            strokeWidth={2}
            className={`text-neutral-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: `calc(100% + 8px)`,
            display: 'grid',
          }}
          ref={closeOptionRef}
          className="max-h-48.75 w-full overflow-y-auto rounded-xl border border-neutral-200 bg-white p-1 shadow-md/5"
        >
          {options.map((o) => (
            <button
              className={`rounded-lg px-3 py-2 text-start text-sm transition-colors pointer-fine:cursor-pointer ${
                defaultOption?.value === o.value
                  ? 'selected-option bg-neutral-100 flex items-center scroll-mt-1 justify-between gap-2'
                  : 'pointer-fine:hover:bg-neutral-100'
              }`}
              onClick={() => {
                onChange(o);
                setIsOpen(false);
              }}
              key={o.value}
            >
              <span>{o.name}</span>
              {defaultOption?.value === o.value && <Check className="shrink-0" size="14" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
