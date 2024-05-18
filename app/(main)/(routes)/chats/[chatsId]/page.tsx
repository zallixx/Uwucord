import DmHeader from '@/components/dm/dm-header';
import currentProfile from '@/lib/current-profile';
import { redirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import ChatMessages from '@/components/chat/chat-messages';
import ChatInput from '@/components/chat/chat-input';
import { Profile } from '@prisma/client';
import DmFriendsArea from '@/components/dm/dm-friends-area';

interface ChatsIdPageProps {
    params: {
        chatsId: string;
    };
}

async function ChatsIdPage({ params }: Readonly<ChatsIdPageProps>) {
    const profile = await currentProfile();
    let type = 'conversation';
    let activeBtn = 'all';

    if (!profile) {
        return redirectToSignIn();
    }
    const conversation = await db.conversation.findUnique({
        where: {
            id: params.chatsId
        },
        include: {
            profileOne: true,
            profileTwo: true
        }
    });
    console.log(params.chatsId)
    if (params.chatsId === 'main' || params.chatsId === 'pending' || params.chatsId === 'add') {
        type = 'friends';
        activeBtn = params.chatsId
    } else {
        if (!conversation) {
            redirect('/');
        }
    }
    let anotherProfile: Profile;
    if (conversation?.profileOne.id === profile.id) {
        anotherProfile = conversation!.profileTwo;
    } else if (conversation?.profileTwo.id === profile.id) {
        anotherProfile = conversation!.profileOne;
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <DmHeader
                conversationId={params.chatsId}
                type={type}
                activeBtn={activeBtn}
            />
            {type === 'conversation' && (
                <>
                    <ChatMessages
                        profile={profile}
                        chatId={conversation!.id}
                        type="conversation"
                        apiUrl="/api/directMessages"
                        socketUrl="/api/socket/directMessages"
                        socketQuery={{
                            conversationId: conversation!.id
                        }}
                        paramKey="conversationId"
                        paramValue={conversation!.id}
                        name={anotherProfile!.name}
                    />
                    <ChatInput
                        name={anotherProfile!.name}
                        type="conversation"
                        apiUrl="/api/socket/directMessages"
                        query={{
                            conversationId: conversation!.id
                        }}
                    />
                </>
            )}
            {type === 'friends' && (
                <DmFriendsArea activeBtn={activeBtn}/>
            )}
        </div>
    );
}

export default ChatsIdPage;
