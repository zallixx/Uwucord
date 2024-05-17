import { NextApiRequest } from 'next';

import { NextApiResponseServerIo } from '@/types';
import currentProfilePages from '@/lib/current-profile-pages';
import { db } from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    if (req.method !== 'DELETE' && req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const profile = await currentProfilePages(req);
        const { directMessageId, conversationId } = req.query;
        const { content } = req.body;

        if (!profile) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!conversationId) {
            return res.status(400).json({ error: 'Conversation ID missing' });
        }

        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
            },
        });
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        let directMessage = await db.directMessage.findFirst({
            where: {
                id: directMessageId as string,
                conversationId: conversationId as string,
            },
            include: {
                profile: true,
            },
        });

        if (!directMessage || directMessage.deleted) {
            return res.status(404).json({ error: 'Message not found' });
        }

        const isMessageOwner = directMessage.profileId === profile.id;
        if (!isMessageOwner) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (req.method === 'DELETE') {
            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string,
                },
                data: {
                    fileUrl: null,
                    content: 'Это сообщение было удалено.',
                    deleted: true,
                },
                include: {
                    profile: true,
                },
            });
        }

        if (req.method === 'PATCH') {
            if (!isMessageOwner) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string,
                },
                data: {
                    content,
                },
                include: {
                    profile: true,
                },
            });
        }

        const updateKey = `conversation:${conversationId}:directMessages:update`;

        res?.socket?.server?.io?.emit(updateKey, directMessage);

        return res.status(200).json(directMessage);
    } catch (error) {
        console.log('[Direct_MESSAGE_ID]', error);
        return res.status(500).json({ error: 'Internal Error' });
    }
}
