import { motion } from 'motion/react';

type LogoPropsTypes = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  layoutId?: string;
};

export default function Logo({ onClick, layoutId }: LogoPropsTypes) {
  return (
    <motion.div
      layoutId={layoutId}
      className="text-xl font-semibold md:text-2xl"
    >
      <button onClick={onClick}>CodexSnip</button>
    </motion.div>
  );
}
