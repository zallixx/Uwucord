'use server';

import { db } from '@/lib/db';
import currentProfile from '@/lib/current-profile';
import { headers } from 'next/headers';
import ChatMessages from '@/components/chat/chat-messages';
import ChatInput from '@/components/chat/chat-input';
import { redirect } from 'next/navigation';
import { Conversation, Member, Message, Profile } from '@prisma/client';

type ConvoWithProfiles = Conversation & {
    profileOne: Profile,
    profileTwo: Profile,
};

async function findConversationById(ConversationId: string) {
    if (ConversationId != 'friends' && ConversationId != 'main') {
        const conversation = await db.conversation.findFirst({
            where: {
                id: ConversationId
            },
            include: {
                profileOne: true,
                profileTwo: true
            }
        });
        if (conversation) {
            return conversation;
        } else {
            return redirect('/chats/main');
        }
    } else {
        return undefined;
    }
}

async function DmMainArea() {
    const url = headers().get('referer') || '';
    const TypeOfArea = url.split('/')[4];

    const profile = await currentProfile();
    const conversation: ConvoWithProfiles = await findConversationById(TypeOfArea);
    return (
        <div>

            <ChatMessages
                profile={profile!}
                chatId={conversation.id}
                type="conversation"
                apiUrl="/api/directMessages"
                socketUrl="/api/socket/directMessages"
                socketQuery={{
                    conversationId: conversation.id
                }}
                paramKey="conversationId"
                paramValue={conversation.id}
                name={conversation.profileOne.name}
            />
            <ChatInput
                name={conversation.profileOne.name}
                type="conversation"
                apiUrl="/api/socket/directMessages"
                query={{
                    conversationId: conversation.id
                }}
            />

        </div>
    );
}

export default DmMainArea;