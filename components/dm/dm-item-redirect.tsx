'use server';

import { redirect } from 'next/navigation';

async function navigate(ChatId: string) {
    if (ChatId === '') {
        return
    }
    return redirect(`/chats/${ChatId}`);
}

export default navigate;