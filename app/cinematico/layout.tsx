import { isAuthorized } from '@/utils/data/user/isAuthorized';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ModeToggle from '@/components/mode-toggle';
import { UserProfile } from '@/components/user-profile';
import Link from 'next/link';
import { Sidebar } from '../components/cinematico/sidebar';

interface CinematicoLayoutProps {
  children: React.ReactNode;
}

export default async function CinematicoLayout({
  children,
}: CinematicoLayoutProps) {
  const user = await currentUser();
  const { authorized } = await isAuthorized(user?.id!);

  // enable this in production to redirect unpaid users
  // if (!authorized) {
  //   console.log('not authorized');
  //   redirect('/not-subscriber');
  // }

  return (
    <div className="flex h-screen overflow-hidden w-full relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#2A0B4F] ml-20">
        {children}
      </main>
    </div>
  );
}
