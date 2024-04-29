import {ChannelType, MemberRole, Channel, Member} from '@prisma/client';
import { redirect } from 'next/navigation';
import { Hash, Mic, ShieldAlert, ShieldCheck } from 'lucide-react';

import ServerHeader from './server-header';
import ServerSearch from './server-search';
import ServerSection from './server-section';
import ServerChannel from './server-channel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';

interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
        <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

async function ServerSidebar({ serverId }: ServerSidebarProps) {
    const profile = await currentProfile();

    if (!profile) {
        return redirect('/');
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: 'asc',
                },
            },
        },
    });

    const textChannels = server?.channels.filter(
        (channel : Channel) => channel.type === ChannelType.TEXT,
    );
    const audioChannels = server?.channels.filter(
        (channel : Channel) => channel.type === ChannelType.AUDIO,
    );
    const members = server?.members.filter(
        (member : Member) => member.profileId !== profile.id,
    );

    if (!server) {
        return redirect('/');
    }

    const role = server.members.find(
        (member : Member) => member.profileId === profile.id,
    )?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: 'Текстовые Каналы',
                                type: 'channel',
                                data: textChannels?.map((channel : Channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                })),
                            },
                            {
                                label: 'Голосовые Каналы',
                                type: 'channel',
                                data: audioChannels?.map((channel : Channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type],
                                })),
                            },
                            {
                                label: 'Members',
                                type: 'member',
                                data: members?.map((member : Member) => ({
                                    id: member.id,
                                    // @ts-ignore
                                    name: member.profile.name,
                                    icon: roleIconMap[member.role],
                                })),
                            },
                        ]}
                    />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Текстовые каналы"
                        />
                        <div className="space-y-[2px]">
                            {textChannels.map((channel : Channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Голосовые каналы"
                        />
                        <div className="space-y-[2px]">
                            {audioChannels.map((channel : Channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    role={role}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
export default ServerSidebar;
