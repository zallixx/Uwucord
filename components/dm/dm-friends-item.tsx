'use client';

import { Button } from '@/components/ui/button';
import {Conversation, Profile} from '@prisma/client';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

type Props = {
    anotherProfile: Profile;
    conversation: Conversation | null;
}

function DmFriendsItem({anotherProfile, conversation}: Props) {
    const router = useRouter();

    return (
        <>
            <Button key={anotherProfile.id}
                    className={`h-[61px] dark:text-white dark:bg-transparent dark:hover:bg-[#393c41] border-t border-y dark:border-[#3f4147] rounded-md flex items-center justify-start bg-transparent hover:bg-[#eaebed] text-black border-[#e1e2e4]`}
                    onClick={() => router.push(`/chats/${conversation?.id}`)}
            >
                <img
                    src={anotherProfile.imageUrl}
                    className="w-[32px] h-[32px] rounded-full mr-2 my-1 mx-2"
                    alt={anotherProfile.name}
                />
                <p className="text-sm">{anotherProfile.name}</p>
                <div className="ml-auto">
                    <div
                        className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                        <MessageCircle className="w-4 h-4"/>
                    </div>
                </div>
            </Button>
        </>
    );
}

export default DmFriendsItem;