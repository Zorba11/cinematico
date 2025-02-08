'use client';
import { motion } from 'framer-motion';
import ColorBars from './ColorBars';
import GuidanceMessage from './GuidanceMessage';

export default function MovieContent() {
  return (
    <motion.div
      className="relative w-full h-full bg-black"
      style={{
        boxShadow:
          'inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
      }}
    >
      <ColorBars />
      <GuidanceMessage />
    </motion.div>
  );
}
