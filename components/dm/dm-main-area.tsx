'use server';

import { PrismaClient } from '@prisma/client';
import currentProfile from '@/lib/current-profile';
import { headers } from 'next/headers';
import ChatMessages from '@/components/chat/chat-messages';
import ChatInput from '@/components/chat/chat-input';
import { redirect } from 'next/navigation';

function findChatById() {
    const prisma = new PrismaClient();
    const url = headers().get('referer') || "";
    const ConversationId = url.split("/")[4];

    if (ConversationId != 'friends' && ConversationId != 'main') {
        try {
            return prisma.conversation.findUnique({
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
        } catch (error) {
            return redirect('/chats/main')
        }
    } else {
        return;
    }
}

async function DmMainArea() {
    const profile = await currentProfile();
    const chat = await findChatById();
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