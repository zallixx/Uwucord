"use client"

import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {Plus, Users} from "lucide-react";
import {useState} from "react";
import {ActionTooltip} from "@/components/action-tooltip";
import {ChatSidebar} from "@/components/chat/chat-sidebar";

const DmSearch = () => {
    const [type_of_top_section, setType_of_top_section] = useState("friends");

    return (
        <>
            <button className="h-[28px] mx-4 my-2 px-4 text-[#949ba4] rounded-md bg-[#1e1f22] text-sm">
                        Найти или начать беседу
            </button>
        </>
    )
}