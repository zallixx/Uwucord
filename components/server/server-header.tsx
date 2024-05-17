'use client';

import { MemberRole } from '@prisma/client';
import {
    ChevronDown,
    LogOut,
    PlusCircle,
    Settings,
    Trash,
    UserPlus,
    Users,
} from 'lucide-react';
import { ServerWithMembersWithProfiles } from '@/types';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';

interface ServerHeaderProps {
    readonly server: ServerWithMembersWithProfiles;
    // eslint-disable-next-line react/require-default-props
    readonly role?: MemberRole;
}

function ServerHeader({ server, role }: ServerHeaderProps) {
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button
                    type="button"
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-[10px] font-normal text-black dark:text-neutral-400 space-y-[2px] bg-zinc-950/80">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen('invite', { server })}
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-2 cursor-pointer "
                    >
                        Пригласить людей
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen('editServer', { server })}
                        className="px-3 py-2 cursor-pointer"
                    >
                        Настройки сервера
                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen('members', { server })}
                        className="px-3 py-2 cursor-pointer"
                    >
                        Участники
                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen('createChannel')}
                        className="px-3 py-2 cursor-pointer"
                    >
                        Создать канал
                        <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator className="h-[1px] bg-zinc-300 dark:bg-zinc-800/90 rounded-md mx-2" />
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen('deleteServer', { server })}
                        className="text-rose-500 px-3 py-2 cursor-pointer"
                    >
                        Удалить сервер
                        <Trash className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen('leaveServer', { server })}
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Покинуть сервер
                        <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ServerHeader;
