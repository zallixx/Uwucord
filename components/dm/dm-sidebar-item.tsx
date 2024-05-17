'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import navigate from '@/components/dm/dm-item-redirect';

interface ChatSidebarItemProps {
    params: {
        imgLink: string | undefined;
        chatName: string | undefined;
        id: string;
    };
}

function DmSidebarItem({ params }: Readonly<ChatSidebarItemProps>) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="mx-2 h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#36373d] hover:text-[#dbdee1]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(params.id)}
        >
            <div className="my-1 flex flex-row items-center">
                <img
                    src={params.imgLink}
                    className="w-[32px] h-[32px] rounded-full mr-4 my-1 mx-1"
                    alt={params.chatName}
                />
                <p className="text-sm text-[#dbdee1]">{params.chatName}</p>
                <X
                    size={18}
                    className={`ml-auto mr-3 ${isHovered ? 'opacity-90' : 'opacity-0'}`}
                />
            </div>
        </div>
    );
}

export default DmSidebarItem;