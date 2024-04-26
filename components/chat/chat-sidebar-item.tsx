function ChatSidebarItem({img_url, chat_name}) {
    return (
        <div className="mx-2 h-[42px] w-[224px] text-[#949ba4] rounded-md bg-transparent text-sm relative hover:bg-[#36373d] hover:text-[#dbdee1]">
            <div className="my-1 flex flex-row items-center">
                <img
                    src={img_url}
                    className="w-[32px] h-[32px] rounded-full mr-4 my-1"
                />
                <p className="text-sm text-[#dbdee1]">{chat_name}</p>
            </div>
        </div>
    )
}

export default ChatSidebarItem;