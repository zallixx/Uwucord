import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
    // eslint-disable-next-line react/require-default-props
    src?: string;
    // eslint-disable-next-line react/require-default-props
    className?: string;
}

function UserAvatar({ src, className }: UserAvatarProps) {
    return (
        <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
            <AvatarImage src={src} />
        </Avatar>
    );
}

export default UserAvatar;
