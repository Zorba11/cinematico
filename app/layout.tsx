import Provider from '@/app/provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import AuthWrapper from '@/components/wrapper/auth-wrapper';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nextstarter.xyz/'),
  title: {
    default: 'Next Starter',
    template: `%s | Next Starter`,
  },
  description:
    'The Ultimate Nextjs 15 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters',
  openGraph: {
    description:
      'The Ultimate Nextjs 15 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters',
    images: [
      'https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c',
    ],
    url: 'https://nextstarter.xyz/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nextjs Starter Kit',
    description:
      'The Ultimate Nextjs 15 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters',
    siteId: '',
    creator: '@rasmickyy',
    creatorId: '',
    images: [
      'https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}
