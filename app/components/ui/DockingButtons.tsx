'use client';

import { DockPosition } from '../ControlPanel';

interface DockingButtonsProps {
  dockPosition: DockPosition;
  setDockPosition: (pos: DockPosition) => void;
}

export const DockingButtons = ({
  dockPosition,
  setDockPosition,
}: DockingButtonsProps) => {
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      {(['left', 'right', 'top', 'bottom'] as DockPosition[]).map((pos) => (
        <button
          key={pos}
          onClick={() => setDockPosition(pos)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            dockPosition === pos
              ? 'bg-purple-600/50 text-purple-200'
              : 'bg-neutral-800/30 hover:bg-neutral-700/30 text-neutral-400'
          }`}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            {pos === 'left' && (
              // Icon for left docking: T shape facing right
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 12h16M4 3v18"
              />
            )}
            {pos === 'right' && (
              // Icon for right docking: T shape facing left
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4M20 3v18"
              />
            )}
            {pos === 'top' && (
              // Icon for top docking: upside-down T shape
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18M12 4v16"
              />
            )}
            {pos === 'bottom' && (
              // Icon for bottom docking: upside-down T shape
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 20h18M12 20v-16"
              />
            )}
          </svg>
        </button>
      ))}
    </div>
  );
};
