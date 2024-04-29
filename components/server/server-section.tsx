'use client';

import { ChannelType, MemberRole } from '@prisma/client';
import { Plus } from 'lucide-react';

import { ServerWithMembersWithProfiles } from '@/types';
import ActionTooltip from '@/components/action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

interface ServerSectionProps {
    readonly label: string;
    // eslint-disable-next-line react/require-default-props
    readonly role?: MemberRole;
    readonly sectionType: 'channels' | 'members';
    // eslint-disable-next-line react/require-default-props
    readonly channelType?: ChannelType;
    // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
    readonly server?: ServerWithMembersWithProfiles;
}

function ServerSection({
    label,
    role,
    sectionType,
    channelType,
}: ServerSectionProps) {
    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-100">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === 'channels' && (
                <ActionTooltip label="Create Channel" side="top">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                        type="button"
                        onClick={() => onOpen('createChannel', { channelType })}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    );
}
export default ServerSection;
