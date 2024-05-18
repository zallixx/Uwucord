import { db } from '@/lib/db';
import { Plus, Users } from 'lucide-react';
import currentProfile from '@/lib/current-profile';
import DmSearch from '@/components/dm/dm-search';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ActionTooltip from '@/components/action-tooltip';

import DmSidebarItem from '@/components/dm/dm-sidebar-item';

interface Conversation {
    id: string;
    profileOneId: string;
    profileTwoId: string;
    profileOne: {
        id: string;
        userId: string;
        name: string;
        imageUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
    profileTwo: {
        id: string;
        userId: string;
        name: string;
        imageUrl: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

async function DmSidebar() {
    const profile = await currentProfile();

    async function findConversationsByUser() {
        return db.conversation.findMany({
            where: {
                OR: [
                    { profileOneId: profile?.id },
                    { profileTwoId: profile?.id },
                ],
            },
            include: {
                profileOne: true,
                profileTwo: true,
            },
        });
    }

    function getConversationInfo(conversation: Conversation) {
        let imgLink;
        let conversationName;
        let id = conversation.id;

        if (conversation.profileOne.userId !== profile?.userId) {
            imgLink = conversation.profileOne.imageUrl;
            conversationName = conversation.profileOne.name;
        } else if (conversation.profileTwo.userId !== profile?.userId) {
            imgLink = conversation.profileTwo.imageUrl;
            conversationName = conversation.profileTwo.name;
        }
        return { imgLink, conversationName, id };
    }

    const conversations = await findConversationsByUser();

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
                {conversations.map((conversation) => {
                    // @ts-ignore
                    const { imgLink, conversationName, id } = getConversationInfo(conversation);
                    return (
                        <DmSidebarItem
                            key={conversation.id}
                            params={{ imgLink, conversationName, id }}
                        />
                    );
                })}
            </ScrollArea>
        </div>
    );
}

export default DmSidebar;
