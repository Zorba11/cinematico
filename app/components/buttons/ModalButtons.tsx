'use client';

interface ModalButtonsProps {
  characterCount: number;
  maxChars: number;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function ModalButtons({
  characterCount,
  maxChars,
  onCancel,
  onSubmit,
}: ModalButtonsProps) {
  return (
    <div className="flex justify-between items-center text-gray-300/90 text-sm">
      <span className="font-light">
        {characterCount}/{maxChars} characters
      </span>
      <div className="space-x-4">
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-xl
                    bg-[rgba(255,255,255,0.03)]
                    shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.1)]
                    hover:shadow-[4px_4px_8px_rgba(0,0,0,0.2),_-4px_-4px_8px_rgba(255,255,255,0.1)]
                    active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.1)]
                    transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-5 py-2 rounded-xl
                    bg-[rgba(255,255,255,0.06)]
                    shadow-[8px_8px_16px_rgba(0,0,0,0.2),_-8px_-8px_16px_rgba(255,255,255,0.1)]
                    hover:shadow-[4px_4px_8px_rgba(0,0,0,0.2),_-4px_-4px_8px_rgba(255,255,255,0.1)]
                    active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.1)]
                    transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
