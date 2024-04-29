'use client';

import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

interface ServerSearchProps {
    readonly data: {
        label: string;
        type: 'channel' | 'member';
        data:
            | {
                  icon: React.ReactNode;
                  name: string;
                  id: string;
              }[]
            | undefined;
    }[];
}

function ServerSearch({ data }: ServerSearchProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'f' || e.key === 'а') && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                // eslint-disable-next-line no-shadow
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const onClick = ({
        id,
        type,
    }: {
        id: string;
        type: 'channel' | 'member';
        // eslint-disable-next-line consistent-return
    }) => {
        setOpen(false);

        if (type === 'channel') {
            return router.push(`/servers/${params?.serverId}/channels/${id}`);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Поиск
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">Ctrl F</span>
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Поиск каналов и участников" />
                <CommandList>
                    <CommandEmpty>Ничего не найдено</CommandEmpty>
                    {/* eslint-disable-next-line no-shadow */}
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => (
                                    <CommandItem
                                        key={id}
                                        onSelect={() => onClick({ id, type })}
                                    >
                                        {icon}
                                        <span>{name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        );
                    })}
                </CommandList>
            </CommandDialog>
        </>
    );
}

export default ServerSearch;
