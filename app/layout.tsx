import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/components/providers/modal-provider';
import { SocketProvider } from '@/components/providers/socket-provider';
import { QueryProvider } from '@/components/providers/query-provider';

const font = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevFix: Leading Developer Collaboration Platform',
  description: 'Created By Dhruv Vasisht',
  icons: {
    icon: '/DevFix.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(`${font.variable} antialiased`,"bg-white dark:bg-[#313338]")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            storageKey="devfix-theme"
          >
            <SocketProvider>
            <ModalProvider/>
            <QueryProvider>
            {children}
            </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}