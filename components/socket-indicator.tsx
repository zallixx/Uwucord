'use client';

import { useSocket } from '@/components/providers/socket-provider';
import { Badge } from '@/components/ui/badge';

function SocketIndicator() {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge
                variant="outline"
                className="bg-yellow-600 text-white border-none"
            >
                Переподключение
            </Badge>
        );
    }

    return (
        <Badge
            variant="outline"
            className="bg-emerald-600 text-white border-none"
        >
            Онлайн
        </Badge>
    );
}

export default SocketIndicator;
