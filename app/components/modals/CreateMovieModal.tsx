'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TextInput from '../inputs/TextInput';
import ModalButtons from '../buttons/ModalButtons';
import ImageUpload from '../inputs/ImageUpload';

interface CreateMovieModalProps {
  onClose: () => void;
}

export default function CreateMovieModal({ onClose }: CreateMovieModalProps) {
  const [movieText, setMovieText] = useState('');
  const MAX_CHARS = 280;

  const handleSubmit = () => {
    if (movieText.trim()) {
      // Handle the submission here
      console.log(movieText);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl p-8 rounded-3xl
                   backdrop-blur-lg bg-[rgba(255,255,255,0.03)]
                   shadow-[16px_16px_32px_rgba(0,0,0,0.2),_-16px_-16px_32px_rgba(255,255,255,0.1)]"
      >
        <div className="space-y-6">
          {/* Text Input Area */}
          <TextInput
            value={movieText}
            onChange={(value) => {
              if (value.length <= MAX_CHARS) {
                setMovieText(value);
              }
            }}
            maxLength={MAX_CHARS}
          />

          {/* Image Upload Area */}
          <ImageUpload onImageUpload={(file) => console.log(file)} />

          {/* Character Count and Buttons */}
          <ModalButtons
            characterCount={movieText.length}
            maxChars={MAX_CHARS}
            onCancel={onClose}
            onSubmit={handleSubmit}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
