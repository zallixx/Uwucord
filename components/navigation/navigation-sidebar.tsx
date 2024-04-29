import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import currentProfile from '@/lib/current-profile';

import { db } from '@/lib/db';
import NavigationAction from '@/components/navigation/navigation-action';
import NavigationPrivateMessages from '@/components/navigation/navigation-private-messages';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import NavigationItem from '@/components/navigation/navigation-item';
import ModeToggle from '@/components/mode-toggle';
import { Server } from '@prisma/client';

async function NavigationSidebar() {
    const profile = await currentProfile();

    if (!profile) {
        return redirect('/');
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    return (
        <div className="space-y-2 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-0">
            <NavigationPrivateMessages/>
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-8 mx-auto mb-2"/>
            <ScrollArea className="flex-1 w-full">
                {servers.map((server: Server) => (
                    <div key={server.id} className="mb-2">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
                <NavigationAction />
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton
                    afterSignOutUrl="/sign-in"
                    appearance={{
                        elements: {
                            avatarBox: 'h-[48px] w-[48px]',
                        },
                    }}
                />
            </div>
        </div>
    );
}
export default NavigationSidebar;
