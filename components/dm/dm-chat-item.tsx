'use client';

import * as z from 'zod';
import axios from 'axios';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Member, MemberRole, Profile } from '@prisma/client';
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import UserAvatar from '@/components/user-avatar';
import ActionTooltip from '@/components/action-tooltip';
import cn from '@/lib/utils';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';

interface ConversationIdItemDmProps {
    readonly id: string;
    readonly content: string;
    readonly profile: Profile
    readonly timestamp: string;
    readonly fileUrl: string | null;
    readonly deleted: boolean;
    readonly currentProfile: Profile;
    readonly isUpdated: boolean;
    readonly socketUrl: string;
    readonly socketQuery: Record<string, string>;
}

const formSchema = z.object({
    content: z.string().min(1),
});

function ChatItemDm({
                      id,
                      content,
                      profile,
                      timestamp,
                      fileUrl,
                      deleted,
                      currentProfile,
                      isUpdated,
                      socketUrl,
                      socketQuery,
                  }: ConversationIdItemDmProps) {
    const [isEditing, setIsEditing] = useState(false);
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                setIsEditing(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keyDown', handleKeyDown);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery,
            });

            await axios.patch(url, values);

            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        form.reset({
            content,
        });
    }, [content]);

    const fileType = fileUrl?.split('.').pop();

    const isOwner = currentProfile.id === profile.id;
    const canDeleteMessage = !deleted && isOwner;
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === 'pdf' && fileUrl;
    const isImage = !isPDF && fileUrl;

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                    className="cursor-pointer hover:drop-shadow-md transition"
                >
                    <UserAvatar src={profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                            <p
                                className="font-semibold text-sm hover:underline cursor-pointer"
                            >
                                {profile.name}
                            </p>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover"
                            />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                            >
                                PDF File
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                'text-sm text-zinc-600 dark:text-zinc-300',
                                deleted &&
                                'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1',
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    (изменено)
                                </span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form
                                className="flex items-center w-full gap-x-2 pt-2"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        disabled={isLoading}
                                                        className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                                        placeholder="Изменённое сообщение"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={isLoading}
                                    size="sm"
                                    variant="primary"
                                >
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] mt-1 text-zinc-400">
                                Нажмите escape чтобы отменить, enter чтобы
                                сохранить
                            </span>
                        </Form>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Изменить">
                            <Edit
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Удалить">
                        <Trash
                            onClick={() =>
                                onOpen('deleteMessage', {
                                    apiUrl: `${socketUrl}/${id}`,
                                    query: socketQuery,
                                })
                            }
                            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    );
}

export default ChatItemDm;
