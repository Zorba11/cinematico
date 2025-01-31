import NoiseOverlay from '../components/NoiseOverlay';
import ColorBars from '../components/ColorBars';
import ControlPanel from '../components/ControlPanel';

export default function CinematicoPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#8B628B] to-pink-400 p-8 relative overflow-hidden">
      <NoiseOverlay />

      <div className="relative max-w-3xl mx-auto">
        {/* TV Container with neumorphic styling */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            backgroundColor: '#2A2A2A',
            boxShadow: `
              20px 20px 60px rgba(0, 0, 0, 0.5),
              -20px -20px 60px rgba(255, 255, 255, 0.1),
              inset -2px -2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 4px rgba(0, 0, 0, 0.5)
            `,
          }}
        >
          {/* TV Screen Content */}
          <div className="aspect-[4/3] relative w-full p-4 bg-black">
            <ColorBars />
          </div>

          {/* Control Panel - Separated from screen */}
          <div className="bg-[#1a1a1a] h-48 border-t border-black/50">
            <ControlPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
