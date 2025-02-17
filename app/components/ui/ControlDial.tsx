'use client';

interface ControlDialProps {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-12 h-12 sm:w-16 sm:h-16',
  md: 'w-16 h-16 sm:w-20 sm:h-20',
  lg: 'w-20 h-20 sm:w-24 sm:h-24',
};

const iconSizes = {
  sm: 'w-4 h-4 sm:w-6 sm:h-6',
  md: 'w-6 h-6 sm:w-8 sm:h-8',
  lg: 'w-8 h-8 sm:w-10 sm:h-10',
};

const labelSizes = {
  sm: 'text-xs sm:text-sm',
  md: 'text-sm sm:text-base',
  lg: 'text-base sm:text-lg',
};

export function ControlDial({
  label,
  icon: Icon,
  onClick,
  isActive = false,
  size = 'md',
}: ControlDialProps) {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <button
        onClick={onClick}
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          transform transition-all duration-300 ease-out
          bg-[#1A0B3F]
          shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.1)]
          hover:shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(255,255,255,0.1)]
          active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.1)]
          flex items-center justify-center relative
          focus:outline-none
          ${
            isActive
              ? 'border-2 border-emerald-500/50'
              : 'border border-neutral-700'
          }
          ${
            isActive
              ? 'after:absolute after:inset-0 after:rounded-full after:bg-emerald-500/5'
              : ''
          }
          hover:scale-[1.02] active:scale-[0.98]
        `}
      >
        <Icon
          className={`${iconSizes[size]} transition-colors duration-300 ${
            isActive ? 'text-emerald-400' : 'text-neutral-300'
          }`}
        />
      </button>
      <span
        className={`
          ${
            labelSizes[size]
          } font-medium tracking-wide transition-colors duration-300 ${
          isActive ? 'text-emerald-400' : 'text-neutral-300'
        }
        `}
      >
        {label}
      </span>
    </div>
  );
}
