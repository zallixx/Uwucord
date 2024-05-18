'use server';

import { redirect } from 'next/navigation';

async function navigate(ConversationId: string) {
    if (ConversationId === '') {
        return
    }
    return redirect(`/chats/${ConversationId}`);
}

export default navigate;