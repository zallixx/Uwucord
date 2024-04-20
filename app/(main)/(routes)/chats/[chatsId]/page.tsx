'use client';

import { Plus, Users } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import ActionTooltip from '@/components/action-tooltip';
import ChatSidebar from '@/components/chat/chat-sidebar';
import DmSearch from '@/components/dm/dm-search';

function ChatsIdPage() {
    const [typeOfTopSection, setTypeOfTopSection] = useState('friends');

    return (
        <div className="flex h-screen">
            <div className="w-60 bg-[#2b2d31]">
                <DmSearch />
                <Separator />
                <ScrollArea>
                    <button
                        type="button"
                        className="mx-2 mt-[8px] h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#36373d] hover:text-[#dbdee1]"
                        onClick={() => setTypeOfTopSection('friends')}
                    >
                        <Users className="absolute left-4" strokeWidth={2} />
                        <span className="pr-16">Друзья</span>
                    </button>
                    <p className="mx-6 mt-[12px] flex flex-row text-[#949ba4] text-xs font-bold hover:text-[#dbdee1]">
                        ЛИЧНЫЕ СООБЩЕНИЯ
                        <ActionTooltip
                            side="top"
                            align="center"
                            label="Создать ЛС"
                        >
                            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                            <button
                                type="button"
                                className="group flex items-center absolute right-4"
                            >
                                <Plus className="text-[#949ba4]" size={14} />
                            </button>
                        </ActionTooltip>
                    </p>
                    <ChatSidebar />
                </ScrollArea>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="h-12">
                    {typeOfTopSection === 'friends' && (
                        <div className="my-2 font-bold text-sm">
                            <p className="flex flex-row mx-1 text-[#f2f3f5]">
                                <Users
                                    color="#80848e"
                                    className="mx-2"
                                    strokeWidth={2}
                                />
                                Друзья
                                <Separator
                                    orientation="vertical"
                                    decorative
                                    className="ml-4 h-[24px] bg-[#3f4147]"
                                />
                            </p>
                        </div>
                    )}
                    <Separator className="mt-[12px]" />
                </div>
                <div className="flex-1">3</div>
            </div>
        </div>
    );
}

export default ChatsIdPage;
