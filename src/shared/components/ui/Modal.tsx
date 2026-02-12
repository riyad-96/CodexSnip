import cn from '@/shared/lib/cn';
import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

type ModalPropsType = PropsWithChildren & {
  className: string;
  onMouseDown: () => void;
};

export default function Modal({
  className,
  onMouseDown,
  children,
}: ModalPropsType) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onMouseDown}
      className="uni-modal fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/20 px-4 pt-16 pb-26 pointer-fine:backdrop-blur-xs"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1 }}
        layout
        onMouseDown={(e) => e.stopPropagation()}
        className={cn('shadow-xl/5', className)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
