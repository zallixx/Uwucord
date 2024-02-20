import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavigationItem } from '@/components/navigation-chats/navigation-item';

export const NavigationSidebar = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('/api/chats');
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <div className="">
            {chats.map((chat) => (
                <div key={chat.id} className="">
                    <NavigationItem
                        id={chat.id}
                        name={chat.name}
                    />
                </div>
            ))}
        </div>
    );
};
