'use client'

import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

function DmFriendsButton() {
    const router = useRouter();
    return (
        <button
            type="button"
            className="mx-2 mt-[8px] h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#dfe1e5] hover:text-[#313338] dark:hover:bg-[#36373d] dark:hover:text-[#dbdee1]"
            onClick={()=>router.push(`/chats/main`)}
        >
            <Users className="absolute left-4" strokeWidth={2}/>
            <span className="pr-16">Друзья</span>
        </button>
    )
}

export default DmFriendsButton;