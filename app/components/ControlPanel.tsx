'use client';
import { useStores } from '@/hooks/useStores';
import { observer } from 'mobx-react-lite';
import { PowerIndicator } from './ui/PowerIndicator';
import { ControlDialsGrid } from './ui/ControlDialsGrid';
import { DockingButtons } from './ui/DockingButtons';

// Updated dock options (bottom removed in favor of top)
export type DockPosition = 'left' | 'right' | 'top' | 'bottom' | 'undocked';

interface ControlPanelProps {
  dockPosition: DockPosition;
  setDockPosition: (pos: DockPosition) => void;
}

// Update constants
const PANEL_DIMENSIONS = {
  vertical: {
    width: 280,
    height: '100%', // Vertical mode spans full height of the TV screen container.
  },
  horizontal: {
    width: '100%',
    height: 180,
  },
};

// When docked, we remove the rounding on the edge adjoining the TV screen.
const getIntegratedClasses = () => {
  const baseClasses = 'bg-[#1a1a2e] border-[#2d2d41]/40';
  return {
    left: `rounded-tl-3xl rounded-bl-3xl rounded-tr-0 rounded-br-0 border-t border-b border-l border-r-0 ${baseClasses} shadow-[inset_-1px_0_2px_rgba(255,255,255,0.03)]`,
    right: `rounded-tr-3xl rounded-br-3xl rounded-tl-0 rounded-bl-0 border-t border-b border-r border-l-0 ${baseClasses} shadow-[inset_1px_0_2px_rgba(255,255,255,0.03)]`,
    top: `rounded-tl-3xl rounded-tr-3xl rounded-bl-0 rounded-br-0 border-l border-r border-t border-b-0 ${baseClasses} shadow-[inset_0_-1px_2px_rgba(255,255,255,0.03)]`,
    bottom: `rounded-bl-3xl rounded-br-3xl rounded-tl-0 rounded-tr-0 border-l border-r border-b border-t-0 ${baseClasses} shadow-[inset_0_1px_2px_rgba(255,255,255,0.03)]`,
    undocked: `rounded-3xl border ${baseClasses} shadow-lg shadow-black/50 hover:shadow-xl transition-shadow duration-300`,
  };
};

export default observer(function ControlPanel({
  dockPosition,
  setDockPosition,
}: ControlPanelProps) {
  const isVertical = dockPosition === 'left' || dockPosition === 'right';
  const isHorizontal = dockPosition === 'top' || dockPosition === 'bottom';
  const dimensions = isVertical
    ? PANEL_DIMENSIONS.vertical
    : PANEL_DIMENSIONS.horizontal;

  const {
    rootStore: { movieStore },
  } = useStores();

  const integratedClasses = getIntegratedClasses()[dockPosition] ?? '';

  return (
    <div
      className={`flex flex-col relative ${integratedClasses}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <DockingButtons
        dockPosition={dockPosition}
        setDockPosition={setDockPosition}
      />
      <div
        className={`px-8 py-4 border-b border-neutral-800/50 ${
          isVertical ? 'w-full' : ''
        }`}
      >
        <PowerIndicator
          isOn={movieStore.isPowerOn}
          onClick={() => movieStore.setPowerOn()}
        />
      </div>
      <div
        className={`flex-1 px-4 py-4 overflow-y-auto custom-scrollbar ${
          isVertical ? 'w-full' : ''
        }`}
      >
        <ControlDialsGrid movieStore={movieStore} isVertical={isVertical} />
      </div>
    </div>
  );
});
