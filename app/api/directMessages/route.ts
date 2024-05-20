import { NextResponse } from 'next/server';
import { DirectMessage } from '@prisma/client';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';

const MESSAGES_BATCH = 10;

// eslint-disable-next-line import/prefer-default-export
export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const cursor = searchParams.get('cursor');
        const conversationId = searchParams.get('conversationId');

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!conversationId) {
            return new NextResponse('Conversation ID missing', { status: 400 });
        }

        let directMessages: DirectMessage[];

        if (cursor) {
            directMessages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId,
                },
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            directMessages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId,
                },
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }

        let nextCursor = null;

        if (directMessages.length === MESSAGES_BATCH) {
            nextCursor = directMessages[MESSAGES_BATCH - 1].id;
        }

        return NextResponse.json({
            items: directMessages,
            nextCursor,
        });
    } catch (error) {
        console.log('[MESSAGES_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
