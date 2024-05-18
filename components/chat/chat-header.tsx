import { Hash, Users } from 'lucide-react';

import MobileToggle from '@/components/mobile-toggle';
import UserAvatar from '@/components/user-avatar';
import SocketIndicator from '@/components/socket-indicator';

interface ChatHeaderProps {
    readonly serverId: string;
    readonly name: string;
    readonly type: 'channel' | 'conversation' | 'friends';
    // eslint-disable-next-line react/require-default-props
    readonly imageUrl?: string;
}

function ChatHeader({ serverId, name, type, imageUrl }: ChatHeaderProps) {
    return (
        <div
            className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            {type === 'channel' && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}
            {type === 'conversation' && (
                <UserAvatar
                    src={imageUrl}
                    className="h-8 w-8 md:h-8 md:w-8 mr-2"
                />
            )}
            {type !== 'friends' && (
                <p className="font-semibold text-md text-black dark:text-white">
                    {name}
                </p>
            )}
            {type === 'friends' && (
                <div className="my-2 font-bold text-sm">
                    <p className="flex flex-row mx-1 dark:text-white">
                        <Users color="#6d6f78" className="mx-2" strokeWidth={2} />
                        Друзья
                    </p>
                </div>
            )}

            {type !== 'friends' && (
                <div className="ml-auto flex items-center">
                    <SocketIndicator />
                </div>
            )}


        </div>

    );
}

export default ChatHeader;
