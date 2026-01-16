import { Toaster } from 'kitzo';
import { Outlet } from 'react-router-dom';
import { motion } from 'motion/react';

export default function App() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.99,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="text-code-850 h-dvh overflow-hidden"
    >
      <div className="h-full">
        <Outlet />
      </div>

      <Toaster position="bottom-right" />
    </motion.div>
  );
}
