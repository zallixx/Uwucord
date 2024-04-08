import React, { useEffect, useState } from 'react';

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
};

const useChatScroll = ({
    chatRef,
    bottomRef,
    shouldLoadMore,
    loadMore,
    count,
}: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current;
        console.log(topDiv?.scrollTop);

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            console.log('TOP');

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore();
            }
        };

        topDiv?.addEventListener('scroll', handleScroll);

        return () => {};
    }, [shouldLoadMore, loadMore, chatRef]);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;
        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            if (!topDiv) {
                return false;
            }

            const distanceFromBottom =
                topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100;
        };

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 100);
        }
    }, [bottomRef, chatRef, count, hasInitialized]);
};

export default useChatScroll;
