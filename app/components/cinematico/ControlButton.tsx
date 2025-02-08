'use client';
import { motion } from 'framer-motion';

interface ControlButtonProps {
  label: string;
  onClick?: () => void;
}

export function ControlButton({ label, onClick }: ControlButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white/80 text-sm font-medium
                 border border-black/30 backdrop-blur-sm"
      style={{
        boxShadow: `
          8px 8px 16px rgba(0, 0, 0, 0.4),
          -4px -4px 12px rgba(255, 255, 255, 0.03),
          inset -1px -1px 2px rgba(255, 255, 255, 0.05)
        `,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `
          12px 12px 24px rgba(0, 0, 0, 0.4),
          -6px -6px 16px rgba(255, 255, 255, 0.03),
          inset -1px -1px 2px rgba(255, 255, 255, 0.05)
        `,
      }}
      whileTap={{
        scale: 0.98,
        boxShadow: `
          inset 4px 4px 8px rgba(0, 0, 0, 0.4),
          inset -2px -2px 6px rgba(255, 255, 255, 0.03)
        `,
      }}
      transition={{
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {label}
    </motion.button>
  );
}
