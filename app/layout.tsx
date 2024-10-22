import './globals.css';
import type { Metadata } from 'next';
/* eslint-disable-next-line camelcase */
import { Open_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import React from 'react';
import cn from '@/lib/utils';
import ThemeProvider from '@/components/providers/theme-provider';
import ModalProvider from '@/components/providers/modal-provider';
import SocketProvider from '@/components/providers/socket-provider';
import QueryProvider from '@/components/providers/query-provider';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'UwUcord',
    description: 'Best chat application!'
};

export default function RootLayout({
    children,
}: {
    readonly children: Readonly<React.ReactNode>;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={cn(font.className, 'bg-white dark:bg-[#313338]')}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="discord-theme"
                    >
                        <SocketProvider>
                            <ModalProvider />
                            <QueryProvider>{children}</QueryProvider>
                        </SocketProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
