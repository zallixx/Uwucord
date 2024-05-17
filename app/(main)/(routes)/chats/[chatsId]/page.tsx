import DmSidebar from '@/components/dm/dm-sidebar';
import DmHeader from '@/components/dm/dm-header';
import DmMainArea from '@/components/dm/dm-main-area';

function ChatsIdPage() {
    return (
        <div className="flex h-screen">
            <DmSidebar />
            <div className="flex-1 flex flex-col">
                <div className="h-12">
                    <DmHeader />
                </div>
                <div className="flex-1">
                    <DmMainArea />
                </div>
            </div>
        </div>
    );
}

export default ChatsIdPage;
