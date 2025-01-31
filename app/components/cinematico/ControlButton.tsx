'use client';
interface ControlButtonProps {
  label: string;
  onClick?: () => void;
}

export function ControlButton({ label, onClick }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-3"
    >
      <div
        className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center
        shadow-[16px_16px_32px_#0a0a0a,-16px_-16px_32px_#2a2a2a]
        hover:shadow-[12px_12px_24px_#0a0a0a,-12px_-12px_24px_#2a2a2a]
        active:shadow-[inset_8px_8px_16px_#0a0a0a,inset_-8px_-8px_16px_#2a2a2a]
        transition-all duration-200"
      >
        <div
          className="w-12 h-12 rounded-full 
          bg-gradient-to-br from-[#222222] to-[#1a1a1a]
          shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#2a2a2a]
          flex items-center justify-center"
        >
          <div className="w-0.5 h-8 bg-white/10 rounded-full transform -rotate-45" />
        </div>
      </div>
      <span className="text-sm tracking-wider font-medium text-white/60 group-hover:text-white/80 transition-colors">
        {label}
      </span>
    </button>
  );
}
