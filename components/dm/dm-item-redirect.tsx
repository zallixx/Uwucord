'use server';

import { redirect } from 'next/navigation';
import { cookies } from "next/headers";

interface params {
    BtnClicked: string;
    ConversationId: string;
}

async function navigate(params: params) {
    if (params.BtnClicked === 'conversation') {
        cookies().set('conversationId', params.ConversationId!);
        cookies().set('TypeOfArea', 'conversation');
        if (params.ConversationId === '') {
            return
        }
        return redirect(`/chats/${params.ConversationId}`);
    } else if (params.BtnClicked === 'friends') {
        cookies().set('TypeOfArea', 'friends');
        return;
    }
}

export default navigate;