'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import config from '@/config';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { CreditCard, LogOut, Settings, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export function UserProfile() {
  const router = useRouter();
  const { user } = useUser();

  if (!config?.auth?.enabled) {
    router.back();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-12 h-12 rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
            boxShadow: `
              4px 4px 8px rgba(0, 0, 0, 0.2),
              -2px -2px 4px rgba(255, 255, 255, 0.05),
              inset 0 0 32px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          <Avatar className="h-10 w-10 rounded-full ring-2 ring-purple-500/20">
            <AvatarImage
              src={user?.imageUrl}
              alt={user?.fullName || 'User Profile'}
              className="rounded-full object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-2 rounded-xl border border-white/10 backdrop-blur-lg relative before:absolute before:inset-[1px] before:rounded-[10px] before:border before:border-white/20 before:pointer-events-none"
        align="end"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px) saturate(150%)',
          boxShadow: `
            8px 8px 16px rgba(0, 0, 0, 0.2),
            -4px -4px 8px rgba(255, 255, 255, 0.05),
            inset 0 0 32px rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white/90">
              {user?.fullName}
            </p>
            <p className="text-xs leading-none text-white/60">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/[0.08]" />
        <DropdownMenuGroup>
          <Link href="/user-profile">
            <DropdownMenuItem className="focus:bg-white/[0.08] hover:bg-white/[0.08] transition-all duration-200 text-white/80 hover:text-white">
              <User className="mr-2 h-4 w-4 text-purple-500" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem className="focus:bg-white/[0.08] hover:bg-white/[0.08] transition-all duration-200 text-white/80 hover:text-white">
              <Settings className="mr-2 h-4 w-4 text-purple-500" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/#pricing">
            <DropdownMenuItem className="focus:bg-white/[0.08] hover:bg-white/[0.08] transition-all duration-200 text-white/80 hover:text-white">
              <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
              <span>Upgrade Plan</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/[0.08]" />
        <SignOutButton>
          <DropdownMenuItem className="focus:bg-white/[0.08] hover:bg-white/[0.08] transition-all duration-200 text-white/80 hover:text-white">
            <LogOut className="mr-2 h-4 w-4 text-purple-500" />
            <span>Log out</span>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
