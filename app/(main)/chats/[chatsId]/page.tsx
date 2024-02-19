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
                    <Button className="w-full h-7"/>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="h-12">2</div>
                    <div className="flex-1">3</div>
                </div>
            </div>
        </>
    );
}

export default ChatsIdPage;