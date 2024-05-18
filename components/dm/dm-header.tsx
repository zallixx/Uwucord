import currentProfile from '@/lib/current-profile';
import { redirectToSignIn } from '@clerk/nextjs';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { Profile } from '@prisma/client';
import ChatHeader from '@/components/chat/chat-header';

async function DmHeader() {
    const profile = await currentProfile();
    const TypeOfArea = cookies().get('TypeOfArea')?.value;
    const conversationId = cookies().get('conversationId')?.value;

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
    } else {
        anotherProfile = conversation!.profileOne;
    }

    return (
        <div>
            {TypeOfArea === 'conversation' && (
                <ChatHeader serverId={''} name={anotherProfile.name} type={'conversation'} imageUrl={anotherProfile.imageUrl}/>
            )}
            {TypeOfArea === 'friends' && (
                <ChatHeader serverId={''} name={''} type={'friends'} />
            )}
        </div>
    );
}

export default DmHeader;