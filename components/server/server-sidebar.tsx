import {ChannelType, MemberRole} from "@prisma/client";
import {redirect} from "next/navigation";
import {Hash, Mic, ShieldAlert, ShieldCheck, Video} from "lucide-react";

import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";

import {ServerHeader} from "./server-header";
import {ServerSection} from "./server-section";
import {ServerChannel} from "./server-channel";


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
};

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>
}

export const ServerSidebar = async ({
                                        serverId
                                    }: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const members = server?.members.filter((member) => member.profileId !== profile.id)

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea className="flex-1 px-3">
                {!!textChannels?.length && (
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:text-zinc-100">
                                <ServerSection
                                    sectionType="channels"
                                    channelType={ChannelType.TEXT}
                                    role={role}
                                    label="Текстовые каналы"
                                />
                            </AccordionTrigger>
                            <AccordionContent>
                                {textChannels.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
                {!!audioChannels?.length && (
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:text-zinc-100">
                                <ServerSection
                                    sectionType="channels"
                                    channelType={ChannelType.AUDIO}
                                    role={role}
                                    label="Голосовые каналы"
                                />
                            </AccordionTrigger>
                            <AccordionContent>
                                {audioChannels.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </ScrollArea>
        </div>
    )
}