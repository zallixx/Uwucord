'use client';

import { Button } from '@/components/ui/button';
import {Conversation, Profile} from '@prisma/client';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import ActionTooltip from '@/components/action-tooltip';


type Props = {
    anotherProfile: Profile;
    conversation: Conversation | null;
}

function DmFriendsItem({anotherProfile, conversation}: Props) {
    const router = useRouter();

    return (
        <>
            <Button key={anotherProfile.id}
                    className={`h-[61px] dark:text-white dark:bg-transparent dark:hover:bg-[#393c41] border-t dark:border-[#3f4147] rounded flex items-center justify-start bg-transparent hover:bg-[#eaebed] text-black border-[#e1e2e4] group`}
                    onClick={() => router.push(`/chats/${conversation?.id}`)}
            >
                <img
                    src={anotherProfile.imageUrl}
                    className="w-[32px] h-[32px] rounded-full mr-2 my-1 mx-2"
                    alt={anotherProfile.name}
                />
                <p className="text-sm">{anotherProfile.name}</p>
                <ActionTooltip label={"Сообщение"}>
                    <div
                        className="ml-auto text-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer dark:group-hover:bg-[#1e1f22] dark:bg-[#2b2d31] bg-[#f2f3f5]">
                        <MessageCircle
                            className="w-[19px] h-[19px] dark:fill-[#b5bac1] fill-[#4e5058] dark:text-[#b5bac1] text-[#4e5058]"/>
                    </div>
                </ActionTooltip>
            </Button>
        </>
    );
}

export default DmFriendsItem;