import DmSearch from "@/components/dm/dm-search";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Plus, Users} from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";

import {PrismaClient} from '@prisma/client';
import currentProfile from "@/lib/current-profile";

import ChatSidebarItem from "@/components/chat/chat-sidebar-item";

async function ChatSidebar() {
    const profile = await currentProfile();

    async function findChatsByUser() {
        const prisma = new PrismaClient();

        return prisma.conversation.findMany({
            where: {
                OR: [
                    { memberOne: { profileId: profile?.id } },
                    { memberTwo: { profileId: profile?.id } },
                ],
            },
            include: {
                memberOne: {
                    select: {
                        profile: true,
                    },
                },
                memberTwo: {
                    select: {
                        profile: true,
                    },
                },
            },
        });
    }

    function getChatInfo(chat) {
        let img_link, chat_name;

        if (chat.memberOne.profileId !== profile?.id) {
            img_link = chat.memberOne.profile.imageUrl;
            chat_name = chat.memberOne.profile.name;
        } else if (chat.memberTwo.profileId !== profile?.id) {
            img_link = chat.memberTwo.profile.imageUrl;
            chat_name = chat.memberOne.profile.name;
        }

        return { img_link, chat_name };
      }

    const chats = await findChatsByUser();

    return (
        <div className="w-60 bg-[#2b2d31]">
            <ScrollArea>
                <DmSearch/>
                <Separator/>
                <button
                    type="button"
                    className="mx-2 mt-[8px] h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#36373d] hover:text-[#dbdee1]"
                >
                    <Users className="absolute left-4" strokeWidth={2}/>
                    <span className="pr-16">Друзья</span>
                </button>
                <p className="mx-6 mt-[12px] flex flex-row text-[#949ba4] text-xs font-bold hover:text-[#dbdee1]">
                    ЛИЧНЫЕ СООБЩЕНИЯ
                    <ActionTooltip
                        side="top"
                        align="center"
                        label="Создать ЛС"
                    >
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <button
                            type="button"
                            className="group flex items-center absolute right-4"
                        >
                            <Plus className="text-[#949ba4]" size={14}/>
                        </button>
                    </ActionTooltip>
                </p>
                <Separator/>
                {chats.map((chat) => {
                    const { img_link, chat_name } = getChatInfo(chat);
                    return (
                        <ChatSidebarItem
                            key={chat.id}
                            img_url={img_link}
                            chat_name={chat_name}
                        />
                    );
                })}
            </ScrollArea>
        </div>
    );
}

export default ChatSidebar;
