import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

type ModalPropsType = PropsWithChildren & {
  className: string;
  onMouseDown: () => void;
  layoutId?: string;
};

export default function Modal({
  className,
  onMouseDown,
  children,
  layoutId,
}: ModalPropsType) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onMouseDown}
      className="uni-modal fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/40 px-4 pt-16 pb-26"
    >
      <motion.div
        layoutId={layoutId}
        onMouseDown={(e) => e.stopPropagation()}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
