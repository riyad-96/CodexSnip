import { useEffect, useState } from 'react';
import useDropdownClose from '@/shared/hooks/useDropdownClose';
import { Check, ChevronDownIcon } from 'lucide-react';
import type { SupportedThemesType } from '@/features/folder/lib/editorStyle';
import type { SupportedLanguagesType } from '@/features/folder/lib/editorLanguage';
import { AnimatePresence, motion } from 'motion/react';

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

  const randomString = crypto.randomUUID().slice(0, 8);
  const randomClass = `close_select_${randomString}`;

  const closeOptionRef = useDropdownClose({
    isOpen,
    onClose: () => {
      setIsOpen(false);
    },
    ignoredSelectors: [`.${randomClass}`],
  });

  useEffect(() => {
    const selectedOptions = document.querySelector<HTMLDivElement>(
      `.selected-option-${randomString}`,
    );
    if (!selectedOptions) return;

    selectedOptions.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const timeoutId = setTimeout(() => {}, 50);

    return () => {
      clearTimeout(timeoutId);
    };
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
          className={`${randomClass} flex size-full items-center justify-between gap-2 rounded-xl px-3 py-2 transition-colors pointer-fine:cursor-pointer pointer-fine:hover:bg-neutral-50`}
        >
          <span className="line-clamp-1 text-xs text-nowrap text-neutral-900">
            {defaultOption?.name}
          </span>
          <ChevronDownIcon
            size={16}
            strokeWidth={2}
            className={`text-neutral-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              position: 'absolute',
              right: 0,
              top: `calc(100% + 8px)`,
              display: 'grid',
            }}
            ref={closeOptionRef}
            className="max-h-48.75 w-full origin-top overflow-y-auto rounded-xl border border-neutral-200 bg-white p-1 shadow-md/5 will-change-transform"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.1,
            }}
          >
            {options.map((o) => (
              <button
                className={`rounded-lg px-3 py-2 text-start text-xs transition-colors pointer-fine:cursor-pointer ${
                  defaultOption?.value === o.value
                    ? `selected-option-${randomString} flex scroll-mt-1 items-center justify-between gap-2 bg-neutral-100`
                    : 'pointer-fine:hover:bg-neutral-100'
                }`}
                onClick={() => {
                  onChange(o);
                  setIsOpen(false);
                }}
                key={o.value}
              >
                <span>{o.name}</span>
                {defaultOption?.value === o.value && (
                  <Check
                    className="shrink-0"
                    size="14"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
