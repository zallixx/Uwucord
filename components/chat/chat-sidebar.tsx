import { useEffect, useState } from 'react';
import axios from 'axios';
import {ChatItem} from '@/components/chat/chat-item';
import {db} from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";
import {redirect} from "next/navigation";

export const ChatSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/")
    }
    const chats = await db.chat.findMany({
        where: {
            participants: {
                some: {
                    id: profile.id
                }
            }
        },
        include: {
            participants: true,
        }
    });

    return (
        <div className="">
            {chats.map((chat) => (
                <div key={chat.id} className="">
                    <ChatItem
                        id={chat.id}
                        name={chat.name}
                    />
                </div>
            ))}
        </div>
    );
};
