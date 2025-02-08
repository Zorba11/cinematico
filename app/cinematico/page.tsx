'use client';
import NoiseOverlay from '../components/NoiseOverlay';
import ColorBars from '../components/ColorBars';
import ControlPanel from '../components/ControlPanel';
import { useStores } from '@/hooks/useStores';
import MovieContent from '../components/MovieContent';
import TVStatic from '../components/TVStatic';
import { observer } from 'mobx-react-lite';
import { AnimatePresence } from 'framer-motion';
import MoviesDashboard from '../components/MoviesDashboard';
import NoiseBackground from '../components/NoiseBackground';

export default observer(function CinematicoPage() {
  const {
    rootStore: { movieStore },
  } = useStores();

  const isPowerOn = movieStore.isPowerOn;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Position NoiseBackground */}
      <NoiseBackground />

      {/* Content container with transparent background */}
      <div className="w-full h-screen p-8 flex items-center relative z-10">
        <div className="relative w-full max-w-4xl mx-auto">
          {/* TV Container with enhanced neumorphic styling */}
          <div
            className="rounded-3xl overflow-hidden flex flex-col relative transition-all duration-500"
            style={{
              backgroundColor: '#1A0B3F',
              boxShadow: `
                16px 16px 32px rgba(0, 0, 0, 0.7),
                -8px -8px 16px rgba(255, 255, 255, 0.05),
                inset -2px -2px 4px rgba(255, 255, 255, 0.05),
                inset 2px 2px 4px rgba(0, 0, 0, 0.3)
              `,
            }}
          >
            {/* TV Screen Content */}
            <div className="aspect-[16/9] relative w-full bg-[#000000]">
              <div className="absolute inset-4">
                <AnimatePresence mode="wait">
                  {isPowerOn ? <MovieContent /> : <MoviesDashboard />}
                </AnimatePresence>
              </div>
            </div>
            {/* Control Panel */}
            <div className="bg-[#1a1a1a] h-48 border-t border-black/50 relative z-10">
              <ControlPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
