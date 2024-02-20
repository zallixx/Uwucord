"use client"

import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Users} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useState} from "react";

const ChatsIdPage = () => {
    const [type_of_top_section, setType_of_top_section] = useState("friends");

    return (
        <>
            <div className="flex h-screen">
                <div className="w-60 bg-[#2b2d31]">
                    <button className="h-[28px] mx-4 my-2 px-4 text-[#949ba4] rounded-md bg-[#1e1f22] text-sm">
                        Найти или начать беседу
                    </button>
                    <Separator/>
                    <ScrollArea>
                        <button className="mx-2 mt-[8px] h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#36373d] hover:text-[#dbdee1]" onClick={() => setType_of_top_section("friends")}>
                            <Users className="absolute left-4" strokeWidth={2}/>
                            <span className="pr-16">Друзья</span>
                        </button>
                    </ScrollArea>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="h-12">
                        {type_of_top_section === "friends" && (
                            <div className="my-2 font-bold text-sm">
                                <p className="flex flex-row mx-1 text-[#f2f3f5]">
                                <Users color="#80848e" className="mx-2" strokeWidth={2}/>
                                    Друзья
                                    <Separator orientation="vertical" decorative className="ml-4 h-[24px] bg-[#3f4147]"/>
                                </p>
                            </div>
                        )}
                        <Separator className="mt-[12px]"/>
                    </div>
                    <div className="flex-1">3</div>
                </div>
            </div>
        </>
    );
}

export default ChatsIdPage;