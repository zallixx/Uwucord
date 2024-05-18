import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';
import ServerSidebar from '@/components/server/server-sidebar';
import DmSidebar from '@/components/dm/dm-sidebar';

async function ServerIdLayout({
                                  children
                              }: {
    readonly children: Readonly<React.ReactNode>;
}) {

    const profile = await currentProfile();

    if (!profile) {
        redirectToSignIn();
        return null;
    }
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <DmSidebar />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
}


export default ServerIdLayout;
