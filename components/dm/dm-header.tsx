import currentProfile from '@/lib/current-profile';
import { redirectToSignIn } from '@clerk/nextjs';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { Profile } from '@prisma/client';
import ChatHeader from '@/components/chat/chat-header';

interface ChatHeaderProps {
    readonly type: string;
    readonly conversationId?: string;
    // eslint-disable-next-line react/require-default-props
}

async function DmHeader({ type, conversationId }: ChatHeaderProps) {
    const profile = await currentProfile();
    const TypeOfArea = type;

    if (!profile) {
        return redirectToSignIn();
    }

    const conversation = await db.conversation.findFirst({
        where: {
            id: conversationId
        },
        include: {
            profileOne: true,
            profileTwo: true
        }
    });

    let anotherProfile: Profile;
    if (conversation?.profileOne.id === profile.id) {
        anotherProfile = conversation!.profileTwo;
    } else if (conversation?.profileTwo.id === profile.id) {
        anotherProfile = conversation!.profileOne;
    }

    return (
        <>
            {TypeOfArea === 'conversation' && (
                <ChatHeader serverId={''} name={anotherProfile!.name} type={'conversation'}
                            imageUrl={anotherProfile!.imageUrl} />
            )}
            {TypeOfArea === 'friends' && (
                <ChatHeader serverId={''} name={''} type={'friends'} />
            )}
        </>
    );
}

export default DmHeader;