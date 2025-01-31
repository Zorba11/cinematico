'use client';
import { useStores } from '@/hooks/useStores';
import { ControlButton } from './cinematico/ControlButton';

export default function ControlPanel() {
  const {
    rootStore: { movieStore },
  } = useStores();

  return (
    <div className="h-full px-12 py-6 flex flex-col justify-between">
      {/* Power Indicator */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => movieStore.setPowerOn()}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
        <span className="text-xs tracking-wider font-medium text-white/80">
          POWER
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-x-16 gap-y-8 pb-4">
        <ControlButton label="VOL -" />
        <ControlButton label="VOL +" />
        <ControlButton label="CH -" />
        <ControlButton label="CH +" />
        <ControlButton label="INPUT" />
        <ControlButton label="MENU" />
      </div>
    </div>
  );
}
