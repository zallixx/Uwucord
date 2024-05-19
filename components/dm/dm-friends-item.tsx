'use client';

import { Button } from '@/components/ui/button';
import {Conversation, Profile} from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
    anotherProfile: Profile;
    conversation: Conversation | null;
}

function DmFriendsItem({anotherProfile, conversation}: Props) {
    const router = useRouter();

    return (
        <>
            <Button key={anotherProfile.id} className={`h-[61px] dark:text-white dark:bg-transparent dark:hover:bg-[#393c41] border-t border-y border-[#3f4147] rounded-md flex items-center justify-start`}
                    onClick={() => router.push(`/chats/${conversation?.id}`)}
            >
                <img
                    src={anotherProfile.imageUrl}
                    className="w-[32px] h-[32px] rounded-full mr-2 my-1 mx-2"
                    alt={anotherProfile.name}
                />
                <p className="text-sm">{anotherProfile.name}</p>
            </Button>
        </>
    );
}

export default DmFriendsItem;