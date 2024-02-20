import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {UsersRound} from "lucide-react";
import {Input} from "@/components/ui/input";

const ChatsIdPage = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="w-60 bg-[#2b2d31]">
                    <button className="h-7 mx-4 my-2 px-4 text-[#949ba4] rounded-md bg-[#1e1f22] text-sm ">
                        Найти или начать беседу
                    </button>
                    <Separator/>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="h-12">
                        <div className="my-2 font-bold text-sm">
                            <p className="flex flex-row mx-1 text-[#f2f3f5]">
                                <UsersRound color="#80848e" className="mx-2"/>
                                Друзья
                                <Separator orientation="vertical" decorative className="ml-4 h-[24px] bg-[#3f4147]"/>
                            </p>
                        </div>
                    </div>
                    <div className="flex-1">3</div>
                </div>
            </div>
        </>
    );
}

export default ChatsIdPage;