import { useEffect, useRef } from 'react';

type UseDropdownClosePropsType = {
  isOpen: boolean;
  onClose: () => void;
  ignoredSelectors: string[];
};

export default function useDropdownClose({
  isOpen,
  onClose,
  ignoredSelectors = [],
}: UseDropdownClosePropsType) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClose(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;

      const shouldIgnore =
        target instanceof Element &&
        ignoredSelectors.some((sel) => target.closest(sel));

      if (shouldIgnore) return;

      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('click', handleClose);
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('touchstart', handleClose);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClose);
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('touchstart', handleClose);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, ignoredSelectors]);

  return ref;
}
