import Link from 'next/link';
import { UserProfile } from '@/components/user-profile';

export function Sidebar() {
  return (
    <div
      className="fixed left-0 top-0 h-screen w-20 flex flex-col justify-between py-4 z-50"
      style={{
        backgroundColor: '#8B628B',
        boxShadow: `
          8px 0 15px -3px rgba(0, 0, 0, 0.2),
          inset -1px 0 2px rgba(255, 255, 255, 0.1),
          inset 1px 0 2px rgba(0, 0, 0, 0.3)
        `,
      }}
    >
      {/* Top Icon / Logo */}
      <Link href="/cinematico">
        <div
          className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, #FF8A00, #FF6B00)',
            boxShadow: `
              4px 4px 8px rgba(0, 0, 0, 0.3),
              -4px -4px 8px rgba(255, 255, 255, 0.1),
              inset -2px -2px 4px rgba(0, 0, 0, 0.2),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1" />
        </div>
      </Link>

      {/* Bottom section with user profile and mode toggle */}
      <div className="space-y-3 px-2">
        <div className="rounded-xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] transition-colors hover:bg-white/[0.08]">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
