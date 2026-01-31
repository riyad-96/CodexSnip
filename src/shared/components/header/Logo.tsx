import { motion } from 'motion/react';

type LogoPropsTypes = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  layoutId?: string;
};

export default function Logo({ onClick, layoutId }: LogoPropsTypes) {
  return (
    <motion.div
      layoutId={layoutId}
      className="text-xl md:text-2xl"
    >
      <button
        onClick={onClick}
        className="tracking-tight transition-colors pointer-fine:hover:text-neutral-600"
      >
        CodexSnip
      </button>
    </motion.div>
  );
}
