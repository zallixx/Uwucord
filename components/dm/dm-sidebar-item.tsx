'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface ConversationSidebarItemProps {
    params: {
        imgLink: string | undefined;
        conversationName: string | undefined;
        id: string;
    };
}

function DmSidebarItem({ params }: Readonly<ConversationSidebarItemProps>) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    return (
        <div
            className="mx-2 h-[42px] w-[224px] text-[#5c5e66] dark:text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#dfe1e5] hover:text-[#313338] dark:hover:bg-[#36373d] dark:hover:text-[#dbdee1] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push(`/chats/${params.id}`)}
        >
            <div className="my-1 flex flex-row items-center">
                <img
                    src={params.imgLink}
                    className="w-[32px] h-[32px] rounded-full mr-2 my-1 mx-2"
                    alt={params.conversationName}
                />
                <p className="text-sm">{params.conversationName}</p>
                <X
                    size={18}
                    className={`ml-auto mr-3 ${isHovered ? 'opacity-90' : 'opacity-0'}`}
                />
            </div>
        </div>
    );
}

export default DmSidebarItem;