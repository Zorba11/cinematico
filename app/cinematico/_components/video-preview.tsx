export function VideoPreview() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* TV outer casing with neumorphic effect */}
      <div className="relative rounded-2xl bg-zinc-900 p-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
        {/* Screen area */}
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          {/* Color bars */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-[#FF0000]" />
            <div className="flex-1 bg-[#FF6600]" />
            <div className="flex-1 bg-[#FFFF00]" />
            <div className="flex-1 bg-[#00FF00]" />
            <div className="flex-1 bg-[#0000FF]" />
            <div className="flex-1 bg-[#4B0082]" />
            <div className="flex-1 bg-[#9400D3]" />
          </div>
        </div>

        {/* Control bar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/95 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_4px_rgba(74,222,128,0.6)]" />
            <span className="text-white/90 text-xs font-medium">POWER</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <span className="text-white/90 text-xs font-medium block">
                VOL
              </span>
              <span className="text-white/50 text-[10px]">VOLUME</span>
            </div>
            <div className="text-center">
              <span className="text-white/90 text-xs font-medium block">
                CH
              </span>
              <span className="text-white/50 text-[10px]">CHANNEL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
