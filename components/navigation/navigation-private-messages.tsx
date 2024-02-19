"use client"

import {ActionTooltip} from "@/components/action-tooltip";
import {MessageCircle} from "lucide-react";

export const NavigationPrivateMessages = () => {
    return (
        <div>
            <ActionTooltip
                side="right"
                align="center"
                label="Личные сообщения"
            >
                <button
                    className="group flex items-center"
                >
                    <div
                        className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all
                    overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-[#5865f2]">
                        <MessageCircle
                            size={25}
                            className="group-hover:text-white transition"
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}