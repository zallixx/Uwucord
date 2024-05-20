'use client';

import { Hash, Users } from 'lucide-react';

import MobileToggle from '@/components/mobile-toggle';
import UserAvatar from '@/components/user-avatar';
import SocketIndicator from '@/components/socket-indicator';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

interface ChatHeaderProps {
    readonly serverId: string;
    readonly name: string;
    readonly type: 'channel' | 'conversation' | 'friends';
    // eslint-disable-next-line react/require-default-props
    readonly imageUrl?: string;
    readonly activeBtn?: string;
}

function ChatHeader({ serverId, name, type, imageUrl, activeBtn }: ChatHeaderProps) {
    const router = useRouter();
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
                    <div className="flex flex-row mx-1 dark:text-white select-none text-[#060607]">
                        <Users color="#6d6f78" className="mx-2" strokeWidth={2} />
                        Друзья
                        <Separator orientation="vertical" decorative className="ml-4 h-[24px] dark:bg-[#3f4147] bg-[#e1e2e4]"/>
                        <Button
                            className={`mx-1.5 h-[24px] dark:text-white dark:hover:bg-[#393c41] text-black hover:bg-[#eaebed] ${activeBtn === 'main' ? 'dark:bg-[#43444b] cursor-default bg-[#e1e2e4]' : 'bg-transparent'}`}
                            onClick={() => router.push('/chats/main')}
                        >
                            Все
                        </Button>
                        <Button
                            className={`mx-1.5 h-[24px] dark:text-white dark:hover:bg-[#393c41] text-black hover:bg-[#eaebed] ${activeBtn === 'pending' ? 'dark:bg-[#43444b] cursor-default bg-[#e1e2e4]' : 'bg-transparent'}`}
                            onClick={() => router.push('/chats/pending')}
                        >
                            Ожидание
                        </Button>
                        <Button
                            className={`mx-1.5 h-[24px] dark:text-white dark:bg-[#248046] bg-[#248046] hover:bg-[#258047] ${activeBtn === 'add' ? 'dark:bg-transparent dark:text-[#2dbb53] cursor-default bg-transparent text-[#248046] hover:bg-transparent' : ''}`}
                            onClick={() => router.push('/chats/add')}
                        >
                            Добавить в друзья
                        </Button>
                    </div>
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
