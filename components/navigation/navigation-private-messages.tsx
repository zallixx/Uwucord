'use client';

import { MessageCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import ActionTooltip from '@/components/action-tooltip';
import cn from '@/lib/utils';

function NavigationPrivateMessages() {
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/chats/main}`);
    };

    return (
        <div>
            <ActionTooltip side="right" align="center" label="Личные сообщения">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                    type="button"
                    className="group flex items-center"
                    onClick={onClick}
                >
                    <div
                        className={cn(
                            'absolute left-0 bg-primary rounded-r-full transition-all w-[0px]',
                            !params?.chatsId &&
                                params?.chatsId !== '0' &&
                                'group-hover:h-[20px] group-hover:w-[4px]',
                            params?.chatsId && params?.chatsId !== '0'
                                ? 'h-[36px] w-[4px]'
                                : 'h-[8px] group-hover:w-[4px]',
                        )}
                    />
                    <div
                        className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all
                    overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-[#5865f2]"
                    >
                        <MessageCircle
                            size={25}
                            className="group-hover:text-white transition"
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
}

export default NavigationPrivateMessages;
