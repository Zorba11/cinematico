'use client';
import { motion } from 'framer-motion';

export const IdeaStep = () => {
  return (
    <motion.div
      className="flex items-center justify-center h-full text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h1 className="text-3xl font-light tracking-wide">
        Welcome to your movie creation journey
      </h1>
    </motion.div>
  );
};
