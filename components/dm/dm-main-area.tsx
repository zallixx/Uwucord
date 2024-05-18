'use server';

import { db } from '@/lib/db';
import currentProfile from '@/lib/current-profile';
import { headers } from 'next/headers';
import ChatMessages from '@/components/chat/chat-messages';
import ChatInput from '@/components/chat/chat-input';
import { redirect } from 'next/navigation';

async function findChatById() {
    const url = headers().get('referer') || "";
    const ConversationId = url.split("/")[4];

    if (ConversationId != 'friends' && ConversationId != 'main') {
        const chat = await db.conversation.findFirst({
            where: {
                id: ConversationId,
            },
            include: {
                profileOne: {
                    select: {
                        profile: true
                    }},
                profileTwo: {
                    select: {
                        profile: true
                    }},
            }
        });
        if (chat) {
            return chat;
        }
        else {
            return redirect('/')
        }
    } else {
        return;
    }
}

async function DmMainArea() {
    const profile = await currentProfile();
    const chat = findChatById();
/*
<ChatMessages name={} member={} chatId={} apiUrl={} socketUrl={} socketQuery={{}} paramKey={} paramValue={} type={} />
<ChatInput apiUrl={} query={} name={} type={} />
*/
    return (
        <div>

        </div>
    );
}

export default DmMainArea;