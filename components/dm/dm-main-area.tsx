'use server';

import { db } from '@/lib/db';
import currentProfile from '@/lib/current-profile';
import { cookies } from 'next/headers';
import ChatMessages from '@/components/chat/chat-messages';
import ChatInput from '@/components/chat/chat-input';
import { redirect } from 'next/navigation';
import { Conversation, Profile } from '@prisma/client';
import { redirectToSignIn } from '@clerk/nextjs';

type ConvoWithProfiles = Conversation & {
    profileOne: Profile,
    profileTwo: Profile,
};

async function DmMainArea() {
    const profile = await currentProfile();
    const TypeOfArea = cookies().get('TypeOfArea')?.value;
    let conversation: ConvoWithProfiles;
    let anotherProfile: Profile;

    if (!profile) {
        return redirectToSignIn();
    }

    if (TypeOfArea === 'conversation') {
        // @ts-ignore
        conversation = await db.conversation.findFirst({
            where: {
                id: cookies().get('conversationId')?.value,
            },
            include: {
                profileOne: true,
                profileTwo: true
            }
        });
        if (conversation.profileOne.id === profile.id) {
            anotherProfile = conversation.profileTwo;
        } else {
            anotherProfile = conversation.profileOne;
        }
        if (!conversation) {
            return redirect('/chats/main');
        }
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            {TypeOfArea === 'conversation' && (
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
        </div>
    );
}

export default DmMainArea;