import { NextApiRequest } from 'next';

import { NextApiResponseServerIo } from '@/types';
import currentProfilePages from '@/lib/current-profile-pages';
import { db } from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const profile = await currentProfilePages(req);
        const { content, fileUrl } = req.body;
        const { conversationId } = req.query;

        if (!profile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!conversationId) {
            return res.status(400).json({ error: 'Conversation ID missing' });
        }

        if (!content) {
            return res.status(400).json({ error: 'Content missing' });
        }
        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
            },
        });

        if (!conversation) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        const directMessage = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                conversationId: conversationId as string,
                profileId: profile.id,
            },
            include: {
                profile: true,
            },
        });

        const channelKey = `conversation:${conversationId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, directMessage);

        return res.status(200).json(directMessage);
    } catch (error) {
        console.log('[MESSAGES_POST]', error);
        return res.status(500).json({ message: 'Internal Error' });
    }
}
