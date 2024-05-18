'use client';

import { Fragment, useRef, ElementRef } from 'react';
import { format } from 'date-fns';
import { Member, Message, Profile } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';

import ChatWelcome from './chat-welcome';
import ChatItem from './chat-item';
import useChatQuery from '@/hooks/use-chat-query';
import useChatSocket from '@/hooks/use-chat-socket';
import useChatScroll from '@/hooks/use-chat-scroll';
import ChatItemDm from '@/components/dm/dm-chat-item';

const DATE_FORMAT = 'd MMM yyyy, HH:mm';

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};
type MessageWithProfile = Message & {
    profile: Profile;
};

interface ChatMessagesProps {
    readonly name: string;
    readonly member?: Member;
    readonly profile?: Profile;
    readonly chatId: string;
    readonly apiUrl: string;
    readonly socketUrl: string;
    readonly socketQuery: Record<string, string>;
    readonly paramKey: 'channelId' | 'conversationId';
    readonly paramValue: string;
    readonly type: 'channel' | 'conversation';
}

function ChatMessages({
                          name,
                          member,
                          profile,
                          chatId,
                          apiUrl,
                          socketUrl,
                          socketQuery,
                          paramKey,
                          paramValue,
                          type
                      }: ChatMessagesProps) {
    let queryKey = `chat:${chatId}`;
    let addKey = `chat:${chatId}:messages`;
    let updateKey = `chat:${chatId}:messages:update`;
    if (type === 'conversation') {
        queryKey = `conversation:${chatId}`;
        addKey = `conversation:${chatId}:directMessages`;
        updateKey = `conversation:${chatId}:directMessages:update`;
    }


    const chatRef = useRef<ElementRef<'div'>>(null);
    const bottomRef = useRef<ElementRef<'div'>>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue
        });
    useChatSocket({ queryKey, addKey, updateKey });
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
    });

    if (status === 'pending') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        );
    }

    return (
        <div
            ref={chatRef}
            className="flex-1 flex flex-col py-4 overflow-y-auto"
        >
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && <ChatWelcome type={type} name={name} />}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                    ) : (
                        <button
                            type="button"
                            onClick={() => fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
            {type === 'channel' && (
                <div className="flex flex-col-reverse mt-auto">
                    {data?.pages?.map((group, id) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={id}>
                            {group.items.map(
                                (message: MessageWithMemberWithProfile) => (
                                    <ChatItem
                                        key={message.id}
                                        id={message.id}
                                        currentMember={member}
                                        member={message.member}
                                        content={message.content}
                                        fileUrl={message.fileUrl}
                                        deleted={message.deleted}
                                        timestamp={format(
                                            new Date(message.createdAt),
                                            DATE_FORMAT
                                        )}
                                        isUpdated={
                                            message.updatedAt !== message.createdAt
                                        }
                                        socketUrl={socketUrl}
                                        socketQuery={socketQuery}
                                    />
                                )
                            )}
                        </Fragment>
                    ))}
                </div>
            )}
            {type === 'conversation' && (
                <div className="flex flex-col-reverse mt-auto">
                    {data?.pages?.map((group, id) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={id}>
                            {group.items.map(
                                (message: MessageWithProfile) => (
                                    <ChatItemDm
                                        key={message.id}
                                        id={message.id}
                                        currentProfile={profile}
                                        profile={message.profile}
                                        content={message.content}
                                        fileUrl={message.fileUrl}
                                        deleted={message.deleted}
                                        timestamp={format(
                                            new Date(message.createdAt),
                                            DATE_FORMAT
                                        )}
                                        isUpdated={
                                            message.updatedAt !== message.createdAt
                                        }
                                        socketUrl={socketUrl}
                                        socketQuery={socketQuery}
                                    />
                                )
                            )}
                        </Fragment>
                    ))}
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
}

export default ChatMessages;
