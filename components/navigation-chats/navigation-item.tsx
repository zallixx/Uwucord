import {useRouter} from "next/navigation";

interface NavigationItemProps {
    id: string;
    name: string;
}

export const NavigationItem = ({id,  name}: NavigationItemProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push(`/chats/${id}`)
    }

    return (
        <button onClick={onClick} className="mx-2 mt-[8px] h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#36373d] hover:text-[#dbdee1]">
            {name}
        </button>
    )
}