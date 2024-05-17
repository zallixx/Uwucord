import { PrismaClient } from '@prisma/client';
import { Plus, Users } from 'lucide-react';
import currentProfile from '@/lib/current-profile';
import DmSearch from '@/components/dm/dm-search';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ActionTooltip from '@/components/action-tooltip';

import ChatSidebarItem from '@/components/chat/chat-sidebar-item';

interface Chat {
    id: string;
    profileOneId: string;
    profileTwoId: string;
    profileOne: {
        profile: {
            id: string;
            userId: string;
            name: string;
            imageUrl: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    };
    profileTwo: {
        profile: {
            id: string;
            userId: string;
            name: string;
            imageUrl: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    };
}

async function ChatSidebar() {
    const profile = await currentProfile();

    async function findChatsByUser() {
        const prisma = new PrismaClient();

        return prisma.conversation.findMany({
            where: {
                OR: [
                    { profileOne: { profileId: profile?.id } },
                    { profileTwo: { profileId: profile?.id } },
                ],
            },
            include: {
                profileOne: {
                    select: {
                        profile: true,
                    },
                },
                profileTwo: {
                    select: {
                        profile: true,
                    },
                },
            },
        });
    }

    function getChatInfo(chat: Chat) {
        let imgLink;
        let chatName;

        if (chat.profileOne.profile.userId !== profile?.userId) {
            imgLink = chat.profileOne.profile.imageUrl;
            chatName = chat.profileOne.profile.name;
        } else if (chat.profileTwo.profile.userId !== profile?.userId) {
            imgLink = chat.profileTwo.profile.imageUrl;
            chatName = chat.profileTwo.profile.name;
        }
        return { imgLink, chatName };
    }

    const chats = await findChatsByUser();

    return (
        <div className="w-60 bg-[#2b2d31]">
            <ScrollArea>
                <DmSearch />
                <Separator />
                <button
                    type="button"
                    className="mx-2 mt-[8px] h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#36373d] hover:text-[#dbdee1]"
                >
                    <Users className="absolute left-4" strokeWidth={2} />
                    <span className="pr-16">Друзья</span>
                </button>
                <p className="mx-6 mt-[12px] flex flex-row text-[#949ba4] text-xs font-bold hover:text-[#dbdee1]">
                    ЛИЧНЫЕ СООБЩЕНИЯ
                    <ActionTooltip side="top" align="center" label="Создать ЛС">
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <button
                            type="button"
                            className="group flex items-center absolute right-4"
                        >
                            <Plus className="text-[#949ba4]" size={14} />
                        </button>
                    </ActionTooltip>
                </p>
                <Separator />
                {chats.map((chat) => {
                    const { imgLink, chatName } = getChatInfo(chat);
                    return (
                        <ChatSidebarItem
                            key={chat.id}
                            params={{ imgLink, chatName }}
                        />
                    );
                })}
            </ScrollArea>
        </div>
    );
}

export default ChatSidebar;
