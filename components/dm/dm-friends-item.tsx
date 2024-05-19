import { Button } from '@/components/ui/button';
import { Profile } from '@prisma/client';

type Props = {
    profile: Profile;
}

async function DmFriendsItem({ profile }: Props) {
    return (
        <Button key={profile.id}
                className={`h-[61px] dark:text-white dark:bg-transparent dark:hover:bg-[#393c41] border-t border-y border-[#3f4147] rounded-md`}>
            <img
                src={profile.imageUrl}
                className="w-[32px] h-[32px] rounded-full mr-2 my-1 mx-2"
                alt={profile.name}
            />
            <p className="text-sm">{profile.name}</p>
        </Button>
    );
}

export default DmFriendsItem;